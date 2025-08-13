#  Avoiding Broken Builds

Poor coding practices and bad habits can cause build breakage.  There is a simple procedure that can almost completely eliminate the risk of broken builds.  
Here is the procedure for checking in code:

*   refresh entire workspace (sandbox) with the latest code from the repository
*   rebuild the entire code – if build problems, fix and go back to 1
*   run smoke tests – if test fails, fix and go back to 1
*   check in entire workspace

If you follow this procedure, you will never check in compile time errors.  
Consider this: when you “refresh” from the repository, you have an exact copy of the tip of the repository combined with your changes. The repository has no compile time errors, so any errors you encounter are due to your changes. You address you. If the entire build works correctly, then when you check in the entire workspace, the tip revision is exactly what you had in your workspace, and there will be no compile time errors.  

Let me ask you: how is it possible that you will cause compile time problems if you follow this procedure?  

Most of the problems are caused by lazy programmer practices:

*   Failing to run complete build before check in. The build is automated, and takes less than a minute, but some programmers fail to follow this step. They do a build in eclipse, or through some custom script. Our complete build throws away all intermediate results, and starts with a completely clean output directory. Every artifact is built directly from the source. Some programmers take the shortcut of doing only a partial build which clearly does not test that everything is compilable.
*   Failing to check in the complete workspace. Programmers will check in a few files here, and a few there. This means that their build did not test what they are really checking in. Checking in too many files or too few files can leave the repository in an uncertain state. You must make sure that your workspace has 100% of the files from the repository, and no files that you will not be checking in.
*   Failing to refresh from the repository. Clearly, if you do not have all the most recent changes, your build is not really testing what the repository will be after you check in.
*   Failing to install correctly. Some programmers make simplistic assumptions about what has or has not changes, and they take shortcuts in installing into the server. They must do the proper install.
*   Failing to run the tests. An inexcusable shortcut.
*   Failing to fix problems found in the tests. Again, if you check in code that is broken, then you have broken code in the repository.
*   Purposefully check in partial implementations as a convenient way to move code to another programmer. This just simply is too disruptive to the team as a whole, and only for the benefit of one or two developers, that it can not be allowed. The checked in code must ALWAYS build and run.
*   Checking in a mistake, and then not doing anything about it. Once anyone in the team discovers that the build is broken, it needs to be fixed at a higher urgency than anything else. This whole scheme works only if programmers can trust the ability to refresh their source without problems, and when a broken build gets checked in, it breaks everyone's working environment. But simply “hoping someone else will fix it” it a chief cause of problems.

If you follow the four steps, it is a mathematical certainly that you will not cause any build problems. However, it is still possible to have logical problems within the code. See [#5 Avoiding Bugs Caused by Multiple Programmers](https://agiletribe.purplehillsbooks.com/2011/10/03/5-avoiding-bugs-caused-by-multiple-programmers/).

This entry was posted in [practice](https://agiletribe.purplehillsbooks.com/category/practice/), [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/) and tagged [build](https://agiletribe.purplehillsbooks.com/tag/build/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/02/4-avoiding-broken-builds/ "Permalink to #4 Avoiding Broken Builds").