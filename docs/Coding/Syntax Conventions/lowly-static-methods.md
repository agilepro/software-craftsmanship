---
  title: Lowly Static Method
---
#  Don't Fear the Lowly Static Method

When people first learn object oriented programming (is there any other way) they seem to want to abandon all non-member methods (such as static methods) as being anti-object-oriented. This is foolish. There are times for objects, and times for static methods.

## An Example

A common problem is reading and parsing a file with properties in it. The properties class has a pretty mechanism to parse such a file, but it requires a couple of lines of code to set it up properly. You don't want to duplicate those lines all over the place, and you are not 100% sure that requirements for the format won't change.  
This is a case where you really do want a simple static function, that takes the file as a parameter, and returns the properties object.

```java
class Utilities {
    public static Properties getPropsFromFile( File file ) throws Exception {
        Properties props = new Properties();
        FileInputStream fis = null;
        try {
             fis = new FileInputStream(file);
             props.load(fis);
        }
        catch (Exception e) {
             throw MyException.newWrap("Unable to load properties from %s", e, file);
        }
        finally {
            if (fis != null) {
                fis.close();
            }
        }
        return props;
    }
}

```


Don't get hung up on the specific implementation of this example, but focus only on the fact that it is a method that takes a value in and returns a value back. There is nothing really to hold on to after the method is finished, and there is nothing really that needs to be set up in advance.  

The clearly good thing is that you have this code encapsulated into one place, and you don't have this copied dozens of times in your code. From the code, you call getPropsFromFile and you don't have to worry about the details of the input stream or exception handling.

```java
Properties myProps = Utilities.getPropsFromFile(file);

```


I have put it in a class just so that it appears similar to the wrong example and easy to compare and contrast. You might put any number of such converters or formatter methods in the same Utilities class — or they might each go in their own class. The decision as to which class to put a static method it should be a decision of where it makes the most logical sense from a code maintenance and library usage point of view.

## The Wrong Way

Here is a contrasting approach that defines an object which will then uses a member method to do the same thing.

```java
class PropertyFileReader {
    public Properties getPropsFromFile( File file ) throws Exception {
        Properties props = new Properties();
        FileInputStream fis = null;
        try {
             fis = new FileInputStream(file);
             props.load(fis);
        }
        catch (Exception e) {
             throw MyException.newWrap("Unable to load properties from %s", e, file);
        }
        finally {
            if (fis != null) {
                fis.close();
            }
        }
        return props;
    }
}
```


In this you have to construct the object, and then call a method on the object. (And then throw the object away.)

```java
PropertyFileReader pfr = new PropertyFileReader();
Properties myProps = pfr.getPropsFromFile(file);
```


This is a waste, because the object instance is not needed. It is just a formality necessary because of object oriented programming. The object instance does not hold anything important. The method is passed all the information it needs, and the returns all the results. There is no need to construct an object for this.  
Some people find the following way to do it more compact, and while it fits on one line, it is still more complicated than the static method, and it still has all the overhead of creating an object and throwing it away.

```java
Properties myProps = (new PropertyFileReader()).getPropsFromFile(file);
```


## Discussion

Some programmers think that the second approach is better because it is more object-oriented. You should instead consider fitness to purpose. In this case, the formatter object is pure overhead: It does not represent anything in the real world, like a person, a customer, a item for sale, etc. The formatter is purely a construct for doing programming. Also, there is no need to set the object up and make several calls on it. There are pure programming constructs that still need an object to hold things together while multiple calls are made. For example, an output stream is an object that is a pure programming construct, but it needs to be an object because you construct it, and then call the write method many times.  

If you find you have a class, where you create an object, call one method, and then throw the object away, you have a good candidate for a static method. Go ahead and use it.  

I think a lot of programmers avoid this because they think it is “bad” in some way. Everything is supposed to be an object, so they try to make everything an object. Static methods should be a rare overall: maybe 10% or less of your methods. But there is no reason to avoid them completely.  

Also be careful not to cheat and make a member when none is needed. For example, you could pass the parameter into the object constructor, and then use it later in a parameterless method. Usage might look like this:

```java
PropertyFileReader pfr = new PropertyFileReader(file);
Properties myProps = pfr.getPropsFromFile();
```


This requires that the class have a data member to hold onto the file until the conversion call is made. It is more complicated to pass this in on one line,a and use it on another; it is conceptually simpler and much easier to understand if the input and output are on the same line. Even if there are twenty different conversion methods that return difference formats, it would be better to pass the input to each of the 20 static methods, than to pass it to a single constructor method. You save nothing in terms of runtime performance to have only one method that takes a parameter. Having each method take the input and process it directly is still going to be faster and more lightweight than constructing an object that has a member to hold onto until the output method is called.

## Recomendation

Consider this: every method should be made static if possible. It is simpler. What is possible? It should be static by default UNLESS:

1.  The method needs access to the member variables to use or manipulate the object state, and
2.  that object is needed to represent a key concept that will be needed for more than one method call.

Keep in mind that most methods will be (non-static) member methods, but on each you should be able to identify both conditions above. If a method is being called once, all the data can be passed in, and all the output returned, then you should always use a static method. Have no fear of using simple, straightforward techniques when they are appropriate.