#  CSV Class

A “Comma Separated Value” file is a pretty simple and straightforward concept.  You have N values on a line, each separated by a comma.  Obviously you have to do something special if the value has a comma or a CR character in it, and that is to put them in quotes, and that means you have to handle quote characters specially.  CSV are so common that many times have gone to look for a standard library to read them.  

What I find in standard libraries are things that are so complicated, that in order to use the library you have to write a lot of code . . . actually almost as much code as you need to parse the CSV in the first place.  At the bottom I list a few such offering and why they are so wasteful.  Before that, I will put my entire implementation here.  A class so short and concise that I can put the entire thing in this blog post.  Here it is: 


## CSVHelper.java

```java
import java.io.LineNumberReader;
import java.io.Writer;
import java.util.List;
import java.util.Vector;
public class CSVHelper
{
    public static void writeLine(Writer w, List<String> values)
        throws Exception
    {
        boolean firstVal = true;
        for (String val : values)  {
            if (!firstVal) {
                w.write(",");
            }
            w.write("\"");
            for (int i=0; i<val.length(); i++) {
                char ch = val.charAt(i);
                if (ch=='\"') {
                    w.write("\"");  //extra quote
                }
                w.write(ch);
            }
            w.write("\"");
            firstVal = false;
        }
        w.write("\n");
    }
    /**
    * Returns a null when the input stream is empty
    */
    public static List<String> parseLine(Reader r) throws Exception {
        int ch = r.read();
        while (ch == '\r') {
            ch = r.read();
        }
        if (ch<0) {
            return null;
        }
        Vector<String> store = new Vector<String>();
        StringBuffer curVal = new StringBuffer();
        boolean inquotes = false;
        boolean started = false;
        while (ch>=0) {
            if (inquotes) {
                started=true;
                if (ch == '\"') {
                    inquotes = false;
                }
                else {
                    curVal.append((char)ch);
                }
            }
            else {
                if (ch == '\"') {
                    inquotes = true;
                    if (started) {
   // if this is the second quote in a value, add a quote
   // this is for the double quote in the middle of a value
                        curVal.append('\"');
                    }
                }
                else if (ch == ',') {
                    store.add(curVal.toString());
                    curVal = new StringBuffer();
                    started = false;
                }
                else if (ch == '\r') {
                    //ignore LF characters
                }
                else if (ch == '\n') {
                    //end of a line, break out
                    break;
                }
                else {
                    curVal.append((char)ch);
                }
            }
            ch = r.read();
        }
        store.add(curVal.toString());
        return store;
    }
}
```


Here are a couple of things that you might want to notice about this implementation:

*   The class has two static methods, one to read a line of a CSV file, and one to write a line of a CSV file. Nothing to set up, nothing to configure, nothing to go wrong.
*   It handles each character only once.  No temporary strings, and no concatenating of strings.
*   It makes a single pass through the stream.  There is no pre-fetching, no pushing back, no scanning ahead for length, and then re-parsing.  There is no breaking the string initially (prescan) into chunks that are then parsed separately.
*   This single pass approach is fast and it does not use any excessive memory, nor does it copy the string values more than once.
*   Everything is in characters, which means you can use any encoding into bytes that you like.  These methods never see the bytes.
*   You can parse from any stream source: file, http request, ftp, nntp, whatever. You only need to create a Reader to that source. No need to reinvent that.
*   You can write to out to any output destination, just supply the Writer class.
*   It focuses just on the parsing of the value, and not interpretation of the values.  I have found that once the line is parsed into a List of Strings, it is pretty easy to loop over this and do whatever interpretation is needed of the values.  Generally, that loop to interpret the values is the simplest, most concise implementation.  When I have used classes that automatically do further conversions, I find I nearly always have to write a loop anyway to do special things on the values beyond data types.  If I have to write the loop anyway to patch things up, I might as well convert from strings at the same time.
*   It does not tell you the size and shape of the file. for example it does not tell you the number of rows or columns.  You simply read each row and you get a number of values, telling you the number of columns.  A properly formed CSV file will have the same number of columns on each row, but this approach simply gives you the values that are there on the row.
*   There is no special handling for the first row.  Often the first row contains names of the columns.  The code reading the file can easily handle the first row differently.
*   This has _no_ dependencies on other non-standard classes.  It uses that standard Java stream classes.  It does not invent new protocols or patterns of call, instead leveraging the standard Java streams as they were intended to be used.
*   It does not handle comments.  Why would anyone have comments in a CSV file?  If you need it, comments could be ignored with about 3 additional lines of code.  Since I have not encountered that need, I did not put it in.  (YAGNI)
*   I used Vector because I am more comfortable with it, but a purist might substitute ArrayList for performance reasons.  That is why the interface uses the more generic “List” interface.
*   On output it puts quotes around all values.  This was easier than figuring out whether the value needed it or not, and some might view this as wasteful, adding two extra characters for every values that does not need it.  For me, processing speed was more important than space on the disk, so I would rather avoid the overhead and complexity of figuring out whether it is needed, even if there is a small cost on output size.
*   About 50 lines of code, makes it smaller than the _interface files_ of most competition.

