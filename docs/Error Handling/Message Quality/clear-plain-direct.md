---
  title: Clear, Plain, Direct
---
#  Error Message should be clear, plain, and direct

This post is about a real error message I received and puzzled through.  Luckily, because I was working with open source code, I was able to see a copy of the source, and only then did I understand what the message meant.  An error message should not require you to know and understand the source, in order to understand the message, and I think this is the root of the mistake that many programmers make.

## Setting

I have some code that can retrieve a document using WebDAV, and it does so using an Apache library for WebDAV support.  For testing, I have typically used some documents stored at Google Code, which can be accessed with WebDAV.  Actually, they are in a SVN repository, but SVN uses WebDAV protocol.  
Today I was testing to see if everything worked.  Took the URL for the documents, plugged into the code, but it didn’t work.  Instead I got the following error message:

```
Unable to access WebDAV resource (https://sciencemoodle.googlecode.com/svn/trunk/) with user (xxx@yyy.oib.com).
org.apache.commons.httpclient.URIException: wrong class use
```

The first one is the containing error from my code, explaining the context, that the code had tried to access a specific WebDAV resource, using a specific user (that often matters) and failed.  The second one is the detailed error message from the WebDAV library itself.

## What does this error message tell you?

The URIException object is used for many different errors.  The only real clue to the problem is “**wrong class use**” and I know from the exception object that it is going to be something about the URI.  

The test of a good error message is: does it give you the information to resolve the problem.  In this case, there actually is a coding error.  Does the message give you a clue to the problem?  

Any class might be used “wrongly”.  That really is not very specific.  Does it mean that there is another class that might be used?  Or that this class might be used differently?  What class is it that is being used wrongly?  It is not the URIException class of course, but some other class we don’t know which one. 

This message actually strikes me as a bit arrogant.  All it says is “wrong class use” like “Every kindergartner should know that this class can not be used in this situation, but here I am including code to warn brainless people that they are using this class in a ridiculous situation that it clearly was not designed to be used in.”  OK, I am reading too much into this, and maybe a bit too sensitive today, but you get my meaning: the error message assumes that you already know what you are not supposed to do, and so does not even try to include details about the actual problem.  

I always stress that programmers should remember two things: (1) remember that people who receive these error messages do not generally have any experience with the details of the code doing the throwing.  They might be familiar with the API, which could be many levels below this.  Furthermore, this may be thrown from a library that is used by a library, and may not even know the public API for this particular library.  The second thing is (2) simply include the detail of the specific test that failed.  Why did this code conclude that the “wrong class use” was committed?

## The Source Code

So I searched the open source for the org.apache.commons.httpclient package for the words “wrong class use” and found the following routine:

```
410 public static final char[] DEFAULT_SCHEME = { 'h', 't', 't', 'p' };
...
826 protected void checkValid() throws URIException {
827   // could be explicit protocol or undefined.
828   if (!(equals(_scheme, DEFAULT_SCHEME) || _scheme == null)) {
829     throw new URIException(PARSING, "wrong class use");
830   }
831 }
```


The actual problem is that Google has switched since the last time to using “https” for access to the WebDAV repositories.  Last time I tested it must have been “http”.  I could only learn this by looking at the source code.  The test was to compare the scheme to ‘http’, but the error message says _nothing_ about this!  Instead, the error message is almost meaningless and gives you no indication of the real problem.  Instead, the error message jumps to some conclusion that is entirely different from the test performed, and then fails even to provide sufficient detail about that (invalid) conclusion.

## This is easily improved

Here are some simple error messages that are better than the one provided:

```
Unable to validate that URI

HttpClient only supports a URI with the ‘http’ scheme.

Unable to validate that URI.  The scheme must be ‘http’ but this URI has a scheme of {$0}

Unable to validate that URI.  The scheme must be ‘http’ but this URI has a scheme of {$0}  
      Generally you need a different handler class for each URL scheme.
```

The method is called “checkValid” so this is clearly doing what the programmer thought was a validity check on the URI.  At the very least, the programmer could have put that the URI was invalid.  Putting “wrong class use” is a gross supposition by the programmer.  It implies a lot of suppositions that the programmer has made about how the hosting code might use using, particularly the assumption that there will be a particular scheme and that this class HttpClient will only be used with the ‘http’ scheme.  Of course, this is actually quite shortsighted because most of us would assume that an HttpClient would handle ‘https’ as well.  I am not criticising the code for only handling one type of http — you can’t handle everything in every piece of code — but rather the assumption that the programmer makes that if the scheme is anything other than ‘http’ they the host program is simply doing something (obviously) wrong. 

In fact, the only thing that this routine really knows is that it tests for the scheme to be “http” and the scheme is something else.  How hard would it be to mention “http” in the error message?  That is a straightforward description of the problem: the code expects “http” and this URI simply does not have it.  That is the problem – so simply make the error message report that problem.  

How hard would it be to give the calling program the erroneous value.  This code only accepts ‘http’ — that is fine — but there may be many many example pieces of data that are being processed.  Which one caused the problem.  Instead of just saying that it required ‘http’ it is very useful to include the value that did not match.  In this case it would have been ‘https’ and that would have made the message bvery clear to me.  If you look a the error message that my program produced, it included the URL and the user name in it, just in case something was wrong with the URL or the user name.  When writing the program, you don’t know in advance what exactly will be the cause of the problem, but including all the possible pieces of problem data will help. In this case, we know that the scheme is NOT ‘http’ so why not include what it is so that the calling programmer has a clue?  

The programmer who wrote might know that “wrong class use” means that a protocol other than “http” was used, but how is anyone no familiar with the source supposed to know this?  Without knowing the source code, it is impossible to decipher the meaning of this error message.

## How hard is it to do this right?

The point is, simply throw an error message that describes the real test that was performed, and the real failure that occurred.   How hard is that?   It is trivial to simply describe the actual test performed and why it failed.  There is really is no excuse for these kinds of sloppy error messages.