#  #28 Avoid "Test Script" Fever

There is a strange propensity among developers to make tests more complicated than they need to be in the name of flexibility.  Tests don’t need to be flexible, they need to be reliable and maintainable.  I have seen this pattern so many times it is worth a mention here to avoid it.  To understand it, you have to consider a specific example.

## Scenario

I will pick an easy function, so that we can discuss it fully, but the principle does not change when scaled to an elaborate case.  In this example, consider a function to calculate the volume of a spheroid.  There are three parameters, x, y, and z for the height, width, and depth of the spheroid.

```java
public float spVol(float x, float y, float z)
```


It is every programmers job to think about how this method would be tested. First a simple normal case with non-special values: (1,1,1).   Then you will want a number of cases with zero values: all zero: (0,0,0)  one zero: (0, 2, 2) two zeros: (3, 0, 0).  Then a test with very small values (0.00001, 0.00002, 0.00003).  Then a test with very large values (400000000, 300000000, 200000000).   There might be more tests you want to run, but this will be enough for discussion here.

## Appropriate Approach

Writing a test for this is not difficult.  All you need is a few lines of code and a method that has three parameters.  The first parameter takes the value to be tested, the second takes the expected value, and the third takes a small description so that if it fails you can report what went wrong.

```java
test(  spVol(1.0, 1.0, 1.0),  4.18879,  "simple sphere");
test(  spVol(0.0, 0.0, 0.0),  0.0,  "point");
test(  spVol(0.0, 2.0, 2.0),  0.0,  "flat circle");
test(  spVol(3.0, 0.0, 0.0),  0.0,  "line");
test(  spVol(0.00001, 0.00002, 0.00003),  2.51327E-14,  "very small");
test(  spVol(4E+8, 3E+8, 2E+8),  1.00531E+26,  "very large");
```


The method test is assumed to take a test value, and an expected value, as floating pont numbers, and compares them in a way that is suitable for testing, and if it does not match does the appropriate thing to report failure of the test.  

Admire for a moment the elegance of this approach.  There are six tests in six lines of Java code.  If you wanted to add more tests, it is entirely obvious how to do so: make another call, pass the parameters in to the method, and test the result.  Because this is “normal programming” I can do things like call it in a loop if I like, or make a method like this which tests all combinations of a particular value:

```java
public void testRotation( float v1, float v2, float v3, float vol) {
    test( spVol(v1, v2, v3), vol, "rotation 1" );
    test( spVol(v1, v3, v2), vol, "rotation 2" );
    test( spVol(v2, v1, v3), vol, "rotation 3" );
    test( spVol(v2, v3, v1), vol, "rotation 4" );
    test( spVol(v3, v1, v2), vol, "rotation 5" );
    test( spVol(v3, v2, v1), vol, "rotation 6" );
}
testRotation( 1.0, 2.0, 3.0, 25.1327 );
testRotation( 0.0, 2.0, 3.0, 0.0 );
testRotation( 0.00001, 0.00002, 0.00003,  2.51327E-14 );
```


This is actually 18 tests (three calls to a method that tests 6 variations) in less than 18 lines of Java code. The point is that it is normal programming, and so normal ways of extending and elaborating tests are allowed. Variables can hold values that are passed into tests.  There is no lack of flexibility, there is no limitation, and all the information for a test is contained in a single file … the test source code and compiled into a single package known as a class file.  There are no external dependencies, and no complicated reason to match values from multiple files together.  _Once written correctly, it should run forever without a hitch, which is what you want for a test._

## Inappropriate, Overkill, Test Script

Almost every team I have worked on, there is someone who looks at this and decides that it is a really good idea to make this test more flexible.  What they suggest is to drive this from a text file on disk, separate from the code, in this example XML but the actual syntax does not matter.  For example something like:

```xml
<test><x>1.0</x><y>1.0</y><z>1.0</z><vol>4.18879</vol>
     <note>simple sphere</note></test>
<test><x>0.0</x><y>0.0</y><z>0.0</z><vol>0.0</vol>
     <note>point</note></test>
<test><x>0.0</x><y>0.0</y><z>2.0</z><vol>0.0</vol>
     <note>flat circle</note></test>
<test><x>3.0</x><y>0.0</y><z>0.0</z><vol>0.0</vol>
     <note>line</note></test>
<test><x>0.00001</x><y>0.00002</y><z>0.00003</z><vol>2.51327E-14</vol>
     <note>very small</note></test>
<test><x>4E+8</x><y>3E+8</y><z>2E+8</z><vol>1.00531E+26</vol>
     <note>very large</note></test>
```


