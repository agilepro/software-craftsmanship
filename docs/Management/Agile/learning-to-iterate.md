#  Learning to Iterate

I work with a large team in Japan that develops software.  The software produced is late, out of date, falling behind the competition, and is filled serious usability problems.  The software is of high quality from a Japanese point of view: the products do exactly what they say they will do.  Certainly no less, and generally no more, than advertised.  The development is expensive, and the product is falling behind the competition.  It is clear to everyone, even the team itself, that something needs to be done to ‘fix’ the development methodology. 

I have been advocating the simplest of Agile principles, oriented along the philosophy of Kan-ban development.  These principles:

*   Develop in short iterations (aimed at 2 week)
*   Show the running product (in development) frequently to customers and actual users to get feedback on whether it hits the mark, or needs correction.
*   Have a set of automated tests that are run every day on an automated build
*   Require the developers to run those tests in their development environment as needed.
*   All developers commit changes every day, and do not work on branches.

The chief environmental difficulty is that the team is disbursed around the world.  It is not possible to co-locate the team, so this is a compromise that we have to live with.  It is the fact that people are so spread out, that leads me suggest that rapid iterations are even more important than ever.  It is critical that all part of the team be kept in synch and see what each other are doing at all times.

## Iteration Is Just Not Possible

Members of this development division from all up and down the management chain explain that rapid iterations are simply not possible.

> How do you explain to someone who lives in a tropical desert what it is like to skate on ice?

