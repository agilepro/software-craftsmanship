---
  title: Converting to String
---
#  Never Convert Exception to String before Display Time

Proper handling of exceptions means that you keep it as an Exception object through all processes, particularly wrapping with another exception.  A common error I see programmers doing is to convert the Exception to a String and use that as part of a new Exception for rethrowing.  Don't do this.  Preserve the Exception as an object until you are ready to display it to the user.  

I have already covered details of exception handling in “[#3 Exception Catch Blocks](https://agiletribe.purplehillsbooks.com/2011/10/01/3-exception-catch-blocks/)“. In there, it will be common in routines at certain levels to catch an exception, and wrap that with another exception and throw the wrapper.  The wrapper will contain inside of it the original exception.  Ultimately when it comes time to display the error message to the user, the entire chain of exceptions is converted into a string form that can be displayed.

## Bad Form

The following code is an example of how NOT to create that wrapped exception:

```java
catch (Exception e) {
    throw MyException.newBasic("Detailed description of context. %s", e.toString());
}
```

The problem here that the exception is converted to a string, and then concatenated onto the description of the context for the problem. Here are the problems with converting to a string:

*   You lose all the stack trace information.  Preserving the exception as an object retains the stack trace and gives the option of displaying a full stack trace to the user later on.
*   If the exception was translatable, it gets “fixed” into a single language value based on the local of the runtime environment, and not necessarily based on the local of the actual user.
*   The two errors are concatenated into a single string, and it is not clear that this occurred at a combination of two places.  It is convenient in the final output to put these two different messages on different lines, but you can't do that if they are combined into a single line.

## Acceptable Form

The corrected code would be like this:

```java
catch (Exception e) {
    throw MyException.newWrap("Detailed description of context.", e);
}
```


Not a lot different to type, but a huge difference in the capability.  Wrapping the exception object retains all the capabilities of the original object: stack trace, error number, identity, and (if the exception supports it) translatability.  When you call “toString” on an exception, you lose a lot of capability. There is absolutely no advantage to doing this at this point.

*   Converting the exception to a string will lose any localization of error message that might be possible
*   You lose the stack trace
*   I have worked on systems where Exception objects were converted into an XML form for returning as a response to a web service call.  Again, converting to a string looses much of the ability to express the original exception in the XML or other serialized format for returning error information to a caller.
*   It does perform some unnecessary string manipulations, although this should not be a significant source of performance problems in any case.

Consider this booklet on exception handling:  [Articulate Error Handling](http://www.lulu.com/product/paperback/articulate-error-handling/2612130)

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [exceptions](https://agiletribe.purplehillsbooks.com/tag/exceptions/), [Java](https://agiletribe.purplehillsbooks.com/tag/java/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/12/20/never-convert-exception-to-string-before-display-time/ "Permalink to #25 Never Convert Exception to String before Display Time").