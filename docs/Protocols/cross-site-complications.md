#  Cross-Site Complications

In making a simple authentication service, I ran into a myriad of strange, incomprehensible requirements that someone obviously through was a good security idea, but essentially misses the mark, has all the marks of “design by committee,” and makes everything else difficult.  I am recording them here, because this seems like the kind of thing I am going to need to refer back to.  

## Setting

We are making a lot more AngularJS client, and the client is doing a lot more integration directly in the browser.  This means that the JS client is accessing multiple servers.  This is a “cross-site-scripting” issue.  What I want is single sign on:  I launch a JS application, when then goes to an authentication server to find out who the logged in user is, and the user does not need to log in specifically for this particular application.  This way you can deploy dozens of little applications, and the user has a seamless experience.  
The very purpose of the identity server is to tell applications who you are.  I realize that all such servers don’t play this role, but it is a reasonable and perfectly safe thing to do.

## Discussion

Server A might allow download of JSAppA, and it might offer some web services that the App can call back to the server on.  Another JSAppB, might be running in the browser, and attempt to access the web services on Server A.  
Cross site: the server A might not want OTHER application (JSAppB)  to call those web services, apps that came from somewhere.  It is reasonable for the server to specify that access to the server is allowed only from applications server from the same domain.  This is already a bit sketchy, because if you really want to control the code that has access, then a non-cookie session key or something like that is more appropriate, however lets grant that there is a feature to require that any code accessing this web service be from JS that came from that same domain.  
If you are writing a server (Server C), like an identity server, or just about any collaborative server, you want to allow any access from any client program.  In this case you are offering a web service SPECIFICALLY for the purpose of different client applications to call this.  The browser jumps in to protect the server C from these requests unless you include the following HTTP header:

```
Access-Control-Allow-Origin: *
```


This says that Server C does not care about the origin of the JSApp that is running, but in fact will allow requests from ANY pages that were not sourced by this site.  This means that Server C does not have any expectation that its own JS code is the only code accessing it.  This means that it is expecting ANY call from any JS application anywhere, and it is suitably prepared to receive those calls.  The browser does not need to protect the server from those calls.  To  
With this, the browser will allow an application, JSAppA to call server C.  However, it will not include the cookies in that browser has from server C.  This is rather strange because the cookies came from Server C in the first place, and server C has already said it is accepting calls from foreign code.  Someone must have had the theory that server might have it’s own code out there that it wants cookies back from, and other code that it allows to call it, but does not want the cookies in that case.  I can’t really imagine this.  In any case, an identity server needs a login screen (regular code) as well as applications asking who is logged in.  
The browser will send the cookies if you add an attribute on the XmlHttpRequest object

```
xhr.withCredentials = true
```


The browser will only allow this if the server has set this response header:

```
Access-Control-Allow-Credentials = true
```


However, an even stranger thing happens at this point.  The browser, which was perfectly willing to recognize an asterisk to signify that this server will accept calls from any origin, will no longer recognize the asterisk as matching everything.  It is not possible to create a server C which simply allows access from all possible origins AND gets cookies as well.  Instead, you have to actually read the origin from the request, and copy it into the header:

```
Access-Control-Allow-Origin = {{copy from the Origin header in the request}}
```


This is mind boggling.  I can’t even begin to understand why the asterisk should not work.  But that is not all.  Once you have the origin copied, and the flags above set, the browser will only allow GET requests.  So you have to send this in the response header:

```
Access-Control-Allow-Methods = "GET, POST, OPTIONS"
```


This is ultra-bizarre, because if the server did not want to service POST operations, it would simply not service them.  I can’t fathom any reason that the server should tell the browser “ok, for these cases of foreign code that are giving me cookies, please make sure they don’t do any POST operations because it is really important that they don’t do a POST operation and I might fail to distinguish these.”  
But it gets even worse.  When you enable POST, the browser will only allows post of plain text, form-url encoding, or form-mime encoding.  The browser will NOT allow the POST of a JSON data.   You must, in the JS set the request header to be:

```
Content-Type = text/plain
```


and transfer the JSON anyway.  Someone, somewhere believes that JSON is a security risk, while plain text is not.  Some committee somewhere decided that even though the server has declared that it will allow access from any JS origin, that it will allow cookies, that it will allow POST, somehow it needs to be protected from getting a JSON formatted post.  The only way around this is to declare the post plain text, which actually rather breaks any convenience of having a mime type in the first place.  
But that is not all.  The browser will LIMIT the headers that are allowed to pass.  Again: if the server does not want to receive any headers, it could just ignore them.  If the header does not want to send any headers, it should just not send them.  I can’t figure any reason that you would need this setting:

```
Access-Control-Allow-Headers = "X_PingPing"
```


However, notice that these are response headers,and if the browser refuses the make the request, then it will never find out about the response headers, so the browser will make some sort of additional request first, to get the headers, and then it will cache this value.  This makes development and debugging a pain because it is not clear how long it should cache these answers.  Some people have reported that the wrong answers have been cached after restarting the browser, and possibly even after clearing the history and restarting the browser.  One suggestion for debugging is to set this:

```
Access-Control-Max-Age = 1
```


This forces the browser to check again every second to see if the settings have changed.  Probably not needed in production, but then you never know.  
Finally, to get all this to work with proxy servers, you need to set the response header:

```
Vary = "*"
```


so that the proxy servers do not return a previously cached result instead of your new result.  
If you forget any of these, you get incomprehensible error messages.  For example, when trying to make a POST operation, before you enable POST, Mozilla will give you the error:

```
"Access-Control-Allow-Origin not set correctly"
```


Actually, this has nothing to do with that value, and this misleading error message can take you down a path of trying to figure out why it is not getting the right header.  This is the same if you declare the POST to be a JSON data type, you will get this error message.  
Some of the blockage is on receipt of the result.  For example, allow credentials, if the response header is not set correctly, the request will be made, but then the call will return with a zero length response.  No error, just an empty response, making you wonder if something is wrong with the network, or elsewhere.  
The default values on all these settings are always the most disabled, as if to imply: “whoever wrote this server probably has no idea what they are doing, so we will cut off, and stop the communications, to protect them from what they can’t possible understand might hurt them.”  This was clearly designed by a committed, with individuals piping up:  “hey I have a server and I want to make sure that code that I did not write can not make a POST operation to my server.”

## Comment

This is just crazy.  I have a server that is designed to receive requests in JSON, and it will respond in JSON, to any application that wants to make this request.  Once I enable requests from JS code that I did not write, I should be able to assume that it will simply allow requests to my server.  
But instead, always make all of these settings:

```java
String origin = req.getHeader("Origin");
if (origin==null || origin.length()==0) {
    origin="*";
}
resp.setHeader("Access-Control-Allow-Origin",         origin);
resp.setHeader("Access-Control-Allow-Credentials", "true");
resp.setHeader("Access-Control-Allow-Methods",     "GET, POST, OPTIONS");
resp.setHeader("Access-Control-Allow-Headers",     "Authorization");
resp.setHeader("Access-Control-Max-Age",            "1");
resp.setHeader("Vary",       "*");

```
