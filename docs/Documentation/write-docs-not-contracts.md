#  Good Documentation

I recently encountered an effort where a customer had decided to use some unanticipated web page functionality that conflicted with the working of the product.  There was no way to rewrite the product to allow that exact customer modification.  The result was to write a warning in the manual, but the warning chosen was not very helpful.  

:::tip[Key Takeaway]

Don't write as if documentation is a legal contract.  Write documentation that helps the user accomplish tasks.  

:::


Any system that allows developers to extend it, will have certain ways that the developer might decide to extend it, but which is incompatible with the system.  In this case the developer wanted to hook into some web page events which were already being used.  When they did hook into them, they defeated the system functionality, and things did not work right.  

The solution was: don't hook into those events.  There was another easy way to do it for the customer, and so everyone was happy.  To prevent this problem in the future, a warning was placed in the manual.  It went like this:

```
Note:
Product supports only those properties that are described in this
guide. Using unsupported properties may cause undefined behavior.
```


What is happening here is that the developers are viewing the documentation as a “legal description of what is allowed” and not “a source of information to help users get things done”.  I point to this as a bad example of documentation, because it really doesn't tell you what it is that you need to watch out for.  It just says: if you use something else, it might go bad. 

This is another form of “content-free documentation” which takes up space on the page, and wastes ink, but tells the reader nothing.  It is the tech product equivalent of a sign that reads:

```
Don't do anything that is prohibited.
```


Without actually telling you what is prohibited (or what is allowed) this is pretty much just wasted ink.  

However, the writers might feel that they are justified in including this in the document, because if any future developer tried to use other things, the company can point to this line and say “see, we never promised that it would work if you used unexpected things.”  

The question is: is it important to include such a statement.  Seems like something you might find in a contract.  Is the documentation a contract?  IT tells you what you can do, and it tells you what you can not do.  But is a vendor liable if the documentation is not complete?  Is it important to include every restriction for fear that a developer might conclude that “since you didn't say it was not possible, you have to now support it.”  

I not quite sure whether to conclude if this is an Asian cultural aspect, or if it is just a aspect of a conservative, large company.  It seems that some view the documentation as a legal contract.  That makes the documentation very hard to read, at the very least.  

Documentation, in my point of view, should be “helpful”.   More importantly, it must be concise: not be filled with unimportant and irrelevant text. Cluttered text is hard to read, and hard to pull the important information from.  So it is important to exclude unnecessary verbiage.  

In this sense, this statement is not valuable enough to include.  Instead, it should include a list of the properties that are supported.  Or possible list properties that will most likely cause problems. something of value could be included.  Or it should be omitted entirely.  But simply saying that “undefined behavior” will result from doing things that are not specifically described here, is too vague to benefit the reader.

This entry was posted in [Design](https://agiletribe.purplehillsbooks.com/category/design/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/08/13/documentation-and-legal-contracts/ "Permalink to Write Documentation, not Legal Contracts").