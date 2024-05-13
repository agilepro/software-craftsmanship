#  Lines as Measure of Completeness

This is a true story related to me a few years ago.  My friend was working for a software contractor on a project for a large technology giant.  The technology giant is wedded to the idea that the value of software is directly related to the number of lines — which is crazy.  Most of us stopped counting lines decades ago, but here is a shocking example of what can happen if you don’t understand what your client thinks is valuable.  

My friend was involved in a project with a number of other developers.  The entire project was estimated to be 3500 lines, and it would take about 6 weeks to complete.  The developers jumped into it, and were fairly productive, and soon they had the entire program completed.  It came out to be about 3500 lines, believe it or not.  But, they had about 2 weeks left in the schedule, and they wanted to show that they could make really high quality code.  So they poured over the code, looking for how to make the code clearer, more efficient, and more maintainable.  By cleaning up and refactoring things in a superior way, they were able to do the same functionality while shrinking the number of lines to 2500 lines of code.  

Then came the date for the delivery to the customer.  The representatives of the development team were proud to show that they had been able to clean up the code, make it more efficient, and to do all the functionality in 2500 lines.  IT was faster, smaller, and easier to maintain, without any loss of functionality.  
The customer was not pleased.  _**If they were only going to receive 2500 lines of code, then they were only going to pay 5/7 of the original agreed upon amount!**_  Imagine the jaws of the developers dropping in dismay.  

The development team protested.  The complete functionality was there, and the 3500 lines was just an estimate.  After, if it had come out to be 4500 lines we can be sure they would not have been paid extra.  Eventually, the customer agreed that if the development team would add 1000 lines of comments into the code, then the customer would pay the full amount for what would then be 3500 lines of code.

## Discussion

The idea that the value of code is proportional to the number of lines is nonsense.   Can you say that a 30 line program is worth twice as much as a 15 line program?  Of course not.   The best programers accomplish functionality using just enough lines to be maintainable, and no more.  Extremely poor programmers will often use 2, 3, or even 10 times as many lines to do the same thing.  

This bloating of the code makes it extremely hard to read and maintain.  You can say that a 300 line program costs ten times as much to maintain as a 30 line program.  
The value of the program is what it does, not how many lines it has. It should be obvious to everyone, that your best value is in compact code because it costs less to maintain for the functionality.  

There is a limit. Code can be written to be too compact to be readable.  This is generally because the program has to be very clever to make thing extremely dense, and often that leads to unclear coding.  In my experience, however, there is a far greater problem with bloated code, with far greater consequences.  Code can be 10 times too bloated, but never 10 times too compact.  A focus on producing well written code, that is concise but no overly compact, you end up with the best value in terms of function per cost of maintenance.  

Code bloat is often due to large quantities of dead code in the system, or duplicated code.  Dead code is simply lines that are no longer used, but through which programmers must read and be concerned about.  If a class has a method that is never called, it is very hard to know that when reading the code.  Such methods might be maintained through an internal structure change, but this maintenance of dead code is a waste since it is never used.  It would be better to delete the method, reducing cost.  Duplicated code often requires that each copy of the code be maintained, even though you are doing the same change to each.  Again, isolating this code into a method that is called from multiple places will reduce the number of lines, and usually lower the maintenance costs.  

In the past 25 years, I have NEVER counted lines of code as a measure of programmer productivity.  Do so just encourages programmers to write bloated code. If the team believe that you are even looking at such statistics, there are going to be some programmers who will attempt to game the system.  The best programmers I know dive into code to implement new functionality, and the code has fewer lines in it when they are finished. This is the best evidence that I have that line numbers is no indication of coding effort.  

You have to drive for quality, without any concern for, or measurement of the number of lines produced.  Counting number of lines will give you some indication of the volume of work that is needed to work on a particular code base, but your goal should always be to reduce the number of lines.

:::tip[Key Takeaway]

It is easy to add lines to a project, it is quite difficult to reduce lines.

:::

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [practice](https://agiletribe.purplehillsbooks.com/category/practice/) and tagged [line counting](https://agiletribe.purplehillsbooks.com/tag/line-counting/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/01/31/reading-between-the-lines/ "Permalink to Reading Between the Lines").