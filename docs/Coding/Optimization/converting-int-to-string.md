#  Converting Integer to String

Learn to use Integer.toString(i) when you need a string that represents an integer.  This is always the most efficient way to convert, and it avoids some bad habits that can be expensive.  

A question was asked on [StackOverflow](http://stackoverflow.com/questions/14712693/best-practices-for-converting-from-int-to-string/14713021):

_I’m working on a project where all conversions from `int` to `String` are done like this:_

```
int i =5;
String strI = "" + i;
```

_I’m not familiar with Java. Is this usual practice or is something wrong, as I suppose?_

## The Answer

Using Integer.toString(i) is more efficient because the resulting code will simply create a string with the representation of the number in it. Thus like this:

```
String strI = Integer.toString(i);
```


The code as written "" + i is a little bit sloppy in my opinion. It will create a string object with a zero length string, a string representation of the number due to type casting of the language, a StringBuffer to concatenate the strings together, which is then converted back to a String. Look at the byte code, and you will realize there is unnecessary overhead.  

Programmers often use this approach of concatenating to an empty string because they are used to using that type casting feature to bring a number together with a more meaningful string. It works with an empty string, but is a bit wasteful.  

I prefer Integer.toString(i) to String.valueOf(i) because the type is explicit, and is more sensitive to mistakes. This approach will highlight mistakes better if the programmer is mistaken about the type of the variable i. 

## Discussion

As there is some disagreement about efficiency, I show here the the two forms, and the byte codes that they produce.

```
strI = ""+ i;
```


Produces this set of byte codes (according to javap output, JDK 1.7.0\_51):

```
00: new #6 // class java/lang/StringBuilder
03: dup
04: invokespecial #7 // Method java/lang/StringBuilder."":()V
07: ldc #2 // String
09: invokevirtual #8 // Method java/lang/StringBuilder.append:
                       (Ljava/lang/String;)Ljava/lang/StringBuilder;
12: iload_2
13: invokevirtual #9 // Method java/lang/StringBuilder.append:
                        (I)Ljava/lang/StringBuilder;
16: invokevirtual #10 // Method java/lang/StringBuilder.toString:
                        ()Ljava/lang/String;
19: astore_1
20:
```


There you have it, 20 bytes of code that first constructs a string builder, appends a zero length string to that (the null string), then it appends and converts the integer, finally it converts the StringBuilder back to a normal string. There are four methods invoked during this, and there is a constant string (the null string) used.  
However, this code:

```
strI = Integer.toString(i);
```


Produces the following:

```
  00: iload_2
  01: invokestatic  #12  // Method java/lang/Integer.toString:(I)Ljava/lang/String;
  04: astore_1
  05:
```


Which is only 5 bytes long, makes only a single method invocation, and does not use any string constants, and does construct an object (StringBuilder) on the heap that needs to later be garbage collected. The difference in runtime efficiency is huge.  

The use of String.valueOf will be no different than this in efficiency, but I prefer Integer.toString because of the stronger type checking.  

It is not that one need to optimize everything to this level, but learning a few good habits like this will help in the long run.

This entry was posted in [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2014/05/05/correctly-converting-integer-to-string/ "Permalink to Correctly Converting Integer to String").