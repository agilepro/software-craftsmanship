#  Ultimate Java Exception Class

This is the third in a series about translatable exceptions (see [Translatable Error Messages](https://agiletribe.purplehillsbooks.com/2019/01/05/translatable-error-messages/)).  This post is about the class JSONException which contains the required features.




## Requirements
F:\GitHub\software-craftsmanship\docs\Coding\checked-exceptions.md
The java class must:

*   Extend java.lang.RuntimeException so that is can be used anywhere an exception can be used and functions as an [unchecked exception](../../Coding/checked-exceptions).
*   Have the ability to chain together, each exception carrying a ’cause’ exception
*   Has templates and a variable number of parameter data values to substitute in to explain the problem to allow localization.  (See [Translatable Error Messages](https://agiletribe.purplehillsbooks.com/2019/01/05/translatable-error-messages/) )
*   Has constructors with variable parameters to make it easy to construct with the template and parameters (See [Variable Arguments for Messages](https://agiletribe.purplehillsbooks.com/2019/01/07/variable-arguments-for-messages/) )
*   Can be serialized to JSON together with other exception classes that might be in the chain. (See [JSON Translatable Error Messages](https://agiletribe.purplehillsbooks.com/2019/01/06/json-translatable-error-messages/) )
*   A method to convert JSON representation back to a chain of exception objects. (See [Exception Receiving](https://agiletribe.purplehillsbooks.com/2019/01/08/exception-receiving/) )

The class is called JSONException and it is available as open source at GitHub.  See the source with this link:  [JSONException source](https://github.com/agilepro/mendocino/blob/master/src/com/purplehillsbooks/json/JSONException.java).  
You can access the documentation at: [JSONException documentation](http://purplehillsbooks.com/purpleDoc/com/purplehillsbooks/json/JSONException.html).

## Constructors

There are two static methods for construction:

```java
MyException.newBasic( template, param0, param1, ... )
MyException.newWrap( template, cause, param0, param1, ... )
```

The basic constructor is used when the test for the error is a condition in that method.  This is the original error and should include details about the current method that failed to work, and parameters to that method that are likely to be part of understanding what specifically went wrong.  All the parameters are optional so there might be no errors.

The wrap constructor is used in code blocks where an exception has been caught, and you want to add more information to it.  The `cause` parameter is the exception that was caught and is being wrapped.  The template and the parameters define the context of the method that it was caught in, to the extent that detail would be relevant to understanding what went wrong.

## Streaming as JSON

The exception objects can be converted to JSON using the following static method:

```java
JSONObject convertToJSON(Throwable e, String context)
```


Note that this method takes any throwable object and converts it.  It also follows the chain of cause links, converting the entire chain into a JSON error object to send back as the response to a web service request that went wrong.

## Receiving and Throwing

There is a static method that takes a JSONObject, and converts it, as best possible, back to a chain of exception objects which can then be thrown.

```java
MyException convertJSONToException(JSONObject error);
```


## Tracing to Log

Some convenient method are provided that make it easy to write exceptions to the log file after converting to JSON.  Once you are used to the JSON format it is reasonable to want to see that format everywhere for consistency and to make it easy to debug a chain of web service calls.

```java
void traceConvertedException(PrintStream out, JSONObject errOb)
void traceConvertedException(Writer w, JSONObject errOb) 
JSONObject traceException(PrintStream out, Throwable e, String context)
JSONObject traceException(Throwable e, String context)
JSONObject traceException(Writer w, Throwable e, String context)
```


## Open Source

:::warning

This blog was originally written based on the Purple library exception class.  But the advice has changed, and the exception class in that library can no longer be counted to include all of these guidelines.

:::

The class is freely available for use as part of the Purple Hills Books utility library.   You can pull the source from GitHub, or else you can download a jar file from [http://purplehillsbooks.com/dist/purple/](http://purplehillsbooks.com/dist/purple/)  
If you find any problems, please report as an issue on GitHub.