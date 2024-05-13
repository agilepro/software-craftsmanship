#  Angular Settings: ng-options

The documentation on Angular expressions is so sketchy that I really can’t work out what it means, so I have “decoded” what they say, and here is the two useful cases.  
ng-options is an attribute on a select element that generates the options according to data that you have already in your model.

## The Simplest Case

There are three things to consider: the LIST of source objects, how these are displayed, and the value that gets assigned into the resulting variable.  Consider the following simple case:

```
$scope.colors= ["red", "yellow", "green", "blue", "orange", "purple"];
$scope.selectedColor = "red";
<select ng-options="y for y in colors" ng-model="selectedColor "></select>
```


This is the absolutely simplest case with an array of strings values.   The “y in colors” indicates that you are iterating the array “colors” and the iterated value is “y” and “y” is a completely displayable quantity, so you need to say “y for” to display display the iterated quantity as the the complete thing to display in the list.  Also, that is the value that will be assigned when selected.

## Basic Object Case

It is quite a bit more common to have a list of objects which have names, and to want to select one of them.

```
$scope.schools = [
    {name:"Berkeley", cost:40000, value:10},
    {name:"Stanford", cost:60000, value:12}
];
$scope.selectedSchool = null;
<select ng-options="s.name for s in schools"
        ng-model="selectedSchool">
    <option value="">-- choose School --</option>
</select>
```


Here we have introduced two things.  The “s” is the iteration variable, and it displays s.name in the picklist.  Of course, the entire object is assigned to the variable “selectedSchool”.  The second thing is the additional option for NOT selecting a value.

## Conclusion

Those are the only situations I have needed.  I will add more if I actually need other configurations.   You can run this dozens of different ways, but I have not yet seen the need for those yet.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/) and tagged [Angular](https://agiletribe.purplehillsbooks.com/tag/angular/), [AngularJS](https://agiletribe.purplehillsbooks.com/tag/angularjs/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2017/11/24/hints-for-ng-options/ "Permalink to Hints for ng-options").