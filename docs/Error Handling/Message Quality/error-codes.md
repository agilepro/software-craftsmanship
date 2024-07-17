# Why Error Codes?

We know that a good error message should contain a spoken language statement explaining the problem that was encountered including detailed relevant data values.  Many programmers feel that it should also contain an **error code** and we are going to explore whether that is needed or not.  

:::tip[Key Takeaway]

An error code number associated with an error message is meaningful only if there is a specific well defined action that the recipient should do in response to the error code.  Otherwise the error code is meaningless.

:::

## Setting

I often see programs that define things like the following:

| Code  | Message   |
|-------|-----------|
| 100   | Unable to read file %s |
| 101   | Unable to connect to DB |
| 102   | Account %s does not exist. |
| 103   | Account %s had been locked. |

The error messages explain what the problem was, and the `%s` parameters are filled with details that help as well.  That is usually the best guidance on how the user might rectify the situation.

Associated with each message is a **code** value, often a number, but sometimes a short cryptic string.  What use is this error code?

## History

Long long ago, back in the days of the [IBM 360](https://en.wikipedia.org/wiki/IBM_System/360), space was very limited.  When an error occurred, the best the program could do is to send an integer code to indicate what happened.  It could have been 3 to 6 digits long, like "711015".  You would look that number up in the documentation to see what this code meant.  Programming an entire English sentence into the code would have been outrageously expensive.  Memory cost $1 per byte, so you can understand the need to save space.  Often the message records were of fixed size and format, and so only space for a numeric error code. There was no room for anything else.

Later programming techniques improved while memory got cheaper.  The error codes were generated and then used to look automatically look up a spoken language message from a table for display.  The error code was literally the index into the string table.  The table could be in French, German, or whatever so it was translatable.

Today, putting long strings of text in the code is no cost at all.  The English language text is unique, and so that can be used to find the French or German equivalent in a hash table.  There is no longer a need for a code.  But the habit persists.

## HTTP

The most famous error return code is the HTTP status code.  200 means success.  404 means the requested resource can't be found.  There are several dozen values, but 4 or 5 dominate most of the implementations.

These codes imply very specific things that the caller should do.  For instance 404 means to give up and stop calling because the resource is authoritatively not there.  Code 301 means that the resource has moved to a new address, and you should update your records.  Code 401 says you are not authorized, and that usually implies that you need to log in and try again.  Of course, 200 means it is all fine and what you received is the latest.

It is not just that these code communicate a status, but that there is a certain expectations for **what the client must do in response**. 

Think about it: there are thousand of possible things that could go wrong, but a couple dozen codes represent them, not because they are specific to the thing that went wrong, but because there are only a couple dozen different things you might expect the client to do.

For example an HTTP code 415 (Unsupported media type) says that the resource is there, but it is in a different format, and can not translate it.  The caller might decide to ask for the same in a different media type.

What the HTTP status code does is to **classify** all the errors into categories that the client might be able to automatically respond to.

## Do you need an Error Code?

Let's assume that the spoken language error message is already telling the user what do to.  Let's also assume that by default the client will somehow present this error message to the user: it might be a screen display or it might be recorded in the log but somehow at a minimum the user can get this message.

What possible additional benefit could you get from an error code?  The answer is automation.  If you believe that the client should do something specific in response to that error code, and that something might be automated, then use an error code to indicate what might be done.

The practice though is to simply make a unique error code for every exception type.  A failure to read a file is one code, and an account closed is another.  It us unlikely that the client can automatically do anything in either of these cases.  If a file is missing or corrupted, there is little the client can do about it.  The account closed is also usually a terminal failure in most cases; automatically reopening an account is not normally desired.

HTTP codes work because HTTP is a very low level thing.  It involves a request for data, and the response.  If the failure is that the user is not logged in, then it might pop up a login prompt.  As we build on top of HTTP, the request get more specific and more complicated, and the error are also more complex.  Complicated errors are unlikely to be automatically compensated in any way.

It is worth sitting down with your error messages, and for each ask the question: "what can the client program automatically do about this situation?"  Can it be automated to change the request and try again?  Or can another request be made to resolve the situation, and allow the call to succeed the next time.  If you can't come up with a specific remediation that the client program should do, then it is unlikely that the error code will be of any use.

## Strategy

Some coding guidelines recall the old days: every error needs an error code full stop.  I have found that it is easier to code in the error code than it is to argue that they are not needed.

The codes might be a string or a number. I strongly recommend a string since the string value like "FILE_READ_FAIL" is much more meaningful than "911307".   99% of all such error code values will never be used to automate a response.

Some argue that the uniqueness of the code allows for an easy search of a log file for all similar errors.  It should also be the case that the spoken language message be unique so one should be able to search for that as well.

What makes it hard to argue that error codes are useless is that nobody has a well thought out strategy for exactly how the client will handle the error.  They just define the code in hope that it might be useful.

## Homework

Take a look at your current inventory of software.  What codes are returned, and what if anything is the client instructed to do in response?  Probably nothing.  Can you imagine any automated response?  Other than display the error message to the human running the program, is there really anything else that can be done in response to each error code?

