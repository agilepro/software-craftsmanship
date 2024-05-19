---
  title: Catch & Continue
---
#  Never Catch and Continue

I ran across a body of code that is using a spectacularly evil coding pattern. This is not evil that presents itself as a devil with horns and pitchfork, but rather this is a wolf in sheep’s clothing. It is an evil pattern that looks so reasonable, and I bet most readers will look at it and initially ask “What is wrong with that?”  
Here is a sample block of code exhibiting the pattern:

```java
public void updateClientName(WFSession wfs, long piId,
        String clientName) throws Exception {
    ProcessInstance pi = WFObjectFactory.getProcessInstance(piId, wfs);
    pi.startEdit();
    try {
        pi.getDataItem("sdmClientName").setValue(clientName);
        pi.commitEdit();
    }
    catch (ModelException exp) {
        exp.printStackTrace();
        pi.cancelEdit();
    }
}
```


At first glance this seems reasonable. The edit is initiated, the method is called to find the particular process variable, and another method to update it. If anything goes wrong, an exception will be thrown. The edit is cancelled, the stack trace printed out, and _the program continues_.  
It is all pretty good up to that last bit: “the program continues”. That is the problem. This routine was expected to set a value, and it sometimes does not set that value, but there is no way to tell outside this routine whether it did or not!  
The proper name for this routine is “mightOrMightNotSetClientName.” Sometimes it sets the client name, and other times it does not, and the calling code has no way of knowing whether it did or not.  
Imagine you create a class like this:

```java
interface clientSupport {
    public void mightOrMightNotSetName(String newName);
    public void mightOrMightNotSetAddress(String newAddr);
    public void mightOrMightNotSetBalance(String newBalance);
    public void mightOrMightNotSetPhone(String newPhone);
    public void mightOrMightNotSetStatus(String newStatus);
    public void mightOrMightNotAddResource(String newResource);
    public void mightOrMightNotRemoveResource(String oldResource);
}
```


Now write a program. You might set the status, or you might not. But it get particularly insidious because during testing, it essentially always works. These methods work in testing, so you get the idea that it always works. Indeed, the methods very rarely fail. The problem is only that when they do fail, the calling program has no idea that they failed, and go on to continue.  
Consider the pair of routines: addResource and removeResource. One might easily see these called together in order to replace an old resource with a new resource. For example a stock sale transaction might decrease the amount of stock and increase the amount of cash on hand. With this programming style, it is quite easy to do one, and not the other, which would lead to inconsistent data. It is very hard to find this.

### Rule: never catch and continue

It is a simple rule: if you catch an exception, you MUST in 99.99% of the cases re-throw something. That exception could be anything. It could be a stack overflow, in which continuing is not only pointless, it can cause servers to lock up in endless loops, starving the threads that are needed to address the problem. 

An exception jumps out of the middle of a programming block, and programmers write block on the assumption that they are executed completely. Because exceptions violate the assumptions of the code, there is no guarantee that ANYTHING in the stack is properly constructed. There could be half-constructed sets of values. Continuing execution is exceptionally risky – but it depends upon the kind of exception, and that can not be predicted.  

It is easier to remember that “catch and continue” is evil. 

Any exceptions to this rule need to be carefully considered. It is possible to catch a single exception class, which is thrown from only one location in the code, and to continue for only that specific exception. Even that is risky.

If you want a program that is 100% reliable, then you will never catch and continue. Reliable code always re-throws after catching. The exception is always thrown to the VERY top level where the user interaction/event has been receive. The user should be informed that something failed, and the user should be involved in either redoing the action, or doing something else.

## Update, Aug 2012

Ran into another example worth mentioning.  The pseudocode looks like this:

```java
try {
    pi.commitedit(); // This throws exception.
}
catch(e) {
    if(ifEditTabIsNotclosed) {
	pi.structuralEdit(); // This again throws exception.
    }
}
```


The setting is that there is a structure which has been locked for edit, represented by the variable “pi”.  The method in the try block is supposed to save the changes, and release the lock.  However, any might go very wrong and throw an exception.  The catch block then does the most amazing thing: it attempt to re-lock the record.  The “structuralEdit” method is the one that is used to get a lock in the first place. 

It seems that the programmer who wrote this code felt that if anything goes wrong while trying to save the data, one should then attempt to RE-edit the structure again, and continue as if nothing had happened.  

I can’t even begin to express how evil this is.  The exception might have been thrown because something in memory was corrupted.  For example, what if the exception was that the JVM ran out of heap space while attempting to transform the structure into the right shape for saving.  You could have a half-formed structure in memory, which you are then starting to edit again.  This might have the effect of permanently saving the corrupted structure at some point in the future!  A better approach would be to clear ALL global values and reinitialize the entire applications from the ground up.  Far safer than this approach which continues as if nothing happened.
  
The particular problem that allowed us to notice this, is that when the first method throws an exception, and the second one does as well, it is the second one that is reported to the user!  The first exception, the real cause of the problem is lost.  One should simply never do operations that might update the persistent state in a catch block.