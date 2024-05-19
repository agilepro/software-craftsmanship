---
  id: branch-handling-with-fixes
---
#  Branch Handling with Fixes

This is really a management issue, not a coding issue. In short: when a bug is fixed on a branch, it should be at the same time (or immediately after) fixed in the trunk. The logic should be obvious, but I found out recently that some development teams are NOT following this guideline.This post is an attempt to lay out the logic of why a software development team must follow this.

## Multi-branch Development Basics

The situation in question only exists when you have a software product, that has been delivered to real, paying customers, and has been out there long enough, and those customers are paying for support. What will inevitably happen is that a customer will a have version of the product installed (let’s say version 3.6) and they discover a problem. This may not be the latest version (which let’s say is version 4.2). In order to support that customer, the maintenance team needs to deliver a fix to the customer, and that fix has to be compatible with version 3.6. The customer can not upgrade to version 4.2, because that involves some significant effort, and might introduce additional problems associated with small version incompatibilities with their running data and configurations/extensions. In order to resolve the problem, the customer will be given a “patch” that is compatible with version 3.6.  

Version 3.6 was released as a complete product, and 4.2 presumably later, and there could be many changes between these. Normally a development team employs a source management system that allows “branches.” A branch is a full, virtual copy of the source, at a particular version. when a developer accesses the source of a branch, they get a full copy of the all the files. It is then possible to make a change in version 3.6, and check that change back in, and other developers working on release 3.6 will get those files. But things checked into the 3.6 branch will NOT automatically become part of release 4.2 or any other version. Each branch is isolated from each other.  

It is important that they remain isolated, because the different releases are different, and as such there is no guarantee that a particular change in the code in one branch will have the same effect in another branch. In some cases the code from one branch is simply not present in the other release, having been removed and replaced with completely different code.  

There is no guarantee that a fix will work in all branches because of small differences, however in reality the bulk of the source code will be very similar. Generally, the fundamental structure, and the fundamental way that the code works will remain the same between release 3.6 and release 4.2. It is in fact quite common for a customer to discover a bug which exists in all branches. If the customer runs into a bug that has been in the product for several years, then it will have been in all the releases made over those many years.  

One then asks the question: when a bug is found that is known to exist in 10 different branches, do you fix the bug in all 10 branches? This is a business decision that depends upon the risk and likelihood of the bug, and on the number of different customers using each release. Notice that there isone branch that is special, and that is called the “trunk.” The trunk is the branch that all the new work is being done on, and from which all future release branches will be made. So a fix made in the trunk means not only that the next release will contain the fix, but also that all future releases will contain the fix. 

In most projects it is obvious that the fix should be made in two places at least: the branch for the customer who reported the bug, so you can make a patch, and the trunk so that the bug is removed from all future releases. It might then make sense to more fixes in other branches depending upon customers, likelihood, and risk.

## The Question: When do you fix the Trunk?

The question at hand is whether the trunk should be fixed immediately, or whether it is OK to wait for a better time to put the fix into the trunk?  
The answer: **the fix should always be incorporated into the trunk immediately.**  
There are several reasons:

### 1\. Doing it immediately will take the least time, and use your investment best.

Consider the work that goes into fixing a bug. In general there is a tremendous amount of time spend in figuring out exactly how the bug manifests itself. the customer may call in with a vague description like “This file got corrupted” but subsequently searching and finding the exact situation that causes the file to be corrupted may take a long time. I have seen bugs where programmers have spend many long days, sometimes 10 or 20 days simply to determine what the events that lead up to the problems have to be. Part of this time is spent searching through all the (millions) of possible courses that might lead up to this, and evaluate though a combination of code examination and basic experimentation, which might combine together to cause this problem.  

In most cases, once the cause of the bug is known, the fix can be a small change, often only a few lines of code. The “work” involved in making a fix is to understand the the details of how that part of the code works, and to determine the change to the code that will resolve the problem, without causing any other problems. Typing in the fix takes no time at all. Finally, the fix must be tested, both to make sure that it really does address the problem, but also to make sure that it does not cause another problem someplace else.  

By the time the bug is fixed, there is a significant investment in learning the specifics of the situation. The developer who has designed the fix, has thought about the problem from many sides, and has in mind all of the issues and contingencies. If that person moves forward and makes the same fix in the trunk, there is no additional time in investigation. A little bit of time is needed to make sure that the fix is appropriate to that code base, and to test that the fix works and does not break anything. It is certainly not the case that you can throw the same code into the trunk without any additional work — you must do some work including testing — but since all the issues and special situations are in mind, this work goes as fast as possible.  

