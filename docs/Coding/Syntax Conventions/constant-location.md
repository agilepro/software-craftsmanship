#  Constants Location

Like many aspects of programming, there are competing guidelines on where to define constants in a program, but in my experience, the goal of clean encapsulation is the primary guideline that is important.  Here is why. 

## Setting

A constant is a named value that is read, but never updated by the program.  Ironically named, the constant is defined so that the value can be changed (by the programmer, not the program).  A common pattern is to name constants with all capital letters so they appear distinct from regular variables.

Where to define them?  There are two patterns:

*   Globally – in a special class just for constants
*   Locally – in a class near where they are used

The general guidelines are:

> If a constant is used only in a single class, then define it inside that class.
> 
> Define a constant as close to the use of the constant as possible.
> 
> Don’t expose constants to parts of the program that don’t need it if possible.

If it is used broadly across many classes, then define it either in the most logically associated class, or else in a special class for constants if there is one. Constants used broadly across many modules might be an indication that the software should be refactored to segregate functionality properly.

## Encapsulation

Encapsulation is the idea that you want to hide the inner workings of a module as much as possible.  Methods should return the results, but keep the detail of how that result was calculated hidden. For example: the method to calculate the area of square should return the area, without exposing how the area is calculated.

Encapsulation allows modules to be independent.  Independent modules can be updated and improved more easily.  For example, a module that persists a set of data, might save it in a relational DB today, but if properly encapsulated it could be changed to using No-SQL tomorrow without breaking the code that calls it.

Failure to encapsulate means that external code depends on details of the inner working.   Improperly encapsulated modules can’t be changed because external code might break when the module interior is changed.

Proper encapsulation is critical for module for re-use.  A module should only expose the minimum of what is needed to get the results, so that the module retains maximal ability to be adapted in the future.

## Encapsulate Your Constants

If you want classes and modules that can be reused, then you want to keep the constants inside the module.

Imagine you create a module to handle reading and writing of data, and you expose a constant BUFFER\_SIZE to the outside world.  If exposed, it might be used by some other module to control buffer size.  No harm, until you need to change the buffer size.  If changing one value affects code in multiple places, it is critical that all the places that changed get tested for the change.  Will the programmer know all the modules that are using a constant.  There is a serious risk that making this change will break code elsewhere, and the programmer will have no idea about the breakage.

The problems of a change in one place affecting code somewhere else was the biggest problem with so called “spaghetti-code”.  Cross module dependencies at all levels make it impossible to modify the program safely, and all changes become risky.  This was the whole point of making modules in the first place: to avoid deep dependencies.  A constant BUFFER\_SIZE defined inside the module allows the programmer to know that when this value is changed, it will only affect that one module.

## Global Constant Anti-pattern

Given the danger and inconvenience of exposing constants outside the module, it is surprising that this is precisely what many programmers like to do: they define a single special class to hold all the constants for a program.  Often this class has nothing in it but public constants, guaranteeing that all constants are exposed to virtually all classes.

I can’t find any programming advice book or blog that recommends putting all your constants in a single class that holds all the constants.  It is a bad idea, but one that is commonly employed.

I believe there is some attraction to the idea that there is one place to go where all the knobs exist that can change the behavior of all the other classes.  A “dashboard” of sorts.  The idea is that there is one place, where if you change that one class, you can effect changes in all parts of the program.

One argument I have heard (and I am not joking) that putting all the constants into one class makes it “easier” to change the constants.  I really can’t understand why making constants global in a single class makes it anyway easier.  A change to source is a change to source.  Even if you have to change several constants spread across several classes, it is still just as easy to make those changes.

Putting all constants into a single constant value class does have problems:

*   it makes changes in constants far more dangerous because it is not obvious where those constants are used.  It is not obvious what code will be affected by a change in constant values.
*   it encourages dependencies across classes on internal details that should not be exposed.
*   it needlessly exposes internal details of modules

Consider again the constant BUFFER\_SIZE and defining it globally.  There are many kinds of buffers, as we as the name implies supposed to make all buffers the size of this constant?  Different kinds of buffers have differing kinds of needs. Lets say that this globally defined constant is used to control the size of various different buffers: do we have any confidence that we can change this constant?  If you double the size, or cut it in half, do you know that all the code will behave properly?  It would be a really bad idea for multiple different buffers to share this constant.  So why declare it globally?  Keep it local to the module that uses it, and then if changed you know exactly what files might be affected.

## Common Knowledge

In preparation for writing this, I did some searching to find out why programmers might want to collect all their constants into a single class, exposing them globally.  I couldn’t find any site advising this.  Most of them said “don’t do it.”

Joshua Bloch advises against putting constants into an interface in his book titled [Effective Java](https://www.amazon.com/dp/0321356683):

> That a class uses some constants internally is an implementation detail. Implementing a constant interface causes this implementation detail to leak into the classes’ exported API. It is of no consequence to the users of a class that the class implements a constant interface. In fact, it may even confuse them. Worse, it represents a commitment: if in a future release the class is modified so that it no longer needs to use the constants, it still must implement the interface to ensure binary compatibility.

The Constant class is mentioned as an anti-pattern in the this page on “[Constants in Java: Patterns and Anti-Patterns](https://www.baeldung.com/java-constants-good-practices)” at Baelding:

> In addition to the logistics of maintaining the Constants class itself, we’re also inviting other maintainability problems by encouraging too much interdependency with this one global constants class and various other parts of our application.

There is a stack exchange answer on “[Good practice to hold Constants in their own file?](https://softwareengineering.stackexchange.com/questions/290006/good-practice-to-hold-constants-in-their-own-file)“:

> One of the worst anti-patterns in this regard is having a “constant interface” which is honestly lazy and unclear. Sometimes you come across an interface containing a bunch of random constants thrown together, and classes will implement the interface just to make it easy to refer to the constants. That generally ends up violating [LSP](https://en.wikipedia.org/wiki/Liskov_substitution_principle) and makes it difficult to determine what those constants do.

I remain mystified as to why programmers think that a global class of constants is a good idea.  I assume there is some attraction to “_action at a distance_” the somehow compelling idea that I can press a button here, and have an effect over there.  This is a common psychological principle that is used in James Bond movies, but is a very bad idea that runs counter to the goal of encapsulation.  You really don’t want to define code that that spreads internal details further than they need to be.

## Summary

Good encapsulation and agility demand that:

:::tip[Key Takeaway]

If a constant is used only in a single class, then define it inside that class.


Define a constant as close to the points of use as possible.


Don’t expose constants to parts of the program that don’t need it if possible.

:::