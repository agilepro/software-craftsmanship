---
  id: excessive-branching
---
#  Avoid Excessive Branching

Creating and maintaining many branches causes technical debt and increases risk of bugs.  Agile practitioners already know that technical debt is that accumulation of unfinished work can cause projects to be late late late.  Building up a lot of technical debt is a problem because the debt needs to be payed before you can ship.  One way that debt can be accumulated is by profligate use of branches.  Avoid that at all costs!

## The Antipattern

Some developers — particularly those new to leading a team — want everything to be as organized as possible, and embark on a project where every feature is developed on a separate branch.  The project starts with 20 user stories to implement.  The leader allocates a branch of the source repository to each use story, so the team is developing on 20 branches.  
This might sound like a good idea for the following reasons:

1.  Developer of story #1 is not disturbed by development of story #2.  This is not as significant as you might imagine.
2.  If story #3 is late, it can be pulled from the release.  However there are many other ways to do this just as effective.

There are however some potential problems:

1.  Every line changed in one branch is a potential conflict with 19 other copies of that line.  While you are shielded from change, those potential conflicts are hidden, but they will be discovered later when you merge.
2.  As the amount of change increases, the chance of conflict goes up as the square of the amount of change.   If you change 10 lines each branch, there is X amount of change of conflict.  But when you change 100 lines on each branch, there is 100X chance of conflict.   If you change 1000 lines, there is 10,000X chance of conflict.
3.  Conflicts are resolved much later than the development, and so some of the ideas around the development have been forgotten.  The developers have to be refreshed in the work before they can find the right merge.
4.  Because a resolution of a conflict may require a change, the amount of code depending on that change is much larger, so there is potentially a large about of rework that would have been unnecessary if it had been addressed immediately.
5.  Because the merge comes after development, you have relatively little testing time, after the merge, and there is a higher possibility that a unseen bug will escape into the release.
6.  Each branch is at some level a copy, by having lots of branches you are effectively trying to manage a lot more lines of code.

## Merging is not Perfect

