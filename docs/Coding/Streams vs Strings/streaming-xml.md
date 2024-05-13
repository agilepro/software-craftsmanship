#  3 reasons that XML should be Streamed and never "Stringed"

XML is a text format, and so it is tempting to handle it with the normal String handling capabilities of Java, but there are several reasons that you must never do this.  XML should either be on the disk as a sequence of bytes, or it should be parsed as a DOM tree of decoded string values, but it should never be in a String in its encoded value.  

Really three main reasons:

*   XML describes its own character set encoding
*   Streams are far more memory efficient than working with strings
*   You don’t really want to manipulate the encoded XML anyway

The Java DOM utilities will take a byte-oriented In/OutputStream, or it will take a character oriented Reader/Writer.  The simple rule is: always use a byte oriented stream into the parsing, and out of the rendering.  Get used to this, and you will avoid a number of problems, without losing anything of importance.

## XML describes its own character set encoding

The header of an XML file tells you what character encoding is being used.  On the disk, the file will be encoded in UTF-8, and the header of the file will say that it is encoded in UTF-8.   Then if you read that file into a String, you will be converting the encoding from UTF-8 to UTF-16, but you will not be changing the heading.  This may seem like a triviality: who cares if the header says UTF-8, because you know if it is a Java string it has to be UTF-16.  So … just ignore the character encoding setting.  The problem is that this relies on these assumptions: when we read the XML file into a string, we assume it is UTF-8.  When writing from a string to a file, we assume that UTF-8 was desired. 

Consider instead the situation when the file is in an encoding that is different from UTF-8.  The conversion by the DOM code must be told that you want an encoding other than UTF-8, but it must convert to UTF-16 strings.  Then later when this written to a file, the host program must know that a different character encoding is desired.  It is worse when reading.  If you read the file into a String, you have to decide what encoding to use, before you can look at the contents.  To do this right, you have to be extremely diligent about checking, and re-reading the file with the right encoding.  Worse yet, if you initially try the wrong encoding, in some cases you will get encoding error, preventing you from being able to read the file in the first place.  

There is no need for this: the DOM code reads and writes character streams directly.  It carefully reads through the header, determines the character encoding, and then converts all the following strings correctly.  On output, you specify the encoding, and it generates the header specifying the same value.  Charater encoding and the header declaration is always in sync.

## Streams are far more memory efficient than working with strings

The parse is going to parse the stream, reading and parsing at the same time.  If you are building a DOM tree, the result remains in memory, but only a single copy has to be in memory.  The stream is consumed as it is read from the disk, converted once to the right decoded values, and placed into strings linked to the tree.  

If you read the entire file into a string first, then that takes up the entire memory of the file, and then it is converted to a DOM tree, essentially doubling the space in memory needed.  Double the memory, who cares?  But remember that a String always takes a contiguous block of memory.  Unless care was taken to set the buffer to the size of the file, then the buffer will grow as the file is read, and parts of the contents will be copied in memory several times as bigger and bigger buffers are allocated.  During the course of reading this can be costly.  However, the resulting DOM tree is made of smaller string values.  There is no need for a large contiguous block of memory when reading directly from the stream. 

This difference in memory is maybe a factor of two, and time might be less than a factor of two, but it is all a waste since it is entirely unnecessary.  The DOM parser will handle the byte oriented stream directly, converting to strings in a more efficient manner than reading the entire file as a string.  Converting to a string is entirely unnecessary and without benefit.

## You don’t really want to manipulate the encoded version anyway

Some programmers fall into the trap of thinking they will do some quick-and-easy manipulation of the XML in the encoded form.  Something like:

```java
String recXml = "<mytag>" + recordValue + "</mytag>";
```

Everyone knows that the recordValue above needs to be properly encoded, and that is not hard to do.  All you need to do is pass the recordValue to an encoding function.  But is it?  What if the recordValue has XML in it already?  In that case the tags should not be encoded, and the values between the tags are already encoded. 

Code that does a lot of this XML manipulation will have two different kinds of string values: those that contain raw values, and those that contain encoded values.  One must be careful to keep track of which is which, and again, that is not hard for a good programmer to do.  

The real argument against building XML this way that even if you do all the encoding and tracking of encoding correctly, concatenating strings is not the most efficient way to build a document.  It is more efficient to build a tree with those values:

```java
Element mytag = parentTag.createChildElement("mytag");
myTag.setTextValue(recordValue);
```

These operations will hold the recordValue unencoded, and then after the tree is completely built, encode all the values properly.  It does this without a lot of unnecessary combining of strings and moving the characters between blocks of allocated memory.  It also makes generation of XML more or less the same as consuming XML, because walking through the parsed tree is similarly to adding branches and leaves to that tree.  

If you really don’t want to build the entire DOM tree (and this is not always possible because you are asked to work on a projects that already makes use of non-DOM techniques, you can always make an improvement over strings by using streams.  Consider this:

```java
out.write("<mytag>");
writeXMLEncoded(out, recordValue);
out.write("</mytag>");
```

The advantage of above is that writing directly to the stream avoids the overhead of concatenation of strings values, and multiple moving in memory. Each character is written once to the stream which is efficiently managed after that.  
When the XML is in a string, you find programmers trying to parse it out, using code like this:

```java
int startPos = value.indexOf("<mytag>");
int endPos = value.indexOf("</mytag>");
String myValue = value.substring(startPos+7, endPos);
```

This works for all the simple cases, but you probably already notices that myValue has not been decoded.  Simple XML doesn’t have any little obscure ‘entities’ in the value.  Programmers will write methods that convert “&lt;” into the corresponding less than character, as well as a bunch of common other entities.  However, there are a lot of them, and many obscure.  This is one of those things that works in development and debugging, but in the real world fails in unpredictable ways.  

In the end, the problems that can be encountered manipulating XML in strings is simply not worth it.  It is quicker and easier to use a REAL parser, and a REAL generator, and to manipulate the string values in a DOM tree.

## Conclusions

It may sound arrogant or opinionated, but the simple rule is:

:::tip[Key Takeaway]

Never put XML in a string.

:::

XML is never in characters, only in a byte stream, or in a byte oriented file on the disk.  You parse the XML from a byte stream to a DOM tree, and then use the strings produced properly and correctly.  You update the DOM tree, and stream direcxtly to bytes. There are always options better than putting XML in a string, more efficient, just as convenient, and less error prone.  

Programmers are very comfortable with strings, so I understand the desire to use strings.  When debugging, it is easy to dump the entire string to the console to view the current status.  These are crutches that the programmer is used to.  However, with a tiny bit of effort, it is easy to stream the current DOM tree to the console as well.  

To battle this problem,  I mark all the methods that generate XML to a string, and parse from a string, as deprecated.  I look for places that programmers put XML into strings, and then rewrite to eliminate that.  Whenever I see code that represents XML as a string, I tell the programmer to re-write it.  Throw that crutch away!  Learn to code properly from the beginning, and you will learn the proper debugging techniques consistent with proper coding, and your code will be far better for it.