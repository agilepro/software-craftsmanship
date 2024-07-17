#  Trim only on Input

One bad practice I have seen on many occasions is the use of trim() statements throughout the code.  This is a poor coding practice, and it is an indicator of disorganized code.

:::tip[Key Takeaways]

The spaces on then end if a piece of data is either significant or it is not.  If it is significant, it should never be trimmed off.   If it is not significant, it should be removed as it enters the system, and nowhere else. 

Adding trim statements into the interior of processing unnecessarily adds processing, and it covers up problems elsewhere in the code.

:::

## public String trim(String input)

Trim is a function that takes a string as an argument, and returns the string with white space characters (tabs, spaced, returns) removed from the beginning and end of the string.  If the string started with a space, that starting space will be removed.  If it ends with a tab, that tab will be removed.  But nothing within the string will be otherwise modified.  That is, the algorithm will not modify any white space characters that occur between non-white pace characters in the string.  

In Java is it actually a member of the String class, so the method does not have an explicit parameter, but instead works on the string instance that the method is a member of.  Other languages may have the syntax slightly different, but most languages have something like a trim method.

## Proper Use

This is a useful method in two situations.  The first is when there is use entry.  Many input methods give the user a box to type an answer in, for example an email address to send a message to.  White space is white in the sense that it does not appear on the display.  Because if this, it is easy for people to accidently include white space that was not intended.  White space characters before the entry will often (but not always) cause the typed value to be displaced slightly to the right, but it is no always clear when you have only a single example, where the value was supposed to begin.  Not all white space characters will cause a displacement.  White space at the end will have no indicator at all on the screen.  Sometimes the technique of selecting the data value can be used to indicate that white space characters are present, because the selection range will include space for them, but the user does not always check values so clearly.  

Trim can be used to clean up values that are entered by users, and to remove this extra unintended input.  

The second place where trim is useful is when parsing lists of things.  For example, and comma delimited list entered by a user, may have additional white space after the comma.  Thus if you parse a list of email addresses, and you split the line on the comma locations, you will also need to use trim to get rid of the unnecessary white space.  

These are proper uses of trim, and notice that both are involved with receive data either from a user or from an external system/file.

## Improper Use

I often see programmers add a trim statement arbitrarily in the code.  What happens is that while developing the code, they hit an error situation where a value had a space character at the beginning or the end, and required removal.  Adding the trim statement right there fixed the immediate problem. For exapmple, reading a column from a database, and trimming the value before further use. 

Data values stored in the system should be defined to either allow spaces on the end or not to allow spaces on the ends.  If it allows them, then these spaces are part of the data, and can not be discarded.  For example, if the DB column is storing email addresses, and since an email address is not by definition allowed to have spaces in it, then there should be no spaces in the data.  If a programmer finds values that have spaces, this is a failure of the part of the system that receives the email addresses.  It is a failure to clean the data as it came into the system. 

Adding the trim in the middle of processing is a patch that covers up, but does not eliminate the problem.  If the system is forgiving in allowing spaces in the email address column of the database, then there is a likelihood that some other part of the code will have a bug because of this.  

The real job is to go back and figure out how the bad data got into the column in the first place and fix that.  Perhaps there is a form that accepts input from the user without properly trimming the data.  That needs to be found and fixed. 

If a method is expecting an trimmed value, like an email address, it should not simple add a trim function to clean up the data that comes to it.  Adding trim statements arbitrarily into the interior of the code makes it ambiguous about whether the space at the beginning is significant or not.  It is modifying the data that is passed.  Instead, it should be clear about whether the data should be trim or not.  Only by being clear on this point, can the code that is calling do the right thing.

While trim is not an expensive method, it should be clear that methods deep in the code may be called millions of times in a row, and a small inefficiency will add up.  For example, a loop that runs through a large set of data, should not be trimming each value as it gets to it.  If the space on the ends is not significant, then it should be removed when put INTO the set of data, not continuously and repeatedly as the data is read OUT of the set.  

It all comes down to understanding whether those spaces on the ends are significant.  If they are, then NOTHING should ever trim them off.  If NOT, then the value should be trimmed as it comes into the system, trimmed once, and never again. Anything else is **_sloppiness_**.

## Solution:  public void assertTrim(String input) throws Exception

Programs are developed incrementally.  One programmer may discover bad at any time.  Even if the proper job is done to hunt down all places that allowed untrimmed values into the system, there is no guarantee that someone might add a new input method that fails to trim values as they come into the system.  

Rather than adding a protective “trim” statement, one should instead add a method that tests the value for correctness, and throws an exception when it is not correct. Instead of covering up the problem, this would immediately alert the operators of the system that something is wrong, and would, in most cases, allow the code to be fixed properly.
