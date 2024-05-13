#  Choice in Style of Debug Code

I have seen programmers take two approaches to code used to debug a project.  One of these approaches leads to “precision code” and can be left in to assure precision in the future, the other is . . . sloppy.

## Setting

Today I need to debug some code that synchronizes files between two servers.  The bug behavior is that if there are five files to synchronize, it seems to pick up the five files, but only sets the timestamp on the first one.  The other four have no timestamp value transferred, even though the file is clearly downloaded.  
The code block that does the downloading looks something like this:

```java
for (SyncStatus docStat : docsNeedingDown) {
    AttachmentRecord newAtt = local.findAttachmentByID(docStat.idLocal);
    URL link = new URL(docStat.urlRemote);
    InputStream is = link.openStream();
    newAtt.streamNewVersion(ar, local, is);
    newAtt.setModifiedDate(docStat.timeRemote);
    newAtt.setComment(docStat.descRemote);
}
```


The loop streams the document down, and then sets the timestamp.  What could possibly be wrong?  We don’t know at this point, so I need a little more information about what is actually going on in this loop at run time.  Is the docStat.timeRemote set incorrectly, or is for some reason setModifiedDate not working.  To get more information at run time, I am going to add some debug code.

## The Sloppy Way

The way many programmers would do this would be to add a statement that writes to a log file.  In this program standard out works fine, but you might also use a “Logger” object and write at the debug level.  The statement would look something like this:

```java
System.out.println("Sync doc "+docStat.universalId
      +" and attempted to set timestamp to "+docStat.timeRemote);
```

For every time through the loop, it will print this showing what it did.  You can sprinkle these through the code, and there will be a bunch of output which you can use to determine what is going on.  Hopefully you will see either that every document the timestamp was set to a reasonable value.  In that case you can dig further to find out why the set value is not sticking.  We are all familiar with this technique and it works suitably well. 

After you find the problem, be sure to go back and remove all the unnecessary output.  This is not always done, and you will see some projects with reams and reams of output in standard operation.  Leaving the debug statement in is lazy and not excusable, but not the point of this post.

## The Precise Way

The precise way is slightly different.  A timestamp value of 0 is never acceptable.  So instead of just writing out what is actually happening, you test and alert about the situation, including a suitable amount of details to aid debugging.

```
if (docStat.timeRemote==0) {
    throw new Exception("Program Logic Error: timestamp of remote file "
       + "is zero for ("+docStat.universalId+") while attempting to "
       + "download from the remote server.");
}
```

This does not printout what is happening on all the normal loops, but it does print out what is happening if the error situation occurs.  Into the exception, you should include as much information as possible; don’t be stingy.  If the error situation occurs, you will need the context, so go ahead and include it.

## Comparison

The two styles are not interchangeable in 100% of the situations.  I encourage programmers to always use the precise way if you can, and to look for opportunities to use it.  There will be some cases where you can not, and in those cases the standard output debug lines will be OK.  But there are real advantages to the precise way:

*   The code tests for a condition that should never be true, and then produces a lot of output about the error situation.  You can leave this test in the code in order to make sure that no future programmer breaks the code.  It is kind of like a test suite built into the code, always guarding against a future programming error.
*   Very low overhead: the integer compare is so fast that one does not need to worry about it.  The building of the debug string is done ONLY if the test fails.  The standard debug output string slows down the code on every loop, while this does it only when there is an error, so there is essentially no overhead on the successfully running code.
*   To debug, you make a guess as to what is going wrong, and you test for that condition, which is a more active approach to debugging
*   It exposes assumptions in the code.  In the above code, we are assuming that docStat.timeRemote is set to the correct timestamp for the remote file.  I suspect that it might instead be set to zero, so this test is put into the code.  Because this assumption is implicit in the code, adding the explicit test makes it clear.
*   There is far less output to dig through: if an error condition occurs you are immediately aware of that condition.  You don’t have to look through all the output to find the one where the assumption is violated: the program is doing the testing for you.
*   Fail fast: if the program hits the error condition that violates the assumption, throwing the exception stop execution immediately, allowing other, non-violating processing to continue.  I have seen systems where a logic error causes the system to occasionally go into extremely heavy processing bringing the server to its knees for no good purpose making it harder to find the error.  If you can find one error condition, it is better to expose that quickly, and get that fixed, than to go on processing.
*   This is an incremental way to create code that assures that all assumptions are correct.  Some might say you should always test all assumptions, but actually testing all assumptions at all points creates a lot of pointless code.  Instead, there are some places were the logic is less clear, and assumption violations more likely, and you want to cover those places first.  Those are the places where bugs appear.  So using a current bug as an indicator of a place where assumptions should be tested is a very efficient heuristic.
*   Forced to fix all violations:  With “println” style debug statements, you only notice a problem if you are looking for it, and this looking takes a lot of effort.  Instead, if you build in tests for assumptions, the execution stops whenever a violation is found.  The programmer is forced to fix the problem.  You can not ignore problems, and leave them in the code to fix later.  This assures a higher quality of code at release time.
*   If the test is expensive, then you probably want to remove it after debugging.  Not all assumption tests should be left.  This clean up is just like cleaning up the standard output debug statements.
*   If this assumption is ever violated in a production situation, you will have information in the log that might leave to resolving the problem.  The sloppy approach this is not possible, because either you have cleaned up the output and the information is not there, or you have left them in, and there is such a volume of debug information that it is practically useless.

The point of this post is to think about throwing an exception as a “debug statement” that is much more efficient than a “println”, and can be left in to make the code stronger in the long term.   Use this approach first whenever possible.