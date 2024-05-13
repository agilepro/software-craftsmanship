#  Pragmatic Exception Handling

If you already know the requirements and best practices for exception handling and error reporting, this post talks about some convenient guidelines to follow to make it easier to comply with the rules.  

## Prefer Exceptions over Log Trace Statement

As long as you are in a catch block, use the exception object for all reporting to the user / administrator on failure situations. It can be tempting to put some system out trace statements in. There is nothing fundamentally wrong about making trace statements in the handling of an error but trace statements go to the log which is available to few people. Consider instead putting the message into the exception chain itself. Then, it will be captured, preserved, and delivered to people who need to know this.  
A programmer provided the following block:

```java
catch (Exception e) {
    System.out.println("Unable to read parameters");
    throw e;
}

```


That statement about the problem will go into the log, but it will NOT necessarily appear in the same log file with the exception object, it will not be delivered to the user, and there is not necessarily any context in the log that explains what parameters it is talking about.  
It is just as easy to write the following:

```java
catch (Exception e) {
    throw new Exception("System init is unable to read parameters from "
        +paramFile+" for user "+currentUser, e);
}

```


First, the message is imporoved to give more information about the specific situation. What part of the system is failing, and what parameters are you talking about, and who is this being done for. The data values yuo include depend on the method that is doing the throwing, and you should include whatever specific are readily available in that method, so that the receiver of the message has a clue about where this was thrown from.

But the main point of this post is to say that it is far inferior to log this to the system out log file. It is far superior, and just as easy, to construct an exception object and throw that.

## Don’t duplicate Exception into Log

Another example looked like this:

```java
catch (Exception e) {
    System.out.println("File not found: "+file+", because "+e.toString());
    throw new Exception("File not found: "+file, e);
}

```


It is temping to do this as well, because: “who knows where the exception will go?” This is particularly tempting when writing in a poorly written system that did not follow the guidelines well. 

If you want to write good code, write the code assuming that exceptions are being handled correctly. If they are not, FIX the other code.

## Use the ‘Cause’ (Nested Exception) Properly

When you catch and exception, wrap, and rethrow don’t unnecessarily copy the message from the causing exception into the message for the current exception. To be specific, don’t do this:

```java
catch (Exception e) {
    throw new Exception("File not found: "+file+", because "+e, e);
}

```


The above code will convert the causing exception into a string and put it into the message of the current exception. But this statement also links the causing exception into the exception chain. Write the code assuming that exception chains are being displayed correctly to the user. Like this:

```java
catch (Exception e) {
    throw new Exception("File not found: "+file, e);
}

```


## Each program needs an exception tracer method

There is a correct place to trace the exception to the log. In a web application, that will be the place which receives the request from the browser, and sends the response. That is the appropriate place to catch the exception, stream it back to the client, and also to trace to the log file. Presumably, there is nothing lower on the stack that relates to this particular request, but that everything lower on the stack relates to all requests. 

It is not difficult to trace an exception to the log file, and so usually a programmer will just write it there. Consider instead making a single global method for tracing exceptions, and use that everywhere. This will allow you to tweak in the future exactly how the exceptions are written to the log.

## Make a method for ‘Second Exception’

In the `finally` or the `catch` clauses you might need to call a method that throws an exception. For example, you might need to close a resource that was opened in the `try` clause, and the close call might throw an exception. If it does, it will _hide_ the real exception you are processing. You can only throw one exception, and you really want to throw the main exception that you caught. So any exception that occurs during the `finally` or `catch` clauses must be ignored. The only thing you can do is to trace that ‘second exception’ to the log as best you can, but otherwise drop it on the floor.

Make a method for tracing this ‘second exception’ in a standard way, and then always use it.  

In case you were thinking that `finally` clauses are OK to throw an exception from, remember that finally is called whether you had an exception or not. In the cases where there was an exception, you need to prevent a new exception from _hiding_ the real exception. Which means that you have to catch and handle any exception in a `finally` clause as if there was already a main exception.

## Test if you are not sure

If you don’t trust the system will handle your thrown exceptions, then TEST it! Put a gratuitous throw (one that always throws an exception) into the code compile and test. The exception should be delivered to the user, and it should be recorded in the log as well. This should happen no matter where you throw the exception from. Once you have the confidence that the exception is being caught at the right spot, that the user is informed, and that the entry is in the log, you can then confidently use the exception mechanism properly.

```java
throw new Exception("Testing that a throw from routine XYZ is delivered to "
   + "the user and traced in the log file.");

```

If you find that it is not being handled properly, then get that fixed. Don’t work around this problem by putting extra trace statements to the log. Find and fix the real problem. Then delete the throw statement — don’t leave it in there commented out because you won’t need it in the future, and even if you did it would be better to write the line from scratch.