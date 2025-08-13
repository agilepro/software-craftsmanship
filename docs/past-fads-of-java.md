#  Past Fads of Java

It is important to remember that some ideas for a language end up being wrong.  The language moves on, and Java has done so a few times.  Here are some reminder of things we have left behind after learning they did not work.


## Overloading Methods

One of the darling ideas object oriented (OO) programming was that new methods could be defined with the same name, but with different parameters.  The language treats the two methods with the same name as distinct methods and keeps the calls straight.

This can be very useful when migrating code from one form to another, but it can also be severely abused leading to a general prohibition except when there is a good reason.

**Positive Example**:  imagine that you have a method `readFile(String)` which takes one parameter, the file name as a String.  Later programmers on the project learn that the File object contains a path and a lot of useful functions, and you would like to be able to read the file passing in the file path:  `readFile(File)`.  If you changed the original declaration from String to File, it would cause many (possibly thousands) of errors that would need to be fixed, and changing the code in thousands of places at once is likely to be error prone.  Overloading allow you to add the function now, and then incrementally migrate the code over time, eventually retiring the old method.  In this case you might mark the old method to be `deprecated` so that you remember eventually to get rid of it.  The point is that overloading allows you a way to migrate incrementally.

**Positive Example**: Interchangeable data types.  You might be writing a method that takes a floating point number in.  The program sometimes uses `float` and sometimes `double` and you want both to work.  These values are conceptually the same: both are a number.  You can declare two methods, one that takes `float` and one that takes `double` and let the compiler pick the right one.  That is a convenience and there is no confusion since the inputs and outputs are conceptually the same.

The problem comes when a programmer make overloaded methods that work differently depending on the parameters.

**Negative Example**: C++ allows redefining an overloading operators, and people would create a new meaning for `*` that had nothing to do with multiplication and might do anything else.  I felt clever to to make `customer * product`. to produce a record of sale.  It is succinct, useful, and makes the code almost impossible to read.  A method should be named appropriate to what it does.  It would be far clearer to make a method `createRecordOfSale( customer, product )`because it tells the reader exact what to expect to happen.

**Negative Example**: Sometimes a method existed, but two forms were needed.  Let's take for example `createSale(Person)`. and lets say there are two kinds of Person object: one for the saleperson and one for the customer, and you need createSale to act differently.  Sometimes a dummy parameter would be added to differentiate.  For example, `createSale(Person)` would be for the customer, and `createSale(Person,boolean)` would be for the salesperson.  The two methods would create a sales object two different ways.  You just need to know whether to include the magic boolean or not.   This will ultimately cause errors.   Instead, just make the thing that is being done clear in the method name:  `createSaleFromCustomer(Person)` and `createSaleFromSalesperson(Person)` and it should be obvious that this is far clearer what is going on.

## Overloading Constructor

**Negative Example**: Constructors can be overloaded, and for a while the trend was to define all the possible “source” values that could be used to make an object.  For example create a new double from an integer with `new Double(int)` or from a string with `new Double(String)`.  The latter is a conversion, which can fail.  The trend now is to use a static method:  `Double.valueOf(int)` or for conversion `Double.parseDouble(String)`.  These static methods are far more clear about what they do, and make the code far easier to read.

Constructors are in general overrated.  A static method on the class can construct them just as well, and if you have a lot of different ways to construct the object, the method names can be clear about what is going to happen.  Java has changed in recent versions deprecating constructors that were used before:

|Original |Replaced by|
|---------|-----------|
|`new Double(x)` | `Double.valueOf(x)`|
|`new Double(String)` | `Double.parseDouble(string)`|
|`new Integer(x)` | `Integer.valueOf(x)`|
|`new Integer(String)` | `Integer.parseInt(String)`|
|`new Float(x)` | `Float.valueOf(x)`|
|`new Float(String)` | `Float.parseFloat(String)`|
|`new Long(x)` | `Long.valueOf(x)`|
|`new Long(String)` | `Long.parseLong(String)`|
|`new Boolean(String)` | `Boolean.parseBoolean(String)`|
|`new URL(String)` | `URI.create(String).toURL()`|
|`new Byte(String)` | `Byte.parseByte(String)`|
|`new Character(char)` | `Character.valueOf(char)`|

## Declaring Throws

Java was created with this really cool idea: any method can throw an exception, the language has features to support try & catch, and every method can declare what exceptions it throws so that the calling code knows what errors might occur.

On the surface declaring the exception type is fine for simple examples, but when you scale to a real system it become impossible to maintain.  (Read [Say No to Checked Exceptions](https://agiletribe.purplehillsbooks.com/2023/07/13/say-no-to-checked-exceptions/) to understand the details.)  Each module adds new exception classes. Polymorphism allows new classes in new module to redefine methods, but the exception signature will be different because the methods it uses is different.  One can catch and wrap exceptions to obey the signature, but then you end up with a lot of unnecessary code catching and wrapping for no reason other than conforming to the signature.

The trend now is to define and throw **unchecked** exception, which do not need to be declared in the method signature. The advantage is that: you don't need to declare them in the signature, and that eliminates a lot of bookkeeping in the layers that call your method.  You still can try & catch them if you have some kind of compensating action to take.  Each module can declare and throw an exception that makes sense to it, and if that changes over time it does not break the interface.  Standard interfaces can be declared and implemented across many different modules without having to distort the interface.