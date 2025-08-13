#  Error Response from API

All the world uses REST style web services, and returns data in JSON structures, because that is the best kind of API for an interactive, responsive JavaScript based user interface that runs in a browser. What are the best practices for what to send back when the server is unable to handle the request it was given?  

A service call (also known as an API) is designed to accept some information (parameters), process them with some data store it might have, and then respond with output that meets a specified need.  

**Success** is defined as when it is able and allowed to do this.  If you ask for the average age of all customers who have visited in the last month, then success is when that is calculated correctly (according to your available data) and returned.  

**Failure** is then anything that is not success.  It could be something big, like the server crashing, or a power outage.  Maybe a bug in the code causes a null pointer exception.  Or it could be that the DB server that holds the customer data is not available at the moment.  Or it could be that the parameter specifies a store that does not exist.  Or the date range might be in the future and impossible to calculate.  Or it might simply be that the user making the request is not allowed to make this call.  Sometimes we think that a failure has to be a breakdown, but in this case it is not.  Any reason that prevents the service from responding with the correct result (that the server knows about) will be a failure.  

The response can be **incorrect** without being a failure.  If someone manipulated the data so that all values were 10x what they should be, then the service will return an answer that is 10x from what it should be.  Clearly there are incorrect results that the server can not detect.  The server will do some tests (e.g. checking that the store exists) and if a test fails, then it will be a failure.  If no test on the server shows any problem, then it will be considered a successful response.  

For this discussion, **error** and **exception** will be considered equivalent.  If the service is able to successfully handle the request and return the result, then there is no error, no exception.  If it determines that there is a problem with the request, it will say an exception occurred, and that it needs to communicate the exception (the error) to the client.

## Goals

