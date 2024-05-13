#  Java Servlet URL Parsing Best Practice

I write Java servlets a lot, and every single time I waste time trying to get the URL value that the servlet was invoked with in the right way.  The methods provided on HTTPServletRequest simply are no the right ones for all situation.  I am documenting here how to find the proper URL and parse it.

## Quick Solution

Here is the code for easy access:

```java
public String getPathForData(HttpServletRequest req) {
    int ignoreAmt = req.getContextPath().length() + req.getServletPath().length();
    return req.getRequestURI().substring(ignoreAmt+1);
}
```


## Rationale for this Approach

The “proper” solution will fit these requirements:

*   The application must portable, which means application can be running on any server with any name and it should not care what server it is running on.  The beginning of the URL will be the server, maybe port, and the application name.
    *   TomCat applications can be installed to a server at any “location” which becomes the address of the server.  The Servlet should not depend on the application being a particular value
    *   TomCat servers can be run on any host and port, so the Servlet should not have any dependence on knowing the server name, ip address, or port.
*   Parameter values passed either as parts of path or as query parameters should be properly decoded with full support for full Unicode character set.
*   Within the application, the server has a fixed path which is set by web.xml.  There is no reason to believe that anyone will tweak with the web.xml and move the sevlet to a different address within the application.  It is OK if one gets a path with this this address in it which is internal to the application.

In general, you have a Java servlet application, and imagine that you want a a REST style request with parameters in the URL part parts.  For example, something like this:  

```
http://server.com:8888/aaa/bbb/ccc/ddd/eee.ext?f=1&g=2  
```

Of this path:

*   http://server.com:8888/ – is purely specified by the tomcat server installation
*   aaa – the address within TomCat that the application is installed at
*   bbb – is the address of the servlet within the application specified by web.xml.  It is important to note that only this part can be specified as a fixed value, since the rest of the values later than this in the URL are data values which can not be put into a static form such as web.xml.
*   ccc/ddd/eee.ext can be interpreted by the servlet.  Imagine that ccc is the country code, ddd is the airport code, and eee.ext is a particular type of information about that airport.
*   The query parameters can also be interpreted by the servlet.

The value that is needed is “ccc/ddd/eee.ext?f=1&g=2” since this is the data that must be used to drive the REST response.  Ideally the rest should be eliminated, however the presence of ‘bbb’ is not a problem since the servlet might be programmed to know this value and it does not change from installation to installation.  In general the solution is to get this data in two strings  “ccc/ddd/eee.ext” and “f=1&g=2” since those are in any case already parsed into separate pieces.

## Analysis

The HttpServetRequest class gives a number of methods, and here are the methods with the values they might return on the above request URL:

*   **getContextPath** – returns “/aaa” which is nice to know since the user might ahve installed the application anywhere, but by itself is a value that should be ignored.
*   **getQueryString** – returns “f=1&g=2” which is very useful
*   **getRequestURI** – returns  “/aaa/bbb/ccc/ddd/eee.ext” which is OK, but it includes the name of the application which the application does not know.
*   **getRequestURL** – returns “http://server.com:8888/aaa/bbb/ccc/ddd/eee.ext” which is OPK, but problematic since the application does not know and does not care what server is it installed on inorder to interpret the request and determine what to respond.
*   **getServletPath** – return “/bbb” which is the address within the application that the servlet is located at, which in most cases is already known to the person who wrote the application.

What we really need then is retRequestURI with the getContextPath stripped off the front, and also the getServletPath stripped off the front.  
I also strip off one more character, the slash, since it is inconvenient having a value that starts with a slash.

## Parsing the values

Getting the path is the starting point to parsing the values out of the path, and what I prefer is getting an array of string values, in this case with elements both from the address path, and also from the query parameters.  Here is the method:

```java
public static String[] parseFullUrl(HttpServletRequest req) throws Exception {
    String pathAfterContext = req.getRequestURI().substring(
        req.getContextPath().length() + req.getServletPath().length() + 1);
    Vector res = new Vector();
    for (String val : pathAfterContext.split("/")) {
        res.add(URLDecoder.decode(val, "UTF-8"));
    }
    String query = req.getQueryString();
    if (query!=null) {
        for (String val : .split("&")) {
            res.add(URLDecoder.decode(val, "UTF-8"));
        }
    }
    return res.toArray(new String[0]);
}
```


That returns, for the example above, the array:

```
{"ccc", "ddd", "eee.ext", "f=1", "g=2"}
```


That, in turn, is easy to interpret and use. Each value in the URL has to be properly decoded from UTL-8/URL encoding _after_ the parsing of the slashes or ampersands.  
The query parameters have a name and value separated by an equals symbol. Technically, the name and value of the query parameters should be decoded _after_ splitting the name from the value, but for convenience I do both here. This works as long as (1) the name does not have any equals symbol in it, and (2) it is parsed considering only the first equals symbol. You see, the value might have equals symbols in it, and you must not be confused by that. (i.e. don’t use ‘split’ to separate name from value because it may split it too many times.)  
This, then, is the proper way to parse the query value after URLDecoding:

```java
public static String[] parseNameValue(String qParam) throws Exception {
    int pos = qParam.indexOf("=");
    if (pos<=0) {
        throw new Exception("can't find equals symbol between name and value");
    }
    String[] ret = new String[2];
    ret[0] = qParam.substring(0,pos);
    ret[1] = qParam.substring(pos+1);
    return ret;
}
```