Understand that merging changes is not perfect.  It works well most of the time, but there is always a risk.  Code merging is a line by line symbolic comparison of two versions of the code, and resolving differences generally by determining which change was most recent.  
The merge may signal a conflict if changes from two developers effect the same line.  These get reviewed and resolved.  It is a bother, but this is the not the real problem.  
There is a much greater risk associated with merging incompatible code that is one different line.  See my post “[The Urge To Merge](https://agiletribe.purplehillsbooks.com/2017/12/16/the-urge-to-merge/)” for a practical example of how lines very far apart can be incompatible.  Merging this code will cause a bug, but will _not_ signal a merge conflict.

## The Longer You Wait, the Greater the Risk

The risk of a merge-induced bug can never be eliminated.  However, you can reduce the risk the most by merging frequently, merging smaller chunks of code, avoiding long waits, keeping the code base current with all changes, and always testing with all of the co-workers changes.  (See the recommendations at the bottom of “[The Urge To Merge](https://agiletribe.purplehillsbooks.com/2017/12/16/the-urge-to-merge/)“). 

It is not just merge problems, but also design problems increase when working separately.  Two different programmers may find they need to extend a class, so they each add a new method to the class that does the same thing.  It is unlikely that they will use exactly the same name and signature, and they even might factor out the problem differently.  The point is that both developer are creating the same thing twice, and that is a waste.   It is easy to say they should coordinate better, but a good programmer created 20 to 40 functions a day, and discussing that level of detail with all your team members is simply not done or even possible. 

The duplication will not be discovered by testing, since there is no bug, just redundancy.  If discovered, it would be good to consolidate: make all the final code use one implementation, and delete the other.  However, this is not easy:  the implementations can differ in subtle ways.  They might handle edge conditions differently.  There might be side effects in one that are not in the other.  You must of course do a full review, understand all the implications, and then understand all the calls that are made, etc.  This could be a significant extra job that would never had happened if developers merged frequently. 

The design problem is more than just duplication.  Imagine that they are not duplicates, but different approaches to the same thing.  The two different developers might end up creating a large amount of code dependent upon this approach.  
For example, one developer implements a method that returns an array of Strings (String\[\]) and the other implements the same thing that returns a list of String (List&lt;String&gt;).   This is two ways to do the same thing, but they are not interchangeable and the choice effects how you implement other things.  One would create many many methods that all retrieve and manipulation arrays of string, while the other implements different functionality on Lists of Strings. If this goes on for a month or so, both bodies of code could be significantly large. 

Once a large body of code goes down the path of implementing everything with String Arrays, it can be a significant task to rework in order to Lists of Strings.  This extra work would never be needed if the developers had merged frequently.  As they were working in the same class, they very likely would have noticed the overlap.  Early in the schedule, it would be easy to change, but the difficulty increases geometrically as the amount of code committed to one approach increases.

## Recency is Important

It will always be the case that different programmers will create conflicting code, either bug or design issues.  They must be resolved.  It is quite easy to resolve a problem that is caught on the day it was created.  The developers involved have all the specifics about the implementation already in mind.   All the rational behind shy they took a certain approach are in memory.  It is easy to remember all the specifics about the changes that were made.  If the merge is made every day, then there is only one day's worth of changes to remember. 

The problem with working on branches is that it moves the merge to be many days or weeks later than when the coding was done.  A programmer writes code on Aug 1, and merges on Sept 15, may have forgotten significant details about the changes by that time. It is far less likely to notice that a problem (unless a test fails) and even if the problem is found, it is far more likely that important details that are necessary to make the code correct would be forgotten.

## Team Testing is Lost

All changes can never be isolated.  A new feature may require a change in a low level method.  That method may be used many different ways.  When programmer 1 makes a modification to that low level method, the team will need to know that all the other code that depends on it will still work. 

The change from programmer 1 is not supposed to effect any other code, but if programmer 1 works for days or weeks in a separate space, there is no way to know. Programmer 1 will test everything possible, but the fact is that programmer 1 is focused on one feature, while other programmers are working on other.  At the end of the development, when the code is merged, only then will the other programmers get a chance to try testing the code, and only then compatibility problems will be found.  At that time, the original programmers will have forgotten many of the reason for the particular design decisions. 

It should be obvious, that if programmer 1 changes a low level routine, you want to get a copy of that routine to every developer as soon as possible!   If there is a compatibility problem, it would be best to find it immediately.  If the changes code is distributed to all developers that same day, and a problem is found, then resolving it on the same day is far easier and far more effective than later when the details are forgotten. 

Imagine that the incompatibility requires that a slightly different approach is taken.  It is better to find that out on the first day, instead of allowing programmer 1 to continue programming on the mistaken approach for days or weeks.  In a sense, all of that coding is a waste since it will ultimately have to be changed.

## Sometimes Coordinated Change Needed

There are situations that the base system needs to be changed, and that change will effect many developers.  For example, a method was returning a 32-bit int, and someone discovers that it needs to return a 64-bit long.  There is a bit a of pain involved.  All the points of code need to be found and changes from int to long. 

While this is a bother, and it requires some effort from all members, this is handled best by doing it quickly.  Programmers are alerted about the change.  One programmers makes the change and fixes the known spots.  Every developer pulls those changes and then patches up any problems they find, and the whole operation takes anywhere from a few minutes to a few hours. 

Contrast this to the case where a programmer makes this change in one branch, and allows others to continue on other branches without the changes.  The large number of changes is likely to conflict, and the longer you wait the greater the problem becomes.  Merging weeks later means that none of this is present in mind, and so there is a lot of extra effort involved in remembering the details, and doing the right things.

## Isolation Solves Nothing

This is the area of the biggest mistake of project leaders.  They fear that one programmer's change will always be interrupting the code of others.  So they think that by isolating developers from each other will allow them to be more productive! 

This is fed by an irrational assessment of the incident:  every programmer can remember times when someone else made a change that broke their code.  Those are dramatic events that stand out in memory.   But isolating programmers does nothing to reduce this?   All it does allow those problems to persist longer, to allow more to be built on the errant approaches, and to make the problem must greater at a time removed from when it is fresh in mind.

:::tip[Key Takeaway]

Any code that one programmer writes that conflicts with another will remain a problem no matter how long you wait to merge it!

:::

Waiting to merge only increases the problem.  

A good developer will need isolation for a matter of hours.  That is, you make a small change, you find all the coordinated changes, you build, you run the test suite, you test manually that your change works.  You make small changes this way:  you change the data layer to store and return a new value; you change a particular screen to show and prompt for a new value; you add an additional report format, etc.  But it is easy to make a change and test that change in less than an hour, or in any case no more than a few hours of work.  As soon as possible, those changes should be merged into the common code, and distributed to all other developers.  If this causes problems with any other coding effort, it will be found and solved quickly.  

Even in the case where the programmer is working on a difficult problem that takes a couple of days to find and fix, that developer benefits by incorporating changes from others regularly (i.e. hourly).  The longer any developer remains isolated, the greater the debt that is built up.

## Coherence is a Benefit

Leaders need to understand this.  It is possible to make small incremental changes that do not break other developer's work.  Many incremental changes are additions: like adding new methods.  In general, additional changes do not cause any problems with others.  Adding new dialog windows, adding new fields on a screen, adding new class members, adding new methods, adding new data files, all of this does not generally break the work of another developer.  Changes can almost always be made a way that does not break previous functionality. 

This may be hard to understand, but it is important.  Adding a feature properly, by making small changes that are implemented completely, does not negatively effect other programmers.  If you need a new config parameter, it is possible to add a method for that value that supplies a default if it is not there.  Then, everything continues to work for programmers working in an environment without that config variable.  If you need to render output in a new way, it is possible to add the new way that does not break the old ways of rendering.  This is the whole point of abstraction and encapsulation that these changes can be made without violating the old contract, but simply by adding new things to the contact. 

Coherence is the idea that all developers are working on the same code.   The biggest benefit is that if one developer needs to change an object contract, they can make all the change, even in the features that others are working on.  An example is adding a parameter to a method: if the code is coherent, you can easily find all the places the method is called, add the parameter, and commit the entire change at once.  Simple changes like this most often do not disturb the work of other developers when pulled.  This is far less interruption to a developer than waiting to resolve problems later.

## Branches Create Waste

No matter how you see it, having a lot of branches increases the amount of work.  There is simply more line of code to work with and manage.  Having each developer manage a complete copy of the code is far less efficient than having a bunch of programmers working on the same code.

## Feature Release != Code Merging

One cited benefit is that if a feature is not ready, it could be pulled from a release at the last minute. 

Programmers develop a pool of code to support a new feature.  The feature might not be ready in time for a release, so the leader decides to pull the feature from the release.  But this does NOT mean that you need to pull all the changes that programmer had done from the release.  Instead, you would remove the menu option that takes the user to that feature.  Or the screen would be changed to not show that feature.  Because the user can not get to any place that uses the code, the unfinished code is not a problem in the code base.  There is no need to eliminate that code. 

For example, imagine that a new feature reads and writes a new file format, and displays a new set of values.  Removing the menu option that brings the user to that display will eliminate any possibility that the new file format will be read or written.  There is no real problem with having code that reads and writes this format.  It is always a waste to have unused code in the product, but if you plan some day to have that capability there is no problem having the code for reading and writing the format in the product release. 

Thus the idea that all the code needs to be isolated for development so that you can decide whether to merge or not is a mistake.  Remember that features will often share changes.  The changes made in the lower levels are often not elusively for one feature.  Changes in lower level classes may be used by multiple features, and pulling these changes out would potentially harm other parts of the code. 

New features should be developed in a shared coherent code base.  New low level functionality needed should be developer incrementally, and merged into the code base daily.  If things run late, and it is not possible to get the entire feature in a release, simply disable access to the feature.   Leave all the supporting code in place. 

The last thing you want to do is make large scale changes to the code base at the last minute.  Deciding to omit a feature can be traumatic, but the code should be protected from a traumatic change.  Usually, a very small change can hide access to a feature effectively.  That small change can be very well understood, and proven to not have any negative effects.  A large change, like merging all the code for a feature, or pulling out all the code for a feature, would be dangerous — particularly dangerous at the very last stages of a release.

## Conclusion

The idea that features should be developed on separate branches is a very wrong and dangerous idea. There is no discernible benefit to doing this, because superstitious misguided reasons which do not pan out in reality.  And there are many many problems with asking developers to work for long periods in an isolated way. 

The mistake comes from thinking that features are equal to code.  This is not true.  The code base is a large coherent body of capabilities, and features draw from that.  The code should always be kept in a single pool. all developers should always remain current on the code, they should all be testing in the one pool of code, they should all be fixing problems in the single pool of code, they should all be incrementally increasing functionality in a single pool of code.  Access to a feature is a product level decision, which is not about having or not having the code, but rather accessing or not accessing the code.