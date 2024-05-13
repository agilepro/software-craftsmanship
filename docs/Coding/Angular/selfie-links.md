#  Getting Selfie-Links to Work

The past two posts covered parsing the address parameters, and generating a new address with changed parameter values. It turns out that links from a page to the same page are suppressed, unless you include the code below.  

URLs like that work fine if you navigate to a different page. However, if you navigate with a normal link to the same page — to an address that is the same before the hash sign — then the browser is designed to not update page. I call these “selfie-links” because they are links from the page to the same page. The same thing happens if you have two bookmarks to the same page (with different parameters) and use one while the other page is displayed. This can be cured using the

```js
myApp.controller('myCtrl', function ($scope, $rootScope, $location) {
    $scope.param=[];
    $rootScope.$on('$locationChangeSuccess', function (event, location) {
        $scope.param = parsePageParams();
        //here update things in $scope that depend upon the parameters if needed
    });
    //followed by the rest of the controller code.
});
```


Attaching a function to the locationChangeSuccess event will cause that function to be called when the page is loaded for the first time, and every time after a navigation. It will also be called if the user hand-edits the address and presses return, or if the user navigates using a bookmark.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [AngularJS](https://agiletribe.purplehillsbooks.com/tag/angularjs/), [GUI](https://agiletribe.purplehillsbooks.com/tag/gui/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2015/01/16/getting-selfie-links-to-work-angularjs-tips/ "Permalink to Getting Selfie-Links to Work – AngularJS Tips").