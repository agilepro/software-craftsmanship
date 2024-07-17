#  Eliminate Dead Code

Keep a clean house, and do not let dead code lie around.  It is more expensive than you think.  This should be obvious to us all, just like it is obvious to clean the dishes after dinner, but not everyone is so diligent.

:::tip[Key Takeaways]

Dead code clutters the software, and increases the cost to maintain the product, sometimes dramatically so.  

Eliminating the dead code put the entire team in a much more competitive position to move more quickly, and experience fewer problems as well.

:::

## Incident

Today’s story is about a bug report with an exceptional lifespan.  Five years ago, I filed a bug report noting that a particular piece of code was handling exceptions inappropriately.  Particularly, it violated [#14 Never Catch and Continue](https://agiletribe.purplehillsbooks.com/2011/10/18/14-never-catch-and-continue/) because it caught an exception, and assumed that it was a particular exception, and then went on processing.  The bug pointed out that there could be any number of other exceptions that were caught, and that continuing in those other cases was inappropriate.  
The response I got today was:

> Thanks for the suggestion, but I don’t think this code is even being used any more.

Ummm – that is _dead code_, not needed, but still in the product!  In a second bug report, I got the same response. Imagine how many people, in five years, tripped across the bug report, assessed in, analyzed whether it should be done, deferred it to a later release.  Even the trouble of filing the bug, and the developer responding, was extra, unnecessary activity that did not need to occur.  Imagine the people reviewing the code and seeing poorly written code.  All of it for nothing!

## Dead Code Costs

Any code you have **_costs maintenance time_**.  Say you have a product that needs 10K lines of code.  Then imagine that there is an additional 10K lines of dead code in the product, bringing the total to 20K.  What is easier to maintain, 10K lines, or 20K lines?   They are certainly not the same.  Even though only 10K lines are “active”, the other dead code soaks up a lot of time.  It takes longer to find things.  Changing the code requires some time scanning to make sure that none of that other code is effected.  The dead code may be calling live functions, and so it might have to be updated when interfaces change.  Even thought it is not being used, it must remain compilable, and it must remain compatible with library changes.  It is possible that the dead 10K lines actually costs more to maintain the than the live 10K!   I don’t know if that is true, but maintenance of the dead code is certainly non-trivial.  

There is no polite way to say this:  _it is stupid to keep code in the product that you know you are not using._

## I Might Need It Some Day

Never forget the YAGNI (You Aren’t Going to Need It) principle.  It is EASY to add new code into a project.  It is trivial to add stuff back in.  If you need more capability some day, it is simple to add it in, and there will probably be better code at that time to add in — better libraries to use.  But the cost of maintaining code you are not using overwhelms any possible potential need.  If you need it today, leave it in.  But if you think you are going to need it tomorrow, rip it out, and save a lot of effort.  You can always add it back in tomorrow.

## Proving Code Is Dead

It can be very hard to determine if code is used or not.  It can be a lot of effort to determine this.  I waste a lot of time detecting and deleting dead code from projects, and it is not trivial.   

So there is a simple technique which you can use _early_ in a project cycle.  If you believe a method is not being used, put a line like this in the method:

```java
if (true) {    //date: 2012-07-06
    throw new RuntimeException("I believe that " +
        "method <methodname> is not being used");
}
```

While you are running and testing, if you ever see this exception, when you know that the code is being used, and you remove the exception.  However, if that throw statement persists for a long time, and it never is seen, then you know that the code is dead, and you can immediately delete it.  You put a date on the line so that in a year it is easy to tell that it has been a year, and nobody has encountered the problem.  You put the method name in the exception so that it is easy to find the exact exception and remove it if the exception is reported.  

It takes only a moment to add this line, and it takes only a moment to remove it if you find that the method is needed.  Your investment is very small.  The benefit is when you find that the code really is dead, and you can eliminate the method entirely.  

Don't wait for the end of a project.  It is risky to make changes right before a release.  Make a conscious effort to add these at a time that you know the code will get a decent amount of testing. 

If your automated tests have complete coverage, then you will know right away if there is a problem.  If the tests complete, and if testing functionality in that area do not evoke an exception, then you have won a considerable prize:  you have in your hands the ability to reduce the maintenance cost of the code, and therefor to increase the effectiveness of the team in implementing new features.

## Competitiveness

In most software, the most important capability of a team is to be able to response to customer demand quickly.  A smaller body of code is the most effective way to assure quick responses.  If your team and code base provides the same benefit as another, but you are able to add functionality more quickly, then you are in a winning position.  

The time spend cleaning out dead code returns value back to you later, in ability to get more desirable features implemented.  It is like cleaning your room:  you don’t save any time during the cleaning, but later you save a lot because everything else you try to do is easier and quicker.  This is why it is worth keeping a tool kit with the tool arranged in a way that they can be found.
