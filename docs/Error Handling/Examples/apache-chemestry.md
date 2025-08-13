#  Catch and Continue @ Apache Chemistry

Guideline #14 is “[Never Catch and Continue](https://agiletribe.purplehillsbooks.com/2011/10/18/14-never-catch-and-continue/)” referring to the bad habit of catching an exception and then continuing processing as if nothing ever happened.  I ran across some particularly bad examples in the example code at one of the Apache projects.  This is an example of what NOT to do.  

The Adobe Chemistry project is an API for accessing CMIS repositories.  The API looks to be properly constructed at least at the basic level.  However they use particularly bad examples on the “[OpenCMIS Client API Developer's Guide](http://chemistry.apache.org/java/developing/guide.html).”  They offer this as an example of a piece of code on how to use their API:

```java
final String textFileName = "test.txt";
System.out.println("creating a simple text file, " + textFileName);
String mimetype = "text/plain; charset=UTF-8";
String content = "This is some test content.";
String filename = textFileName;
byte[] buf = null;
try {
    buf = content.getBytes("UTF-8");
} catch (UnsupportedEncodingException e) {
    e.printStackTrace();
}
ByteArrayInputStream input = new ByteArrayInputStream(buf);
ContentStream contentStream = createContentStream(filename,
        buf.length, mimetype, input);
```


In the middle you see the classic catch and continue pattern.  The getBytes method is defined to throw an Unsupported Encoding Exception when you pass in a name of an encoding that it can not recognize. IF an exception is thrown, the catch will catch it, print out a stack trace, and then continue with a null value!  The thing to remember is that if an exception was thrown, then the variable buf will not be set, and it will still be null.  The next statement constructs a ByteArrayInputStream on this null value, and the statement after that attempts to de-reference the pointer to get the length field of the object.  If the constructor does not throw an exception, this de-reference will cause a null pointer exception.

What this code achieves is the conversion of a meaningful exception (about the character encoding) into a non meaningful one (null pointer exception).   By continuing execution of the code, you risk producing multiple error messages.  Continuing to process after receiving an exception means that you continue to use of CPU time and stack memory when part of your data is missing.  This is risky because it is very difficult to predict what the following code will do in this situation.  The following code might update a persistent database with the wrong values.  To test this properly you have to cause an unexpected exception in the code, and that is exceedingly difficult.  The fact is that running this code after an exception is essentially never done, and therefor _extremely risky_ (in general) to allow to happen.  

The proper response is simply to not catch the exception.  The amazing thing is that that is all it takes.  Just simply don't put the catch block there.  The exception will stop the execution of the code, and nothing after that will be run.  At the rootmost level of the code, catch and print the exception (after all the rest of the processing has been skipped and all risk avoided).  You get an accurate error message of what happened, and you do not get a slew of bogus error messages that were caused by continuing with the null value.  

I suspect that this gets added because the method was not declared with throws Exception.  That is also a bad practice.  Get over that, and declare the method with **throws Exception**.  

In this case, however, UTF-8 is always supported.  UTF-8 is a basic Unicode encoding, and Java is based on Unicode characters, so it is literally not possible that an exception will be thrown.  You might say this is unimportant, but the example code uses this pattern elsewhere.  Consider this case further down on the page:

```java
doc2.setContentStream(contentStream, true);
// did it work?
try {
    content = getContentAsString(doc2.getContentStream());
} catch (IOException e) {
    e.printStackTrace();
}
System.out.println("Contents are: " + content);
```

This is another example of the same sloppy pattern:  The IOException is caught, and then processing continues without the value it was supposed to fetch as if the exception never happened!   The content variable has NOT been set, and so the println statement is manipulating a value that has no meaning.  

What is the value in continuing the processing when your data is missing?  There is no value in this at all.  It is simply a sloppy programming practice from a developer who did not think through the consequences of continuing the processing after catching an exception.  

Even though these are examples, they should not be there.  The try/catch structure should simply be removed from the examples.  They add nothing to the explanation except introducing and encouraging a bad coding practice.  There is no need for them.  Simply let the Exception stop the processing if it occurs.  There is no need to continue processing after an exception, and so these structures are no only noise, they actually detract from the lesson.  

Consider for example their sample program ( [GettingStarted.java](https://svn.apache.org/repos/asf/chemistry/opencmis/trunk/chemistry-opencmis-samples/chemistry-opencmis-getting-started/src/main/java/org/apache/chemistry/opencmis/doc/GettingStarted.java) ) and do a quick search on the page for “catch”.  You will find many of these catch and continue examples, corrupting the data, and then re-using the corrupted data for later example.  It is shocking.  

I am worried that the code inside the module may be written in the same manner, and that would be bad.  If true, then when using this module, I would have no assurance that Exceptions would be quickly and effectively delivered to my code that is calling the API.  This is pure speculation, but the authors of this page clearly think that [Catch & Continue](https://agiletribe.purplehillsbooks.com/2011/10/18/14-never-catch-and-continue/) is a good idea.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [errors](https://agiletribe.purplehillsbooks.com/tag/errors/), [exceptions](https://agiletribe.purplehillsbooks.com/tag/exceptions/), [program logic error](https://agiletribe.purplehillsbooks.com/tag/program-logic-error/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2013/02/20/catch-and-continue-apache-chemistry/ "Permalink to Catch and Continue @ Apache Chemistry").