#  Partial Agile: No Such Thing

On several occasions in the past, I have heard software engineering management suggest that they would like to “try” an Agile approach by implementing it in part of a project.  For example one feature, a couple of team members, would work in an Agile approach, while the rest of the team works with a waterfall model.  Another manager told me they were using Agile, but instead of time-based Agile, they were doing feature-by-feature Agile which involved the normal 3 to 6 month time cycle.  

How does one politely say that someone obviously has no understanding of how Agile works?  I fear that my Japanese colleagues see me as an extremely arrogant person, to tell them that they have no clue, and need to try harder to understand.  Below, I try to explain why the idea that part of the team will work with Agile and part with waterfall is not workable and will certainly lead to failure.

## Agile keeps the Team in Sync

The point about rapid cycles, rapid check in, continual build, and continual test, is to keep all members of the team synchronized.  Your goal is to minimize the amount of technical debt.  You can’t keep the team in sync, while having half the team working in a waterfall approach.  

When an Agile team member makes a change to the code, it is quickly communicated to all other members.  For example, if programmer A adds a variable named “x1” that line declaring that variable is synchronized to all other programmers on a daily basis.  If programmer B adds another variable named “x1” the compiler immediately warns of the problem, and programmer B can immediately address the problem.  One problem with the waterfall approach is the idea that programmers A and B can go and work for 3 to 6 months on their own copy of the code, and merge it all at the end.  This is a trivial example, but still it illustrates the problem:  by the time programmers A and B notice they have used the same variable name, they have already committed large bodies of code to that name, and it requires a significant re-write.

## Entire Codebase must be Prepped for Agile

When using an Agile approach, you approach the entire product being released in a holistic manner.  Every day the entire product is built.  Every day, all the tests are run. If any code change breaks a test, that is immediately fixed.  You do not let tests remain broken for long periods of time.  The code is kept in a “release ready” state at all times.  

Because the entire team is in the practice of running the tests every day, if one person makes a change, that effects another programmer’s area, it is detected that day, and not 2 months later.  By addressing the problem when it is small, it is addressed BEFORE a large amount of other code comes to depend upon it.  

The waterfall approach is often sloppy about built and test practices.  Tests don’t always run all the time.  Tests often require a special setup which must be manually and tediously constructed.  Some tests are not resilient enough to run in any order, and tend to fail when other tests are added.  Some waterfall situations are set up such that when tests fail, they have an expert who evaluates whether the failure was really a failure, and if not simply runs the test again until it succeeds.  

In order for an Agile approach to work, the tests must be made robust and resilient.  They must be reliable.  It is not possible for one part of the team to go and work in an Agile approach, unless ALL of the tests are made reliable.  Those parts of the team working ont he waterfall approach have no incentive to fix the tests, but they are planning to run the test once, at the end, and on a specially prepared machine.

## Partial Agile is Doomed to Failure

What happens when part of the team attempt to take on an Agile approach, is that they start doing daily builds, and daily test runs, and they find that the tests are unreliable.  They then invest a large amount of time “fixing” the tests of the product, most of which has nothing to do with the feature they were asked to implement.  At the same time, the other parts of the product are NOT concerned about the daily builds and the daily tests, and so they are breaking tests on a regular basis.  The Agile part of the team finds the tests dragged down faster than they can climb.  Spending all their time fixing tests, they get nothing done on the feature, and pretty soon management shuts down the effort, and concludes that “Agile does not work.”

## Growing

In my last post was about how [software can be grown like a plant](https://agiletribe.purplehillsbooks.com/2012/05/08/growing-software-like-a-plant/). The Agile approach is like growing, while a waterfall approach is like manufacturing in a factory. Make sure you understand that analogy before reading the next paragraph.  

The reason for mentioning it here is to reflect on how ridiculous it would be to have a tree that was “partially grown & partially manufactured.”  The rule behind growing a plant is that it remains a functioning plant at all times.  Manufacturing on the other hand is based around making perfect pieces that can be fit together at the end.  If any part of the tree was manufactured to be assembled later, then the remaining part of the tree could not be functioning as a plant.  Manufacturing the leaves separately, would prevent the branches and roots from growing organically.  For a plant to grow, all parts must be present at all times.  

Analogously, an Agile software code base must be able to be built and run the tests at all times.  If any part of the codebase can not be built, and can not run the tests, then the entire codebase is effected.  The advantage of an Agile approach comes from keeping the entire code base functional at all times.