Lets call this a “test script.”  You can see the same six tests, only they are expressed in this XML format instead of Java format. It amounts to a simple programming language where you can specify values for a test, and they are executed.  The programmer then write a small routine to read this XML file, and call the method, compare the result to the result provided.  

The stated reason for doing this is for “flexibility.”   They will say: _“Now you can add more tests just by adding rows to this XML file!    New tests can be added without recompiling the source code!   People can add any test they want to the test suite at any time!”_  

This is completely crazy for a number of reasons:

*   **Not easier:** There is nothing easier about putting the values into a test script than putting it into the Java source file.
*   **Not better:** The reported results are in no way superior.  Ultimate you want a pass or a fail, and both approaches are equivalent in this respect.
*   **Esoteric knowledge:** the original programmer will have no problem with the script file because they wrote and understand the parser and the way it is linked to the function being tested.  This knowledge is not expressed in the test script itself.  When this module is handed to a new programmer (or tester) this knowledge of the linkage is hidden.  Because it is hidden, there is a big barrier to maintaining the tests.  The linkage will be obvious to the original developer, but usually not to anyone else.
*   **More problems:** There are more things to go wrong.  Now you need both the test program AND the test script.  Having one and not the other will completely prevent you from running the test.  The more files you have to track, the more work.  At run time, you need to have the test script in a place that can be read by the program, and that is not always trivial to arrange.  The appropriate approach ahs all the values directly in the code and there is no such complication.
*   **More to learn:** There is more for a programmer to learn.  Given that the programmer was already familiar with the function being tested, calling to that function (using Java) is trivial.  A new programmer coming along wanting to add a test must learn this new XML structure, and how it effects the testing.  It may seem like a small amount to learn, but across hundreds of tests and situations it can add up.
*   **More to learn:** The syntax for values in the test script is not clear.  The Java syntax for specifying a literal value is well known to all Java programmers.  There are many books and resources on this.  But exactly how the test converts the string XML to a value is not nearly as clear.  It depends upon how the programmer wrote the parser.  It may be obvious to the original programmer, but since that code is hidden it is not obvious at all to others.  To be properly maintainable, the original programmer must document all the ways to express values that can be parsed by the parser.  If a tester puts a wrong value in it, will there be an accurate error message?
*   **More to Learn:** Speaking of value encoding, most programmers that propose such test scripts forget at first that some tests need to use null values.  How do you encode a null in the XML?  This is not difficult to solve, I am just pointing out that there is no standard for this, and it is part of the hidden information that will have to be documented and that the new person writing tests will have to learn.
*   **More to learn:** Someone adding a test will make typos, just as they will when programming Java, but in the case of Java the kinds of errors you might make, and how they are reported are widely known — any Java programmer will readily recognize and fix those typos.  The code that parses the test script will also have to check for an report errors, but probably is not going to be familiar and as well reported as the Java compiler!
*   **Lack of documentation:**  Since this is just a test framework, there usually is no motivation to spend a lot of time on documentation of exactly what values are allowed, and how to specify new tests.  In this simple case it does not seem like there is a lot to learn, but you have to remember there was nothing to learn in the appropriate technology approach.
*   **More to maintain.**  The test program is no longer a simple routine that accepts and compares values, but it must find and read this file, parse it, and then submit the values.  This is a lot of extra code that must be maintained … all just for the testing of one method.  You can make a general purpose test framework, but you somehow have to match the the values in the file to the parameters of the method being tested, which will require some additional code for every method you need to test.
*   **No extensibility.**  There is no way to implement a testRotation!   The powerful thing about a programming language is that you can make other routines and call other routines.  Breaking out to a test framework driven by a configuration file completely breaks this capability.
*   **Setup and tear down.** The first thing you encounter is that in complex testing situations you have to have code before the test to set things up.  This complicates the test framework, requiring other data structures to specify set up and sometimes tear-down.  Using appropriate technology this is easy to add method calls before or after the test.
*   **No benefit:** there is nobody that want to add a test who is not a programmer!  This is most important.  Only a programmer is going to have the insight into the running of the method to come up with new test cases.  _This idea that a non-programmer will invent new test cases is nonsense._  A non-programmer without access to the internals of the code of the method being tested is unlikely to come up with better tests than someone who does have access to that, so it make much more sense to have the tests written by a programmer.
*   **No variables:** Some tests need to remember a result from an eariler part of the test, and use it again later.  For example, one test creates a persistent structure with a particular id, and that id must be used in later tests.  With the direct programming approach, you can store this value in a variable, and use that variable later in the tests.  But with the XML test script this is very hard to arrange.  Internally you can make an XML command that causes the set up t o occur and store the value some place, and then later commands will use it, but all that is hidden from the actual test script, and hard for a new person to understand.
*   **Less obvious:** With the programmed lines at the top, it is entirely obvious exactly what is happening int he tests.  But once you go to the indirection of the “test script” files, it is far less obvious exactly how things are run.  This lack of clarity becomes a barrier to adding new tests.

