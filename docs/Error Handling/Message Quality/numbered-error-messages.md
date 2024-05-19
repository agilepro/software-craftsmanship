---
  title: More than a Number
---
#  Error Messages should be More than a Number 

As part of a series of posts about error messages, this post covers a very specific claim: a single error message picked from a list of error messages is a bad idea and produces poor error reporting.  We start with the canonical example, and show how no single error message will be useful to the users.  It would be far too costly to maintain the full list of all possible problem combinations in a single list.

## TL;DR

Here is a typical program which hits an error at some point:

![](https://agiletribe.purplehillsbooks.com/wp-content/uploads/2023/01/error-stack-2.png?189db0&189db0)

If you are not familiar with this, please read “[Canonical Execution Error Example](https://agiletribe.purplehillsbooks.com/2023/01/16/canonical-execution-error-example/)” for the details about why this is a good example.  The routine at the top hits a problem.  What exactly do you tell the user?

Many systems are designed to have a fixed list of error messages, typically keyed by an error number.   The idea that this list contains all the possible problems a user might encounter, and returns the best one.  But what is the error that best fits this case?

> #15061 – Can not book trip

This is too general to be useful. It doesn’t tell the user anything that can solve the problem.  The user will be forced to call support because they were not given the detail.

> #15832 – Can not parse date

The most specific answer is no good. It the details of the problem of the date, but leaves out any explanation of what this date is and what it is useful for.  Consider this: a trip has a start date, an end date, and many dates of various reservations.  The user would likely not be thinking that the problem is the birth date.

There is no single error code, picked from a list of pre-defined error codes, that will tell the user anything useful about this situation.  The “single error code” concept is the reason many error messages in systems are so bad, and so useless.  Hopefully this example makes it clear why.

## User Lacks Some Knowledge

This is at some level so obvious it is hardly worth saying, but if a user make a bad request, it is because they did not know it was a bad request.  Nobody makes a bad request on purpose.

A bad request is one that the system can’t handle.  It was designed to handle a lot of things, but somethings just can’t be handled.  Like a date structured “1111-22-33”.  Since it can’t handle it, it needs to give up processing.  But what it returns can make a big difference in how successful a user is at getting what they want.

When a user makes a bad request, there is something wrong with the request that the user does not know.  Then why not tell them?  Consider this to be a kind of “just in time documentation”.  The user should have known that the request was bad, but they didn’t.  If the error message can explain what is wrong, they might learn, and not do it again.  Or better, they might solve the problem without help.

## The Good Error Message

The good error message might allow the user to solve the problem. Not every error message is a problem that can be solved, but many can.  This is an example of an error that the user by resolve, by editing the birthday in the submission or in their user profile.

A good error message will give useful information and avoid a support call. Any system that give vague, incomplete, or cryptic errors is not of use to the user.  They tried to do something, and they got a garbage error back, so their only option is to call support.  Or to randomly try other things.

The problem is that a list of fixed error messages will not be useful in cases beyond the trivial examples.

## The Perfect Message

A perfect error message might be:

> Error #41513:  your birth date can not be parsed, and that is needed to calculate your age, so we can determine whether you can rent a car for your trip.  So go find your birth date field, correct your birth date in YYYY-MM-DD format, and resubmit.

This could never appear in a single list of error message codes.  There are too many combinations.  A programmer can not enumerate all the possible combinations of problems that would prevent processing, and then make a list of the possible error message.  All of the number of combinations of problems that could go wrong would be astronomical.

Even if the thousands of combinations of problems could be successfully listed, how does the system go about determining that the combination of problems occurred?  This would be a challenging programming assignment for main data generation, but for an error message it is far too much trouble to be worth while.

## Too Costly is Prohibitive

Consider the pragmatics.  Software is expensive, and most of the time is spent on getting the primary functionality to work.  That is where the real benefit.  A few users make bad requests is not big part of the business.  You can’t please everyone, so be sure that the main line good requests are right.

Error message composition will get minimal effort, and it should.  You can not expect leading edge artificial intelligence to be applied to help answer why a request failed.  Instead go read the manual!

Whatever technique is used, it has to be _quick_ and _easy to implement_.  That is the main reason why the perfect error message will never be produced: it is just too much programming.

## The Pragmatic Solution

In the next post, I will present the Optimal Error Message which is to take pieces generated in the various parts of the code, and combine them into an error message that comes very close to perfect.