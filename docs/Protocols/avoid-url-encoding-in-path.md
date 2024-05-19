---
  title: URL-Encoding REST Path
---
#  Avoid URL-Encoding REST path tokens

Standard are nice, but sometimes a misguided implementation attempting to protect people completely invalidates the benefit.  
I had the understanding that you could pass a value to a server URL encoded in the URL. For example, like this:

```
http://server:port/app/customer/{customer-name}/detail

```


This is a very common pattern in REST APIs. In the URL, you provide the customer name, URL-encoded, which eliminates any characters that would cause problems with the URL itself.  

What I found out today, is that even if you URL-encode the customer name, if that customer name has a _slash_ in it, the Apache web server, and many others will _reject_ the request returning a 404 error. Your web application will never receive the value from the browser.  

A slash is character 47 and the encoded form is %2F. While there is nothing wrong with %, or with the numeral 2 or with F in a URL path token, if these three appear in the URL in a row, this is detected and _rejected_ by the Apache and other servers like Microsoft IIS because it is considered dangerous.  

Apache has a setting to disable this protection called ‘AllowEncodedSlashes’. Turn this on, and it allows URLs with %2F to be handled, but this is not guaranteed on any other server. However, the very fact that they have this setting calls into question the entire business.

## Why Would This Exist?

Ok. My guess is that some programmers were sloppy in the past, and used encoded and unencoded values interchangeably, and in some cases got confused. Sometimes programmers will URL decode the entire URL (which makes no sense of course, but I have seen many programmers do this) and ended up unable to parse the path because (of course) new slashes appeared. Probably there were some injection problems where decoded values were put back into web pages. These are just my guesses, but it all really just points to some poor programming practices, NOT a fundamental problem with passing a URL encoded slash character.  

_We say that an encoding ‘works’ when it transmits **all** characters faithfully._  
There are reasons that some characters are restricted and have a special meaning in constructing a URL. If you want to pass data through that interface, you must guarantee that you avoid those characters, and that is what an encoding was designed to do. An encoding for which the transport looks into an forbids certain characters is no longer useful as an encoding.  

Unfortunately, the makers of the major web servers decided to look _inside_ the encoded values, and prohibit some encoded character sequences. The enormity of this is appalling.  

Who knows what characters in the future they will decide to restrict? Can you count on values being received? In my case, I had a customer with a slash in the name. How was I supposed to know that URL encoding would work on every character _except_ a slash? This is a violation of the fundamental agreement that a web server will host an application and give that application the request from the client. Jumping in and deciding that a particular value is not allowed, even though it causes no problem to the URL itself, but instead simply because the receiving application might use the value inappropriately is simply wrong.

## The Answer

In the JavaScript world of today, you need to pass data from the client to the server reliably, without having to worry whether your data values are acceptable to Apache. Apache knows about URL encoding. The only answer is to use **something else**. Anything else.  

If you have control over the client and the server, the clear design decision is to use an encoding that no other technology in the middle understands. And you had better make sure that when encoded it does not have %2F in it. I am considering plain hex encoding, but I might use base64 encoding because it is more efficient. Or simply use URL encoding with the percent character changed to something else. Or maybe I will make up an encoding that is completely non-standard.  

It is easy to make up a new encoding. Since you can’t count on URL-encoding, you might as well use ANYTHING else.

## Resources

1.  [urlencoded Forward slash is breaking URL](http://stackoverflow.com/questions/3235219/urlencoded-forward-slash-is-breaking-url)

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [characters](https://agiletribe.purplehillsbooks.com/tag/characters/), [http](https://agiletribe.purplehillsbooks.com/tag/http/), [urlencoding](https://agiletribe.purplehillsbooks.com/tag/urlencoding/), [UTF-8](https://agiletribe.purplehillsbooks.com/tag/utf-8/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2015/11/23/dont-use-url-encoding-in-rest-path-tokens/ "Permalink to Don't use URL-Encoding in REST path tokens").