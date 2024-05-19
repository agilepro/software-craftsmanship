#  Collection Functions never return null

A function that returns a collection, such as a list of all files in a folder, all sections on a page, or all attachments on a web site, should never return null.  It is a simple rule, and if followed reduces the complexity of the calling code.

The type being returned could be an array or any kind of collection class, such as a Vector, a List, a Hashtable, whatever.  In these situations, the method should never return null. If there are no matches for the particular query, it should return an empty collection. If there is an error, it should throw an exception. There is no situation that justifies returning a null value.  

Returning a null means that the code that calls it always has to check for null, to avoid null pointer exception.

Often a collection is retrieved in order to iterate through all the elements. An empty collection works nicely, causing the iteration to execute zero times, which is what you want to have happen when there are no instances of what you are looking for. The code can be written cleanly and handle all cases equally well.  

If you wish to do something different on the zero case, you can test for an empty connection as easily as you can test for null. But that test need be done only when you really want to do something different on the zero case.

:::tip[Key Takeaway]

A method returning a collection should never return null.

:::

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [collections](https://agiletribe.purplehillsbooks.com/tag/collections/), [null](https://agiletribe.purplehillsbooks.com/tag/null/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/05/7-functions-returning-collections-should-never-return-null/ "Permalink to #7 Functions Returning Collections, should never return null").