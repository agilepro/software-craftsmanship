#  Not all Bugs Deserve the Same Handling

It is good to put in place standards for handling reported problem, but the process is not the same for all bugs.  Some deserve careful elaborate process, while others should just be snuffed and move on.  

A standard process for a bug report might be:

1.  reproduce the problem so you know it really exists
2.  get a developer to find the coding problem and make a fix
3.  test the fixed version to see that it no longer happens
4.  examine the rest of the code to see if there are other similar problems

That is the standard way to handle bug, and it makes good sense on many problems.  For example, a loop that was calling a method and making a mistake because the programmer expected the value to be one less than would be returned.  Once you find that bug, make a fix, and verify that it is fixed, you might also scan other uses of that method to see if the same mistake was made elsewhere.

## Null Pointer Exceptions (NPE)

With the Java programming language, if a variable is set to null, and you attempt to dereference members of the object, you will get a standard exception: NullPointerException.  This exception is not very helpful, but it is important as it marks a fatal programming logic flaw.  The mistake is obvious: some code that should have been written to expect a null forgot to check for it.  The null might be indicating a higher level concept, like a “Customer does not exist”.  If the code is expected to interpret null this way, then the code needs to check and report the proper thing.  Instead of calling the “debitAccount” method on the non-existing customer, you need to code to do something else, like throw an exception that there is no account to debit for a customer with that name.  

The interesting thing for this blog post about the NPE is that it should NOT be handled like a normal bug.  Here are the differences:  

1. Don’t reproduce the problem, because it is usually obvious.  If it occurs once, then we know it can happen, and might happen again.  There is usually no need to determine exacly how it happened, but simply the presence of a null is enough to know that the code should be changed to check for it.  I say “usually” because there are some cases where the code really should not be experiencing a NPE, and in some special cases you might want to treat this as bug worthy of complete investigation.  
2. The problem can be immediately given to a developer, and the fix is usually obvious  
3. There is little reason to run a special test to verify that the fix present a NPE, because the code is obvious.  As long as the change does not break any of the other existing tests, then the fix is surely fine.  
4. There is no need to look for other occurrences of the same pattern, because usually NPE errors are not the result of a specific style of programming, and instead is a simply a coding goof.  Yes, the same goof might have been made elsewhere, but there is no real way to search for this.  A variable should have been tested for null before dereferencing it, however there is no suitable way to search for this.

## Summary

This is probably not a very clear blog post — but I wanted to get it out there.  NPE is an example of a class of bugs that should not experience the same bug handling process that most complicated bugs follow.  

Another example is help-file spelling corrections. The fix is obvious (correct the spelling) and has no side effects, so there is no need for a lot of overhead around that.  

It seems that there is a general principle that there are different kinds of bugs, which require different types of handling, and if the development team is locked into handling all bugs with exactly the same procedure, they will be working in a sub-optimal manner.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [practice](https://agiletribe.purplehillsbooks.com/category/practice/) and tagged [bug tracking](https://agiletribe.purplehillsbooks.com/tag/bug-tracking/), [debugging](https://agiletribe.purplehillsbooks.com/tag/debugging/), [NPE](https://agiletribe.purplehillsbooks.com/tag/npe/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/08/21/not-all-bugs-deserve-the-same-handling/ "Permalink to Not all Bugs Deserve the Same Handling").