#  Keep It Simple: Factory

Some of our development is done by outside contractors, and they have a long list of “code policies” for producing good code.  I have nothing against such policies in theory, but in practice it leads a lot of unnecessary work, simply because simplistic rules about good code do not always lead to good code.  This post is about an example.

## Setting

The development team had received a set of code (about 10 classes of source) from an outside source. The first thing that any development team does is to go about 'cleaning up' the code.  The reason for putting 'cleaning up' in quotes is because what this really means is to transform the code into a more familiar form.  Using your team's variable naming conventions, indenting style, coding patterns, etc.  This can make the code more 'readable' to someone accustomed to that style.  
The code had an abstract Interface, and three concrete implementation classes:

*   Interface: AuthStyle
*   Implementation: AuthStyleLDAP
*   Implementation: AuthStyleLocal
*   Implementation: AuthStyleModelAPI

## The Rule

The team knows that the general pattern is to make a factory class which returns a concrete instance of this.

:::tip[Key Takeaway]

Never implement a class when a simple switch statement would do.

:::

They made a proposal, and estimated this work as 1.5 programmers days, to add a proper factory class that would do the job.  Consider however the code they would be replacing, which I include here in entierty:

```java
if (isLDAPMode) {
    authStyle = new AuthStyleLDAP(configSettings);
}
else if (isModelAPIMode) {
    authStyle = new AuthStyleModelAPI(configSettings);
}
else {
    authStyle = new AuthStyleLocal(sc, configSettings);
}
```

This is 9 lines of code.  It creates one of the three concrete implementation classes, and assigns it to the variable typed with the interface.

*   **Is this hard to read?** – I would say that any programmer encountering this code would be able to know immediately what it is doing.
*   **Is this cluttering the code?** – With a factory class, you might be able to reduce this 9 lines to 1 or 2, but that is not a huge savings.
*   **Is this complicating the code?** – No.  Adding another class will transform this 9 lines into 30 or 40 lines given the additional complication of including, plus a few lines in this class.  Making a separate class always ends up significantly more elaborate.  It is important that there be a clear benefit for separating code out into a separate class.
*   **Is this code copied many times?**  – Not in in this case. There is only one place where this code has to be.  If there were many different places that the code would have to be copied, if there were many places that needed to create then concrete classes, then a factory class would be warranted.  But the code shown is executed once upon startup, and there is no other copy, nor is that code ever executed again.
*   **What if you add more concrete cases?** – That is a bridge that should be crossed when you get to it, and not earlier.  If there were 6 or 7 subclasses, then there might be a case for a factory class, especially if the conditions were more complicated.  But one of the biggest mistakes in software design is premature preparation for additional complexity — that never comes.

Above are the kinds of questions that should be asked.  In general, if 9 lines of code can be written in place of a new class, you should simply take the 9 lines of code.  There is always the change that in the future you will have more classes.  When that future comes, change this code into a factory class, but not any earlier.  

YAGNI – This is a classic case of “**You Aren't Going to Need It** (YAGNI)”.  The most common design mistake is building int he possibility for flexibility when the need has not been demonstrated.  This is implemented “just in case” but many times our intuition of what we will need is wrong.  There is no need to implement anything in sfotware BEFORE you need it.  If a factory class is needed later, then you can implement it later.  There is NO savings in implementing it ahead of the need.  In fact, if the need never occurs, then this work is a waste.

## Contractors

In fact, the programmers proposing this were contractors paid by the hour.  They estimated that this job would cost 1.5 days of programming.  They were hoping that their client would pay for this work, even though there is no demonstrable benefit.  My answer:  we will do this 1.5 days of work, when you can positively show me that it will **_save_** 1.5 days of work elsewhere.

## When do you make a new Class?

None of the coding authorities have a really good answer on when to create a class, and when to just have conditional branches as needed. For example, you might have a class that represents a customer, and it might be that you treat students and adults differently.  Should you make a class for StudentCustomer and another for AdultCustomer?  That depends really on how much code is different.  If the difference is small, you might just have a single class Customer with a boolean member _isStudent_.  Then at points in the code, you have a conditional branch: “if (isStudent) …”  

If you find that a lot of your methods have this if statement, then maybe you should consider a subclass.  But, if only one method has it, then juse keep the branch statement.  The overhead of a class is not worth it. 
 
And remember, never make the change to separate classes, until you have a demonstrable need and benefit that will come from it.  Don't create classes “just in case”.