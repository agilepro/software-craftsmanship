#  Incremental Development

I happened across this excellent and perfect depiction of incremental development.  The image addresses on of the key flaws in thinking that lead some agile projects to fail.  So let’s discuss a bit.  

![6a00d8341ca4d953ef01a511e114a3970c](incremental-development-img1.png) 
 
The image makes these points clear:

*   The developed product is usable at every step.  The single wheel is useless, as are the two wheels and a chassis.  Traditional development has cycles, but the only one that matters is the final release when it is finally usable.  Agile development each incremental release can be used in some limited way.  The skateboard clearly is not a car, but it is functional.
*   Each release gains functionality above the last.  Both paths show incremental development, but be mindful that there are right ways and wrong ways to do incremental development.
*   Collect customer feedback at every step.  Since the customer can not use the product at any point in the traditional development, there is no feedback to be gained.  The customer is unhappy at every step.  Agile development can gain from customer feedback at every step, and the final product will be much better fit to customer.
*   The final product  — a convertible — was not known at the start, but was discovered in the agile approach, while the other was locked into a design from the beginning.
*   Each step does not perfectly anticipate the final product.  For example, the skateboard wheels are quite small, the bicycle redesigns those wheels, which are redesigned again for the car.  It is OK to implement something early on, which needs a redesign later.

The most important is this last point:  In traditional development rework of components is viewed as a waste:  you implemented the wheels three times!  What a waste! Some people will claim that very first thing to build is a data store that can hold a billion records and perform well, even though for the coming year or two you don’t expect more than a few thousand records.  The principle of YAGNI says not implement anything until you need it.  For the skateboard, all you needed was little wheels, so only implement that.  As the need changed, you go back and redesign larger (or more) wheels. 

It isn’t a waste in the case of a software product.  Software does not behave like physical world, and it is often quite easy to take a product that stores all its data in CSV files, and replace the data store with a high performance database.  Even if you had no idea in advance that X would be needed, generally such a restructuring to re-implement X is possible if you have modestly good encapsulation of code. 

The traditional approach is actually the most wasteful because of something we call “technical debt”.  Technical debt is amount of work that is remaining to get to a customer ready state.  In the agile approach each release is customer ready … it can be used by the customer.  But in the traditional approach, there is a large amount of technical debt — a large amount that needs to be completed before the customer can use it — in each release.  That costs you, because you can not get customer feedback.  Also, if you decide to make a convertible, it is too late, because you are locked into the design that was made before you got any customer feedback. The technical debt prevented you from finding the best product. 

Some people think it is OK to simply show the uncompleted product to the user, without them using it.  Thus showing them the wheel by itself.  That does not work if you are making a product that nobody has ever seen before.  A brand new application will do something that has never been done before.  How can a customer understand by looking at it?  You have to actually try it — use it — to understand how it is going to work. 

The biggest threat to an agile project is programmers who do not understand the idea of adding a small capability and getting that all the way to a running state.  Every release should be “customer ready.”  Some programmers get in their head an elaborate final state.  They create a horribly complex DB schema to meet what they anticipate every condition to be.  They implement all the database first, all the data transport next, all the program logic next, all the UI next, and all the error reports last.  The entire code base is broken for weeks or months while they attempt to address every possible situation at every level.  At the end they hope it all comes together (but there are usually big delays at the end because there are too many things to check.)  If the customer ends up using it in a way that the programmer did not anticipate, they blame it on the poor “requirements” they were given. 

Admit it, you know some programmers like that. 

Instead of implementing the entire complex schema, add one table at a time, and ONLY add the columns needed for what you actually have running.  Get one feature complete, all the way through testing and release at customer quality level. Then, when that is all working, add one more column in the table, and add the use of that value all the way through the code, test and release.  Then add one more column, etc.  Many programmers will feel this is a waste!  But that is an illusion. 

So thank you [Henrik Knieberg](http://blog.crisp.se/author/henrikkniberg)  for an excellent picture to help explain how incremental development can be done the wrong way, and the right way!