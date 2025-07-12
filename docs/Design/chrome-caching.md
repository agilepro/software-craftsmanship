---
id: chrome-caching
title: Caching for Chrome
tags:
- caching
- chrome browser
---

#  Caching for Chrome

One of the biggest questions I see posted on internet discussion boards is “Why didn’t Chrome get the recent file?”  By default, Chrome is more aggressive on it’s caching than either Mozilla or IE.  Here are some answers to these questions.

## Cache Management

The browser download a file and saves it locally.  Next time you need the file, it just uses the one on the disk.  But what if it has changed on the server?  Ideally, you want to use the cached file every time you can, and only want to fetch the file when it has changed, but how do you know when it has changed?   There are several mechanisms.  

The most standard mechanism, is that the browser asks the server for the file, but includes in the request a header If-Modified-Since and the date of the file in the cache.  IF the file has been modified since then, the file will be returned.  If the file has not been modified on the server, then the server returns a 304 meaning that the one in the cache is good.  If the files are large, then the headers are much smaller than the file, and this can be a significant savings.  However, the browser does need to make the request, and wait for the response on every single page load.  For a library file that is updated about once per year, this might seem overhead, but it is the best option.  

Firefox and IE implement this behavior by default, but Chrome does not.

## Chrome

The behavior on Chrome by default seems to be that once a file gets into its cache, it stays there forever. When a web page needs “angular.js” or “mystyle.css”  it looks in the cache, if it is there, it uses it.  It never asks the server if there is a newer one.  Without asking, there is no way for Chrome to know that the file is available.   This makes page loads as fast as possible, but when a new version of the site becomes available, you get a mixture of new and old files:  any new file with a new name will be retrieved, but new files with the same name will not be accessed at all.  

This depends upon what cache control directives come from the server. If you tell Chrome to revalidate cache entries, it will do so.  This is done with:

```
Cache-Control: must-revalidate
```

The Cache-Control header can have a lot of values, and this can be in a list of other values. With this header included in the response, Chrome will then make the standard request of the server with the If-Modified-Since header, and will handle the 304 response correctly.

## Servers

What I have found is that if you use Apache TomCat configured as it is out of the box, it does not send the must-revalidate values.  

There does not seem to be any direct way to set default header on all responses across the entire server.  Instead, what you have to do is to introduce a Filter, which is a block of code that will set the header dynamically on every request.   Very strange that there is no setting for default headers . . . but that seems to be the case.  You need to create a class like this:

```java
public class HeaderCorrectingFilter implements Filter {
  public void destroy() {
    //nothing to destroy
  }
  public void doFilter(ServletRequest request, ServletResponse response,
         FilterChain chain) throws IOException, ServletException {
    ((HttpServletResponse) response).setHeader("Cache-Control",
         "must-revalidate");
  }
  public void init(FilterConfig arg0) throws ServletException {
  }
}
```


and then configure the web.xml file to call this filter:

```xml
<filter>
  <filter-name>HeaderCorrectingFilter</filter-name>
  <filter-class>com.example.HeaderCorrectingFilter</filter-class>
</filter>
<filter-mapping>
  <filter-name>HeaderCorrectingFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>
```


In Apache web server you can include the following command for the server configuration:

```
Header merge Cache-Control must-revalidate
```


## Cache Control By Predicting Time

Perfect cache control would be when the file is always served from the cache with no additional network traffic right up to the point it is changed on the server, and then it fetches the new version and keeps it until the next time it changes.  If you can predict when it is going to change, then you can tell the browser how long to keep the file.  
There are a couple of headers that tell the browser how long to keep files.

```
Cache-control: max-age=xx
```


This header says that the browser can keep and reuse the file for xx seconds.  After that, it must check with the server.  
The problem is that in general it is impossible to predict when any given source file for the application will change.  If you do updates exactly once a week, then the server could instruct the browsers to keep their cached files right up until the point of the next server refresh.  But what if you have an emergency bug-fix?  What if a hacker attack is underway on a particularly library file, and you want to push the fixed library to all the users right away?  
Since you can never be certain that a file will not change for any period of time, how much risk are you willing to take with users having out-of-date files?  If a file says it is OK to cache the file for 1 hour, then you might have users running with inconsistent web pages for 59 minutes.  Is that OK?  How likely is that?  Does it happen once a year?  how many users do you have?  
Different kinds of files have different risks.

*   It is relatively harmless for an image used as an icon to be out of date.
*   It can be very bad for a JavaScript file to be out of date.  One always tries to make changes to JavaScript that is contained in one file, but occasionally a change in one JavaScript file necessitates a change in another file.  If you get the new version of one, and the old version of the other, they could produce an ugly error message, or worse.
*   CSS files fall in between these.  If a new CSS class is used in the page, and the CSS is out of date, the display can be pretty messed up, but most of the time a CSS change does not cause a problem if it is delivered slightly earlier or later.

If you look at user behavior, there might still be some benefit.  Users are very “bursty” meaning that they access a site only occasionally, and when they do, they want a bunch of pages and they want the all as fast as possible.  The likelihood that a users will be actively browsing through pages when a server is updated is small.  Telling the browser to cache for 60 seconds seems harmless.  But . . . it depends on the number of users and how critical it is that they don’t see errors.

## Implications on Application Structure

It seems that application assets should be placed in folders according to how volatile they are likely to be.

Images and icons might be static for years.  Often new images are added to applications with new name, but old existing images never changed.   A folder that is designed to allow the browser to cache for long periods of time, like a month or more would be appropriate.  

Other folders would then contain more critical pieces.  Custom JavaScript for the application must be kept strictly up to date, and the only option is to revalidate the cached value every request. 

Standard JavaScript libraries can be allowed to sit for longer, but usually the upgrade to a new library is done while maintaining a standard API . . . so the old library still functions until the new one is downloaded.

## More Information

There is a lot of really bad information on the internet about how to make these settings because the entire cache control mechanism was an afterthought to the HTTP protocol, and it was implemented over the years in several different ways.  More recently has been an effort to clean this up, but it remains mired in not breaking backward compatibility with older implementations.  The best pages I have found on this are:

*   Mozilla:  [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), [If-Modified-Since](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since),