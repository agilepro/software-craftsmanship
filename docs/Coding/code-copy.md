#  Code Copy Guidelines 

This post presents some guideline reduce duplicates in the code. Whenever you notice that you're writing blocks of code that are substantially similar, try to make a routine (method) that embodies that code and call it from all the places. This reduces the amount of code.  Furthermore, if there is a bug in the approach, or the approach needs to be changed, there is one place to change it, instead of many.  
Duplication (inadvertent or purposeful duplication) can lead to maintenance nightmares, poor factoring, and logical contradictions. Every line of code that goes into an application must be maintained, and is a potential source of future bugs. Duplication needlessly expands codebase, resulting in more opportunities for bugs and adding accidental complexity to the system.

**Principle of abstraction**:  the is the basic design principle that has the purpose to reduce duplication of information in a program

**DRY principle**: This is a principle that states that every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

**Modular /Structure Routine programming**

1.  The first reason to create a routine is to avoid duplicate code. Some say that creation of similar code in two routines is a decomposition error. Write the code in one place, call from many.  The lowly subroutines is the greatest technique for improving performance.
2.  Code put into modular routines can be reused in other classes/program more easily than the same code embedded in a larger routine. It makes sense to break code that performs a particular task or calculation into its own routine if that task of calculations seems reusable.

There are some reasons that run against reusing the method:

1.  If the copies of the code will be heavily modified, it can be better to have the separate copies so that each can be changed independently.
2.  If a system has already been implemented, the reusable assets are there for the preference. During maintenance, you often do not know the assumptions that a module or functionary is making, so changing it is risky. It is safer to add new code than to change old code, refactor code is quite hard.

And there are reasons that a programmer might copy code without knowing whether it is the right thing to do.  When creating a new feature that you think is similar to an existing one, sometimes it is easier to copy the existing feature (code) and then change the copy to produce the new feature. This is because when you are exploring new functionality, it is hard to experiment with a new capability, while at the same time preserving the old functionality for the previous use.  Making a copy allows the programmer to focus exclusively on the new function, and know they are not breaking the old function.  It is critical that after the experimentation phase is over, that the programmer return to the original, and refactor to eliminate the duplicate parts.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2023/01/17/code-copy-guidelines/ "Permalink to Code Copy Guidelines").