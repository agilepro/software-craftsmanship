#  Responding to User Requests

How can you tell if your User Interface (UI) team is broken?  There are some indicators if the programmers implementing the UI are approaching things in a way that is likely to give you a good UI as a result.  This is a real story. 

A good support engineer was working on the product with customers.  One customer complained that there is a needless extra step.  The program asked a question that the system already knew the answer to, but asked the user anyway, and gave the user only one option.  The user was forced to select that option before continuing. 

The customer was an important, major US government agency, and they asked: “why am I being bothered with this question every time I access this.  It already knows we only have one, just go ahead and do it!”  They are right, there is no need for this. 

The support engineer filed this as a bug on July 8, 2011 asking simply to change the UI to skip the question if there is only one answer.  Seems like a pretty simple, trivial change to me, and to anyone.  The response from the development team was (and this is an exact quote from the tracking system):

```
The first point mentioned is a valid case but there was no such requirement  
initially and hence to change this implementation, it would have to be treated  
as an enhancement request.
```

A year later, in July 2012 this had not been fixed.  I guess what they meant is that since it was not mentioned in the original UI design spec, it would be subjected to the normal multi-year delay before implementing.  After escalating the issue, this “UI Fix” to eliminate a question that has only a single answer has finally been checked in:  Oct 2012.
  
Keep these in mind:

*   **All UI development is incremental**: It is impossible to generate a complete UI spec from nothing. Every decision effects all the following decisions.  So you have to implement it, try it out, get feedback, and change it.
*   **Writing the Spec is harder than Programming**: It is actually easier to write the code for a UI than it is to write a spec explaining how it would work.  Therefor, to save time, just write the UI code, and let people try it.  Rather than review a long, complex and difficult to understand spec, people should be given access to a running example, and then critique it on valid reasons.
*   **No UI is right the first time**: The fist implementation of a UI is just a sample to get people started on reviewing it.  People need to learn how the UI works before they can make valid criticism about the way it works.  Then, a cycle of improvement starts.
*   **Rapid Iterations**:  You need a fast cycle, because current problems block usage, and prevent the discovery of following problems.  Ideally, the cycle should be no more than a few days.  A user interested in seeing a fix, should see that fix, and verify that it works a few days later. Anything that slows the cycle will prevent you from getting a good UI.
*   **All fixes are enhancements**:  Making an arbitrary distinction between a change that is a “fix” and a change that is an “enhancement” is just a way to slow down and avoid work.  If there is a clear way to make the UI better, and it can be accomplished, it does not matter whether this was mentioned in the original spec or not.
*   **Blame:** Talking about the spec is just a way of “laying blame” on someone else.  The programmer can say “_it is not my fault, the spec didn’t ask for it_“.  The feature designer can say “_it is not my fault, the product requirements didn’t mention it_”  And so on.
*   **Fear of Change**: This particular team is very fearful of any change, and that is one of the biggest reasons that their UI is never any good.  A culture of avoiding all change will never make a good UI.  You need to promote a culture of fix it right away with minimal overhead.
*   **No Approval Cycle**: Clearly, if a programmer needs to wait for review and approval of all change, this causes a tremendous slowdown in development, and prevents rapid cycles. Instead, developer should make the change and then circulate for acceptance.  If good, you keep it.  If not, you _pull it out_.  That is right, remove the change!  Forcing approval before implementation fails for an obvious reason: the person approving it has no real idea how it work until he _sees it working_.  Approval without seeing it running is mostly meaningless.
*   **Subcontracting:** If the UI is going to improve, and the cycle to be fast, then the programmer doing the work has to have some authority and responsibility for the overall UI.  If you subcontract the UI work out, then the subcontractor has no real responsibility for the long term, and has to get everything approved ahead of time.  Thus it is impossible to implement a fast cycle time with a subcontractor.  Also, it should be obvious, that a subcontractor is not motivated to reduce the amount of work required, but rather to do things by the book to increase the amount of labor involved.  This works against getting a good UI.

The particular organization that produced this bug fails on almost all these counts,a nd that is why the user interface in almost all cases produced by this organization can only be described by the technical description: “it sucks”.  It is a waste of money to try an implement good UI when your team is broken.