---
  title: Deprecated Code
---
# Don't Document Deprecated Code

This should be obvious, but I worked with a team where several members thought it was important to document functions which were no longer considered part of the future of the product.  

:::tip[Key Takeaway]

Deprecated methods are only there to support existing code. Documentation is needed only for writing new code.

The only documentation on a deprecated method or class, should be a reference to the method or class that replaces it.  Leave the proper documentation to the methods that people are writing new programs against.

:::

A deprecated method (or class) is one that you don't want people to use, because you are planning to retire it (get rid of it) some day.  This is your early warning to get people to stop using it, so that when you do eventually remove the function, there will be nobody (at least nobody reasonable) using the method. 

I am assuming, of course, that there is a suitable, recommended alternative.  For example, method getAllWidgets is replaced with getWidgetList and this latter provides all the functionality of the first, only it takes different parameters.  Or it provides slightly different functionality but a few lines of code can get you the same thing.  Or, possibly, you have a reason to believe that it is incorrect to use the original function, and that new functions accomplish the same things in a better way.  For whatever reason, you have decided to deprecate the method, in order to eventually removed it. 

What do you do about the JavaDoc from the old function.  It should be removed, and replaced with a simple line instructing them what to use instead.  For example:

```
@deprecated, use getWidgetList(param1, param2) instead 
```

The point is that is someone is using the method, they know what it does.  IF they are new to the code, and don't know what it does, then they should use the other method instead.  The other method will have documentation on how to use it, and what it returns, so go there to find the documentation.  

_What is the harm in leaving documentation that is already written?_  Exactly the same harm that comes from all the extra cruft and non documentation in the code.  Extra lines means more lines to wade through, more lines to maintain.  Any time you can trim the size of the code down, even if that means trimming the comments, you improve the code.  There is a possibility that people will find that method that says it does what they want, and without reading too closely continue to use it.  Every effort should be made to move people to the new method. 

One might argue “_but sometimes people want to know what a method USED to do._”  That was the argument made by these errant developers.  There are source repositories and old releases to tell you what something used to do.  But, the problem is that cost of maintaining this message in a new version of the code is too high, so that someone using an old version of the code might want to read it.  The cost of maintaining things is usually underestimated.  

My feeling that you should run a tight ship: no extra lines, no useless documentation, and no documentation of deprecated methods.  Keep the code trim, and the benefit will pay back over time in increased maintainability and increased clarity of the code.
