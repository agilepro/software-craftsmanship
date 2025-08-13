# HTTP Return Codes

Often, the meanings of an HTTP response code as described are ambiguous and overlapping.  that is, a developer of a service can easily find themselves in a situation that matches two or more response codes.

This document specifies a precedence so that you know which rule applies before the other rules.  Something might fall into multiple categories, but the earlier one in the list defines what should be returned.


| |Step Question            | Response when false         |
|-|-------------------------|-----------------------------|
|1| Is the service running? | When the service is down: Return 503 (service not available)
|2|Is the request path included?  Does the path map into a supported path?  | If the path is missing or wrong: Return 400 (bad request) and include the path that is not supported|
|3| Is the method of the request supported for the path given?|If the method is not supported: Return 405 (method not allowed) include the method that is not supported|
|4|Is the media type of the body of the request (as specified in the header) supported?  Generally we only support JSON media type in the request, but there are a few exceptions| If request media type is not supported: Return 415 (unsupported media type) include the media type that is not supported|
|5|Is the response media type (specified in the header) supported?  Most requests return only JSON.|If response media type not supported: Return 406 (not acceptable) include the media type that is not supported|
|6|Can the request message be parsed?|If request can not be parsed, Return 400 (bad request) include detail on the syntax problem.|
|7|Are all of the data elements the right type and valid according to quality parameters in the schema?|If the data is invalid then: Return 400 (bad request) include detail on the data validation problem.|
|8|Given the data that was passed in, can you find the resources that are referenced?  There may be any number of resources needed, but if any one of them are missing, report an error.|If you can't find the requested resource: Return 404 (not found)|
|9|Does the requester have access to those resources or operations?|If not authorized: Return 403 (forbidden) include detail about the rights that would be needed to access these resources. Note: do not return 401 (unauthorized) because that is only for the gateway to do.|
|10|Does the operation requested make sense?  For example, creating a new object that already exists might not be allowed.  This will be the case any time the code decides there is a reason to not perform the operation, and thereby rejects the request.|If nonsense request: Return 409 (conflict) include detail about why this does not make sense.|
|11|Does the processing of the request fail for any other reason?  For example a call to a library returns an error, that error might be because it was a nonsense request, or because it simply is not possible to do the request.  It is not always possible to determine whether this is because of access control, network down, or other problems.|If failed to process: Return 400 (bad request) include detail about what failed to be processed|
|12|Did the process complete quickly enough?|If the processing takes too long: Return 400 (bad request) Note: do not return 504 since that is specifically for a gateway timeout.|
|13|If nothing wrong|Return 200|



* Rule 1 is handled by the basic service or the ALB.  Since the service is not running, there is nothing in the service itself that can cause this response.
* Rules 2-5 are handled by the web service framework: the common code that is usually built into the web server and handling in a generic way before getting to any custom code.
* Rule 6 might be handled by the web service framework, for example parsing JSON is commonly done in the generic code.
* Rule 7 is usually done at the very root of the handler handling the request.  
* Rules 8-11 are the bulk of the errors that the custom service code will need to generate.  They could be triggered by problems identified at any level within the code.  These need to come out of the body of the code as exceptions in order to fail the request quickly.
* Rule 12 would usually be handled by the Web Service framework
* Rule 13 of course is the standard OK response when the request succeeds, handled by the custom code.

