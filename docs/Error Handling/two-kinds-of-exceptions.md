#  Two Kinds of Exceptions

An exception is a message from the system to the user about something that the program can not handle. There are a couple of main categories of exceptions: environmental and program logic. They warrant quite different treatment.  

See my earlier posts on exception handling ([The Purpose of Error Reporting](https://agiletribe.purplehillsbooks.com/2013/02/14/the-purpose-of-error-reporting/), [Exceptions Speak about the Context they are Thrown From](https://agiletribe.purplehillsbooks.com/2013/02/21/exceptions-speak-about-the-context-they-are-thrown-from/), and [others](https://agiletribe.purplehillsbooks.com/?s=Exceptions)) Be sure you understand that an exception is to speak to a user. The user might be a “business user” meaning anyone who is not a programmer, or it might also be the system administrator or even the programmer of the system. The business user might or might not understand the meaning of the message. If it is a problem that the business user might be able to fix, then it certainly should be understandable.  

Examples of problems that the business user might fix: “File xxx.doc can not be found” when the user has just said to import xxx.doc and the file is really named xxxx.doc. Or “Failure accessing http://mydoctor.com site” when the user has not initiated the WiFi connection. There is no way to anticipate exactly what the user will need to address the problem, so we simply try to be as informative as possible. 

These are examples of **Environmental Exceptions**, which are caused by unexpected things generally outside of the program. The problem could be that an external service (i.e. the network) is not available temporarily. Or it could be that a setting is incorrect, such as the password that the user supplied to access an online service.  

The opposite category of exceptions I call **Program Logic Errors**. For example, a method might be written to not allow a NULL to be passed as a particular parameter. Part of the expectation is that the calling program make sure that the value being passed is not NULL. Null is only one example; there are many logical conditions for consistency that are required and assumed int he building of any program. When something is found that violates these assumptions, one has to throw an exception as well. However, Program Logic Errors can not be addressed by the user. These are generally things that require the programmer to get in an fix the logic. Examples include: passing the wrong kind of parameter, wrong data type in a collection, objects are inconsistently constructed, missing fields in a hashtable or properties object, values that violate a syntax restriction, the class or system has not been initialized, things are called out of order, etc.

## So What?

The reason for calling these out, is that the quality of their message is very different. Environmental exceptions are likely to be needed even when the program is completely debugged and running perfectly. The notifications can not be eliminated. If the product is shipping in multiple languages, it is likely that they will need to be translated, in order to be friendly to the users, who actually do need to understand them. Nothing is worse than a cryptic message that just means something simple, like your hard disk is too full.  

Program Logic Errors, on the other hand, should all be found and eliminated before shipping. Ideally, there are NONE in the shipping product. They are needed mainly during development and testing. Yes it is possible that one might slip out, and end users will see it, however there is nothing they can do about the problem, so there is no strong need that they be able to understand them. They should not be vulgar, but otherwise anything the programmer can understand is sufficient.

## Avoiding Waste

These can be significant waste if you can not distinguish these two. Making an exception translatable is a large overhead. You need a consistent symbol, you need to have a translation file. Parameters need to be packaged to be inserted into templates. Some minimal documentation is needed to guide the translation effort to know what the message means and what context it is referring to, because translation will depend upon the context. This is not always done, but when it is not done, it means that the exception messages are poor and incomplete.  

Program Logic Errors do not need to be translated. They are essentially throw-away messages. They tell the programmer that a method has been called with the wrong data, or that something else needs to be called first. In this case, the exception should use a POJLE (Plain Old java.lang.Exception). This exception should simply have a string, and it is OK to use concatenation to put data values into the string, because this string does not need to be translated.  

Because of the overhead of translatable exceptions, programmers are discouraged from putting them into the code. Or if they do, there is a tremendous rise in the cost of maintaining the product for exceptions that essentially never happen.  
Programmers should be encouraged to identify program logic errors, and throw a regular java.lang.Exception object with a string that includes as many details as they can.  

In fact it is a good idea to sprinkle the code liberally with tests for assumptions and throw these simpl, lightweight exceptions. Do not make them translatable. Do not burden the programmer or the translation team. But do make them noisy. Then, if any programmer in the future wires up the logic wrong, they will see these warnings immediately. Do not punish the programmer by expecting all exceptions to be translatable. Understand how to discriminate these possibilities. Simple exceptions will address the program logic problem before they ever make it out into the real world.

:::tip[Key Takeaway]

Identify program logic errors that are only a result of the logic of the programmer, and throw lightweight exceptions that do not need translations. But do not mistake them for the real environmental exceptions that require careful wording and translation capabilities.

:::