Even with all these disadvantages, there is some kind of attraction that draws programmers to this idea that tests can be added without programming!   Actually, adding rows to this test file IS programming, it is just programming in an obscure, undocumented language based on XML. 

While it is true that you can add a test case without compiling, there is no real advantage to this … compiling is quick and easy.  It is inconceivable that a non-programmer will add a test case.  The saving of a compile is not enough benefit to make up for all the trouble of settin gup and maintaining the additional code and files that are needed.

## Why Does This Occur?

I don’t really know why this pattern is so common, but I can make some guesses.  First, it seems quite attractive to make such test drivers.  It is possible that making such a test driver is more enjoyable than writing the tests themselves.

I suspect that part of the desire is that there is some pressure on the programmer to make the set of tests complete, and they always worry about whether they have included all the tests.  By making it possible to add tests without recompiling they may hope that tests can be added by the QA team.  

It is possible for the programmer to escape the arduous task of having to figure out all the test cases.  They implement some, but “anyone can add test cases later.”   I suspect they hope to avoid having to write all the tests this way.  By leaving an opening for someone else to do it, they are somewhat off the hook. Everyone would recognize this as laziness, except in the name of “flexibility” they claim to be making the system more capable than before.  

For this reason, I have fought time and again to avoid such silliness.  If you are testing an API, just write a program.  A simple “test” routine called from a simple Java method will work well, and you can call the method in question many times.  Writing methods and loops can be a powerful way to automate large numbers of tests which are also easy to maintain.  It seems “low tech” but it is actually very powerful.  Any Java programmer can look at it and fix it or extend it.  The syntax errors are well reported and easily fixed.  It runs very fast.  All the test and all the values that the test needs are wrapped up into a single unit called a class file.  There are no external files to read, no dependencies upon the file system, or the current directory.  There are far fewer problems that might occur in the regular running of the tests. And it is all entirely transparent how it is accomplished.  For testing, this is the right, appropriate design point.

## To a Rediculous Extreme

I know one will bring this up, so let me respond to the idea that a standardized test framework could be made that can access ANY method for testing.  It would work by doing introspection on the classes.  You could then specify the values of each of the parameters, along with the class and method names, and result.   Using this mechanism you could write test scripts for ANY class, ANY method, and ANY result.  
The test script would look somethign like this:

```xml
<test><class>com.company.project.pkg</class>
      <method>spVol</method>
      <param1>1.0</param1>
      <param2>1.0</param2>
      <param3>1.0</param3>
      <result>4.18879</result>
      <note>simple sphere</note></test>
<test><class>com.company.project.pkg</class>
      <method>spVol</method>
      <param1>0.0</param1>
      <param2>0.0</param2>
      <param3>0.0</param3>
      <result>0.0</result>
      <note>point</note></test>
<test><class>com.company.project.pkg</class>
      <method>spVol</method>
      <param1>0.0</param1>
      <param2>0.0</param2>
      <param3>2.0</param3>
      <result>0.0</result>
     <note>flat circle</note></test>
<test><class>com.company.project.pkg</class>
      <method>spVol</method>
      <param1>3.0</param1>
      <param2>0.0</param2>
      <param3>0.0</param3>
      <result>0.0</result>
      <note>line</note></test>
<test><class>com.company.project.pkg</class>
      <method>spVol</method>
      <param1>0.00001</param1>
      <param2>0.00002</param2>
      <param3>0.00003</param3>
      <result>2.51327E-14</result>
      <note>very small</note></test>
<test><class>com.company.project.pkg</class>
      <method>spVol</method>
      <param1>4E+8</param1>
      <param2>3E+8</param2>
      <param3>2E+8</param3>
      <result>1.00531E+26</result>
      <note>very large</note></test>
```


What we have here is a script file in XML that specifies the exact class, method, and parameters to be called, and the value to compare with. But HOW does this differ from writing this in Java? The Java is far more compact and readible. The Java parser is well documented and the errors are considerably better than a small programming project could every achieve. There are a million people who know Java, while this represents an esoteric programming language that achieves the same thing through introspection. And, byte codes, once compiled, will run very much faster than reading and interpreting the Java. You have no ability to loop, or make a subroutine that tests the method in six variants.  All of this, just to avoid having to compile the test, which is really rather rediculous since compiling is essentially automatic part of the build anyway. 
 
Yet, I have seen programmers seriously propose this sort of scheme with a straight face.  _It is up to the architects and managers of the technical world to point out their folly._