---
  title: What Happens On Failure
---
#  Indicate what happens when function can't return value

There are many functions which take a value, go and look for something, and return an object. If the object is found it is returned, but if it is not found, what do you do?  There are two possibilities, either return a null, or throw an exception.  Often, there is justification for having two methods: one that returns a null, and one that throws an exception.  But how do you tell them apart?  This post suggests a possible naming convention.  

When a method can not complete its task, there are two possible ways of expressing this:

*   Throw an Exception: in many cases it is appropriate to thrown an exception if the object is supposed to exist. This is a particularly good pattern to avoid executing code that is supposing the object to exist. A statement assumes it is getting an object, and the following lines of code use that object, assuming it was returned. If a null is returned, you get a null pointer exception, which is just about the most unhelpful exception possible. You would rather have an error that tells you that it could not find the object.

*   Return Null: in many cases you have code that is attempting to get objects “if they exist” The calling code wants to know if the key being used is a good one, and so calls the lookup function to see if anything is returned. In these cases, the calling code is ready to test if a null is returned. Having to catch an exception would be a bother, and usually programmers are too lazy to properly test for exactly the exception that says that an object is not found, and fails to avoid catching exceptions that actually indicate other problems.

What we find is neither approach is suitable in all conditions. Sometimes you will need a method that throws an exception, and other times you need a method that return a null. The first is used by code that has a reason to expect that the object exists, and the other is used by code that is not sure the object exists. Both situation exist in the code that is calling, not in the method implemented to receive the call.  
Rather than try to force all coding into one or the other, we need to realize that sometimes both forms need to be available.

## Naming Convention

If there are two functions that do the same thing, but differ only in how they handle failure, then those two functions should have very similar names. The names should start with the same thing, and have different endings.  
Example:

```java
function throws exception: getObjectOrFail()
function returns null: getObjectOrNull()
```

The fact is that we have a lot of methods already that do not include this convention. If there is a method “getObject” today, it might be designed to return a null or throw an exception. If you need to provide the other version, then creating a new function with the above extension is the right thing to do.  

In general, methods that lookup objects should return null. Then, the method that throws the exception should have “OrFail” on the end of the name. The “OrNull” should be used only where there exists a well known method that throws an exception if the object is not found. Otherwise, the “OrNull” is assumed as the normal case, and does not need to be specified.  

Note that a method may throw exceptions for many reasons. The “OrFail” extension is used only when the method like lookup which might or might not be done, depending upon the data that is available. There are many many methods that throw exceptions, and they should not necessarily all be marked “OrFail”.

## Advantage 1 – readability & efficiency

This naming convention will improve readibility of the code. Someone who is not familiar with the code may see the method “getObject” and not know whether it returns a null or not. If null is returned, then the code after that has to test for null. But, if the method never returns null, then the code can be written quite a bit more efficiently. Being able to distinguish this without a lot of knowledge of the function being called is a very helpful, and will catch a lot of bug.  
For example, the following code has a problem:

```java
cxt.getObjectOrNull().getRelatedObject()
```


In the call chain, because the method in the middle can return a null, that null will cause a problem at run time if it ever occurs. On the other hand, the following is completely proper and efficiently expressed as a single line:

```java
cxt.getObjectOrFail().getRelatedObject()
```


## Advantage 2 – avoid duplication of code

If there are many places in the code where an object is being retrieved, and if everyone of them needs to test for null and throw an exception, it is an acceptable duplication of code. The test for null and the throwing of the exception is only a few lines, but still it is code that is best coded once and called.

## Advantage 3 – better exception messages

When there are tens or hundreds of places doing this test, there are bound to be errors. The exception being thrown should give a good representation of the object that was not found, but too often the programmer does not take the time in all those spots. The result is very poor exception messages. If this exception is thrown from one place, written once, then a much better job of creating the exception is done, and the entire code benefits many times over.  
Nuggets

:::tip[Key Takeaway]

Put “OrNull” at the end of a method name to indicate that the method returns a null when it can not perform the operation.  

Put “OrFail” at the end of a method name to indicate that the method throws an exception when it can not perform the operation.

:::