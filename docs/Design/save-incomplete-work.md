#  Let Me Save Incomplete Files

This is a usability problem that I have run into a number of times.   A programmer writes a UI screen to receive a long list of inputs in order to create an object in system.  Save is enabled only when all the inputs are filled in and verified valid.  This is a big problem.  
It sounds OK doesn't it?  Check that all the values are there and correct before saving.  But, if the form is long, it is possible that user will need to save before getting all the values in.  The problem is that if you need to save, and you can't save, you might be forced to **_lose_** everything you have entered.  
Imagine you are creating a personal profile record. There can be many settings.  To create the profile I really only need to enter the profile ID.  It is a bother to have to fill in _all_ personal profile settings before I can even save.  I might always come back later and update the values, so why force everything to be entered before I save?

## Save and Validation

When you create a resource int he system, it might or might not be correct (valid).  Clearly, when it is not valid it should be usable.   When you try to “use” it, you should get a warning that it is not complete, not valid.  Edit it until it is valid, and then allowing “use”.  
But saving is not using.  Saving just means “**keep my current state.**”   If windows just popped up a message that it is going to reboot in 5 minutes, I need to save whatever I have.   I want to save it, and come back to it, and finish up later.  
The programmer seems to be assuming that users have lots of time on their hands to sit there and enter without interruption until the form is filled in.   This may take time, and people get interrupted.   They may need to go to a meeting, or it might be the end of the day.  Why do you assume that the user has plenty of time to get everything perfect before saving?  
Since users are forced sometimes to stop and come back later, it is critical that “save” can take whatever they have.  Then, allow them to come back later and pick up where they left off.  
Forcing everything to be perfect before saving, would be like having an editor for Java that required the program to be free of syntax errors before you could save the file.   Any job that takes more than a few minutes can be interrupted.  “Save” then needs to work for the user in any state.   Thus I must be able to save a source file with a syntax error in it.  Sure, it is not going to compile with that error, but I just don't have time to fix it right now.   I need to save my current work, and come back later.

## Summary

It is strange how I have had to explain this to so many programmer.  They somehow think that everyone else is just going to sit there until everything is perfect before needing to save.  But what they are really doing is _**forcing a situation were users will lose all their work, if they don't have the time to complete it right now.**_   Don't do that.



This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [Design](https://agiletribe.purplehillsbooks.com/category/design/), [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/) and tagged [GUI](https://agiletribe.purplehillsbooks.com/tag/gui/), [programming](https://agiletribe.purplehillsbooks.com/tag/programming/), [save](https://agiletribe.purplehillsbooks.com/tag/save/), [usability](https://agiletribe.purplehillsbooks.com/tag/usability/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2019/10/09/let-me-save-incomplete-files/ "Permalink to Let Me Save Incomplete Files").