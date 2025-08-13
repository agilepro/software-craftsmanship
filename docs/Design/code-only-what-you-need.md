---
id: code-only-what-you-need
title: Code Only What You Need
tags:
- coding
- agile
---

#  Code Only What You Need

Only commit to code that which needs to committed to code.  Only write what needs to be written.  How hard can that be?  You might be surprised, but there are developers out there that are so enamored with the code design that they implement entirely unnecessary things. The best of intentions is actually a waste when you implement something that is never actually used.

## Don't be Justin

Years ago I worked with someone, let's call him Justin Case.  Justin was hired as a software architect in a small software startup.  Startups generally start with band new code, and so patterns for future are being set. Justin had some grand ideas about how the system would evolve, and so he added “flexibility” into the data structures at many points “just in case” we might need them some day.

For example, Justin would add super classes over almost every class just in case we might need that some day.  He would add extra methods into the interface, just in case we might need that some day.  I need to emphasize that we have no need for these things at the time, nor did we have plans for expanding in that direction in the near future.  He was adding them just as a general practice to provide for future flexibility in the code.

Only it was a complete waste.  That flexibility was never used, however it did create extra effort for everyone.  It unnecessarily increased the number of lines that needed to be maintained.  Because there were many unnecessary classes, it made it harder to understand the system in the current state.

## Understand Why This is a Waste

The analogy that I use is to think about building a house.  Justin was building a 4-room house for today, but adding in things for future expansion to a office tower.  When building a wall, he would think: “Maybe some day we will want a door here, so let's go ahead and frame the door, and leave that embedded in the wall for future use.”   Or maybe someday we will have a basement, so let's put in a trap door even though there is no basement.   Or maybe we will want a different kind of window in the future, so let's put extra structure in the walls so that it is easier to change the size and type of window.  Or maybe it will be 100 stories high so lets add a foundation down to the bedrock.

On the surface, this might seem like prudent:  what if you do need to add a door?  The answer is simple: when you decide that you need a door, you can open a hole in the wall and build a door.  You don't need the door built before it is needed.  It is a false benefit because until you know the details of the door that is needed, you can't design it.  If the pre-built door is never used, then it is a waste.  If it not exactly like the door that you eventually need, then it is a waste.

We don't build software using the waterfall model because it is impossible to predict what you will exactly need a long time from now.  We don't implements parts of things before we need them for exactly the same reason.  When you know exactly what you really need, only then can you design it and implement it correctly.

## YAGNI

**“You Aren't Gonna Need It”** is one of the principles of agile development. Software projects will often go off the rails implementing things that are not needed.  It is a waste not just today, but it add work that must be done in the future as well.  The ideal agile development is a piece of code that _does exactly what is required, and no more and no less._

I have known programmers who seem to take glee in the ability to make astounding changes easy.  “Look, we can change all the _float_ variables to be of type _double_ with this one configuration switch!”  In almost every case I can think of it was a feature that was never used.  The ability to anticipate changes in the future is so bad, and it is far more effective, and actually costs less, to just wait and do it in the future anyway.

## Build Right for Now

If you need a set of variable with specific types, then build the code with those variables and those types.  Build only what you know you have a need for.

If your class has to respond to five different kinds of requests, then make the methods necessary to handle that. Don't anticipate methods that have no need for now.  It is easy to add methods to an existing class, and if you ever need another method you can implement it then, when you know precisely what the need it.  If you build now without understanding the need, you are likely to build it wrong anyway, and it will have to be changed.  It is easier to build from scratch than to modify an existing method that you are not sure whether it is used elsewhere or not.  This includes getters and setters: if you don't need them now, don't implement them.

Adding extra super classes when you don't have a need is just extra cruft in the code that someone will have to wade through in the future, just to find out that it is not used for anything.

Properly written agile code is written meet the needs that you know about today.  Anything more than you need is a waste that not only delays your code today, but piles up technical debt that wastes maintenance time and work in the future.

## Planning for the Future

This does not mean that you ignore all possible future possibilities.  If you are writing software for Store A, and you know today that you hope to deploy at Store B and Store C, then by all means code to allow the result to be portable across those environments.  If you have a clear understanding of what is needed, then of course implement it.

Don't plan for things that you don't **know** you have a need for.  This is the mistake because it is easy to change in the future.  The hard part is maintaining all the parts that were put in there yesterday.  If you have a lot of code that is unnecessary, that just adds a lot more work.

## The Power of the IDE

Integrated Development Environments (IDE) have become very powerful in recent years.  it is possible to rename a class, and the IDE will go an correct all the code. You can rename or redefine methods and again get automatic modifications in the code.  Some changes can not be automatically mediated, and then IDE will then automatically find for you all the places that need to be changed.

IDEs allow for refactoring code quickly and easily completely eliminating any reason put things in today that you might need tomorrow.  if you need to add a super class over an existing class, it is quick and easy.  If you need to change a data type of a variable, that can be quick and easy to in many cases.

So there is no real need to add cruft in ahead of time “just in case” you might need it some day.

## Conclusion

Justin left the company leaving behind a mass of unfinished code, some of which there was absolutely no need for.  Justin's grandiose plans for code that could be twisted and turned in any way in the future was a complete waste.  None of those needs materialized, but instead a bunch of other, unanticipated needs appeared, and the additional cruft made it harder to implement.

When I am reviewing code, I am looking for lean efficient code that does exactly what the current known requirements are, and leaves the possible “just in case” future enhancements where they belong: in the future.