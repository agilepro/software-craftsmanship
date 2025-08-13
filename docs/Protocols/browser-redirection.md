---
  title: Browser Redirection
---
#  Context Path and Browser Redirecting

What is the URL to the application? There is one, and that is the one that the user places into the browser in order to access the application. Unfortunately, along the way, the request will pass through many intermediate services which will distort the request headers. Many of the TomCat services designed to provide information about the context of the running application will return incorrect values. Thus we must be very clear on how to get those values correctly and consistently across the application, so that when the browser is forwarded it is always successful.  

While we usually test in the simplest situation, we need to think about the most general. That is:  

1) A user browser talks with https to  
2) An apache server which unencrypts the stream and forwards to  
3) a TomCat server inside the DMZ which then uses Tiles to  
4) ultimately call a JSP file in a particular context.  

All of these cause different changes to the reqeust.getContextPath() depending on how you set it up. It truns out is is impossible for the TomCat to really know what URL the browser as to use in order to access the application, and that is what must be sent to the browser.  

Another situations is that we may be generating a static copy of the site, and in this case all of the links between pages have to be relative links so that the resulting html files can be hosted anywhere, and don't make absolute links to a particular site.  

Another situation is URLs that are sent by email in messages, these must always be global (non relative).

## AuthRequest

The code to handle this complexity is embedded in the AuthRequest object,and all you need to know about is two members.  

**ar.retPath** – This is the path that gets to the base of the application, from the browser point of view, and should be used for all normal static browsing URLs. Thus page to page links within the application should start with ar.retPath. 

**ar.baseURL** – This is the path to the base of the application that is a complete URL with global scope for using whenever the url will be sent in an email address, when stored anyplace, and when the URL is passed as a 'go' parameter to another page which might use it in a slightly different context than the page sending the parameter.  

Both of these always have a final slash on them, so the path within the application should never start with a slash.  
There are a couple more convenience functions on AuthRequest which have been modified to use baseURL and to always provide the correct, global, address. 

**ar.getRequestURL()** – is a method that will return the proper, global URL to the current full page (not the tile). This does not include the query parameters. If a page that does not have any query parameters redirects the browser to this value, the user will not see any change . . . they will get the same page.  

**ar.getCompleteURL()** – is a method that will return the proper, global URL to the current page including the query parameters. Redirecting to this URL should always cause the current page to be redisplayed. Use this value when you need a URL “to get back to this page” after redirecting elsewhere. 

That is pretty much all you need. All the rest of the URL methods (e.g. ar.getResourceURL) return a URL relative to the base of the application. You then use either retPath or baseURL to make those full paths for usage. You can also get the path of the current page relative to the base of the application with ar.getRelPath().

## How to Configure This

The global absolute URL is read from a system configuration variable “baseURL”. If you have a complex configuration, you must set up baseURL to be the URL of the base of the application, the way that the user's browser would see it. 
 
Unfortunately, if you have users accessing the server from two different environments that require two different URLs, there is no way to do this. If that requirement comes up, we will have to come up with a solution at that time.

## What to Avoid

You should then never use the method on the request object to find your current URl or parts of the URL. You should never use “getContextPath” because that will never be able to account for all the configuration options.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [browser](https://agiletribe.purplehillsbooks.com/tag/browser/), [JSP](https://agiletribe.purplehillsbooks.com/tag/jsp/), [web](https://agiletribe.purplehillsbooks.com/tag/web/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/14/12-context-path-and-browser-redirecting/ "Permalink to #12 context path and browser redirecting").