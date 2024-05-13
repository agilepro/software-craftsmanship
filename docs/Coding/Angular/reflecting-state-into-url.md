#  Reflecting State in the URL – Angular JS Tip

In the last post I outline a method for parsing parameters to a page, but as people work on the page, they can sometimes modify the parameters. Consider a page that accepts a query value as a parameter, but also allows the user to modify the query value. If you update the page’s address, then bookmarks by the user will always bring them back to the same place/mode.  

Here is the implementation for quick reference:

```js
function setAddressBar(param) {
    var curPath = window.location.toString();
    var hashPos = curPath.indexOf(&quot;#&quot;);
    var newAddr = &quot;&quot;;
    if (hashPos&gt;0) {
        newAddr = curPath.substring(0,hashPos+1);
    }
    else {
        newAddr = curPath + &quot;#&quot;;
    }
    for (var key in param) {
        if (param.hasOwnProperty(key)) {
            newAddr = newAddr + &quot;/&quot;+key+&quot;=&quot;+window.encodeURIComponent(param[key]);
        }
    }
    window.location = newAddr;
}

```


## Discussion

Remember that I am assuming that you are passing values in the URL after the hash as a collection of tokens which are parsed from a name=value pair and they are placed in a param object in the model. This method then turns that around. There is always a slash before the name to separate the tokens.  

Whenever a parameter value is changed, call this method to update the URL in the address bar.  

Like the parsing, only the parameter value is URL encoded. The name should be chosen so that it does not need encoding. If you wanted to use non-ASCII names, you would need to change both the parsing and the address update in corresponding ways.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [AngularJS](https://agiletribe.purplehillsbooks.com/tag/angularjs/), [GUI](https://agiletribe.purplehillsbooks.com/tag/gui/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2015/01/16/reflecting-state-in-the-url-angular-js-tip/ "Permalink to Reflecting State in the URL – Angular JS Tip").