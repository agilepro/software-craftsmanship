#  When are "best practices" less than best?

A “best practice” is a heuristic which is used to guide early stages of a project, in order to set some patterns.  When should you use them?  More important: when are you justified in ignoring a best practice? 

Best practices, also known as “rules of thumb,”  are heuristics.  That means they offer some general guidelines on the principle that you need to start with some basic guides. They are abstracted away from the specific situation, in an attempt to generalize design practices. 

Best practices are not laws on what you can and can’t do.  They are not requirements that must be met.  They not even hard and fast rules to be followed.  They can’t be, because they are generalized and can not account for the specific situation. As a heuristic, they offer no definitive unambiguous answers. 

There is an appropriate time and place. But real design is about judgement around the specifics of the situation.  A designer may choose to follow a best practice, or to go a different way.  In general, if you have no particular reason to not follow a best practice, then you should probably do so.  If nothing else, it makes the world more consistent.  But it does not take a large reason to go in a different direction.

## Example: Automobile

I always use cars as example.  What are some of the best practices when designing a car:

*   It should be two passengers wide.
*   In regions that drive on the right of the road, the driver position should be on the left of the car.
*   The engine should be in the front.
*   The engine should run on gasoline because it is plentiful and easy to find.
*   Drive wheels in the back provide better traction.
*   etc.

Sure enough, if you look at all the best practices, you can readily identify a large number of the cars that exist.  But exceptions are plentiful as well:

*   Postal delivery vans have the driver on the other side, so they have ready access to mail boxes which are on the side of the road.
*   Some cars have the engine in the rear.
*   Some cars run on electricity and have no engine at all.
*   Most cars today have front-wheel drive because if the engine is in front, the moving parts are smaller and less expensive.

The point of course, is that a best practice is a reasonable starting point, but by no means a law that must be followed.

## Software Best Practices

Software is pure design.  Every line that the programmer writes, is the design of the program that is going to run, so design is very important to the programmer.  (Later, the running of the program is the implementation of the design.) It is important that programmers be good designers. 

There are many many software patterns that are considered best practice.  Books full of them.  Not only are they contradictory, many guidelines are targeted for very specific domains and make no sense outside that domain.  The problem with so many, is that it is impossible to internalize them all, and even the people who make up such guidelines fail to consider even a large part of the extant guidelines. 

Many best practices take on the quality of religious dogma. A programmer uses a practice on one team on a long project, and they begin to view the world that way.  They forget why they adopted that practice, and the practice itself takes on a life of its own.  Sometimes programmers continue with a practice long after it is useful.  A good example of this is disabling menus when they are not needed.  Many studies have shown that the complete lack of feedback to the user is frustrating because there is no way for a novice use to discovery why the menu does not make sense at the time … or what they can do about it.  A better approach is to not disable the menu, but to color the menu item grey and to produce an error message explaining why it cannot be used at that moment, but it is almost impossible to have a discussion on this topic, because of the dogma of disabling menus. 

Sometimes a programmer sees a problem, proposes a best practice to counter that, but never actually proves whether it is effective.  Early programming languages required GOTO extensively, and the resulting spaghetti code was unmaintainable.  PASCAL is a language that swung in the other direction, and did not allow any ability to jump, forcing exclusively code block structures.  While this was “pure” it also required some very convoluted code in places.  C++ swung back and allowed code structures but you can use a GOTO if you really need it.

## Not a Measure of Quality

A best practice is useful at the beginning of a project to form a default design decision.  Then the real practice of design starts: the specifics of the situation are considered and the real design is elaborated.  If this conflicts with a best practice, it does not mean that the design is of lower quality.  A car that runs on diesel is not necessarily lower quality than one that runs on gas.

## Continual Evolution

Best practices are continually being invented.  Every time a maintenance project starts getting invented, a programmer designs and promotes a new best practice to eliminate this potential.  Some best practices are invented after a body of code was already written.  New classes are introduced that invalidate the old best practice.  Originally Java offer multi-threading as a native feature.  The best practice was to make every class thread safe by synchronizing every method.  Later, this was discovered as causing a huge overhead.  So new classes came out, in accordance with the new best practice that were not synchronized to use only on a single thread — which is usually the case. 

Sometimes best practices swing back and forth.  Early programming languages offered very little in the way of type safety and predefined data structures.  Then came a number of strongly typed languages, like Java.  The best practice was to insist on proper and complete type declarations in advance.  Later comes JavaScript which allows any variable to hold any type, and it seems that Java Script is doing very well.  Clearly, different languages work better in different domains, but the point here is that best practices are rarely universal or eternal.

## Not a Fix Up Recipe

Sometimes there are _best practice police_ who feel it is their duty to root out and eliminate the code that does not follow best practice.  Cleaning code is usually a very honorable thing.  This can result in code that is less costly to maintain.  But one must be careful, and assure that the cost of the refactoring is really going to be paid back in the saving of maintenance.  In most cases, refactoring just to refactor will not pay off. 

Good advice is: “if it ain’t broken, don’t fix it.”  Refactoring running code to match a best practice should ONLY be attempted when the maintenance of that code is so troublesome and expensive that you need to overhaul the code to prevent problems. 

This is particularly important when you consider that best practices change over time.  Sometimes a body of code is written before a best practice comes into use.  If the code is running well, then rewriting it to conform to the best practice is an almost complete waste.  Best practices are useful before you code to give you default patterns, but should almost never be used to retroactively change existing code.

## Not the Path to Innovation

Finally, and possibly the most important, every innovation in the marketplace is there because it ignored a best practice.  The Apple iPhone had no buttons!  Twitter did not let you make a long post or support HTML.  Uber does not allow you to make an advance reservation!  Netflix does not ship the DVD in a hardened case!  These were all deliberate decisions to ignore best practices. 

Slavishly following the best practice will always yield dull and uninteresting products.   Your goal as a software designer, is to (1) be aware of the best practices, (2) understand the reason for the best practice, and then (3) to make the _best design that fits the actual requirements_ regardless of whether it follows or violates a best practice.

## Resources

*   [When “Best Practice” is Bad Practice](http://hildygottlieb.com/2009/09/20/when-%E2%80%9Cbest-practice%E2%80%9D-is-bad-practice)/
*   [The road to mediocrity is paved with best practices](https://www.invisionapp.com/blog/mediocrity-best-practices/)
*   [The Good, the Bad… and the Best (Practices)](http://opendatacon.org/good-bad-best-practices/)