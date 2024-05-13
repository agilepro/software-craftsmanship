---
sidebar_position: 1
---

# Error Handling Approach

Java has support for throwing and catching exceptions, however to get the most benefit from them the programmer needs to use them effectively.  Good exception handling is a key to building robust, reliable systems. 

## TLDR -- Pattern Summary

If you don't have time to read the entire page, this section summarizes what you need to know, and is supported by details further down.  First we consider the initial throwing of an exception due to a detected error, two examples one with and one without a parameter.

```java
public BigDecimal divide( BigDecimal numerator, BigDecimal denominator ) {
    if (denominator == null) {
        throw ComponentException.newBasic("divide method needs a non-null denominator");
    }
    if (denominator == 0) {
        throw ComponentException.newBasic("Unable to divide numbers because denominator is %s", denominator.toString());
    }
    // . . . 
    // . . .
}
```

Notice:
* The exception is thrown because the method can not do what it is supposed to do. (E-1)
* The exception describes what the whole method failed to do. (E-2)
* Details about the call, such as parameters, as included in the exception where appropriate(E-3)
* No display or log is made here. Nothing is written to the log at this level. (E-5)
* The exception thrown is an untracked exception (here some assumed exception defined in the component called `ComponentException`) so it is not mentioned in the method signature. (E-4)
* This method trusts that some other part of the code with catch and display the error in some appropriate way (E-6)

The other situation you need to handle is when you call a method that is reporting an error.  For example, if you call `divide` then that error should say that you can not divide, but we need to add context of what the divide was for.  In this case you add context to the exception by wrapping and rethrowing.

```java
public boolean isDriverOverAge( int requiredAge, Object person ) {
    try {
        boolean isOver = false
        // . . . 
        // . . . 
        // . . . 
        return isOver;
    } catch (Exception e) {
        throw ComponentException.newWrap("Unable to determine if the driver %s is over age %d", 
                e, person.name, requiredAge);
    }
}
```

Here are (high level) things to notice:

