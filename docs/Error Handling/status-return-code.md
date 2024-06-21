# Exceptions vs. Status Codes


:::tip[key Takeaway]

When an error occurs, and a method it not able to return the value it was asked for, never signal this by returning a special value indicating error.  Throw exception instead.

:::

For example, say there is a method that return a percentage value from 0 to 100.  It is possible to use a special value, like -1, to indicate that an error occurred.  There are a number of reasons why this is a bad idea:

**Separation of Error Handling** - returning a -1 to indicate error means that the code receiving the value has to test for -1 and prevent the program from continuing.  That condition is right in the middle of the regular logic.  Throwing an exception moves the error handling code to the catch block, which can be many lines away, keeping the error handling logice conveniently away from the main non-error logic.  This makes that main logic easier to read.

**Unnecessary Duplication** - This test condition needs to be every place you call that method, which is a lot of duplications of the exact same code.  Separating that out into a catch block, you might have one catch block for the entire program that handles this, and in any case it is separated out away from the main logic.

**Risk of Forgetting** - a programmer that forgets to check the special value runs the risk of having that -1 treated like normal data with unexpected consequences. This can cause a time bomb that goes of later when the -1 is attempted to be used as a percentage value.  Using an exception works far better because even if you forget the catch block, the program execution and an error reported at the root level.

**Code Maintenance** - separating out the error handling code makes the main logic shorter, simpler, and easier to read, and therefor easier to maintain.

**Richer Error Info** - the return code -1 tells the operator almost nothing about what caused the error.  Exception should be rare, but when they occur you generally want some complete information about what caused the error.  For example, a file might have been locked, preventing the calculation, and the exception should include this information.  A -1 can not communicate this detail.

**Not Always Possible** - Some methods return values that don't allow for special values.  For example, a method that returns a string might need to return any possible string.  There are no "special" string values that can be separated out from the data.  In this case using an exception works far better because it is never mixed/confused with data.

## Returns Code OK if not Error

What about the case when you want to signal a non-error situation?  For example, you are reading a file, and you reach the end of the file?

One might argue that reading off the end of a file is an error, and if so one should throw an exception.  but reading off the end of the file is NOT an error and should not cause an exception.

Reading to the end of the file is a perfectly normal thing.  Just about every time a file is opened for reading, the code reads to the end.  If this was implemented as an exception, it would occur every time you want to read a complete file, which is not "exceptional".

Since every file has an end, reading off the end is not really an error.  The method was expected to return the next character, and there is no next character so it returns a -1 to indicate that.  it is not that it failed to get the character, but that it worked entirely correctly and there is no character to return.

In this case it is suitable to write a loop that is looking at the values returned and checking to see if the special -1 is returned indicating that the file is completely read.

An exception would be a bad idea in this case because the exception would be representing the data . . . that there is no character to return.  Using an exception to indicate reading off the end of a file would cause programmers to use a catch block as the break ot of the reading loop, which again should only be done for errors, and not things that happen every time you read a file.

## References

* [Ned Bachelder - Exception vs. status returns](https://nedbatchelder.com/text/exceptions-vs-status.html) - a good writeup from 2003 explaining why exception throwing is almost always preferred over using a return status code.