There is nobody in the entire division (which consists of hundreds of developers and equivalent amount of management) has ever worked on a project with rapid iterations.  
Their collective intuition tells them that putting rapid iteration would increase the amount of work, and they would never get anything done.  I try to explain to them that most of their time is spend dealing with “[technical debt](http://en.wikipedia.org/wiki/Technical_debt)” that piles up, and that the effort increases exponential will technical debt, but of course they have no experience with rapid iterations so how can they possibly understand this.  
Keep in mind that this group of people have been working together with the same people for 30 years, and have had almost no outside influence.  They were taught in school that “Waterfall” was the best approach, and they have tried to perfect waterfall.

## The Problem is in Design

> They believe that if the software came out bad, it is because the design spec was not complete!

Every single person I have talked to in the group reiterated this to me.  Sometimes they say the problem is that the do not have good ‘architects’ and would like to have an architect to create the proper design up front.  It all depends on having a perfect spec.  

What you need to understand is that the product (in my estimation) do not fail because of their architecture.  The products, as I mentioned before, actually work as advertised.  The problem instead is that the usability is so poor that customers simply reject the product.  Anyone who has developed real software knows that usability is NOT addressed by writing good specifications.  It is impossible to really understand what is and is not going to be convenient before you have a running product to try.  Usability is enhanced by actually letting people try to use it, and observing what they do well.  Address those problems and do it again.  Only if you go through many iterations of testing, observing, and improving do get to the point of having something that really pleases the user.  

However, since iterating is impossible on this team, they are never going to have good usability.  Strange thing is that they all _know_, and everyone they work with _knows_, that the solution is to get the proper specification up front.

## Iterations Might Work For Others, but _Our_ Code is Too Complex

Another excuse I hear is that Agile iteration will work for other project, but projects that are very complex, and mission critical, can not be done with iterations.  Complexity of the project prevent doing rapid iterations.

> Nonsense!  Simply nonsense.

It does not matter how complex the code is, changes can be always be incrementally developed.  There is plenty of evidence that if the code is complex, then you should do iterations faster, not slower.  When you have complex code, then the [technical debt](http://en.wikipedia.org/wiki/Technical_debt) builds up **_faster_**.  If someone was to work for a month without checking in, then those changes are even more likely to conflict with others when the code is complex, than when the code is not complex.  Thus the amount of conflict that occurs when merging is even greater.

## Where is the Evidence?

All this time, I am told opinions about what can and can not be done, by people who have _never actually tried it_.  They are completely convinced that it is impossible, so they don’t try.  If they were to try, they would fail, because they — and everyone they work with — knows that it can’t work.  

Yet I am waiting for an example of code so complex that it can’t be developed iteratively.  I documented that the most complex code I can find, going through the most difficult change, can be done iteratively.  

The proof is quite difficult, and nobody except a logician is interested in the proof.  They will readily admit that it is theoretically possible, but they believe that if they were to do it, it would involve so much extra work, that they would never get anything done.  This is quite amusing, because we have ample evidence that using the waterfall method with 6 month iterations they are getting almost nothing done.  In spite of all this evidence, they are sure that going to rapid iterations will increase the amount of work.  If they have never seen a frozen lake, how can you expect them to believe people can skate?

## The Challenge

This is the challenge that I have put forward to this organization:  Show me code that is too complex to do iteratively.  I will show you, that it can be maintained, and new features can be introduce, while at the same time making a release EVERY DAY that runs.  I will have every developer check in changes every day at least, and I will show how these changes never effect any other developer . . . in fact the amount of interruption will be smaller.  

The reason for making a release EVERY DAY is to make a point: the shorter your iteration, the easier the development become, and the faster you can move.  In reality, a release every 2 weeks is more appropriate for many reasons, but the reason is NOT complexity of the code.  The reason is NOT that developers will interrupt each other.  

This can only be done with a real team, on a real project.  The more complex, the more mission critical, the better.  However, everyone I have met in that organization already knows that it is not possible, and so I doubt it will ever be tried.  

This week I met a high level executive from that organization, someone I have known for a long time, and who is quite smart and forward thinking.  He is charged currently with coming up with a solution to the problem that plagues their software development.  He want to know how to fix development so that they can produce software that will compete in the world outside of the company.    I explained again that the only way end up with highly usable software, is to implement in fast iterations, allow for frequent customer review.  He explained to me that he was familiar with Agile techniques, but that he has been told that fast iterations will not work with the highly complex, mission critical software that they develop.  If there were rapid iterations, developers would be constantly interrupting each other with their changes.  He explained, there should be a way to create software in long iterations, if only the design specifications were properly designed.  He felt that you need clear interfaces between the pools of code that developers are working on.  Unfortunately, he missed the point about “technical debt” and simply believes, like the others, that rapid iterations are simply impossible.

## Appendix

That is all there is to the story, but I might add a bit more about why it should be obvious that any team can develop code iterative.  The extreme example is doing a check in every few minutes across a team of developers.  This can, in fact, be accomplished.  

Imagine that you want to add a method to a class.  You add the method to the class with the required signature.  You implement the first order functionality (the stuff that is done when there are no exceptions).  You write a test that calls that method and makes sure that it is running.  Build.  Run the tests.  Then you check this code it.  How long does that take?  It might take an hour, but the point is that adding this method will NOT interrupt any other developer. When you check in, you have fully functional, complete code.  

You then expand the capability of that method.  Add exception routes, and simultaneously add tests to check those conditions.  Work for an hour.  Build, Run the tests.  Check in.  None of those changes will effect any other developer, but the integration will be added to their system environment today, not in 2 months from now.  If there is a problem, it will be found now, not 2 months from now, when you have two months of work that depends upon it.  

Say you want to change the definition of a particular method.  It used to A on condition B, and now you want to make it do that as well as doing C on condition D.  You implement this change to the method.  You then search through the entire code — including the parts that other developers are working on — and find all the spots that that code is called from.  If there was a change in the interface, you have to change all the spots that it is called from.  You build.  You run the tests.  Since the tests are there to assure that all those other places that use the method still work, you have assurance that you changes did not break anything.  As long as the tests all run, you check in.  Now that change is propagated to all other developers.  If they are currently working on code (just in the past few hours) that depends on that method they might encounter a problem.  If so, it is addressed right now, immediately, and not 2 months from now when you have forgotten exactly what was changed.  

Every change that is made, has all the correct compensating changes made AT THE SAME TIME.  The code is never allowed to slip into a “broken” state where the tests fail to run.  Every change is immediately propagated to every other developer, so if they attempt to use something that is changed, they already have the change.  The reduced the amount of potential problems (known as technical debt).  Potential problems are exposed and taken care of immediately.  At any moment you could stop work and decide to ship to the customer.  There are no delays in schedule.  The quality is always high.  Most of all, there are no surprises.  

Think about all the ways that one developer might conflict with another.  Both developers might create a method with the same name.  If they wait until the end of two months to merge changes, there could be a lot of code that depends upon the name, and there could be a lot of work to patch things up.  By synchronizing every day, they can lose no more than a couple minutes or hours of work.  Another type of change might be a conflicting change in the way two methods behave: one developer changes one method, while the other developer changes another method.  If you wait two months to merge the changes, there could be serious commitments to that change.  However, if you synchronize every day, this conflict will be found within a couple hours of being formed, and it will be fixed BEFORE any other code is written to depend upon it.  

It should be 100% obvious, that synchronizing code daily (our hourly) will REDUCE the number of conflicts between developers.  Especially in very complex code.  However, if you live in a tropical desert, you might not believe that one can skate on a lake that has been frozen over.