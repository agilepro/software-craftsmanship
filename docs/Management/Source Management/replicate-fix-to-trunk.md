#  #13 Always Replicate Fix to the Trunk

We try to avoid having multiple versions of a product under maintenance at a time, but every product shipped to real customers has to offer support of the version that the customer has.  This post offer guidance around handling of bug fixes in a multi-branch development environment.  

Product versions are typically denoted with major release (dot) minor release notation. Thus 10.0, 10.1, 11.0, 11.1, 11.2 and so on. A major/minor release is done at a point in time, and maintained for a number of years after the release. We always offer upward compatibility, but it is not always convenient for a customer to migrate their data in order to get a bug fix. For this reason a customer on version 10.1 will need a patch on version 10.1. All patches are cumulative, so the latest fix-pack has all the fixes on that version of the product. A fix pack for release 10.1 will have all fixes known for 10.1.  

The main point of this article is that while a past release is maintained for a customer, there is also a current release under development. Customer needs a patch to version 10.1 while version 11.2 is under development. The old version is called a “branch” while the current development version is called the “trunk”. The rule is simple:

*   **All fixes to an old release (e.g. 10.1) should be made simultaneously to the trunk (e.g. 11.2)**

Doing the fix at the same time will save lots of time and effort, it will assure that we have the best product, and will allow us to be more successful in the marketplace.

## A Case In Point: JBoss Clustering

Recently we had a real development case which we can examine. In spring of 2010 development released a special port of version 11.0 on the Linux/JBoss platform required by an important customer. It was released in May without full cluster certification. Work continued on cluster support, which was made available in some patches to version 11.0.  

By that time, version 11.0 was a branch, because 11.1 had been released. The fixes should have been put in both 11.0 and 11.1 (the trunk version at the time) but they weren’t. The patches were made only on 11.0.  

Later, this customer was persuaded to move to 11.1 in order to move off the old forms capability, and start using the new forms capability. But clustering did not work. It was reasonable for the account executive to believe that since clustering worked in 11.0, it would work in 11.1. Unfortunately, this was not discovered until the customer had actually set up and was trying to run a cluster in winter of 2011. An emergency effort was put together to quickly port the fixes from 11.0 to 11.1. This was accomplished, but it caused a 1-week delay in the customer schedule, which they were not happy about, and caused damage to the relationship.  

Doing the work as an emergency job is always more expensive. In the summer of 2010 the engineers that were doing the cluster were fully familiar with the key code and the problem areas. Having produced a fix for version 11.0, the added effort AT THAT TIME to put the same fix into 11.1 would have been minimal. The code is really not that different, and it is not likely that the areas effected by clustering were changed by any of the 11.1 features. And even if they were, the fact that the engineers were up to speed on clustering issues they would have found and addressed those issues most effectively. Clearly, six months later, getting engineers back up to speed on what had been done for V11.0, and replicating that into V11.1, takes a lot more effort.  

It is worse. Because the fix to 11.1 was made after 11.1 became a branch, we find ourselves in the position that 11.1 is fixed, but 11.2 is NOT. Another effort will have to be mounted to fix 11.2! This is a complete waste of time. If 11.1 had been fixed in the summer of 2010, then there would be no necessity to fix 11.2 because 11.2, and ALL FUTURE VERSION would have the fix in it. 

We are wasting resources by patching old versions of the product, and not making the same fix in the trunk. Some may view the effort of replicating the fix to the trunk as “extra effort” but it is actually the cheapest and most effective way to make sure that all new version of the product have the fix in it as well.

## Intelligent Management

Our goal, is to make a product with as few bugs as possible. It is unconscionable to know about bugs, and leave them in the trunk version. The trunk version represent the future of the product. Bugs that are left in the trunk are replicated into every branch made out of that trunk. Failing to fix a bug in the trunk, means that you may have to fix the bug many times in many branches. This is great if you are paid by the hour as a developer, but it is a lousy way to run a product, and it squanders development resources on putting the same fix into many branches. 

We need to see that it is critical that EVERY bug fix is always replicated into the trunk at the exact same time it is fixed in a branch. Of course, the trunk code is a little different, and the exact code from the branch can not be put into the trunk in some cases. But it is not the lines of code that are important; it is the developers who have struggled and understand the problem. After fixing the problem in one branch, it is easy to fix in the trunk. We must use this advantage.  

The fix does not have to be replicated to every branch. Generally a product that has been released is used by customers and if they have not noticed the problem, they probably won’t. Of course, if a customer on that branch runs into it and needs a fix, it must be done. But if no customer is experiencing the problem on a particular branch, there is a far lower return in replicating a particular fix to a branch. The trunk is special. Making the fix there is critical, because that is the place that all future branches are made out of.  

We currently are shipping version 11.2, but there are 25 important patches made to branches that are NOT in the 11.2 release today. Had those fixes been made to the trunk at the time, then version 11.0, 11.1, and 11.2 would all have the fixes in them. But they were not, and now we have to mount an extra effort to get them into 11.2. This is a waste of effort, and it prevents us from making feature changes that would make the product more competitive.  

Overall, this is a management issue. It is management responsibility to see that proper procedures are in place, and one procedure is to: 

:::tip[Key Takeaway]

Always simultaneously replicate all bug fixes from a branch to the trunk version immediately, without delay.

:::

This entry was posted in [practice](https://agiletribe.purplehillsbooks.com/category/practice/) and tagged [branches](https://agiletribe.purplehillsbooks.com/tag/branches/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/16/13-always-replicate-fix-to-the-trunk/ "Permalink to #13 Always Replicate Fix to the Trunk").