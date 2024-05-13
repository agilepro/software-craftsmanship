#  JSON Translatable Error Messages

Second in a series on translatable exceptions, this discusses how an error message should be returned as JSON from a web-service API so that it the calling program can display the error in the right language for the user.  
The basic form for JSON exceptions is taken from an earlier blog post:  [JSON REST API – Exception Handling](https://agiletribe.purplehillsbooks.com/2015/09/16/json-rest-api-exception-handling/).  Refer to that post for the details about why it is structured like this:

```json
{
   "error": {
      "code": "400",
      "message": "main error message here",
      "details": [
         {
            "message": "Can't find property MAX_USERS",
         },
         {
            "message": "Can't read file C:/data/config.txt.",
         }
      ]
   }
}
```


The “details” member is an array, and that is where you can communicate the chain of exception objects all related by cause.  Each exception object will be mapped into a single entry in the details list.  The most important part of a details entry is the “message” field which tells what you want to tell to the user.

## Including a Template

A simple extension of this structure include a value for the template, and values for each of the parameters.   The parameters then are denoted by their parameter number: param0, param1, etc.

```json
{
   "error": {
      "code": "400",
      "message": "main error message here",
      "details": [
         {
            "template": "Can't find property {0}",
            "param0": "MAX_USERS"
         },
         {
            "template": "Can't read file {0}.",
            "param0": "C:/data/config.txt"
         }
      ]
   }
}
```


Now you have translatable templates as well as data values to put into them.

## Not Everyone Expects a Template

One challenge when designing an API is understanding the expectation of the caller.  In this exception handling, I am trying to invent a pattern that will work for any API in the future.  Any API might return an exception.  Some callers are going to be programs that are internationalized, and will expect to substitute the data values into the template.  But other callers will just display the message as received without including the data/  The danger is that they display the template itself without the data substituted, and that gives you the worst of all results.

## Sending Both

It seems that the only reliable solution that will work for all API methods — internationalized and not — is to include both the template, and the version with the data already merged.   It is a small overhead sending both, however, that seems to be worth the expense to make sure that the error message gets reliably to the user.  So the completed structure is like this:

```json
{
   "error": {
      "code": "400",
      "message": "main error message here",
      "details": [
         {
            "message": "Can't find property 'MAX_USERS'",
            "template": "Can't find property '{0}'",
            "param0": "MAX_USERS"
         },
         {
            "message": "Can't read file 'C:/data/config.txt'",
            "template": "Can't read file '{0}'",
            "param0": "C:/data/config.txt"
         }
      ]
   }
}
```


One should either read and use the message field, or you should read the template and the parameter values, but not both because they are redundant.