#  Parsing Parameters – AngularJS Tip

I recently got up to speed on AngularJS and I must admit it is pretty amazing.  Probably should give an overview but I don’t have time for that today.  This post is specifically some Java code to parse parameters that can be passed in links between pages allowing for a natural page-flow behavior.  
For easy reference, here is the final code for parsing the parameters:

```js
function parsePageParams() {
    var param = [];
    var curPath = window.location.href;
    var hashPos = curPath.indexOf("#/");
    if (hashPos>0) {
        var tail = curPath.substring(hashPos+2);
        var elems = tail.split("/");
        for(var i=0; i<elems.length; i++) {
            var part = elems[i];
            var equalsPos = part.indexOf("=");
            if (equalsPos>0) {
                var paramName = part.substring(0,equalsPos);
                var paramVal = part.substring(equalsPos+1);
                param[paramName]=decodeURIComponent(paramVal);
            }
        }
    }
    return param;
}
//in your controller:
$scope.param = parsePageParams();
```


## Goal & Purpose

I want a general purpose way to pass parameters to a page.  The parameters should be in any order, with some parameters being optional, and the resulting values should be easy to use.  It seems clear to use something exactly like URL query parameters.  However, when passing parameters to a page using Angular, the parameters come after the hash-mark.  As far as the server is concerned, everything after the hashmark is makes no difference, and the server behavior is completely determined by what comes before the hash.  After the hash is then available for the page to customize its own display.  
The proposal is that there be any number of expressions, separated by slashes.  Each expression has a name and a value separated by an equals symbol.  Here are some examples:

```
http://server/app/myPage.htm#/a=value1/b=value2/c=value3
http://server/app/myPage.htm#/city=Albuquerque/state=New%20Mexico
http://server/app/myPage.htm#/book=The%203%2F5%20Solution
```


After the page is running, I would like a simple JavaScript object that represent these as members on a standard JavaScript object:

```
param = {"a":  "value1", "b": "value2", "c": "value3"};
param = {"city": "Albuquerque", "state": "New Mexico"};
param = {"book": "The 3/5 Solution"};
```


The thing to note is that the parameters have been made values, but they have been parsed into expressions before they have been decoded from the URL encoding.  The URL decoding happens after the parameters have been parsed out.  This is particularly noticeable in the case of the book above, because the book name has a slash in it, and if the URL decoding were to happen before the parsing, then you would have an extra expression that was not valid and the value for book would be wrong.

## Details about the Solution

The above method does the job.  It finds the hash in the window location, and then it takes everything after the hash (and after the first slash) and splits that on every point where a slash exists.  That makes a list of expressions. Within each expression, we fine the position of the equals symbol.  Note that the name of the value must not have an equals in the name, but that is the only restriction.  The value is everything after the equals, up to the slash that originally ended the expression.  Finally, the value is URL decoded and placed into the resulting param object.  

The advantage is that ANY value can be passed from one page to another.   You only need to assure that that value is URL encoded, exactly like it would have to be in regular URL query parameters.  The URL encoding also is UTF-8 encoded, so any unicode character can be used int he value, and no value is lost.

## Why Not Use the Regular Angular Routing?

Angular offers a capability to automatically parse this part of the URI and use that to select the controller and view.  There are two reasons:  

(1) Angular strangely does a URL decode the entire URI before applying the patterns to match.  Thus the third example would be decoded to “book=The 3/5 solution” before matching.  If you have multiple parameters, and you have slashes between the parameters, then the slash in the particular parameter value makes it appear as if there is an extra parameter, and the value for book is truncated at that point.  Everyone knows that you have to parse the address into component BEFORE you do a URLDecode on the values.  THe problem is that the routing provides a pattern matching ability, where you specify a template like “/book=:bookname/version=:ver” which will automatically find bookname and ver, but this style of pattern matching can only work on values that are already URL decoded.  This is one aspect of Angular which has not been completely thought through.  

(2) The second problem is that using a pattern matching capability makes it very difficult to have optional parameters as well as parameters passed in different orders.  The patterns puts the parameters in a particular order.  If that fits your application that is fine, but I was looking for a mechanisms that would allow flexibility in passing part of the parameters, or parameters in any order.  
 

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [Angular](https://agiletribe.purplehillsbooks.com/tag/angular/), [GUI](https://agiletribe.purplehillsbooks.com/tag/gui/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2015/01/15/parsing-parameters-angularjs-tip/ "Permalink to Parsing Parameters – AngularJS Tip").