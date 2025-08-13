---
  title: JavaDoc Essentials
---
#  Keep JavaDoc with Java source

This should be obvious, but the advantage of documenting your API directly in the Java source file using a mechanism known as “JavaDoc” is that it is far easier to keep the documentation and the source in sync.   If this is not obvious to you, then read on.  

I worked with one team that actually kept a copy of the API just for the java doc generation.  To be clear: the API code was checked into one location in the source repository, and a copy of the classes with interface methods was stored in a separate location in source repository.  This separate copy has all the JavaDoc comments in it that were used to create the generated documentation.  

In this case we were using Java.  Other languages have similar mechanisms to allow you to put annotations in the actual source code which is then read out and used to generate documentation.  Any of those mechanisms are equivalent for this discussion.  When I say “JavaDoc” below I do not mean to imply this this is uniquely about Java language, I just use that as a generic term for embedding some extra metadata in the code.  

This has the obvious flaw that you have two copies in the repository, and programmers must manually keep the two in sync.  This can lead to the following problems:

1.  **Incorrect Documentation**: If you change the API that you use for coding, and forget to update the version that has the JavaDoc in it, then the generated documentation is wrong.  It may be hard to track down this error, which is found mostly by review of the documentation, or complaints from customers.
2.  **Non-Modularity**: The purpose of modularization is to keep everything that is related together, because a person's scope of vision is limited, so things that are closer together are easier to keep in sync properly.  By spreading internal details far apart int he system, you increase the likelihood that there will be a failure to keep things in sync.
3.  **Invisible Connection**: Making a copy of the source and placing it in a different location creates associations between all the parts with the same name, but that association is not clear or apparent. There is nothing in the one file that tells that the other file exists.  The developers just have to “know” this from some external source.  Source code should be complete and transparent, but invisible connections work against this.
4.  **Extra effort**: clearly every API change requires that the developer go to a different file and update the comment there.  That may not seem like a lot of extra work, but compare that to updating two lines that are a few lines apart in the same file.  Code reviews are further complicated, because you don't see all the changes together in one file, you have to go look across multiple files to make sure that all the changes are reflected correctly.
5.  **Redundant Changes**: since the file that had the actual source retained an OLD copy of the JavaDoc comments, it would be possible to accidentally update the wrong version.  Thinking you had fixed the documentation, you later find out that not only has it been not been documented, but you wasted time updating the wrong version. At the very least the JavaDoc comments should be stripped out of any file that is not used for generating documentation.  Since the JavaDoc in the files used for code production were out of date, you might spend a lot of time bringing them unnecessarily up to date.
6.  **Multiple check-ins**:  Most source control systems will allow all the source from anywhere to be checekd in in a single atomic update, but the practice in this organization was not to do this, but to check in one folder (directory) at a time.   This meant that the source for generating code was checked in separately from the source for document generations.  Not necessarily a problem, but it increased the likelihood that you forget the checkin, and it was possible for someone to pull a copy of the project with incompatible files.

It should be obvious to everyone that you should keep all the similar technical information together.  
Why did this organization do this?  I believe it was suggested by contractors who are paid by the hour.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [practice](https://agiletribe.purplehillsbooks.com/category/practice/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/10/02/keep-javadoc-with-java-source/ "Permalink to Keep JavaDoc with Java source").