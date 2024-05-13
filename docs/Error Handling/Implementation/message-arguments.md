#  Variable Arguments for Messages

We need to construct an object which has a template and a set of parameter data values.  Java offers a couple of ways to do this, and this post shows how the variable parameter mechanism works easily and conveniently for this purpose.

A template is a string that has tokens in it which are then replaced with data “parameters”.  (see [Translatable Error Messages](https://agiletribe.purplehillsbooks.com/2019/01/05/translatable-error-messages/) for explanation of why.)   Some messages need a single data value, some need two, some need more:  there is a variable number of data values needed.   Given that you want an exception object that carries the message, there are three different ways to do it.

## Message Builder

One approach is to create the object and place the various elements on there.  The isage might be this pattern:

```java
JSONException je = new JSONException("Can't find property {0} in file {1}");
je.addParam("MAX_USERS");
je.addParam("c:/data/config.txt");
throw je;
```


The exception is created using the template, and then parameters are added.  This works but a couple problems.  The first is that you can’t just create the exception and throw it.  That is a big limitation, because you want exception handling to be quick and easy so that programmers are encouraged to use them correctly.  Having to assign the object into a local variable and then make a few more calls on it happens to increase the programming trouble.  You need four lines when you would like one line.

## Data in one Parameter

one option is to build the data parameter object up front, and then construct the exception in a single call.  This pattern would be like this:

```java
Object[] params = new Object[2];
params[0] = "MAX_USERS";
params[1] = "c:/data/config.txt";
throw new JSONException("Can't find property {0} in file {1}", params);
```


The exception constructor has two parameter, one for the template, and one for the parameters.  However this still takes four lines, and you have to put the parameters into a local object for a couple lines.  It makes it hard to construct and throw in a single statement as needed.  
One can construct the object array anonymously in place, and it would look like this:

```java
throw new JSONException("Can't find property {0} in file {1}",
              Object[] {"MAX_USERS", "c:/data/config.txt"} );
```


This is much nicer being able to construct and throw in a single statement.  No local variable is required, so no need to isolate the scope or anything like that.

## Variable Arguments

The approach that makes the most sense is to declare the constructor as taking a template, optionally a cause exception, and then any number of arguments.  They are passed in a way that looks like normal parameters.  The Java language actually packages them up as an Object array, but the programmer does not need to create the syntactic sugar for that.   Here is what it looks like:

```java
throw new JSONException("Can't find property {0} in file {1}",
        "MAX_USERS", "c:/data/config.txt");
```


That is pretty much ideal.  You specify the template, and then include the parameters.  Nothing could be easier, and it is easy to read without having complex syntax in the way.  
If you are not familiar with variable arguments, they are declared like this:

```java
public JSONException( String template, Object ... params);
```


This will have the effect of bundling up the arguments, as many as are placed there, into an Object array, which can then be received and passed along with the exception object.  The body of this constructor is pretty much the same as  option above with data as a single parameter, exception the Java compiler takes care of constructing the array object for you.