---
  title: Good Names
---
#  Use Good Names

You know the problem: you write a method for one purpose and give it a name.  Later, it become useful for something else, or maybe you change it slightly to accommodate another use, or maybe some names change elsewhere making the current name obsolete.  You have all seen code where someone says that the name “is historical” or traditional.  This post is to say with conviction that that history is NOT interesting, and get rid of it.  Get a good IDE and change those names to be correct.

## Agile means always running

One central tenet of the Agile approach is that you always merge all changes into your sandbox, build, and assure that all the tests always run. You never break the build.  This makes programmers shy about making large changes.  Indeed, small, incremental changes work best: add a member or a method to a class, then build-run-test.  Add a method to another class that uses that just added member, then build-run-test.  A careful programmer focuses on the task at hand, changing only the parts necessary.  Wide sweeping changes are hard to manage and assure that all the former functionality is unbroken.  

In that setting it is common to leave method names alone.  Think carefully when you add each method to name it as well as possible, because it is likely to stay that way for a long time.  But occasionally the name outlives its usefulness, and the function it is providing is simply not well described by the name.

## Accumulated Technical Debt

These poorly named methods amount to a collection of technical debt.  A poor name makes it hard for a new programmer to understand what is going on.  The cost of one method is small, but it is a cost that keeps on costing as more people come in contact with the code.  It is hard to estimate what this costs, but consider this: a method that has the right name can be used with almost no overhead, while a poorly named method can cost 5 to 10 minutes of programmer time every time it is used.  Time up front is spent checking to read the actual body of the method if the name is unclear.  If the name is misleading time is spent debugging and finding places where the wrong method was used.  Imagine the alternative: a body of code where every class and method is named consistently is easy to extend into new functionality.  There is a lot of value in eliminating that technical debt.  

One way to solve this is to add a second method with the correct name.  Make the poorly named method call the correctly named one, so that you maintain compatibility with code that calls this class.  Mark the method as deprecated.  Make sure that the deprecation statement points the reader to the proper method to use.  Eventually you will, in a few months time (or years more likely) eliminate all the calls to the deprecated method.  However you can’t really do this with class names, and it causes extra overhead to do this with data member names.

## An IDE can Automate this

Eclipse has gotten particularly powerful in this regard.  It is a given that your entire code base must able to be loaded into a running instance of Eclipse: this should work up to a couple of million lines I have not discovered the limit yet.  Eclipse can then map out all the references of a particular method, and refactor automatically.  

Make a clean checkout where nothing else is changed.  Make double sure that everything is running.  Then use the “Refactor” command.  This can be used on variable names, member names, method names, and even class names.  

It is a “big bang” approach as it may touch hundreds of files.  Any time you do that, you run the risk of conflicting with others work, so assess the amount of change carefully, and if necessary, warn others and schedule the change at a particular time.  

The conclusion is, even with all the trouble of having to coordinate with other team members, it might be that in a few minutes work, you address a problem that wastes lots of people time.  Changing a method name is fairly safe:  generally if the resulting code compiles, it should run.  Eclipse will check everything as it makes the changes, assuring that all the syntactic rules are followed.  

Changing a method name that is used in 15 spots in the code takes seconds to completely eliminate the debt.  If that action saves one programmer from having to read the source of the method, or having to ask another programmer what it means, you have already profited.  

If you are not familiar with the refactor mechanisms in Eclipse, spend 10 or 20 minutes learning how to use it.  This is really powerful, and a really good tool for maintaining high quality code.