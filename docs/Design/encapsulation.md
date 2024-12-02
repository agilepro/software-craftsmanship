# Encapsulation

Encapsulation is the practice of wrapping up of data and code inside a single module.  It keeps things that need to know about each other together, and it keeps things that don't need to know about each other separate.  Another way to think about encapsulation is, that it is a protective shield that prevents the insides of one module from being manipulated by external code. 

Technically encapsulation is when the variables, data, or functions of a module is hidden from any other module and can be accessed only through exported functions of the module in which it is declared.

Encapsulation is a primary consideration for O-O programming.  The details in a class is hidden from other classes by making the members or methods private.  The class only exposes to the world the public members or functions.  Encapsulation is a principle at work for any kind of modules that control their external exposure.

## Advantages of Encapsulation

**Hiding Complexity**: The module exists to perform as job and as long as it does what it promises, there is no real need to know how it does that job. The caller need have no idea about the inner implementation of the module. The internal representations of data will not be visible to the user.

**Reusability**: Encapsulation improves the re-usability of a module because the internal details are easier to change to conform with new requirements.

**Simplified Testing**: Encapsulated code is easier to test during unit testing because you can focus exclusively on behavior of the exported functions and data.

**Freedom of implementation**: By hiding the details of how things are implemented, it becomes possible to modify and correct over time.

## Disadvantage of Overexposure

**Inability to Evolve**: If a function can be called from outside the module, then that function is at some level frozen and prevented from changing.  A call to that function from another module will break if the interface of the function is changed.  Once a module is in use, the goal is always to produce new versions of the module that do not break things.  Breaks are costly.  A function that is exposed is then locked and can not be changed.

If the function needs an additional parameter to do the job, adding it will potentially break calls to it.

A private function that is not exposed can not be called from other modules.  This means that a maintainer of the module is free to change if necessary.  You can add parameters.  Similarly for data members that are private you can change the data type or refactor them as needed.  Private members can easily change, while public members are locked.

## Scope of Management

Note that there is an assumption that a module is a unit maintained by one person or group, while another module might be maintained by another person or group.  We are breaking the code into chunks for the purpose of making chunks that are small enough that one person can understand the detail across the entire scope of the module, and through that understanding make proper changes to it.  

We assume that the maintainer of a module understands everything in that module, while having very limited knowledge of other modules.  (Of course a developer will commonly know multiple modules, but still the goal is that each modules assumes no knowledge of the internals of any other module.)

The purpose of a modularization is to break the overall code into manageable chunks where a programmer can be effective knowing the details of only the one module being worked on, along with a much simpler understanding of the other modules.

## Too Much Encapsulation

In general you should make private everything that can be made private.  The fewer things that are public the fewer things that others have to know about the module to use it.

It is possible to make too much private, and the result is that the module is too inflexible.  It does too few things, and in too few ways.  That can make a module a poor value.  Clearly the module has to expose all the controls and access point that are necessary to do the job.  For every module that will be different.

## Incremental Exposure

If you are not sure what aspects of a module that a client will need it, then start by making any uncertain aspects private.  When an occasion arises that the aspect is needed, then you can make it public.  It is easy to change something from private to public.  It is difficult or expensive to make a public member private, because it might break clients that had been using it.

## Encapsulation in Typescript and JavaScript

While the term "encapsulation" is often associated with object oriented programming, it is just as relevant in any language that offers modules where you can control the exposure.  

Node offered modules to package up JS and TypeScript.  In 2016 the ECMA (the standard group responsible for java script, also officially known as ECMAScript) introduced standard modules known as [ESM](https://tc39.es/ecma262/#sec-modules).  These modules were adopted in Node 12 as a standard way to mark functions and variables as exported and therefor available for other modules to use.  Things not exported are hidden inside the module.

The same principle applies: keep as much hidden as possible to afford flexibility in the future.  Carefully expose those things that are needed to operate the module, but no more than necessary.  Try to avoid exposing anything that is not actually needed to call the module.

## Related to Factoring

Factoring is another term that refers to the strategy for breaking a large piece of code into modules.  In some cases to achieve proper encapsulation you may need [to refactor the code](factoring-functionality.md).  

For example, a function might be in one module that is used exclusively by another module.  In this case if would be a good idea to move the function into the module that uses it, and make it private.

Another example is [location of constants](../Coding/Syntax%20Conventions/constant-location.md).  If a constant is used only by a single module, then that constant should be declared inside that module, and should be marked private.  That will prevent other modules from seeing and using that value for any unexpected reason.

## References

Joshua Bloch speaks about encapsulation his book titled [Effective Java](https://www.amazon.com/dp/0321356683):

> [Item 15: Minimize the accessibility of classes and members.](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch4.xhtml#lev15)  The single most important factor that distinguishes a well-designed component from a poorly designed one is the degree to which the component hides its internal data and other implementation details from other components. A well-designed component hides all its implementation details, cleanly separating its API from its implementation. Components then communicate only through their APIs and are oblivious to each others’ inner workings. This concept, known as information hiding or encapsulation, is a fundamental tenet of software design

He touches on this again in [Document and Thread Safety](https://learning.oreilly.com/library/view/effective-java-3rd/9780134686097/ch11.xhtml#lev82) 

> Because the private lock object is inaccessible outside the class, it is impossible for clients to interfere with the object’s synchronization. In effect, we are applying the advice of Item 15 by encapsulating the lock object in the object it synchronizes.

Removing constants from a module is mentioned as an anti-pattern in the this page on “[Constants in Java: Patterns and Anti-Patterns](https://www.baeldung.com/java-constants-good-practices)” at Baelding:

> In addition to the logistics of maintaining the Constants class itself, we’re also inviting other maintainability problems by encouraging too much interdependency with this one global constants class and various other parts of our application.

There is a stack exchange answer on “[Good practice to hold Constants in their own file?](https://softwareengineering.stackexchange.com/questions/290006/good-practice-to-hold-constants-in-their-own-file)“:

> One of the worst anti-patterns in this regard is having a “constant interface” which is honestly lazy and unclear. Sometimes you come across an interface containing a bunch of random constants thrown together, and classes will implement the interface just to make it easy to refer to the constants. That generally ends up violating [LSP](https://en.wikipedia.org/wiki/Liskov_substitution_principle) and makes it difficult to determine what those constants do.

## Summary

Encapsulation is the general principle to hide as much as you can inside a module, and to expose the minimal amount necessary to use the module.  The more you hide, the less is exposed, which means users have less they need to know about the module, and therefor easier to use.