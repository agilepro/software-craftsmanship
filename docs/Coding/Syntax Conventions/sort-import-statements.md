#  Sorting Import Statements

Java programs start with a list of import statements at the top.  There is much debate as to what order they should be put in, with some programmers trying to group similar imports together.  They should simply be in alphabetical order.  

The only purpose of the import statements is to disambiguate class names.  A java class name is not globally unique unless you specify the completely package name with it.  However, it is inconvenient to use the full class name with packages every time you refer to the class.  It is more convenient to use the shorter class name.  That is all the import files do is to specify which global name is to go with the shorter class name you use in the code.  

From a maintenance perspective, a programmer need to know if a particular class is in the list or not.  To aid this, there should be a single, unambiguous spot for the global class name to exist.  It does not really matter where that is defined, but there needs to be a single spot so that a programmer can say easily that a particular class is, or is not, being used.  

Also, when it comes to versioning of the source file, you want the declarations to be in a well defined order, so that the diff output is meaningful.  If there is disagreement on the order that the import statements go in, then a programmer might \*move\* the import statement to match their understood order. Movement looks like a removal and addition in a diff output, and complicates the understanding of what really changed.  

Sorting the import statements in alphabetical order solve this problem nicely:  alphabetical order is unambiguous.  There is a specific place for every class, and nobody has any disagreements about how to sort in alphabetical order.  There is a clear place to add new statements, and every programmer will do it correctly.  

Because package names are arranged with most global scope first, with more and more local package names imported later, sorting alphabetically tents to group classes from the same package together, and classes from the same super package together, etc.  

One particularly convenient thing is that many common programmer text editors import a function for sorting lines in alphabetical order.  Just select the lines, and they are put all in alphabetical order.  

The compiler does not care what order import statements come in.  Attempts to group “system” classes togther, and “application” classes together, and “language” classes together fall prey to the problem that the definition of “system” and “application” are not clear.  A class may to part of the system in one place, and part of the application in another.  Such attempts at classifying classes into groups will produce endless discussions on how to classify such classes, and disagreements cause problems in the code.  It is best to avoid this, since there is no need, and no benefit, to grouping import statements by type.  Just sort them in alphabetical order, and be done with it.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2013/01/03/sort-include-statements-in-alphabetical-order/ "Permalink to #34 Sort Import Statements in Alphabetical Order").