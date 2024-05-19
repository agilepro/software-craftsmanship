---
id: consistency
title: Keep Things Consistent
tags:
- design
- consistency
---

#  Keep Things Consistent

This general design principle does not mean to never change anything, but to consciously create a paradigm where the same things have the same names and are accessed in the same way as much as possible.

## Consistency

Being consistent means that when someone new reads the code, after they learn the design rules, they are able to anticipate correctly where things will be and what they will look like.  Reading the code becomes easier.  Here are some examples:

*   Indent code the same way all through the code
*   Use naming patterns consistently: class names with capital, variables with lower.
*   Declare member variables at the top of the class
*   If you abbreviate a term, then always use the abbreviation

Most programmers understand and appreciate consistency.  In fact, early programmers often spend far too much time trying to define the exact rules that one should use and follow in order to assure consistency.  A formal definition of how to do it is sometimes too much, but generally expending some effort to do what you think is consistent is generally good enough.

## Parallel Domains

This post is really about recognizing parallel domains: places where you have the same thing represented twice (for technical reasons) and taking the step to make them as much the same as possible.  

(1) A URL has a parameter for “fileName” which holds a data value (the name of a file) which is to be used for processing.   When that value is parsed out of the URL, it must be placed in a variable.  The name of that variable should be “fileName.”  That way, when a programmer reads the code, and composes the URL for testing, it is easy to remember that fileName is fileName.   An arbitrarily different variable name could be used.  There is nothing forcing it to be the same.  The programmer should take the effort to make it the same so that the code is easier to read and understand.  

(2) A particular web address serves a web page, possibly generated from a file, then the last part of the web address should be the same as the file name.  For example if the file is “userProfile.htm” then the URL should end with “userProfile.htm”.  ost web service map web addresses directly into file name, but this does not always have to be the case.   The suggestion here is to always make a direct mapping whenever possible, and avoid making arbitrary differences just because you can.  

(3) If the product is packaged as a WAR file, then the source for that product should have a WAR folder, and all the contents should be arranged in the same way as the WAR file.   It does not have to be this way:  You keep all the classes in one place, all the JAR files in another place, and you can have a build script that gets all the pieces for the WAR file and composes them.   But you should not use a difference arrangement of the source files unless you have a really good reason.  Keeping the source structured in the same pattern that the WAR file is patterned will mean that the developer reading the source will not have to learn two different organizations.  

(4) If a web form labels a value as “SSN” on the screen, then the name of the variable that holds that value should be something with “SSN” in it.  When this is posted back to the server, the URL parameter should be SSN, and the variable name on the server should have SSN in it.  It takes effort to force these to have the same name, but if you do, it will be far easier to follow what is happening.  

(5) Constants in the source should be named as similar to the value they carry as possible.  For example, imagine you have a constant for default car vendor name, and that value is “Honda” then consider making the constant name DEFAULT\_VENDOR\_HONDA so that the constant name and value are somewhat the same.  

(6) If a user interface displays resources to the user that are stored on the file system, try to make the organization of the resources appear exactly the same as the files in the file system.

## Tempted to Improve

Bad examples abound, and it is interesting that the reason for the inconsistency is often because someone tried to improve things:  

In one project all the resource files were in a particular pattern, but the developer of the Eclipse-based studio didn’t like the way they were organized, and tried to improve on it by displaying them to the user in a different organization.  They implemented some folders in the UI that did not exist on disk.  This caused no end of confusion as developers learned the way files were organized in the UI, and could not find files on the disk because they were organized differently.  

The question was: “should I keep them the same, or should I improve they way they are organized.”  The developer honestly thought that the new organization was better, and it probably would have been if implemented everywhere.  But implementing an improvement in one place and NOT everywhere means that you are creating a difference, which often defeats all the benefit of the improvement.  

It is sad, but this advice means that it is better to maintain a poor organization of file, if that organization is consistently used everywhere.   Improvement can not come piecemeal.  If you improve the way something is organized, you must improve to the point where people can say it is the same everywhere.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [code style](https://agiletribe.purplehillsbooks.com/tag/code-style/), [consistency](https://agiletribe.purplehillsbooks.com/tag/consistency/), [design](https://agiletribe.purplehillsbooks.com/tag/design/), [programming](https://agiletribe.purplehillsbooks.com/tag/programming/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2019/01/24/keep-things-the-same/ "Permalink to Keep Things the "Same"").