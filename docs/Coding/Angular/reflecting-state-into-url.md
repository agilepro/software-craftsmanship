#  Reflecting State in the URL

Consider an Angular-JS page that accepts a query value as a parameter, but also allows the user to modify the query value. If you update the page's address, then bookmarks by the user will always bring them back to the same place/mode.  

Here is the implementation for quick reference:

```js
function setAddressBar(param) {
    var curPath = window.location.toString();
    var hashPos = curPath.indexOf("#");
    var newAddr = "";
    if (hashPos&gt;0) {
        newAddr = curPath.substring(0,hashPos+1);
    }
    else {
        newAddr = curPath + "#";
    }
    for (var key in param) {
        if (param.hasOwnProperty(key)) {
            newAddr = newAddr + "/"+key+"="+window.encodeURIComponent(param[key]);
        }
    }
    window.location = newAddr;
}
```


## Discussion

Remember that I am assuming that you are passing values in the URL after the hash as a collection of tokens which are parsed from a name=value pair and they are placed in a param object in the model. This method then turns that around. There is always a slash before the name to separate the tokens.  

Whenever a parameter value is changed, call this method to update the URL in the address bar.  

Like the parsing, only the parameter value is URL encoded. The name should be chosen so that it does not need encoding. If you wanted to use non-ASCII names, you would need to change both the parsing and the address update in corresponding ways.
