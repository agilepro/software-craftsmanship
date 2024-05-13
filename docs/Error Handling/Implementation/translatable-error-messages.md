#  Translatable Error Messages

This is the first of a series of posts, I want to go over some of the groundwork of what it takes to make exceptions localizable into other languages. Nothing new here, but just want to explain clearly the requirements of a localizable exception messages.  

  Remember that an error message (also known as an exception) is a way to talk to the user of a software program.  It is used when the program encounters a situation that it is unable to handle, for one of two reasons:  the program might be written incorrectly, or the situation presented to the program is out of the range of what it was designed for.  Either way, you need to tell the user what is wrong.  The error is just a description of what the program can not do, in hopes that the user can correct this and offer something that the program can do. More of this in: [The Purpose of Error Reporting,](https://agiletribe.purplehillsbooks.com/2013/02/14/the-purpose-of-error-reporting/) [Error messages should be very literal](https://agiletribe.purplehillsbooks.com/2015/12/12/error-messages-should-be-very-literal/), and [Error Message should be clear, plain, and direct.](https://agiletribe.purplehillsbooks.com/2013/08/24/error-message-should-be-clear-plain-and-direct/)

## Description and Data

The textual description of an error situation is not very useful without the specific data values.  Consider the following error messages:

```
1. Can't read file
2. Can't find property
3. Can't read file C:/main/config.txt
4. Can't find property MAX_USERS
5. Can't find property MAX_USERS in file C:/main/config.txt
```


Errors 1 and 2 are simply not enough information to be helpful.  A person using the program may be aware that it reads thousands of files, and probably has hundreds of possible properties.  Simply reporting that some file can not be read is nearly useless without mentioning the file.  Error 3 tells you the file involved, which can be ahuge help in solving the problem, but it does not tell you why it found the file insufficient.   Error 4 tells you detail of what went wrong in reading the file, but fails to mention the file.   Error 5 gives a more complete story:  there is a method reading a file, looking for property values, and can not find a particular value.  It tells you both the files that seems to be incorrect, as well as some detail about what is wrong about it.

## Translating

Programs are localized by a string lookup table that lists all the source language phrases, and the corresponding destination language phrases.   For example, the first two error messages about might be translated with the help of the following table:

```
"Can't read file" : "Datei nicht lesbar",
"Can't find property" : "Attribut nicht gefunden"
```


The software looks through the values on the left, and when found, displays the one on the right.  But the strings with the data values in them will not be found in this table.   In the string value, it is impossible to know which characters are part of the fixed description, and which are important data values.  Once the data values are inserted into the error message, the message become un-localizable through a simple lookup.

## Simple Token Replacement

The solution is easy, you keep the description and the data separate.  You make an error message template that includes markers (tokens) that tell where the data is supposed to be placed to make it readable.  Then you send the template and the data values separately.  An example template for error 5 might be:

```
Can't find property %s in file %s
MAX_USERS
C:/main/config.txt
```


This is a fixed string that can be translated.  Now, you can have a translation of that:

```
"Can't find property %s in file %s" : "Datei %s hat keine Attribut %s"
```


The receiving program takes the template, looks for the template in the translation table, and then form the final display by substituting the values into the right places.  These tokens, however, have a problem.   One token represents the file name and the other token represents the property name.  Sometimes localizing to a foreign language requires words and values to be in a different order.  My example — somewhat contrived — needs the property name first, and the file name second in English, but in the opposite order in German.  Translators sometimes need the ability to include the tokens in a different order.

## Re-orderable Tokens

The tokens need to be specific to the value so that you can indicate which of the values are to be placed where.  You could name each data value, but this means the extra overhead of providing a name.  Knowing that the program places the data values in a particular order, it is only necessary to refer to the value by its ordinal number.  Here are tokens that do that:

```
Can't find property {0} in file {1}
[0] MAX_USERS
[1] C:/main/config.txt
```


This is a fixed string that can be translated.  Now, you can have a translation of that where the order of inclusion of the values in the other language is different:

```
"Can't find property {0} in file {1}" :
         "Datei {1} hat keine Attribut {0}"
```


The receiving program takes the template, looks for the template in the translation table, forms the final display for the user.

## Summary

To make exceptions that are translatable, we need to use a template that denotes the places where data values go, and to deliver the template and the data values separately so that the template can be translated, while the data values can then be substituted into that translated description.