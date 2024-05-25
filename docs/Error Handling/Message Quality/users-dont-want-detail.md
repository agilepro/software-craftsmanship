---
  title: Users Dislike Long Messages
---
# Users Dislike Long Error Messages

I have heard many times in user surveys: 

> Don't give me a long error message, just give a short one line sentence telling me what I need to do.

This is a heartfelt request which we need to take seriously.  It is impossible to do exactly this in most situations.  As a system designer you need to understand the underlying desires so that you can get as close as possible to what the user actually needs.

:::tip[Key Takeaways]

Users don't complain about long error messages when the message leads them to a successful resolution of the problem.

Without knowing the internal motivation of the user, a specific course of action is not generatable.  The user can usually figure out what to do, if we provide a clear, succinct, and correct report on what went wrong.

Message should include as much relelvant detail as needed to clearly describe what went wrong, but no more.

Eliminate pointless boilerplate text that adds no value.

:::

## Successful Error Message

An error message is successful if after reading it the user does something different and succeed in their initial goal.  The purpose of an error message is to explain what the system could not do, so that the user can find the correct thing to do.  

Users don't complain about the length of a successful error message.  In fact, they rarely even remember that they encountered an error, if they were successful in resolving the problem.  User only remember error messages that failed.  User only complain about the length of an error message when it fails to provide what they needed to solve the problem. 

## Specific Course of Action

It is absolutely true that **if the code can generate a short one line sentence telling exactly what is to be done, it should do that.**  That is in fact the perfect error message.

Perfection is not achievable in most cases because we don't know the internal motivation of the user in the context of a particular error.  What needs to be done depends on details not available to the system.

Consider an error message saying that the state code entered is not supported.  From the system perspective, that is all we know, but we don't know the intent that the user had in their head.

* _Maybe they accidentally entered the wrong state code_: in that case the recommendation is to change the state code to the correct one.
* _Maybe they didn't know that state is not supported_: in this case the best we can do is explain why the state is not supported, and perhaps to submit a request to get that state supported.
* _Maybe there is no state code that describes the situation_: in this case we need to explain how to specify that no state code is applicable.

The actual course of action for the user depends on the the goal of the user and specifics of the situation that are not available to the system.  The best the system can do is to give a clear and correct description of what went wrong and include all the relevant details.  In this example: 

```
The state 'AK' is not on the list of the supported states for [this activity].
```


## Succinct but not too Succinct

The imporant take away from this is: don't include a bunch of stuff that is completely irrelevant.  So many error messages include a page of things that really don't matter and users get frutrated by the volume of useless information that is included.

The other way to look at it: users never complain about the volume of information it it solves their problem.  For example, if it lists a page full of information, but within that the user easily finds what is relevant and addresses the problem.  Trim out the useless information, but never trim relevant accurate details of the problem.

One should never trim back the error message to remove valid information because users find it "nicer" to have a smaller error message.   In another example I suggest this error message:

```
Unable to initialize application entries because of getting data dictionary
  because: Data dictionary 'Sample_Test_Group' not found
    because: Unable to read file data-dictionary/Sample_Test_Group/preProdDataDictionary
```

There is a reasonable amount of information, and included critical information that leads the user to solve the problem. This should never be trimmed back to this:

```
Error 8711329 occurred
```

It is much smaller for sure, but this error message is completely useless to the user (unless they have been forced to memorize that error code, and I seriously hope nobody forces users to do that).  It is not the size of the error that is at fault, but the relevance of the content.

## Pointless Admonishment

Too often error messages include generic recommendation on what to do which is also equally pointless.  

```
 . . . . . . . .   Contact your administrator.

 . . . . . . . .   Please try again.
```

The first is frustrating advice because it assumes (1) that there is a single administrator, (2) that the user knows who the administrator of a piece of sofware would be, and (3) that the administrator can actually do something about it.  Those assumptions are usually false, making the advice useless.

In my experience when I simply try again, I get the exact same error again, which is a waste of my time.  A well written system should not have occasional errors for no reason.  Think about it: telling users to just try again is a way to say: "sometimes we generate errors for no reason at all, and if you just try again it might work."  There are times when, for example, a part of the system might be donwn for scheduled maintenance, and then a specific message about when they can try again would be appropriate.  But just taking "try again" on the end of a generic error message is part of the useless text which should be eliminated.

There are other pointless generic recommendation that I have seen on error messages which are of little or no value in the particular situation.  Writing error messages has the same guidance as good writing anywhere:  "Eschew Obfuscation."

