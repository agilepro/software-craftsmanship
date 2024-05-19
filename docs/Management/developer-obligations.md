#  Developer Obligations

It is hard to work as one team when your members are spread across the globe. The longer that programmers on those teams work in seclusion, the more technical debt that is built up, and the more time and effort is wasted in paying down that debt.  Here are some steps to avoid problems.  

Here is what I expect:

*   developers will follow the rules above for checking in and never cause build problems
*   check in work on a (nearly) daily basis
*   maintain the stability of the project at all times, not just at the end of multiple weeks of work.

Maintaining the stability of a code base is simple as well. The causes of instability are also because of poor programming practices. Programmers launch into a change and implement it partially and then check in. Unfinished code is probably the #1 cause of instability. Instead, one takes an incremental approach, and at each step you implement the code completely. This is all work that has to be done anyway, it is only laziness that allows a programmer to implement part of it now, waiting for later to finish up.  

Every programming job I have ever seen, even extremely complex ones, can be done suitably and without limitation in small incremental steps, where each step is done completely. What we do today with the FCI team is that we have a limited number of screens. We add one screen at a time. When each screen is added, we make sure that that screen functions (to the extent implemented) and that no other screen is affected negatively. We add sections to screens in the same manner. There is no need or desire to add 20 or 30 screens at a time. This is the mistake that old “waterfall” style projects make is to implement each layer at a time. Instead, we implement a small part, and then make it completely work. We add a button, and make it work completely. We add a menu item, and make it work.  

The key advantage of this approach is that everyone on the team can see all the changes all the time. There are no programmers working in solitude for three weeks, only to find that their work will not merge with the work of the others, or it has unintended side-effects.

This entry was posted in [practice](https://agiletribe.purplehillsbooks.com/category/practice/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/04/6-team-member-obligations/ "Permalink to #6 Team Member Obligations").