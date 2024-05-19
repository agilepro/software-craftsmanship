#  Never Suppress Build Warnings

There are often ways to specify within the code that you want to suppress some or all of the warnings that the compiler might produce.  

Presumably there is some warning that you are getting that you disagree with.  You want to do something, and it is not entirely kosher.  It can be convenient to turn off the warnings just to make the warnings go away.  This is a mistake and it is sloppy.  

In general, you should never suppress warnings.  Warnings are there for a purpose, and turning off warnings will prevent you from getting important information sometimes.  There are ways to code correctly and avoid all warnings, and the goal is simply to code correctly.  You fellow programmers are coding correctly, and you will get along better if you are all coding to the same standard. 

Often this happens when you adopt source from a different group, and it does not perfectly fit the environment, causing a lot of warning all over the place.  There is no short cut.  Go find all the places that are being warned about, and fix the code.  You should not have any code that causes warnings in the first place. 

There may be a warning that is impossible to get around.  You will have to show me one before I believe that.  But hypothetically one might exist.  If you have to suppress a warning, you should be as specific as possible.  If there is such a warning that you feel you are forced to encounter, and there is no way to code correctly without getting the warning, then it had better be a very widely known and highly publicized problem.  
 

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [compiler warnings](https://agiletribe.purplehillsbooks.com/tag/compiler-warnings/), [errors](https://agiletribe.purplehillsbooks.com/tag/errors/), [suppress warnings](https://agiletribe.purplehillsbooks.com/tag/suppress-warnings/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/03/23/26-never-suppress-warnings/ "Permalink to #26 Never Suppress Warnings").