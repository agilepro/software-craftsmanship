#  Proper Stream Patterns

Java has streams for bytes, and streams for chars.  Learn to use them correctly.  It can be daunting at first, but if you just learn a few basic patterns, it all works well.

## Never use String.getbytes().

```
String value = "This is file contents.";
byte[] fileBytes = value.getBytes(); //bad
```

The method “getBytes” does NOT correctly convert into any proper character encoding, and you will have lots of problems in the long term.  There are easy ways to do this correctly.  Just never ever use this method.

## Never use FileReader

The class called FileReader in Java does not give you enough control over the encoding of the characters into bytes, so simply do not use it.  It is supposed to pick up the default character encoding from the host operating system, but most of the time either the file actually comes from a different host (maybe sent to you ro downloaded from elsewhere) or the program generating it (like a text editor) ignores the host configured default.  You will have less trouble if you simply never use this class.

## Character Encodings

If the file is a stream of bytes, you need to know how the characters are encoded into bytes. Most of the time, all you need is one of these:

*   **ISO-8859-1** – this is the most standard encoding of single bytes into characters because that is the default for the web.
*   **UTF-8** – this is best encoding for any Java program for now and the future, but text files from others sources may not be UTF-8

In actual practice the text file encoding may depend upon how your computer is configured, and it also may depend upon source of the text file, whether it was written by a text editor, or another program.  See [more on encodings](https://agiletribe.purplehillsbooks.com/2011/10/12/11-more-on-encoding/).  Once you have figured out the way that the file you are reading is encoded, just use the appropriate encoding value.  

If you are writing out a file, and the character encoding has not be specified in advance, consider using UTF-8 because all Java characters can be written in UTF-8, and you will never have character corruption.

## How to Read a Text File by character

```java
File fp = new File( "put path to file here" );
InputStream is = new FileInputStream( fp );
Reader reader = new InputStreamReader( is, "ISO-8859-1" );
char ch = reader.read();
while (ch>=0) {
    //do something with the character
    ch = reader.read();
}
```


You always first open the input stream on the byte oriented file. Then, the InputStreamReader will convert the bytes to characters. Of course, in this case, the ISO-8859-1 is a mapping from single byte values to the exact same character values. Clearly other mapping are possible, but ISO-8859-1 happens to be the same as the first 255 characters of the Unicode set, and the first 127 of those happen to be the same as ASCII.

## Reading Text by Array of Chars

The reader class has a lot of other ways to read.  You can read into a character array by doing this:

```java
InputStream is = new FileInputStream( fp );
Reader reader = new InputStreamReader( is, "UTF-8" );
char[] buf = new char[2000];
int amtRead = reader.read(buf);
while (amtRead>0) {
    //do something with characters in array
    amtRead = reader.read(buf);
}

```


This will read a maximum of 2000 characters at a time, because that is the size of your array.  It might read less than that, and it will tell you how many characters it read.  The rest of the buffer will have whatever it had before the read in it — which should be considered garbage.  Pay attention to the amount of characters read.

## Reading Text By Line

Finally, it is sometimes convenient to read text line by line, and

```java
InputStream is = new FileInputStream( fp );
Reader r = new InputStreamReader( is, "UTF-8" );
LineNumberReader lnr = new LineNumberReader(r);
String value = lnr.readLine();
while (value!=null) {
    //do something with the string
    value = lnr.readLine();
}

```


You can keep reading more lines out of the file until you get a null result.  This is probably the most common way to read a file, line by line.

## How to Write A Text File

```java
String value = "This is my contents";
File fp = new File( "put path to file here" );
OutputStream os = new FileOutputStream( fp );
Writer w = new OutputStreamWriter( os, "UTF-8" );
w.write( value );
w.write( "n" ); //if you want a newline
// should be backslash-n, wordpress is eating the backslash for some reason
w.close();

```


Remember that the string example does not have a newline character in it, so if you want each string to start on a new line, write out the newline character individually.  Of if you have data that is character oriented, you can write all the characters out individually.

## Results

Once again, is the the OutputStreamWriter that converts between characters and byte stream appropriately according to the ISO-8859-1 character set. The resulting file will have one byte per character.  
If using the above you execute this:

```java
OutputStream os = new FileOutputStream( fp );
Writer w = new OutputStreamWriter( os,
"ISO-8859-1" );
w.write("AAAA");
w.close();

```


The resulting file will contain 4 bytes with the value 65 in each byte. Reading that file back in using the code at the top will result in four “A” characters in memory, but in memory they take up 16 bits for each char.  

If the file is encoded in a different character set, including possibly multiple byte characters, then simply use the right encoding in the InputStreamReader/OutputStreamWriter and the proper conversion will take place while reading and writing.  

UTF-8 is not a character set, but rather an encoding of the regular unicode characters into byte sequences, and it turns out that UTF-8 encoding is quite clever in that the first 127 characters of the unicode characters are mapped into the first 127 byte values (as single bytes by themselves). Then characters >= 128 make use of 2 or more byte values in a row, where each of those byte values is >= 128. If you know that the ascii file only uses “7-bit” ASCII, then UTF-8 will work for you as well. For Java in general UTF-8 is the best encoding to use for a file because it can encode all possible Java char values properly without loss.  

Learning this about streams in very important. I recommend you do not try to convert bytes to characters in any other way. It is possible, of course, but it is a waste of effort since the conversions in the streams are very reliable and correct.