---
  title: Prefer JSON over XML
---
#  Prefer JSON over XML for Data Structures

If you are going to exchange data structures between programs you have many choices.  Of these, JSON is the best choice in general, and specifically a better choice than XML, and this post explains why.

## Overview of Options

Macro services, micro services, or any kind of web service needs to send and retrieve data from other services. You need a platform independent format that can represent structured information and will be expandable in the future.  You have two main choices: XML and JSON.  

Ways in which the formats are equivalent

*   both are text formats which can be UTF-8 encoded.
*   both are open readily available formats that are not tied to any particular language or environment
*   at the simplest level everything is a name with a value
*   collections of name/values can be grouped into objects
*   you can create lists of objects
*   both work best for tree-structured data, but graph structures can be represented in both by defining object ids and making reference by id.

### Differences

*   XML is treats white space as ambiguous.  In XML, two spaces is explicitly the same as one space.  Carriage Return, Tab, and Space are considered equivalent.  This is a problem when representing data — using a line-oriented data value you don't want your spaces being interchanged with returns.
*   JSON has a precise representation of string values. All Unicode values can easily be included in a string using the backslash notation.  No characters within a string will be substituted or misinterpreted.
*   JSON is a clear name-value structure where significant data is clearly separate from the characters that are there just for indentation.  XML was originally designed as a markup style representation that allows tags to be mixed into the text, with text outside the tags as well as inside them.  By convention we ignore text outside of a tag, however this become ambiguous when the nested tag is missing.  With JSON you can indent and reformat for display as required, and the characters for formatting are never confused with the data.
*   JSON has arrays.  With XML, you represent an array as multiple tags with the same name.  This become ambiguous when the array has one value: is this a value or an array with one value?   When it comes to an empty array, it is impossible to represent this with XML (however the absence of any tags makes it clear that the array is empty if you know there is supposed to be an array).
*   JSON has a single way to represent name value, but XML has two ways: attributes and nested tags.  Because you have two ways to represent the same thing, it opens the possibility that two different developers will do it different ways.
*   XML has a facility to allow comments within the page, and JSON does not allow any comments. If you are hand-typing the structure, then having comments might be useful, but for data that is transferred from one program to another, there is no need for comments at all.

There are actually many other options not discussed here: CSV is compact for tabular data; properties format for simple list of values; and any number of other serialization formats. But XML and JSON handle all these without the limitation that those other formats bring is, so today we are discussing only these two.

### Examples

Here is a JSON example:

```json
{
   nodes: [
      {
         name: "Start",
         pos: [33, 44],
         desc: "The start node"
      },
      {
         name: "End",
         pos: [55, 66],
         desc: "The end node"
      }
   ],
   timestamp: 1423432321
}

```


Here is the same in XML:

```xml
<structure>
   <nodes name="Start">
       <pos>33</pos>
       <pos>44</pos>
       <desc>The start node</desc>
   </nodes>
   <nodes name="End">
       <pos>55</pos>
       <pos>66</pos>
       <desc>The end node</desc>
   </nodes>
   <timestamp>1423432321</timestamp>
</structure>

```


When we talk about ambiguous data, the name could be an attribute or a subtag. Here is another copy, and it includes places where the text is gratuitous. All of the gratuitous text is presumed to be ignored, but if a container has no tags within it, then the gratuitous text is NOT ignored.

```xml
<structure timestamp="1423432321">
   <nodes> gratuitous text here
       <name>Start</name>gratuitous text here
       <pos>33</pos>
       gratuitous text here
       <pos>44</pos>
       <desc>The start node</desc>
   </nodes> gratuitous text here
   <nodes name="End" desc="The end node">
       <pos>55</pos>
       <pos>66</pos>
   </nodes>
</structure>

```


### Discussion

XML was never designed to transfer data structures.  Instead it is for text markup which is text which has tags embedded within it.  XML has been adapted to represent data structures but there are a number of significant limitations.  Reading of XML into a formal data structure requires using some conventions:  for example, ignore the text in some tags, and include text within other tags.  Some meta-data is required to properly parse XML properly.  

JSON is used frequently to move data from system to system when those systems are written in languages like Java, C#, C++ etc.  JSON provides an unambiguous way to translate to and from these native structure.  XML can do this to, but there is some ambiguity which occasionally causes problems.  

If you need text where parts of that text are tagged in some way, then XML is your choice.  But structured data is not markup.  XML offer no advantage in representing structured data.  

:::tip[Key Takeaway]

if you are trying to transfer structured data from one server to another, or even from one process to another, you should use JSON in most cases over XML.

:::

This entry was posted in [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [data structures](https://agiletribe.purplehillsbooks.com/tag/data-structures/), [JSON](https://agiletribe.purplehillsbooks.com/tag/json/), [XML](https://agiletribe.purplehillsbooks.com/tag/xml/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2016/06/01/prefer-json-over-xml-for-data-structures/ "Permalink to Prefer JSON over XML for Data Structures").