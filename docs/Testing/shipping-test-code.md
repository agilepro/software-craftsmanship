#  It's OK to Ship Tests with Product

A product is a product, and testing is testing, and they should be kept separate, right?  The thinking goes that consumers would never want to test the product.  Of course they don’t, but they are not the only people in the field. 

If you are doing good agile development, then you have a set of tests that are at least partially automated.  You do the build, you run the tests, then you know things are working.  But are those tests part of the product?  Or a separate product which only the development team uses? 

For years I have shipped test with the product. I am not expecting the customer to use them.  But users often run in an environment different from the development environment.  It shouldn’t matter, but sometimes it does. Having the tests right there in the environment can be a huge benefit when it comes to debugging problems in those environments.  You don’t have to start by “installing the tests” because they are already there. 

If installation is tricky at all, it is nice to have a non-disruptive test to run after installation.  Again, hope you don’t need to have it there, but when trouble arises it is a nice tool to have. 

In Java you put classes into different packages (just a glorified file folder).  Tests are often placed in a different package so that they can be separated out, and removed from the product.  This means you have classes in a tree of packages that are tested by classes in yet another tree of classes.   Spreading the knowledge about a class (the implementation and the test logic) into two separate packages runs against the principle of encapsulation which tries to keep all the important internal details in one place.  But if you don’t need to remove them, then there is a big advantage of having the test classes directly in the same package with the classes they are testing.  Each package contains the classes that are in that package. 

It is a matter of size.  If the tests require a lot of data, and if that data would make the product double or triple the size, then that additional overhead may not be justified.  You might want to hold back on those huge data files.  But class files are generally not that big.  Adding or removing them from the product does not significantly change the size of the deliverable. 

In conclusion, there is nothing wrong with writing test classes, and leaving them in the product.  There is no need to strip them away, and having them be an official (but undocumented) part of the product can be a large advantage.  
 

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [Design](https://agiletribe.purplehillsbooks.com/category/design/), [practice](https://agiletribe.purplehillsbooks.com/category/practice/) and tagged [testing](https://agiletribe.purplehillsbooks.com/tag/testing/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2017/07/10/its-ok-to-ship-tests-with-product/ "Permalink to It's OK to Ship Tests with Product").