*   This is specifically for support of a JS user interface fetching and sending data. Clearly server to server might use something else, I don't know.
*   Need to fit the style where JS works asynchronously: you make a request and register a call-back function to received the response when it is ready.
*   We want to fulfill the design goals written in “[The Purpose of Error Reporting](https://agiletribe.purplehillsbooks.com/2013/02/14/the-purpose-of-error-reporting/)“.  Specifically, we need to be able to give enough information to allow the user to resolve the problem if there is one.
*   We need to consider that an error message is not a simple short statement, as written in “[Gathering Error Report Information](https://agiletribe.purplehillsbooks.com/2013/02/15/gathering-error-report-information/).”  The system will often not know precisely how to instruct the user to resolve the situation, and so need to include detailed information along with contextual information which come from different parts of the system.  In short, you will have multiple separate messages to be taken together.
*   It must be relatively easy to construct the UI to respond to the error correctly.
*   It must fit with the infrastructure that is supporting it.  For example, if Apache web service is fronting the requests for the real server, when Apache can not understand the request, it will return a 404 error along with some HTML description.

## Basic REST Paradigm

The HTTP protocol is intimately together with the API.  It is not a matter of layering one on the other.  So when you want to get some information, you use the GET method.  When you want to upload some information, you use PUT or POST.  

The open question is: use the response code or not.  Option 1: always return 200 (everything is OK) and then in JSON envelope, have a success or error indicator.  Option 2: return 200 only on success, and return a different code on failure.  In either case, the returned data will need additional information about the problem, so clearly the return code is _not_ sufficient by itself.  

The advantage of using 200 for success, and some other value for failure, on top of the exception information is that many JS methods for making the call have different callback method for success and failure, and that depends on the return code.  There are three reasons to use this:  First, having an explicit place for a failure handler means it is harder to forget to handle the exception.  Second, it separates the code that handles the well running cases, from the code that handled the exceptional cases.  This is a good idea, since the purpose of those different codes is very different.  The Third reason is that the data that the JS receives may be of a different format.  If you are expecting JSON, and you get HTML, the next few statements that try to manipulate one as the other can cause confusing errors that point you in the wrong direction.

## JSON in, JSON out

While it is possible to make a REST web service request in any format, and receive the response in any format, it is far better to stick with JSON in both ways if you have the choice.  JSON is a well defined syntax; it faithfully represents all string data values without the XML limitation that all white space characters are equivalent; it is relatively compact; it is easily and rapidly parsed by any JS implementation; and it is supported in most other programming languages.  XML brings a lot of problems with it, like namespace aliases, unclear semantics of the white space between nested tags, and unclear data types.  You API will be far easier to use if you keep to JSON for both the request and the response.  

What about exceptions?  Your service may be designed to return a table of customer data.  In the case of an exception, you might have no customer data, but instead information about the exception.  Both may be in JSON, but their fields will be different.  You have two choices:

*   have the success response support one format, and the failure response a possibly different format
*   make an “envelope” which has members for holding the response, and for holding the exception.  On success the response field is filled in.  On failure, the exception field is filled in.

This is a tough decision.  The envelope design is clear and unambiguous, and the code for handling the exception will always find it in the same place in the envelope.  But the envelope adds some overhead, and must be introduced at the time the web service is first defined.  At least, adding an envelope later requires that all the clients of the API change.  Some programmers (and by some I mean most) do not think about exceptions until after the API is functional for a few normal situations.  Programmers don't want to change at that time.  

Returning a different JSON structure between success and failure is relatively easy to handle as long as the return code is an indicator of the format of the data.  You should certainly only have one kind of error structure for each error code returned (otherwise how could you interpret it correctly?). So it seem reasonable to define each REST API call to have a structure that it returns on success (200) and another on failure (something other than 200).

## What return code?

First we have to consider the limitations of the platform.  We may define an API to be JSON in and JSON out, but there is no guarantee that is all the JS calling code will have to handle.  For example, if the network is down, the browser will fail to connect, and you will get an error directly from the local environment, and it will not involve JSON of any structure.  If the server is up, but mis-configured so that at the basic HTTP level it can not find the service, then you are likely to get a 404 error accompanied with HTML.  If the web service is configured to only allow authorized access through, you might get a 403 and again no JSON.  

When writing client code, it will be very convenient to have a response code that does not overlap with these so that you can test the response code and be relatively safe in assuming a particular structure.   You can never be completely safe, since it all depends upon all the servers and proxy servers and firewalls that the request goes through.  However, these typically only use a few.  

Some suggest looking at the [IANA List of Standard Status Codes](http://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml) and find the best match.  In every case that I have examined closely, this would be a bad idea. By grouping errors into discrete categories, you are attempting to specify what the client should do in response.  If you know that the client should do, then this is fine.  But most errors appear to the programmer as “unexpected”.  Because of this, it is likely that the API designer does not really know what the client should do to recover.  Instead our goal is to display to the user the details of the problem.  The standard numbers are based on the concept that an error is a “simple” thing:  the disk is write protected and that the operation something really simple like “read a block of the disk”.  Real services are very complicated and involve many components.  You will never be able to categorize a failure according to a list of three digit integers. 

In fact, if you find an error response that sounds close to what your error is, you are probably doing the client a disservice.  For example, imagine the client calls your service, and you call another service, and that other service responds with 404 not found.  Do you return 404 not found?  I hope not because your service was found and handled the request just fine.  Such code values might be OK for simple operations on direct connection, but most real world web services are far more than that.  

So instead, pick an error that is “probably not” used by the network between the client and the server, and use that for ALL failures.  For example 450.  Responses to avoid are 400, 401, 403, 404, 500 and anything below 400 or above 599.  If you detect a problem that the client might be able to automatically respond to, like (busy now, call back in 5 minutes) or (need another security token to access that resource) then you can add others, but these should be special cases that are carefully considered.  The default position should be to return that one code unless there is a good reason.

## What Exception Structure?

The most common and sensible structure is something like this:

```json
{
   "error": {
      "code": "400",
      "message": "main error message here",
      "target": "approx what the error came from",
      "details": [
         {
            "code": "23-098a",
            "message": "Disk drive has frozen up again.  It needs to be replaced",
            "target": "not sure what the target is"
         }
      ],
      "innererror": {
         "trace": [ ... ],
         "context": [ ... ]
      }
   }
}

```


The response itself is an object. It has a member named “error” which is a well defined error structure. The 'details' is an array, each object in the array has a code and a message. There is an optional “innererror” that can hold a stack trace. This is structured defined by the [OASIS OData standard](http://docs.oasis-open.org/odata/odata-json-format/v4.0/errata02/os/odata-json-format-v4.0-errata02-os-complete.html#_Toc403940655). It seems to fit the need, and it is a standard, so let's use that.  

This structure can be used with the envelope approach where every response has the same top level.  It also can be used as the structure only for error response.  This member could be added into almost any object that does not already have an errors member.  

If you are using 200 as the HTTP return code in all cases, then it will be necessary to have another field to contain whether it was success or not.  I recommend a field named “success” which is true or false because this field could never mean anything else.  A field called “status” could mean any number of things.  If one is indicating error with the HTTP return code then you do not need this success field.

## Real World Examples

Twitter: There is a page on their [error codes and responses](https://dev.twitter.com/overview/api/response-codes). I found amusement in the 420 error being defined as “Enhance Your Calm” when you exceed rate limits.  Twitter defines a field “error” (which probably can be included in any regular response structure) which is an array of error objects, each object having a “code” and a “message”.  They have a separate list of code values at this level, and the documentation matches code values with HTTP response codes (in most cases).  

Stack Overflow: All responses are wrapped in a envelope.  [Error handling Page](https://api.stackexchange.com/docs/error-handling) says they always return either 200 success, or 400 failure. There are special cases where other return codes are used.  On a discussion forum someone said this: “Stack Overflow for example sends out an object with response, data and message properties. The response I believe contains true or false to indicate if the operation was successful (usually for write operations).”  

The book [Restful Web Services](https://books.google.de/books?id=XUaErakHsoAC&lpg=PP1&dq=restful+web+services&pg=PA197&hl=de#v=onepage&q=status%20code%20400&f=false) recommends using 400 for the error response in all cases.  
Facebook, like Twitter, [defines a “error” member](https://developers.facebook.com/docs/graph-api/using-graph-api/v2.4), and that is an object with code, sub-code, type, message for developer, message for user, title for user.  It looks like you could use this member in any return object, or by itself.  They did not think about multiple errors.  They seem to believe that an error code and a subcode will describe everything.  

Amazon, [defines error codes](http://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html) as strings, and maps them to HTTP response codes. Their response is XML, but it has a member “error” with the fields code, message, request id, and resource.  They don't seem to have a common envelope.  

There is a proposal to extend HTTP to include more information, but we don't need to wait for that.  It is likely to be “error code” based.  

The JSON API organization suggests to using a return code for failures, and suggests 400 might be suitable.  They recommends a top level member “errors” which is an array of objects. The error object is very detailed, but includes: id (unique for this instance), links (to explanations of the error), status (the http return code), code (application specific string value), title, detail, and some other unlikely details. 

[JSend](http://labs.omniti.com/labs/jsend) is another group trying to standardize this.  They suggest always using an envelope.  It has three members: status, data, message.  Status can be “success”, “fail”, and “error”.  A success response has status and data.  Fail, strangely, has status and data, and the data field is where the error message is returned correlated with a field name going in.  Error is, as you would expect, just status and message. 

OASIS is working on an [OData specification](http://docs.oasis-open.org/odata/odata-json-format/v4.0/errata02/os/odata-json-format-v4.0-errata02-os-complete.html#_Toc403940655) and they, like the others, define an error member which is single valued.  The object there contains code (same as http reponse), message, target (the context for the request I think) , a subobject called “details” which is an array of (code, target, message), and then a member called “innererror” which contains a stack trace and context.  

[Hypertext Application Language](http://stateless.co/hal_specification.html) (HAL) – There is a [new July 2015 version of this](https://tools.ietf.org/html/draft-kelly-json-hal-07). submitted to IETF, but there seems to be no discussion of errors in that.

## References

Supporting material from the following places:

*   [REST API error return good practices](http://stackoverflow.com/questions/942951/rest-api-error-return-good-practices) – discussion on StackOverflow
*   [Twitter](https://dev.twitter.com/overview/api/response-codes)
*   [Stack Overflow](https://api.stackexchange.com/docs/error-handling)
*   [Facebook](https://developers.facebook.com/docs/graph-api/using-graph-api/v2.4)
*   [Amazon](http://docs.aws.amazon.com/AmazonS3/latest/API/ErrorResponses.html)
*   [IETF Draft Spec for error extension](https://tools.ietf.org/html/draft-nottingham-http-problem-05)
*   [JSON API . org](http://jsonapi.org/)
*   [JSend](http://labs.omniti.com/labs/jsend)
*   [OASIS](http://docs.oasis-open.org/odata/odata-json-format/v4.0/errata02/os/odata-json-format-v4.0-errata02-os-complete.html#_Toc403940655)