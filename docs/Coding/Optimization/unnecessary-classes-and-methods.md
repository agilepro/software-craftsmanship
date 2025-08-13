#  Unnecessary Methods & Classes

This should be obvious, but it is a rule that is violated quite often. This is one corollary to the YAGNI (You Aren't Gonna Need It) Principle.    This post discusses that there is a proper time to do things, and it is a waste to do them ahead of time.  

Some programmers will add in methods that they think they are going to need in the future.  Sometimes they write classes that they think they are going to need, but don't actually need today.  Sometimes, they refactor one class prematurely into multiple classes because they think that in the future the class will get complicated, and they will need to break things into separate classes.  The point, though, it that they don't need to do it yet, and doing it before you need it is a waste in these ways:

*   It is extra work now that is unproductive
*   It add extra cruft to the source, making it harder for others to read and maintain
*   You might later find that the parameters actually have to be different, and then you need to re-write it, which is more work than just implementing it once the right way.
*   When you rewrite it, it is not obvious whether there is other code using the old version, and so there is a tendency to copy and duplicate the code, even though the old code was never needed.
*   When the need is not immediately clear, programmers spend extra time trying to understand why it is there.
*   You might never actually need it, and there is additional work removing it, but more likely it will remain as extra, unnecessary lines in the code.

There may come a time when you will need something, and _that_ is precisely the time that it should be added. If you attempt to anticipate something before it is needed, you can not be sure that you have the requirements right.  Thus, what you implement might not be right anyway.  When you need it, you will also be in a place to test it.  Remember, code should never be added without testing, and so adding unnecessary functions means you are adding untested code.  Even if you add tests, since you don't know for certain what the need will eventually be, you might be writing a test cases for an unnecessary situation.

## Methods

A pattern I have seen a lot is adding “typical methods” into a new class.  You create a class, and then create a getName method, a setName method, a getSize method, and a setSize method, or some such stuff as this.  If you need these methods, then no problem.  You code will be immediately set up to use these methods, and by using them you know that they function correctly. However, if there is no need to call “getName” at this point in time, then you should not write it.  You might know that this object will definitely have a name, and you will need it in the future.   But writing the getName function before it is needed can be a waste in the ways mentioned above.

Consider the other side: later you have a need for a new method “getWeight”.  It is easy to add methods to a class, so just add it at that time.  In the worst case, it is _no more trouble_ to write the code at that time, than it is to write it ahead of time.  If you wait and write it when it is needed, then you will be 100% clear on exactly what will be passed in, and what must be returned.  

You add methods to a class as they are needed, and not before.  Then there is no waste.

## Classes

Each class fulfills a need spelled out by the information architecture.  For example, implementing a purchase order, you know you need a class to contain everything, and another class for the line items.  Those classes are needed because of the structure of the data — it would impossible to start with a single class.The container PO class contains a collection of LineItems and so you must implement the classes from the start.  There will be a certain number of classes that are absolutely needed from the start.  

Later, you may determine that you need a class to represent an Address, and there is a ShipTo address, and a BillTo address.   You should create Address class at the time that you add the ShipTo and BillTo fields to the PO.  It would be a waste to create the Address class before you need it — just an orphaned class not needed and not used by any other class.  Even though it may be obvious to you from the beginning that an Address class is needed, it should not be created until it is absolutely needed.  

The is the Principle of YAGNI.  Everything is written at the time that it is actually needed.  It is used when it is created, and it is fully tested at all times.

## Refactoring

There are cases where you need some form of polymorphism: that is you have three types of items which will be represented by different classes.  Again, you should implement only one class until you need the others.  You create a base class and implement the first example in there, and get it working.  Then later, when you need a second kind of that object, you can convert the existing class into a base class (or an interface), copy the the original contents into a new derived class, and implement the second derived class.   The true polymorphism is created only when the second variant is needed. Don't create the polymorphism before you need it.

When a class gets too big to handle, you might need to refactor it into more than one smaller classes.  This should be done when the class gets too big.  Doing it ahead of time might be a waste because your plans might change, and then you don't need to do it.

## Published API

A published API may require a method even though you don't use it at the time.  This counts as a “needed” method for the purpose of this discussion.  A published API is created ahead of time, for others to use later.  Because the code implementing the published API must be created at one time, and use by a different developer at a different time, then there is no choice that the methods must be implemented as per the API.  

If you are creating an API, you should try not to add methods that you know are not needed.  But you may need to add what the published API requires up front.

## Summary

You should always approach the programming job as if you plans might completely change tomorrow.  Someone may invent a new language.  Or a new product may come out that you want to use instead of reimplementing those capabilities.  No plan survives contact with the enemy.  The way to remain the most flexible is to not implement anything except those classes and methods that you need.  Everything implemented should be tested and it would completely work.  Adding extra methods or capabilities that are not used represent a kind of technical debt which builds up. If you have to change plans tomorrow, how much work will be needed completing that extra functionality?  If you implement only what you need, then when the plans change, you have no extra debt built up. Everything you have you need, and everything you need you have. If the change of plans means that you have to rework existing code, then not having a lot of extra methods means there is less to rework.  

This all should be obvious, but it is amazing how programmers will go an add a large number of methods on the idea of being complete>  They think they are doing a good job by making sure that every possible method for a class is implemented, but this is actually a waste. The software world is different than the physical world.  In the physical world, adding something up front can be less expensive than adding it later once the product has been put into use.  There is a desire in the physical world to make sure that all possible future needs are accounted for.  But the software world is different.  It is trivial to add a method later . . . at any time.   However, there is a cost to adding something that later needs changing or removal.  I\*n the software world every line of code increases the maintenance costs. It is actually quite a bit MORE expensive to remove a method, than to add one. There is no utility to adding something that is not needed, and it is cheap to add it when it is needed.  It simply does not work the way the intuition would normally think about things.  

I worked once with a software designer who use to include all sorts of embellishments into the classes and into the code.  It was as if he was building a house, and adding all sorts of unnecessary doors and windows “just in case he would in the future want a door or a window there”.  These capabilities were not really needed, and so the other developers did not really propagate these designs to the other classes consistently: some classes properly implemented the capability and others didn't.  That means that you could not trust it to work at all anywhere.  Since it could not be trusted, it could never be used int he future, without walking through all the classes and manually checking them, if there was a time in the future that they were needed.   It would have been FAR more effectively to leave those embellishment out of the classes.  This would have been less trouble to the other developers.  And later adding of the capability would be easier than going through and fixing the partially implemented and inconsistent code.  

Keep It Simple: YAGNI