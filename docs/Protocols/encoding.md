#  Character Encoding

One other note about encoding. It is so difficult to talk about encoding because it is logically very confusing, because it is so difficult to “see” the encoding, because any kind of display always involves translations into other encodings. 

The rule, however, is simple: If you have a special character, such as the Ω character (omega) it should take up ONE character of a string. Strings, in Java, should always be UTF-16 encoded, which is 1 char per character (for most of the first 64K characters in Unicode — but watch out for the surrogate characters). 

Streams of bytes should \*always\* be UTF-8. Whenever you convert from char to byte, you should convert from UTF-16 to UTF-8. Hopefully those are the only encodings we ever have to deal with, and we should discourage any exceptions.  

One should \*never\* take UTF-8 encoded bytes, and put them in a string, one byte per character. It works if you compare two strings that have been processed this way, but when we write code that does this, we end up with some strings UTF-16 encoded, and some UTF-8 encoded, and we will get them mixed up. If we have strings with a variety of encodings, we will write code expecting a variety of encodings, and there will be bugs when we send the wrong encoded string to the wrong function. 

Therefor, the rule is that all Java String values must be UTF-16 encoded, and all conversions to/from bytes should be properly performed at the time of conversion.  
Similarly, reduce or eliminate strings which carry information that is HTML encoded.

It is better to keep data values clean without any markup, and perform the HTML markup at the time it should go straight to the output stream. The problem is the same: f you have some string values which are HTML encoded, and some that are not, it is hard to keep track of which is which, and there are likely to be bugs. The code is simpler if you instead keep all Java Strings as pure UTF-16 strings, without HTML encoding, then you always know to encode at the time that you write out. This is a guideline, not a rule, because there are times that you must have HTML encoded values in Java strings, lets just try to keep that to a minimum. 

Furthermore, We should reduce or eliminate keeping URL encoded values in strings. There are many times that we must carry a URL as a string value, and of course all the elements of that URL must be URL encoded, but when we parse a path element out, or a parameter out, it should be URL decoded at that time. The parsing and the decoding should be a single step. When composing a URL, the concatenation and the URL encoding should be done at the same time. Again, this is a guideline and not a rule.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [characters](https://agiletribe.purplehillsbooks.com/tag/characters/), [UTF-8](https://agiletribe.purplehillsbooks.com/tag/utf-8/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/12/11-more-on-encoding/ "Permalink to #11 More on Encoding").