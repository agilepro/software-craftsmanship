#  #17 Program Logic Error

Not all exceptions are the same, and when writing a program, it is important to be mindful of whether the root cause of an exception is the programmer, or possibly environment or user data.  The latter type of exception can reasonably occur in a production environment, and so needs a translatable message.  But errors of the programmer can not happen in production, and thus should be handled differently.

### What is a Program Logic Error?

This is a term that I have used to describe a type of error that can only be caused by a mistake in programming.  Once all those mistakes are found and eliminated, they will never happen in production.  

An example is passing a null value to a method as a parameter that does not allow null values in.  Take for example a method to look up information about a customer.  The customer ID is passed in.  It makes no sense at all to pass a null value into this lookup function, because clearly the method can not return reasonable result for a null customer ID. Furthermore, it is reasonable to assume that the code calling will have verified that the value it is holding for the customer ID is not a null value either.  It may have gotten this value from a user input field, or it might have read a file, or any other possible sources.  But if the value it is holding is null, it is reasonable to assume that the code will not attempt further processing with a null value, because it makes no sense.  In this example situation, the method might test for whether the parameter is null, and then throw a ProgramLogicError exception.  

Once the calling code has been sorted out to check for null, and to only call for additional information when it has a non-null ID, then this exception will literally never happen in production.  The correctly constructed logic of the program prohibits the occurrence.  There is no possible user input that will cause a null to be passed as that parameter.  

This error message is intended for the programmer.  If it ever occurs during development and testing, it should be fixed and completely eliminated.  Some error messages say “I can’t handle that input: I can’t find a corresponding information”  but ProgramLogicErrors say “the program is written incorrectly.”  Once the program logic is fixed, this error will never occur.

### Why a Different Class?

If your system has internationalized exception messages, there is a significant overhead in the translation process.  Every error message can increase the translation cost by a significant factor: think about $10 for each message for each language for each release.  If an error is extremely unlikely, then this cost is not justified.  

Properly written code may have many such exception.  Approximately half of the exception messages might be in the “ProgramLogicError” category, and by properly marking these at the time of coding, translation expense can be significantly reduced.  

It is not just the translation cost that is saved.  A ProgramLogicError exception communicates that the assumptions built into the code have been violated.  This is a very different thing from simply that the routine can not handle the data.

Consider things that are not program logic errors:  The routine might not be able to handle the request, because the DB server is off line.  No amount of programming is going to prevent this situation.  Or, the customer information may not have been entered yet into the DB.  Or the user may have entered the incorrect customer ID into the form.  Or, the system may be in suspend mode for the time.  These errors are environmental or information related.  They are a completely different category from passing a null in, which when the code is written correctly will never occur.

### When are they Used?

But wait a minute: _I like methods that can handle null parameters_.  Don’t read too much into this example.  Some methods should be well behaved when a null is passed.  I am not saying here that no method should accept null values, and I am certainly not saying that in all cases passing a null value is necessarily a program logic error.  This is determined on a case by case basis.  This particular method, lookupCustomerData plays such a role that it logically makes no sense to pass a null, and there is no realistic reason that it ever should have to respond to this.  

Whether or not a particular error is a program logic exception depends upon how reasonable it is to expect it will never be violated.  It is a value judgement of the architect. It is a mechanism that can be used to communicate this judgement to the other programmers.  My recommendation is to err on the side of having more of these, than less, because they help guide the shape of the calling code.  
What other examples of program logic errors exist?:

*   Null parameter checking can often be considered a program logic error.
*   Consistency constraints often fall into this category: if an object is expected to either have two members with a specific relationship, methods might check to make sure that this relationship exists.  The expectation is that the class code will guarantee the consistency, and thus is the object is not consistent, it is a program logic error, not an environmental or informational error.
*   Data type checking.  If a method is expected to return a particular type of object, but that is not guaranteed by the signature, then a test on the resulting value might be done.  This would be a program logic error if found that the method returned the wrong type of object.  Again, once written correctly, there is no way that changed in the environment, or changes in the user input, would cause the method to return the wrong type of object.

In Java, a ProgramLogicError should:

*   Take a string parameter for the message.  The message will be written in the programmers native language (i.e. English) and this will be sufficient for programmers working on the project.
*   Does not need to nest an exception within it.  It all cases a ProgramLogicError is a test of a situation that is immediately occurring.  I can’t thikn of any situation where you would want to catch an exception in order to wrap it with a ProgramLogicError.
*   Extend RuntimeException because it should be usable in places where exception throwing is not declared.  Code should never be written to catch and handle these exception — instead, if discovered the program logic should be altered so that they never occur.
*   The error message should speak to programmers about the specific expectation that has been violated, in a manner that the programmer can respond to quickly.

:::tip[Key Takeaways]

Exceptions that are thrown can be grouped into two classes: those that might reasonably happen in production, and those that should never happen if the program is written correctly.  

A special exception class should be used to indicate the “Program Logic Error” so that programmers treat these errors swiftly and so that time is not wasted translating these messages that should never happen in production.

:::

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [exceptions](https://agiletribe.purplehillsbooks.com/tag/exceptions/), [program logic error](https://agiletribe.purplehillsbooks.com/tag/program-logic-error/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/26/17-program-logic-error/ "Permalink to #17 Program Logic Error").