This makes it so easy to write a CSV file.  I write a loop over my data set.  For each row, I collect all the values (converted to strings) into a List of Strings.   Then one method call writes that line out.  Repeat until finished. Generally this is all I need.  If I want a header with the column names, I do that just before looping over the data.  So easy.

Reading is similarly easy.  Open the file, and start pulling lines out as Lists of Strings.  It is easy then to iterate through that list, and plug the value into whatever internal data structure I am using.  If it needs to be converted to Integer or Long, I do it in that loop without difficulty.  This is the step of interpreting the data values, and generally I don’t need a CSV class to do that.  

Most importantly, this one class can be reused anywhere without bringing any extra dependencies.  A single class, is a single file.  It uses only standard Java classes, so I don’t need to include any extra exotic libraries into my program.

## Overly Complex Implementations

*   [Commons CSV](http://commons.apache.org/csv/)– This Apache project to support CSV files.
    *   **Large:** The [source](http://svn.apache.org/repos/asf/commons/proper/csv/trunk/src/main/java/org/apache/commons/csv/) involves 11 files, almost 2,500 lines of code — and I am only including the implementation, not the testing, etc.  Read through the code and compare to above, there is a significant amount of overhead at all points needed for things that are essentially never needed.
    *   **Multi-pass:** It has its own ExtendedBufferedReader which allows for marking and rolling the stream back, which can only mean it that requires multiple passes over the stream.  Clearly this is not reading in a single pass, and likely to be inefficient.
    *   **Configurable:** You can change all of the possible delimiter: semicolons instead of commas, and other characters instead of quotes.  This is all fully generalized so that all possible combinations can work.  Actually I doubt all combinations work, but there is a significant overhead that is simply not needed.  It does handle a lot of “CSV Dialects” as it puts it.  I propose a better way: if you have a non-standard CSV file that you need to read, then just _edit_ the above source, replacing the one comma that occurs with a semicolon character (or whatever change you need) and make a class that parses that exotic dialect.
    *   This is clearly a case of YAGNI.  Using it requires learning more interface methods, and more configuration variables that the above implementation has total lines.  Don’t implement capability until you actually need it.  Rather than creating an incredibly complex, 11-class implementation to read a simple file, I keep the simple case simple, and only if you really have the need for a _special_ case, do you then have to create extra classes.
*   [Super C](http://supercsv.sourceforge.net/)SV- Exactly what it says “super” it is far more than you will ever need.
    *   **Large:** A whopping 78 classes, and I did not count the number of lines.
    *   **Unnecessary:** The author of this package felt that operating on a list of string is too plebeian  and so SuperCSV offers automatic conversions to/from other data types.  You create a big array of “CellProcessor” objects, which act to convert the data do functions like range checking etc.  I simply have never needed my CSV file reader to do this kind of data conversion.  There are good libraries for this sort of thing which can not be used and I certainly don’t need to re-write all my data handling into little class objects that are convenient so that this file conversion tool can easily do it. This is just far more complicated than I need — especially if there is an error.   And he had not considered the situation that a value in the row determines the format of another value.
    *   Attempts to create a complete “database” like and object serialization like functionality, including automatic conversions to/from JavaBean objects. I have plenty of way to convert to and from Strings, and don’t need a file reader to do this for me, and if ti did, I would not be able to use my other methods.
    *   If you want automatic conversions to more complicated structures, this will do it, but you will probably have to design your software so that this CSV reader is part of the central core, and not just an adjunct ability to import and export CSV files.
*   [Skife CSV](http://kasparov.skife.org/csv/) – Much more reasonable an approach that the above overbloated libraries.  Returns an array of strings for each line of a CSV, so it is quite simple and well written.  I like the clean style, but it still complicates the job by offering so many different ways to do things.
    *   **Large:** it is 10 classes, about 900 lines.
    *   **Configurable:** once agaoin you can change the delimiters, and this add overhead.
    *   **Bloated:** It (optionally) opens and closes files for you and provides many functions which any reasonable programmer should know how to do.  these “convenience” methods just complicate the interface.  There are two main modes: read a lin at a time, and a callback approach that calls your method on each line.  All the call back does is save me from writing a three line loop — the extra complication of extra interfaces and methods is not worth it.
*   [jcsv – Simple CSV](http://code.google.com/p/jcsv/) – a pretty good straight forward library.   I like the orientation of being simple and easy to use.  Still, there is a class called “ColumnJoiner” which unnecessarily walk through the data a few times, converting strings into other strings with “replace” method, and adding quotes to strings before finally combining them together into a string with commas between them.  It is so much more efficient (faster, less memory) just to do this at the time you write the strings out in a single pass. There are about 36 classes in total, including about 10 “DataProcessors” which allow you to do automatic conversions of strings into other values . . . all you have to do is put together a complicated structure with all the right processors in the right place.  Unnecessary frills like the method that reads all the lines of a file and returns as a big list of the lines. A laudable attempt, but somewhere along the way the authors lost sight of the idea of keeping things simple.
*   [OpenCSV](http://opencsv.sourceforge.net/apidocs/index.html) (au.com.bytecode.opencsv) – less bloated than some, this implementation still has 12 classes & interfaces, with some 78 constructors and methods.  Half of this is to support automatic conversion to/from Java beans, which I still feel is hardly worth the effort.
    *   uses standard Reader/Writer classes in a standard way: a strong plus for this!
    *   The class CSVReader can be used almost by itself: constructor specifies the various delimiter values, and there are three key methods: get a single record, get all records as a List, and get a standard iterator.

## Simple Implementation, that are Wrong

*   [Blogspot: A Java CSV File Reader](http://beginwithjava.blogspot.com/2011/05/java-csv-file-reader.html) – This implementation is just plain wrong.  It uses the Java string “split” function to break the line on commas, but that does not work when the values have commas within the quote.  There are a lot of implementation that make this basic mistake.
*   [Reading a \*csv file](http://www.daniweb.com/software-development/java/threads/17262/reading-in-a-.csv-file-and-loading-the-data-into-an-array#) – This implementation is wrong as well, it uses StringTokenizer to break the string on commas.  That does not work when there are commas in the values, between the quotes.
*   [How To Export Data To CSV File – Java](http://www.mkyong.com/java/how-to-export-data-to-csv-file-java/) – This implementation is simple, but it completely ignores the issues with commas and quotes in the data.

## How to Use It

Here are an examples of how you would use this to read a file:

```java
public static List<MyClass> readData() throws Exception {
    List<MyClass> collection = new Vector<MyClass>();
    File fileTemplate = new File( <<path to your file >>);
    FileInputStream fis = new FileInputStream(fileTemplate);
    Reader fr = new InputStreamReader(fis, "UTF-8");
    List<String> values = CSVHelper.parseLine(fr);
    while (values!=null) {
        collection.add( MyClass.constructFromStrings(values) );
        values = CSVHelper.parseLine(fr);
    }
    lnr.close();
    return collection;
}

```


Points to note about this:

*   You open the stream yourself.  Often this will be from a file, but it could also be a web resource, a document management system, or many other possible sources.  There are many standard ways to locate the source of your CVS file, and you are free to use all of them.
*   In this case it uses a FileInputStream, and then converts that to a Reader with the “UTF-8” character encoding.  You may find that you need to support other encodings, and you have complete flexibility to do so using the standard Java classes for this.
*   Then, get each “row” of the CSV file as a record in a loop.  In this case there is no header row so I treat every row the same.  Just loop until you get a null back.
*   In this case I want to construct an object instance for each row, and it calls a static method that takes the values and initializes an object from a list of string objects.  Once again you have complete flexibility here on how you use the values.  If some of your object member use other data types, like Integer, you would have to convert from string to int in that routine, but once again there are standard Java mechanisms to do that.
*   If the file format is specified externally by someone else, then you will have to figure out how to map those column values into your object for storing them.  You may decide to ignore some columns.  This is easy to do when you have a list of string, each string represents a column of the CSV file.

Here is an example of how to output a collection of objects to a CSV file:

```java
public static void saveData(List<MyClass> myData) throws Exception {
    File csvFile = new File(<<path to write to>>);
    FileOutputStream fos = new FileOutputStream(csvFile);
    Writer fw = new OutputStreamWriter(fos, "UTF-8");
    for (MyClass oneDatum : myData) {
        List<String> rowValues = oneDatum.getValues();
        CSVHelper.writeLine(fw, rowValues);
    }
    fw.flush();
    fw.close();
}
```


Things to note about this:

*   Again, you have complete freedom of where you write to.  In this case, it is writing directly to a file, but you could also write to the output stream of a web server (generating CSV files on demand) or to a memory buffer.  There are plenty of standard Java mechanisms to support all the cases you need.
*   I generally create the Writer using UTF-8 encoding, but you may have other encodings you need to use, and that is done in the Writer constructor.
*   Then loop over your data, converting the object to a list of string values, and then writing those strings to the file.  Once again, I have hidden this in a method on the class which walks through the members of the class that you want to persist, and adds a string to list for each such member.  You go through the members in a particular order when writing the file, and the same order when reading the file.  When the external CSV file is specified as a standard (e.g. column 5 must be a date of a particular format) you have do some coding to figure out how to get the exact required value into the required column.  But once you get the conversion and the order worked out, this method writes it reliably as a CSV file row.
*   Don’t forget to flush and close the file

Here is a sample class that fills in the two functions used above:

```java
class MyClass {
    String     name;
    int        age;
    float      shoeSize;
    CustomType astrologicalSign;
    public static MyClass constructFromStrings(List<String> values) {
        String _name      = values.get(0);
        int    _age       = Integer.parseInt(values.get(1));
        float  _shoeSize  = Float.parseFloat(values.get(2));
        CustomType _aSign = new CustomType(values.get(3));
        return new MyClass(_name, _age, _shoeSize, _aSign);
    }
    public List<String> getValues() {
        Vector<String> values = new Vector<String>();
        values.add(name);
        values.add(Integer.toString(age));
        values.add(Float.toString(shoeSize));
        values.add(astrologicalSign.toString());
        return values;   
    }
}
```


Things to note:

*   These methods represent (implement) the mapping from the CSV columns to the member data.  CSVHelper does not attempt to automate this mapping.  You, as a programmer, have to write this code to do the mapping each time.  That may sound like a bother, but I have generally found that it is easier to write this method, than it is to write the configuration data required to get the bigger packages to do this.  But, if you want this automated, then feel free to use the other, more full featured, approaches.
*   Each class does not necessarily have only a single mapping to CSV files.  For instance, there may be a particular CSV file that you have to import from a foreign source that has columns in a particular order, and you may also have your own CSV file for exchanging information internally.  You can have as many of these mapping methods as you need.  There is no requirement for a one-to-one mapping between class members and CSV columns.
*   This is a simple case where a four column CSV goes to four class members of simple type.  In general I usually have a more complicated mapping problem, sometimes involving multiple classes.  Sometimes a value, like customer id, needs to be looked up in a separate collection, and that object attached.  Sometimes I am not simply returning an object instance, but instead updating or otherwise manipulating global collections.  Again, all of these are possible:  CSVHelper simply gives you column values from the CSV file, and you do whatever you need with them.

This entry was posted in [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/11/23/the-only-class-you-need-for-csv-files/ "Permalink to The Only Class You Need for CSV Files").