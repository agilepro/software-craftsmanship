#  Exceptions Speak about the Context they are Thrown From

Programmers often make the mistake of assuming that an exception being caught will be an exception that they have seen during testing.  Programmers often underestimate the large variety of exceptions that might occur.  Based on this misunderstanding, programmers will make poor assumptions about what exceptional situation might be occurring, and then jump to an invalid conclusion about the problem the code has encountered, and as a result produce a poor, inaccurate error message. This can easily be avoided if you understand proper usage of exceptions.

The easiest way to explain this is by comparing an incorrect and correct examples.  
**Incorrect Example:**

```java
public void methodX() {
    try {
        methodY();
    }
    catch (Exception e) {
        throw new Exception("Could not do methodY", e);
    }
}
```

**Correct Example:**

```java
public void methodX() {
    try {
        methodY();
    }
    catch (Exception e) {
        throw new Exception("Could not do methodX", e);
    }
}
```

Simply put: an exception thrown from methodX should explain that methodX failed, and possibly additional detail about the parameters that were passed in and other elements of the context that methodX is running in.  An exception from methodX should not explain that methodY failed beacuse that is explained by the exception that was caught.  The code within methodX does not have any real knowledge about what went wrong in methodY, and should not make unjustified assumptions causing misleading messages.  

Let me explain why.  The exception is being thrown from methodX, so we know for sure that methodX is not able to accomplish it’s stated goal.  Thus it is clear and accurate to report in the exception that methodX is failing.  In a more elaborate example, you might many reasons that an exception is thrown.  Consider this case:

```java
public void methodX(String s) {
    if (s.length()<=5) {
        throw new Exception("methodX requires a string longer than 5 characters);
    }
    try {
        methodY();
    }
    catch (Exception e) {
        throw new Exception("Could not do methodX", e);
    }
}
```


The string length restriction is a real problem which is tested directly in the IF statement.  In this case we know exactly why the methodX is failing, and that is because a value was sent in that was too short.  The exception lets the caller know why methodX failed, and also gives a clue about how to prevent this sort of problem in the future.  

However, in the case of the caught exception, we really don’t know what caused methodY to fail.  Actually, we do know something, and that is delivered in the exception object.  That exception object that methodY produced should contain a description of why methodY failed.  The only thing we can do is to include the exception into the new exception. Making a guess as to what caused methodY to fail would be foolish.   Making an error like “methodY does not have enough memory” might be right sometimes, but it is not right in all times, and those times that it is wrong the message is misleading.  This practice of jumping to conclusion about what went wrong in the called code is the source of many bad error messages.

## Live Example

Here is a real live example taking from the Apache Chemistry project:

```java
public static String quoteURIPathComponent(String s, boolean quoteSlash) {
    if (s.length() == 0) {
        return s;
    }
    // reuse the URI class which knows a lot about escaping
    URI uri;
    try {
        // fake scheme so that a colon is not mistaken as a scheme
        uri = new URI("x", s, null);
    } catch (Exception e) {
        throw new Exception("Illegal characters in: " + s, e);
    }
    String r = uri.toASCIIString().substring(2); // remove x:
    // quote some additional reserved characters to be safe
    for (char c : RFC7232_RESERVED) {
        if (r.indexOf(c) >= 0) {
            r = r.replace("" + c, "%" + Integer.toHexString(c));
        }
    }
    if (quoteSlash && r.indexOf('/') >= 0) {
        r = r.replace("/", "%2F");
    }
    return r;
}
```

The exception in the middle speaks about the wrong thing.  It says, with some authority, that the parameter ‘s’ has some illegal characters in it.  But this code has no way of knowing this!   Any sort of exception could have been thrown.  For example, the “new URI” might have run into a class loader problem, because the class is missing or corrupted.  The exception thrown will report that it is not able to load a particular class.  This method will then explain that ‘s’ has illegal characters even when there is nothing wrong with ‘s’!   The programmer’s assumption that the problem is with characters in the string is not justified.  That programmer may have seen dozens or hundreds of exceptions confirming their conclusion, but that does not make it right. There is a large number of exceptions that might come out, and assuming that one particular exception will arrive is foolish and a poor way to code. 

There is no situation where this message is useful!  If the problem really is that the string ‘s’ has illegal characters, that should be part of the exception that comes out of the URI constructor.  The URI constructor might have a message that actually tells you what character was invalid.  So explaining in this method that the string had “illegal characters” was not only wrong in many cases, in those cases where it was right it was redundant.  
This exception should simply be:

```java
throw new Exception("Unable to quoteURIPathComponent on the value: "+s, e);
```

This message does two things.  It clearly states that the quoteURIPathComponent method was not able to do its job.  It also includes a copy of the value that might be causing the offending problem.  We can not know for sure that s had anything to do with the problem, but it costs very little to include it, and it might help the user solve the problem.

## Nuggets

:::tip[Key Takeaways]

Never jump to conclusions about the kind of exception that might be thrown from a method.  Always assume that you have no way to know what exception might be coming out.  

Write the code so that it handles all cases, even the most obscure exception possible.

:::