* The method purpose is implemented in logic in one big try block. The return is within the try block so that we are sure all logic is complete.(E-11)
* If anything in that block fails, it goes to the catch block
* The catch block wraps and rethrows with an context exception (E-8)
* The additional context describes what the whole method failed to do and wraps the causing exception (E-2)
* Parameters include method parameter values `expected age` and `person name` so that it is specific about the situation which helps the caller identify what the problem was. (E-3)
* The catch block is for all exceptions, because you want assurance that *all* exceptions will be caught even if a code change causes the possibility of a new exception to be thrown.  All exceptions here need to be handled in exactly the same way, because there is no reason to *compensate* any specific error in this method. (E-12)
* If the error can be caught and compensated, do so in a separate catch block, but this is actually quite rare so not included in this example. 
* Nothing is written to the log at this level. (E-5)
* The exception thrown is an untracked exception so it is not mentioned in the method signature. (E-4)
* The exception class is conveniently designed to format a string with parameters following the String.format syntax. (E-14)
* The exception is not "swallowed" by failing to rethrow. (E-7)
* The exception is exceptional, and not carrying program logic information ([E-1](error-handling-items#item-e-1-exceptions-should-be-exceptional))

The hardest part about this pattern is knowing when it is appropriate to catch and wrap an exception.  Not every routine should be like this, because there are a lot of methods that are really just small parts of the same conceptual function.  Our purpose is not to reproduce the entire stack trace by mechanically adding these into every method.  Some experience is needed to know when it is appropriate to sense that the method being called is a different goal from the method calling it.  You soon get the feeling where having this clarifying context information will be useful to help the recipient understand what went wrong.

If every conceptually relevant function included this pattern, we would be well on the way to providing good error messages to recipients.


## Understanding the Purpose of an Exception

An exception should never be used to carry program data out of a method.  If the program is running correctly as designed and there are no problems with the operating environment, then the program should never throw exceptions.  All return values should be return values.  An exception throw should not be part of normal program behavior.  Exceptions should be exceptional.  

However exceptions do carry information about the problem encountered.  When a method or a program is unable to complete its goal, then it should report with as much detail as possible what it was not able to do.  If the method was supposed to read a file, and it could not do so, it should report "Can't read file %s".   If a method is supposed to evaluate an expression, and it fails, then it should report "Unable to evaluate expression" and possibly explain what expression it was that failed.

That is pretty easy to understand, but let me stress this with a second paragraph.  The method should not report that something else failed.  The method should not simply guess or assume what the problem is, and report that.  I have seen methods that as supposed to read a file, and when they can't they report "the drive is off-line" when the method actually has no proof of that.  The programmer ran into one situation where the drive was off line, assumed that was the only possible reason for failure, and reported that.  This leads to bad error messages, so stick to the rule: report in your exception that the method did not achieve its goal, being as specific as possible about the goal. 

Reference: [Bloch: Exception Handling](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch10.xhtml#:-:text=Item%2069)

Additional Detail: [Gathering Error Report Information](https://agiletribe.purplehillsbooks.com/2013/02/15/gathering-error-report-information/)

## Reduce Support Costs & Increase Customer Satisfaction

A well written program will fail when something about the environment is not right, and the exception is the way to communicate the problem to the caller.  9 times our of 10, if the caller is given accurate information about what went wrong, they will be able to fix the problem without calling support.

The purpose of error reporting is then help solve the problem that caused the error. Recipients might solve the problem themselves, or they might pass the error report on to the support department. The contents of the error should:

* clearly explain the problem that the program experienced, and
* be complete enough that the information needed to solve the problem is there.

If the error message does not include enough information to solve the problem, then it has _failed_.  If the caller has to call support, then the error message has _failed_.  If multiple people have to spend time to understand what the error message means, it has _failed_.

A “problem” is simply a situation that the program is not able to handle.  The program was designed to handle a wide variety of normal, expected situations.  Anything that falls outside of these normal situations is a problem.  Anything outside of the normal path is an exception.

This matches nicely with the programming concept of an Exception which is a programming language feature that not only stops the program operation, but also carries a message.  The exception is the right mechanism to communicate error reports to the recipient.  

Additional Detail: [The Purpose of Error Reporting](https://agiletribe.purplehillsbooks.com/2013/02/14/the-purpose-of-error-reporting/)

## RulesLab Heritage

RulesLab aims to create a decision service that is **self-service**.   To do so, we need precise, clear, and actionable error messages returned to the recipient.  Following this practice has allowed the RulesLab authoring environment to be deployed and successfully used with astonishing little time spent support it.  When a user does the wrong thing, a clear error message explains what the system was not able to do.  9 times out of 10 the recipient can correct the request without having to call anyone else.

Error messages are part of every user experience, but too often these messages are poor, cryptic, and insulting.   Too often programmers do a half-hearted attempt at writing error messages, mostly because they mistakenly assume that recipients will never see them.  Too often programmers misunderstand the potential that results from writing correct error messages.  Error messages can be the key to usability.  Error messages can help train users, and guide administrators.  

It turns out that using exceptions effectively is a way to carry important information to the recipient, allowing a clear and precise error message to be displayed.  Remember that there are multiple recipients of the error; not just the user that caused the error, but also all of the coworkers and developers that are called into help out.  A good error message helps all these. 

Additional Detail: [Gathering Error Report Information](https://agiletribe.purplehillsbooks.com/2013/02/15/gathering-error-report-information/)

## Just in Time Documentation

Raise your hand if you have had to support a customer who didn't read and internalize the complete documentation.   Everyone?  These are complex systems, and there are a lot of special details to know.  Can I use file X in situation Y?  Sometimes that is hard to determine purely from the documentation.

The problem of documenting is greatly reduced if the error messages are accurate.  There can be a combination of conditions that are not obvious:  when a particular configuration is chosen, and then if you do particular operations, there can be a necessary but non-obvious condition, and documenting all these special cases can make documentation onerous to read.   Instead, make a clear error message, that is wrapped in a clear explanation of the context, and the recipient is delivered the right information at the time they need it, so they can respond and correct the problem.

Resist the temptation to return just an *error code* which must then be looked up in a reference manual to know what it means.  Whatever explanation you wanted to put into the manual can be put directly into the exception throw and displayed directly to the user, eliminating a cryptic and bothersome additional step to access the details.  Documenting directly in the code is easier to maintain accuracy when the code changes, and avoids the problem with out-of-date documentation.

## Collect Information Completely, but Display Judiciously

99% of these guidelines are about collecting correct and complete information about an error that just happened.  That does **not** mean everything is dumped to every different recipient just because we have it.  The delivery to the recipient *must depend on the needs* of that recipient.  The **root level error handler** is the one place that decides what to deliver to a recipient depending on the situation.  All the code in the project should help create a correct and complete report of what went wrong, so that the root level handler has everything it needs to deliver the correct amount for each recipient. 

Remember that there are different classes of recipients.  

* Project Developers: generally we will record everything in the log including a stack trace.  Most of the benefit of an accurate message is realized by developers of the project itself, because an accurate error message makes it quick to find problems and easy to fix.
* API Callers:  Will not get the stack trace, but still benefit from the complete text description of what went wrong.  It is common for an API to be called incorrectly with incorrect data.  The more the API can return about why that data is incorrect, the faster they will find the problem, and the more likely they can fix it on their own.  Making them call the development team to get the detailed error wastes the time of multiple people.  For example, we are expecting to receive DMN files from external sources, and if we find a problem with the DMN file, we want to be as specific as we can about the problem in that file.   
* Internal UI: Internal users use the system and may make mistakes.  The more we can tell them about why their request is invalid, the faster they find the problem, and fix it hopefully without needing to call for support.
* Banking End Users:  *None of this discussion should imply that these error messages are to be displayed to a banking customer.*  The user interface for banking customers and highly crafted for a specific user experience, and all possible errors and responses carefully planned.  Still, having an *accurate* internal error will always support getting an accurate crafted error display.

**Collection of error information, and deciding what to deliver are different jobs.**  Code deep within the call stack can not know what the error information will be needed.  The job of code within the stack is to simply to include as many accurate details as it can.  It is then the root level error handler that takes that information, and determines what to send to each recipient.  Different kinds of programs will return different things, in differing levels of detail.  In some cases error patterns might be analyzed to identify common problems and improve the display for those common cases according to the purpose of the program, for example selecting from the 10 details the one that is most relevant for a particular situation.

The 1% of code that represents the root error handler is not covered in these guidelines, because each situation is different.  The root error handler is one piece of code that can easily be adjusted over time to fit the need, but it depends on getting good error information from the rest (99%) of the code.  

Developer intuition is too often oriented to restricting delivery of error information.  One recent real case was the DMN upload UI.  A DMN can have many errors in it.  During upload, the DMN  validation will return a detailed message of why the DMN is invalid.  For some reason the UI designer thought that was too much detail, and crafted a generic message: "Your DMN failed to upload" telling the recipient nothing about the reason why.  This means that every time the DMN failed to upload, they had to call someone on our team to find out why.  This customer has raised an issue, now tracked by management to get a better error message displayed.  The irony is that a better error message was already available, but the Ui simply does not display it, because someone decided "they don't need to know this."   We should strive to give more complete, and more accurate error message, until the users complain that they are getting too much, and then scale it back.

These guidelines allow the code to generate accurate and complete information about an error, so that the root error handler has the information it needs to pass on a suitable response to each recipient.

## Compensating Exception -- If You Can

Most of the examples in standard Java documentation is around catching exceptions in order to compensate the exception, that is, automate the response to do something else.  The idea is that you call a method X, and method X fails, but you can do something else to compensate for that error. For example the code tries to read a file from a web service, and it fails, so it tries a second time.  Another example is if you attempt to convert what the user entered to a number, and it fails to parse, then substitute a default value instead of alerting the user.  The cases where you can compensate for an exception are quite rare.

The rule is: *if you can compensate for an exception, then do it.*  Catch the exception, and perform the compensating action, and let the program continue.

If you write a method that has an error that is expected to be compensatable, then be sure to use a special unique checked exception for that error, so that it appears in the interface, and it is easy for the calling program to catch.

But most of the time (>95% of the time) there is nothing that the calling method can do to compensate for the error.  If a method calls to read a file, and the file is corrupted, there is usually nothing to be done except report this problem to the recipient.  If the method is to read something from a DB, and the DB is off line, there is nothing else to do except report the error.  These instructions cover what to do when you can not compensate for the exception, which is most of the time.  