If you, on the the other hand wait a time, then these things fall out of mind. In most cases waiting a few days is not a big degrade of familiarity, but after a couple of weeks, the programmer is has spent time working on other problems, and issues are no longer right at hand. After a couple of months of delay, you find that the programmer has to go back in and investigate what was done, and to re-think about all the special conditions. This re-learning is an additional expense that you do not need to incur if the fix is moved immediately to the trunk. If it turns out that a different person does the migration of the fix to the trunk, then there is significant learning that has to occur, to become familiar with the details, the conditions, and the code involved. If you have another person doing the migration, it can triple or quadruple the cost of doing the migration.  

It is the “becoming familiar” with the specifics of the problem and the solution that is a huge investment in addressing bugs. Once you have a person that is completely familiar with the situation, that investment has been made, but the value of that investment is fleeting: it disappears after a few weeks. If you do not go ahead and migrate the bug fix at that time to the trunk, you lose a large part of that investment, and you have to pay it again, to bring someone else up, or even the same person at a later time, up to speed. Delaying, and spreading the same fix out over time, is the most expensive way to fix the bugs.

### 2\. Delay in fixing actually creases the number of branches with the bug.

The bug was a problem in the code that, presumably, the development team did not know about. Once a customer find the problem, and the dev team becomes aware of the problem, it may be that the bug is then known to be in many branches. If you have 4 branches and the trunk, it may be that the bug exists in all branches and the trunk. If another customer find the problem in a different branch, it may be that you are forced to make the same fix in yet another branch. However, the number of fixes that you ultimately might have to make is bounded by the number of branches. no matter how many customers run into the problem, the most number of times this bug will have to be fixed is five time (for 4 branches and the trunk). 

If you delay, and you have a release, you then have 5 branches and trunk. If you delay longer, and have another release, you will have 6 branches and the trunk. At that point, if customers start running into the problem, it is possible that you will have to fix it 7 times, instead of 5 times which was the worst case at the time it was discovered. The longer you wait, the more branches you will have, and potentially the more work you will have.  

Therefor, it is obvious, that making a fix int he trunk is critical. The one fix in the trunk will fix all the future branches as well. Thus the fix in the trunk is multiplied in effectiveness over the fixes int he other branch, even though making a fix int eh trunk is no more difficult than making a fix in a given branch.  
Delaying to fix the trunk, actually increases the “technical debt” as new branches are produced.

### 3\. Unhappy customers

Leaving a bug in the product will always raise the risk that a customer will be unhappy. Once a bug is known, it becomes a liability until it is fixed. When a customer discovers a bug that is not known, and that nobody has ever run into, you can always make the argument that it must be rare, because nobody has ever run into it. But when a customer runs into a bug that you already know about, it becomes a different story. The customer wonders why you left that bug in there.  

New customers are the most likely to use the product in new ways. Most bugs are found in the first couple months of a customer using a product. New customers usually get the latest version, which comes from the trunk. It becomes then much more important to fix the problem in the trunk so that new customers do not run into the problem and become discouraged. As new releases are made, new customers will continue to get builds off the trunk. Therefor, fixing a bug once in the trunk will address the problem for a majority of all the future customers in one fix.

## Summary

The conclusion is this: it is very important for a bug fix to be put into the branch that the customer found it in, and ALSO critical that the fix go into the trunk. Checking into the trunk will fix all future builds, and it is will greatly decrease the risk that new customer, who usually find the bugs, will encounter it. Finally, because you have made a significant investment in getting a developer up to speed, it is critical that that same developer work immediately to check a suitable fix into the trunk. Any delay will raise the total cost of maintenance for the project. Incorporating the fix right away will be much quicker on a historical basis, and will make the best use of the time you have investigated. Once the bug is fixed in all the places that it needs to be, the subject can be relatively safely dropped. The technical debt has been payed, and is no longer being carried. The development management does not have to worry about when to schedule the fix, and the manager does not have to waste time tracking a list of bugs that need to be migrated.
  
Development teams that make a practice of fixing a bug on a branch, and NOT fixing it int he trunk immediately, are teams that care nothing about efficiency, and only wish to maximize the amount of salary they receive, and squandering the investment that the company is making in the product. Such products can not compete with a well run project, that always stamps out as many bugs as possible, immediately.