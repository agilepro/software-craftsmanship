#  Waste: Asking Whether to Fix a Bug

Some parts of our development are outsourced to another company, and the people in charge in our company like to be in control, so they have requested that the outsource company confirm everything they do.  This additional bureaucracy causes a tremendous overhead, where often the effort needed to approve the work, is more than the work itself.  This is  a source of waste that should be eliminated.

## Example 1

Bug #9918 was filed in March of 2008 because in two parts of the product, the process diagrams looked different.  You could create a diagram with the studio, and then view it in the Console, and it would be different.  Certain parts of the diagram would be missing.  

Keep in mind that the purpose of the entire product is around that diagram.  A BPM product offers a way for people to draw a diagram of a business process, and so the fidelity of the diagram is of central, utmost importance.  

However, this bug was ignored for many years.  Recently, it was unearthed in summer 2012, and we had to ask the question: has this been fixed yet or not.  A new developer went to investigate, and found that in the studio, you can make a swim lane colored Red, and in the Console this appears Green.  A nice document was put together demonstrating the problem and attached to the bug report with the question “Should we fix this?”  

_**“Should we fix this?”  ?????**_  

Why are we even asking this question?  The person designing the process wanted the swim lane to be red, there is no conceivable reason for displaying it green.  

What is the likely problem?  The color is encoded into the file in a particular format, and clearly when the color is read, the two modules are interpreting the value there differently.  Find the code that translates the color from the file into memory — which is a piece of code that can’t be more than a dozen lines or so — and fix that translation so they both work the same, and you are done.  A good programmer might take an hour, and an outsourced firm might take a day, but then you are done.  

Instead of fixing the problem, a nice document was put together, an entry in the bug report was made, and then 5 to 10 people read that and pondered whether it should be done.  Then more comments must be made in the bug report, and the work must be scheduled.  Eventually this will be done.  The overhead on this is tremendous.

## Desired Approach

Jim Barksdale, who used to be the head of Netscape, used to say “I you see a snake, kill it”    That is, take care of problem, don’t just pass them on to others and talk about them.  Don’t send a memo saying that there is a snake, and ask whether we should get rid of it or not.  Just do it.  (Apparently snakes were a problem in the part of Texas that Jim grew up in.)  

In this case, a programmer should be told: “Find and Fix all the display differences.”  Don’t tell me about all the differences, just find them and fix them.  Nobody else needs to be involved.  When you are done, we will clearly see that the diagram is the same in both modules.  If anyone discovers another difference, just fix it.  Don’t file a bug report, don’t ask whether it is important, just find the difference in the code and fix it.

## Real Software Development

This is how real software development works.  The best software is written by programmers who are passionate about their code.  Brendan Eich, another acquaintance from Netscape, really loved the idea of JavaScript being the best language in the world, and it has been his individual passion that has made it pretty close to the most widely used language in the world.  He didn’t write a lot of memos asking whether to fix a bug.  If a program crashed, he did not ask others “should I fix this?”  He simply did it. The result is a language that developers can trust. 

Because we have developer who write memos asking whether bugs shoud be fixed, the amount of work involved is increased many times, and involve many important people who really are not needed for this kind of decision.  The best coding is done when a developer is given a clear goal: in this case “make the two displays exactly the same”.  Then, find and fix all the problems.