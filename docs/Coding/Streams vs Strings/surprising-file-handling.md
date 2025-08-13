#  File Handling Antipattern

I don't usually focus on bad examples of code (because there are so many ways to do it wrong they are rarely repeated) but here I found a particular pattern that was pernicious and repeated all through the code, indicating that at least one development thought this was a really good idea.  It isn't.  
Here is the code, do you see the problems?

```java
// save to dest
FileOutputStream fos = null;
try {
    fos = new FileOutputStream(destFile);
    DOMUtils.writeDom(doc, fos);
} finally {
    if (fos != null)
        try {
            fos.close();
        } catch (Exception e) {
            logger.warn("Error in closing resource", e);
        }
}
```


What does this do?  This opens an output stream to a file, and calls a method “writeDom” to a file, and then calls “close” to finalize and fix the file on the disk _whether or not an error occurred during the writing_!  The programmer went to some trouble to construct a finally block specifically to make sure that the file was closed, even if there is an error!  

Think about that.  In this case the routine doing the writing is not a trivial one . . . it is going to walk a large tree of data and serialize it.  There could be anything wrong with the tree which is discovered while writing it. IT might write out half the tree, and then hit an exception for some reason.   Or it might hit an exception for reasons that have nothing to do with the tree, such as an out-of-memory error, or a server-shutdown request that kills threads that are running.  

If the writeDom method throws an exception, there is a good chance that you have half of a file on the disk — basically what we call a _corrupted_ file.  What do you do with a corrupted file?  Do you save it in the hope that someone can recover manually the half of the data that is in it?  Most likely this file is another error to happen when you try to read it, since the parser will reject it.  Leaving a corrupted file around is also a bad idea because the user _thinks_ that the file is good, and is not alerted to the fact that an error occurred during the writing of a file.  

You see there are two conflicting goals.  At the micro-scale, you should “always close your files”.  If nothing else mattered, then this would be good programming practices.  But another goal is at a larger scale: “write reliable software that guarantees the results are good.”  This larger goal conflicts with the idea of simply closing the file.  It seems we are focusing on the wrong goal.

:::tip[Key Takeaway]

A partially written file should never be preserved.

:::

If the file is not complete, whole, and well formed, it should be immediately discarded.  A malformed file is worse that no file.  In this case you don't know for sure how much of the file was written.  It might be 100% written, it might be 0% written, but it is most likely somewhere between the two.  If you can not prove that the file is 100% correct, then you should you should take every step to eliminate the file!  

That is the way transactions work: either you get the entire desired change, or the entire thing is rolled back.  Your file handling should be the same.

## A Better Approach

```java
// save to dest
FileOutputStream fos = new FileOutputStream(destFile);
try {
    DOMUtils.writeDom(doc, fos);
    fos.close();
} catch (Exception e) {
    fos.close();
    if (destFile.exists()) {
        destFile.delete();
    }
    throw e;
}

```


This approach uses some key principles:

*   The flush and close statements follow the output routine in the normal code.  When everything goes properly, the output is flushed and closed.
*   if there is an exception, we take extra steps to delete the file if there is one written.
*   An output file will exist only if we are 100% sure that it was written correctly.
*   the close in the catch block is there to make sure that the stream is finalized before we try to delete the file.
*   The creation of the FileOutputStream is outside the try block because if that fails there is nothing to clean up.  The earlier code was rather silly to put it inside the try block because the finally block did not do anything if this failed anyway.

Often, we are writing out a file over an existing file.  In that case we don't want to destroy the former file until we are 100% assured that the new file is there.  This is done by writing to a temporary file, and then renaming the it to the file that you want.  Here is that code:

```java
// save to dest
if (tempDestFile.exists()) {
    tempDestFile.delete();
}
FileOutputStream fos = new FileOutputStream(tempDestFile);
try {
    DOMUtils.writeDom(doc, fos);
    fos.close();
    if (destFile.exists()) {
        destFile.delete();
    }
    tempDestFile.renameTo(destFile);
} catch (Exception e) {
    fos.close();
    if (tempDestFile.exists()) {
        tempDestFile.delete();
    }
    throw e;
}
```

<!-- TODO: this should be updated to include try resources -->

This version also explicitly gets rid of any temp files that might have been hanging around,and explicitly gets rid of the destination file if it happens to be a round.  This is good coding practice.  There are still some very small windows that a corrupted file could get written and still remain, but it will be astronomically rare.  
In summary I hope what is clear, is that:

:::tip[Key Takeaway]

closing a file in a finally block, so that the file is neatly closed whether the writing routine failed or not, is a really really bad idea.

:::

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [errors](https://agiletribe.purplehillsbooks.com/tag/errors/), [exceptions](https://agiletribe.purplehillsbooks.com/tag/exceptions/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2013/07/18/surprising-outrageous-file-handling/ "Permalink to Surprising outrageous file handling").