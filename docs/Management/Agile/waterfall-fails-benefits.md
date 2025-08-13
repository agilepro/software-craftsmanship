---
  title: Waterfall Method
---
#  Waterfall Method fails to account for unseen benefits

My epiphany for today comes from working with a team dedicated to developing software using a waterfall methodology, and how there is a decision patterns that leads teams to produce _worse_ code.  

The mindset of a waterfall developer is that one is expected to plan everything in advance, and then develop according to that plan.  They believe that by doing a thorough job up front, you eliminate costly changes late in the process.  This logic is impeccable.  What happens when you discover a design flaw during development.

An example of the kind of change that I am talking about is changing code that hide a potential problem, to expose it. Consider a variable that is only supposed to have the values of 1, 2, or 3 in it.  You find some code that assigns a 4 to it.  This might or might not be a problem, because the value might be cleaned up elsewhere.  You might not know that the value actually causes a problem, but the logic of the program can be expected to assume that value has only three values, and it could be the case that logic expecting three values blows up when the variable holds another value.  The change might be to test the variable at some point, and purposefully throw an exception when an improper value is seen.  If that exception is ever thrown, it will be considered a bug.  However, any such bug already exists in the code, and adding this code will have the benefit of finding any existing bug faster.

## Accounting for the Costs

When such a team is faced with a proposed change late in the cycle, that is designed to make the code more robust, the cost of that change is “charged” at a very high value because it is known that phases already passed will have to be redone. 

But what if the design is known to have a problem?  A proposal to address the design problem with a change is impeded by the estimate of known cost.  If you change X, then you have the following sources of cost:

*   corresponding changes in other parts of the code
*   changes in tests for that code
*   re-run tests that have been run that don't need changing
*   slips in the schedule & costs due to schedule changes
*   potential new bugs due to the change

One can estimate these costs, and they might be quite high.  It is well known that changes late in the development cycle are costly.  The Indian sub-contracting company that does some of our development knows this well, and has formula to charge for any change late in the schedule.  They can actually put a dollar value on any change, and it is high.

## Accounting for the Benefit

But if this change is designed to reduce the likelihood of bugs, there may be a huge benefit.  That benefit is hard to measure:

*   Reduced number of bugs in the future:  It is almost impossible to determine how many bugs will be prevented.
*   Handling existing bugs sooner: sometimes the existing code has bugs that are hidden.  A change to expose these bugs earlier would save money because the sooner a bug is fixed the less it costs, but it is impossible to say how much this will save.
*   Avoiding a customer situation: it is very expensive for a bug to appear in production use, but it is hard to estimate this cost.
*   Savings of future work: some design flaws left unfixed can be made to work, but only with a large brute-force effort in other parts of the code that have not been written yet.  It is impossible to estimate how much coding will be saved.

Because the costs of a change can be measured, and the benefits of a change can not be measured, all changes are heavily discouraged.  When the cost is known, and the benefit is not known, cost-based decision making is flawed.  Everyone in software knows how important it is to get things right early, because changes later are much more expensive.  However, the cost-based accounting of waterfall model discourages individual changes in the code until the individual benefit of that change is known. 

This avoidance of known cost will drive the development down a path of higher numbers of bugs, because they are unable to change the plans once they are laid out.  A flawed design remains flawed until enough bugs are found that justify changing the design.  If one small bug is found that that does not justify changing the design, then a fix for that bug will entrench the flawed design.  As more and more code is written to work around the design flaw, it becomes more and more expensive to change the design.  Thus when another bug is found, it would have to be a bigger flaw in order to justify changing the design.  The momentum of the design flaw increases as code is adapted to it.  

This waterfall is not only an inefficient and costly way to make software, _**it also actively leads the development team to less reliable and more bug-ridden final products**_.

This entry was posted in [practice](https://agiletribe.purplehillsbooks.com/category/practice/) and tagged [waterfall](https://agiletribe.purplehillsbooks.com/tag/waterfall/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/12/31/waterfall-method-fails-to-account-for-unseen-benefits/ "Permalink to Waterfall method fails to account for unseen benefits").