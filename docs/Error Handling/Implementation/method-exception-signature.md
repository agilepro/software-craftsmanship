#  Method Exception Signature

:::warning[Update]

This recommendation has changed to never declare a throws declaration.  See [Say 'No' to Checked Exception](https://agiletribe.purplehillsbooks.com/2023/07/13/say-no-to-checked-exceptions/).  However if forced to declare an exception signature, you should still use the base `Exception` class instead of anything more specific than that.

:::

In short, **if a method signature must declare a throws clause, it should always declare to throw `java.lang.Exception`** and never a specialized exception class.  Find this surprising?  Then please read on.  The original goal to allow methods to declare the type of exceptions they might throw was a valiant attempt to clarify program behavior, but unfortunately it was misguided, does not work, and if used incorrectly can turn into a maintenance nightmare.

## The Simple Rule

The argumentation below is going to get a little complicated because you are going to have to consider not just your code today, but how code bases _change over time_.  We will have to weigh the benefit of strongly typing the method interface with the cost of maintaining it.  The conclusion will be quite simple:

*   If a method throws any checked exception, always declare it to throw `java.lang.Exception`.
*   Even if it actually throws a specialized exception class, you should not declare the method to throw that specialized class.

This is not being lazy, this is instead focusing effective use of developer time on functionality of the code, and not on wasteful syntactic busywork.  You will probably encounter many people who believe that being more specific produces better, tighter code, and you will have to refer them to this long and arduous argument.

## Historical Purpose

Java was the first popular language to incorporate exception throwing into the language from the beginning, and this was big leap forward.  (Actually ADA had exceptions in the original language spec, but nobody ever used ADA for anything outside of the DOD.)  Other languages had patchy support for exceptions: some libraries used them, some ignored them. Java was the first to offer universal support.  

Java included not only ability to throw, but also standard syntax to declare that a method would throw a particular exception class.  The purpose of this, is so that calling code can be designed to catch and properly handle a particular problems.  It seemed like a good idea at the time: the method will declare all the normal return types, and all the exceptional return types, and everything will be completely type-safe.  

The reason for declaring is so that the caller of a method might construct a try/catch block to catch and respond to particular exception types.  So, if a method might throw a FileNotFound exception, you might be able to catch that, and execute code that responds to that situation correctly.

## Why It Doesn't Work

I am a huge fan of type safety!  Tracking and matching type can avoid many kind of errors that were routine before strongly typed languages like Java were invented. The value that a method returns can be determined and enforced at the time that the compiler runs, but the exception type **CAN NOT**.  That is the underlying flaw in putting the exception type in the signature.

A method will construct and return a value, and the method has complete control over the value that it returns.  It is not possible for any other piece of code outside of the method, to have any effect on the value that is returned by the method.  Method A may have code to return the result of method B as its own result, but this is still the choice of Method A.  If method B has agreed to return a particular type, and that type is compatible with the return type of method A, then the interface contracts will always be in agreement.  

Thrown exceptions do not behave like returned values.  The possible exceptions that a method might throw is the UNION of all the types of exceptions that can be thrown from all the methods it calls, and all the methods those call, ad nauseam.  Let me give a clear example:

Say you have a method `a1` which calls methods `b1` through `b9`.  Then consider method b1 which calls methods `c1` through `c9`.  And consider method `c1` which calls `d1` through `d9`.  If `d9` throws an exception, if might fly all the way out of method `a1`.  (There are ways to eliminate this which I will discuss later, but in general, method `c1` might thrown any exception that any method `d1` through `d9` throws.  And `b1` throws anything that `c1` through `c9` might throw. And so on, such that `a1` might throw any exception from all of the `b` methods, all of the `c` methods, and all of the `d` methods.

## Just calculate the closure!

If you have all the methods at levels `a`, `b`, `c`, and `d`, all you need to do is to track all the possible exceptions from all the methods called, and include them in the signature of that method.  Thus `c1` would declare all the exceptions that `d1` through `d9` declare.

Recursively, you make `b1` declare all the exception types that `c1` through `c9` declare.

And so on, just do the bookkeeping, and reflect all the correct classes out to the outermost level.  Wouldn't this be great! because you would know all the possible exception classes that a1 might throw!  Two problems:

**Dynamic libraries**: You don't know at compile time the complete contents of all the libraries you will be using at run time. The whole point of Java is to allow for classes that can be transported and reused easily.  There are JAR files with libraries of classes.  At compile time you list all the libraries you depend upon, but at run time you are likely to be using a different set of libraries with different code.

For example, consider database access: a standard interface JDBC allows you to write code that will talk to a database, and the later supply a library for a particular database.  So you write the code using the library for MySQL, but later at run time you swap for the library that talks to H-Base.  It is quite likely that H-Base will have entirely different kinds of exceptions than those of MySQL. It is even possible that a newer version of MySQL library with “hyper-quantum-transport-support” might have a bunch of new kinds of exceptions that did not exist in earlier version.  The idea that you abstract the working of the code with an interface is violated if that interface reflects a deep understanding of the kinds of exceptions that might be thrown.

**Interface Change Storms**: the second problem should be obvious if you consider what a large code base might bring.  Consider a modest code base with 1000 methods  that can detect and report 100 types of internal problems with 100 distinct exception classes.   When you invent the 101-st exception type and use it in one method, you will have to propagate that new type through dozens, and maybe hundreds of method signatures. 

Consider also the effect produced because coding is never a strict hierarchy . . . instead there is a web of connections.  For example, imagine that method `d1` in the earlier example has an occasion to call `a1` recursively.  Instantly `d1` must inherit all the method signatures from `a1`, and so must all the methods in between.  Recursive calls at a basic level cause an explosion of the signatures such that quickly all methods need to include all exception types.  Adding a 101-st exception class will essentially cause all signatures of all methods to be changed.

This can not be managed.  This may be an extreme example, but it is a reality when you add a call to a new library, that has a bunch of new exceptions that might be called, properly handling would require that these types get propagated through many many methods.The goal an object oriented language is to provide encapsulation — isolating the changes of one part of the code.  Attempting to calculate the closure of all possible exception types, and declare them as part of the signature is a violation of the basic idea of encapsulation!  It unnecessarily exposes the inner workings of the code, making it difficult or impossible to combine modules at run time in new ways.

Besides being unmanageable, it exposes internal working details that should not be exposed through the interface.  the interface `a` should not include the detail that it is calling into class `c` and ultimately `d`.  The detail that it might throw `c` or `d` exceptions exposes how `a` does its work in a way that should never be done.

## Just Wrap Every Exception

You can declare your methods to throw a single exception class `MyFooException` and then catch and wrap every exception in every method.  For example:

```
public void myMethod(int param) throws MyFooException {
    try {
        method1Call(param);
        method2Call(param + 1);
        method3Call( method4Call( param*2 ) );
    }
    catch (Exception e) {
        throw new MyFooException(e);
    }
}
```


Ok, this works. It allows you to maintain complete signature correctness. But you have completely defeated any real benefit of exception signatures.

Saying that it throws a MyFooException does not tell you anything about the real errors that might be encountered.  The purpose declaring the types of exceptions was so that you could write code that would respond to the problem.  By wrapping in this way, you have LOST any real meaning of the exception.

If method1Call throws a FileNotFound exception, then the signature of myMethod does not declare this.   The FileNotFound exception would be wrapped by the exception class MyFooException, but the only real meaning is that the “file was not found”.

If method2Call throws a “IndexOutOfRange” exception, which is then wrapped in a MyFooException class, the real meaning of the exception is still “index out of range” but you have lost this meaning by wrapping in a standard class.

You can open up the MyFooException, and get the “cause” exception out of it, but what have you really gained by wrapping it in the first place?   The real problem is “file not found”.  You have an exception called FileNotFound to express this.  The code wraps this in a MyFooException just so that it can obey the syntax of the declaration that you will always throw MyFooException, but that is pointless.  The only thing you can do with the MyFooException is to unwrap the exception within, which is not declared or documented.

Saying that the method MyFooException is the only exception that myMethod might throw tell you nothing about the problems that you might have to respond to!  It solves the Interface Change Storm problem, but it does so by creating an object with absolutely no meaning.

Not only does the exception wrapper have no meaning, but it creates extra work:  Every method has to have the try catch block.  The programmer has to write those lines of code.  And at run time, the code is larger, and the exception handling causes more overhead.  There are more classes involved.

All of this overhead for absolutely no value, because the MyFooException object does not tell you anything about the problems that might be encountered nor what you might have to respond to.  _You must understand this point before continuing._

## The reason for using `java.lang.Exception` or nothing

Consider the above example with wrapped code, and compare with the following, similar example:

```
public void myMethod(int param) throws Exception {
    method1Call(param);
    method2Call(param + 1);
    method3Call( method4Call( param*2 ) );
}
```

This code accomplished the same thing, but it does so in HALF the number of lines.  This will greatly reduce the amount of maintenance needed.

It is true that this method signature does not declare what kind of error might be encountered, but please understand the earlier, wrapped example does not tell you what kinds of errors you will encounter either!

Both cases do not tell you in the signature what possible problems will cause an exception to fly out!  But this case does it in fewer lines of code, with fewer classes. The classes that result from this code are smaller, and easier to maintain.

And, there is no loss of functionality.

## This Post is Just about the Signature

In other places, I have written that it is a good idea to wrap an exception in another exception if it adds context to the error message.  This can be quite important.  The argument above is that you should not be forced to wrap just to obey the method signature: that adds no value.  However, if you follow this advice, and declare the method to throw `java.lang.Exception` you still will have occasion to catch an exception and wrap it in order to add context to the error message.

Also other places I have argued that it is a good idea to create your own Exception class.  I believe that exceptions should be translatable and should carry data values to clarify the exact situation of the exception.  Just because the method signature says that it will throw “java.lang.Exception” does not mean that the code has to throw this class.  The code can throw any class that extends `java.lang.Exception` — which is essentially any exceptions.  Throwing a good exception class that accurately describes the situation is still very important, it is just not a good idea to declare this in the method signature.

## Conclusion

This recommendation has changed to never declare a throws declaration.  See [Say 'No' to Checked Exception](https://agiletribe.purplehillsbooks.com/2023/07/13/say-no-to-checked-exceptions/).  However if forced to declare an exception signature, you should still use the base `Exception` class instead of anything more specific than that.

That is it, that is all there is to the argument.

*   Proper declaration of all possible problems that might occur, of all possible exceptions that might fly out, is a violation of encapsulation, and is impossible to maintain in the light of code changes, and interchangeable modules.
*   Creating a “standard” wrapper class will satisfy the syntactic requirements, but loses all the value of the declaration.  You have a meaningless class that does not tell you what kinds of problems the calling code has to prepare for.
*   Declaring simply `Exception` will do the same thing, with far less work and bother.
* Better yet, use unchecked exceptions, and make no declaration at all.

It all comes from considering the effect of change.  As the size of the code base grows, the number of declarations will grow exponentially. The cost of a small change will be magnified many times, greatly increasing the cost of maintenance.  All for nothing.

:::tip[Key Takeaway]

Declaring anything more specific than `Exception` wastes development resources.

:::