#  Battling Clutter

Software will always increase in amount and size, and that includes not only things that are needed, but unneeded things as well.  Unless you fight diligently against it, code will tend to get more and more cluttered.

## Problem

It is easy to **add** a method to a class.   It is easy to add a class to a program.  It is easy to add a library to a project.   These are all easy, because adding things to a project almost never cause a conflict of any kind.  It is safe.  It is unlikely to cause any problem because defining new code standing on its own rarely changes any of the previously existing code.  

It is difficult to **remove** a method from a class.  It is difficult to remove a class from a program.  It is difficult to remove a library from a project.  In all of your project, something somewhere might be using it.  IDEs like Eclipse do a fairly good job of tracking all those dependencies, but they are never complete.  Static analysis of the code base can identify some, but not all, of the potential problems that might result.  It can not, however, find all of the dynamic behaviors.  

I recently used Eclipse to remove a class, and it correctly identified all the code that was referring that class.  But after a successful build, run, and test, I ran into a problem on one test server.  Some instances of the class had been included in a serialized object file, and so without the class those files could no longer be read.  There is no way any IDE or any static analysis would ever be able to identify and warn you of this.

## Implication

When it is easy to add, and difficult to remove, you have something that is **Clutter-Prone**.  Software projects tend to collect things.

*   A programmer adds a class to support an experimental feature, and then later decides not to finish the feature so the unused support classes are left as clutter.
*   A programmer adds a new version of a library that is not completely compatible with the old one, and migrates some of the use of the old code to the new.  But since it is difficult to know whether there is other code using this library it remains in the project as clutter.
*   Some libraries depends on other libraries causing you to add 4, 5, or maybe even 10 libraries just to get one function.  In the future one or more of those libraries might be updated to the latest version.  Does the new version need all the same old supporting libraries.  Even if you determine that this one does not, are there other libraries that depends on this one.  It is almost impossible to know whether you can remove this clutter.
*   A programmer rewrites a function such that it no longer uses some methods on another class.  How would you know if you should remove the methods or not from that other class?

Software project are inherently **Clutter-Prone**.  It is just a property of software project that you have to fight against to be successful.  

However this clutter is a kind of technical debt.  As the number of lines increase, so does the maintenance cost, even if those line are dead and never called.  As the number of libraries increase, the size of the delivery increases, slowing and taking more space.   As the number of methods increase, the job of choosing the right method become a slight bit more troublesome.  This debt build up over time, and starts interfering with the ability to maintain the software.

## Conclusion

One must always diligently fight against clutter.  Don't leave it in “just in case”. Unused code is a liability, not an asset.

:::tip[Key Takeaway]

If you ever determine that a method is not being used, delete it!   

If you ever determine that a library is not being used, remove it!

When you change code to not use a particular method, spend a moment to see if it is still needed.

:::

Deleting code that you know is not needed is a benefit.  Reducing the number of lines makes the code more valuable, not less.  And even if you find tomorrow that you unexpectedly need the code, rewriting it, or pulling a copy from the source archives is fast and _safe_.  

The natural tendency is to never delete anything.  At the same time, coding means by definition addition to the project.  It is easy to add code, it is very difficult to remove it, so always remove code on every opportunity you have to remove it.