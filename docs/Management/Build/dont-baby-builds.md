#  Don't Baby Your Builds

In a conversation this week, one developer insisted that a special build machine should be built to assure that the build is always comes out the same.  My response: if your project is building differently on different machines, then you have a much deeper problem.

## Setting

Every project should have a build script.  There are dozens of tools to use: make, Gradle, Apache Ant, even a simple shell script or bat file.  In this post I won’t ague the relative merits of these, but instead simply insist that every project should have **some way to build** that is reliable and produces the same results every time.

## Maybe Baby

Any build script, will have some requirements on the build-time environment.  Apache Ant requires that Ant be installed on the machine, the same is true with any specialized build script.  A BAT file will run only on Windows.  A shell script only on Unix.  You get the idea. 

These dependencies should be **clearly spelled out**.  If you are compiling Java classes, then clearly the build-time environment needs to have Java installed. It will always be a benefit to any project to keep these requirements as minimal as possible, because that will make it easier to build.  If all you need is Java, then any machine with Java installed will be able to build the project.  If you have a list of 25 packages that need to be installed, then anyone wanting to do a build will have a big delay to get those installed, which will reduce the number of people who can help on the project, and will increase the cost of maintaining the project. 

The more dependencies you have, the greater chance that you will get into a dependency conflict.  A programmer working on project A might be essentially prevented on working on project B because both can’t be built on the same machine.  Can you eliminate that dependency?  Instead of requiring that TomCat be installed, can you include the library that is needed for the build into the project?  Like all aspects of a project, if you can simplify the build requirements, you will reduce the cost of maintaining the project.

## Controlling What is Generated

The Java compiler has command line flag that specified what level of class file you are outputting.  The build should be as specific as possible.  If you need JDK 1.6 classes, then specify JDK 1.6 classes to be produced.  Do not leave this to be whatever level of Java is installed.  Having a reproducible build means controlling how every part operates so as to operate the same way every time.  Eliminate differences due to arbitrary environmental differences. 

_**The build should produce the same output on every machine regardless of the details of that build environment, as long as the minimal build requirements are met.**_

## Hidden Dependencies

A “hidden dependency” is a difference in the build environment that causes a difference in the build output, but is not part of the specified list of dependencies.  Hidden dependencies can creep in at any time.  Someone adds a new module to the project that requires a special build tool.  That developer adds the build tool to the build machine, but fails to add this to the list of known dependencies.  The build works on their machine.  It works on the main build machine. 

A more nefarious problem is when you have moved on.  Release 5 was completed years ago, and by now you are on Release 8.  What if Release 5 has hidden dependencies?  What if the current version of the code has new modules that conflict with those required for the older version?    Nobody sees the problem until too late:  a customer has a critical problem with Release 5 and you need to produce a patch.   Maybe the build does not work.  Or worse, maybe it works but produces with a hidden difference that causes worse problems when running.  Can you afford to go through a complete test of the product for this patch?

## Testing the Build

Sometimes it is convenient to have a single build machine, particularly if the build is automated.  That one machine is building continuously and putting the output into the location that everyone can access.  This is convenient, but there is a danger:  If you build only in one environment, you will never know if there are any unknown dependencies. 

You must, therefor, occasionally test the build.  That means, take a fresh machine, set up the listed dependencies, and ideally nothing else.  Run the build according to the documented build script.  This must produce output that is identical to what you are regularly using in your development and test project. 

It is a good idea to insist that every developer do the build exactly according to the standard build script.  This means that every developer is testing the build every time they run it.  All of these developers should be getting reproducible results.  If every developer is testing the build, then maybe there is no need for a dedicated build machine.  It is a tradeoff:  convenience of a centralized continuous build will warn everyone quickly of build problems, and will make the latest version available to everyone easily.  However, a dedicated build machine makes the project _**fragile**_.  Because the dedicated build machine is isolated and always has the same environment, you are unable to detect if there is a hidden dependency to this environment.  With a fragile build, you will not have confidence that the project can be built in the future.

## Summary

A build machine may be a convenience, but it must **_not_** be a requirement!  A stable, robust project must be able to be built easily and be built anywhere, with only a minimal set of clearly documented requirements.  The only way you know that your build is reproducible, is to regularly build the project in multiple, varying environments. 

Avoid fragility.

## Resources

*   [Better QA: The Benefits of Using A Build Machine](http://clearbridgemobile.com/better-qa-the-benefits-of-using-a-build-machine/) – argues the opposite case that holding OS version and everything constant will give you more accurate tests.  I disagree because OS version really do change in the real world, and holding everythign constant means you are only testing one very specific environment.
*   [The Magical Build Machine](http://blog.codinghorror.com/the-magical-build-machine/) – Includes some other horrors of a build machine.  It engenders an us-versus-them situation between coders and testers.  It allows build scripts to get unnecessarily complicated — forcing everyone to do the build will help keep the scripts simpler.  Recommendation is to make sure that “magic” is not required to do a build.
*   [The Build Server: Your Project’s Heart Monitor](http://blog.codinghorror.com/the-build-server-your-projects-heart-monitor/) – Same author as before points out that a continuous build offers benefit beyond just building.  I agree.  My concern is when it is the ONLY place that you build.  Use a build machine, but don’t forget to also have the build happening in many other places by many other people.  And most important:  when the build fails on a developer machine, fix the build, don’t just tell the developer to make their machine more like the build machine.
*   [Separate servers vs local machine for builds on solo project](http://programmers.stackexchange.com/questions/26375/separate-servers-vs-local-machine-for-builds-issue-tracking-etc-on-solo-project) –  a stack overflow discussion on the topic, closed for being “opinionated.”   My take is that for a solo project, you need to be sure to do builds on a machine separate from your primary development machine — I use four different machines for building myself, and every release I build on all four machines.  If an automated build machine helps you do this, then that could be a benefit for solo projects.
*   [Does your project have a Heartbeat?](http://weblogs.asp.net/jdennany/39938) – Another contrarian who believes that the build machine should be pristine.  Warning: this could make your build fragile, and years from now you might not be able to build the old copy of the source.