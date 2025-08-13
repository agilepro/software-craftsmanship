---
id: abstraction-and-encapsulation
title: Abstraction and Encapsulation
tags:
- design
- abstraction
- encapsulation
---
#  Abstraction and Encapsulation

Abstraction and encapsulation are opposite sides of the same coin, and essential to good object oriented software design.  Why the, is there a tendency of some programmers to go in exactly the opposite direction?  This trend and its implication is discussed below.

## Abstraction

In o-o programming, this is the idea that an object has a well defined interface that allows you to manipulate an objects without knowing how it accomplishes this.  For example in a collection class, you might have a method to add something to the collection without being concerned about exactly how that is accomplished.  Abstraction allows you to have different implementations that accomplish the same ends, but have differing advantages in other ways. 

The purpose of abstraction is to isolate what the calling code needs to accomplish the programming task, from what it does not need.  By limiting the access to well defined API methods, you reserve the right to change the aspects that are not exposed for whatever need, as long as the interface contract is maintained.

## Encapsulation

In o-o programming this means that internal details are kept internal as much as possible.   You expose the base minimum to the calling code that is needed for the interactions that it needs to do. 

The purpose of encapsulation is virtually the same as above: to isolate the internal details from the outside callers, in order to reserve the ability to change those internal details in the future if needed.  The API contract is made purposefully as minimal as possible — just what is needed — so that the maintainer has the maximal flexibility to restructure in the future.

## Effect of Good Abstraction / Encapsulation

When abstraction and encapsulation is done well, objects have a clear but minimal interface.  Everything is kept internal as much as possible.  If I use an analogy to an automobile: think about the starter key.  You start the engine by twisting a key or pressing a button.  How the engine is started is immaterial.  It could be a diesel engine, a gasoline engine, and electric car, whatever . . . the driver does not need to be concerned about that. 

What if I asked you to do the worst possible job of abstraction and encapsulation?  What would you do?  You would expose unnecessary internal detail.Instead of a button to start the engine, you might have a bunch of knobs and levers to adjust the fuel/air mixture, the strength of the spark, the timing offset, and controls for the starter motor.  Understand, if you need those sorts of controls (like certain very high performance automobile situations) then by all means make them part of the API.  But a well designed car will not throw this complexity at the driver.  Also, once you make controls for adjusting fuel/air mixture, it becomes very hard to substitute a different engine — or electric motor — in place of the one you have. 

The automobile is an analogy, but well defined programming language classes have the same feel.  If you occasionally need to clear out a collection, then make a “clear” method, but do not include unnecessary details about the internals that are being manipulated.  If a class reads and writes to a file, keep this reading and writing hidden so that the caller need only request the result.

## Unusual Coding Practices

The first place I have seen this is in the concept of a “**constant class**” which is a class that stands on its own and all it does it hold a bunch of constants.   For example, the name of a data file in the case where there is one such file in the system.  Some other class actually reads and writes that file.  If the class that is managing the data file is done correctly, then there is no reason for any other class to know about the internal file name that is used.  By exposing the name of the file to other classes, you introduced an unnecessary complexity.  It would be far better to put the constant that holds the class name into the class that actually manages the file itself.  If another part of the code needs to access the file, it uses the class that manages the file, and there is no need to know the name of the file it is actually reading from. Furthermore, if the name of the file needs to be changed because of a coding change in the managing class, then you are required to change two classes instead of keeping all the changes in one. 

Another constant might represent the maximum number of elements that a particular list is allowed to have.  The class that maintains that list read from the constant class.  It should also be obvious that accidental changes in the constant class will have effects on all the classes that use those constants.  We might wish to believe that any value can be placed in any constant and the program will continue to run, but that simply is not true.  There are complex dependencies between the code and the constant values:  some values will be appropriate, and other values will break the code.  Since the constant is defined in a different class from the code that uses the value, it is harder to see the connection. 

Constants that support a particular piece of code should be defined in the same class as that code.  This seems completely obvious when you consider that anyone maintaining the code needs to see the constants, and anyone maintaining the constants  needs to see the code.  Putting them together is not just convenient, not just labor saving, but keeps all the changes packages together, is marked in source management system together, and the values are coordinated in every aspect of the coding life cycle. 

The second strange practice I have seen is a “data only” class which contains a list of data members (fields) but no code logic.  The code is kept entirely separate class.  Imagine a class that has fields for the name, address, city, state, and zip code of a person.  The class would have those five field values.  Some other class would read the database that the customer is in, and write the values into the data-only class.  The advantage I have been told is that the same data-only class can be used in an environment where the customer data is stored in a database, as well as an environment where it is stored in CSV files.  You can think of the data-class together with the classes that provide the behaviors as a large componentized class.  The problem is that the internal details are exposed.  The data-only class uses String objects, and this is exposed to all potential callers. 

One problem of the data-only class is that the calling code is required to call several things to get a behavior.  Instead of simply asking the class to load the data, you need to match the right data reader method to fill the data-only class.  This open more possibilities that the right thing might not be called in the right order, and it does not function correctly.  The caller need not know how the data is read!   It would be far better to expose a simple method “loadData” which accomplished the results without the caller having to know anything about the where it was reading from, or how the data was formatted.  One obvious problem is that certain objects might want to use a very intelligent caching approach to save memory, and if the loading is exposed to the caller this would be impossible.  By exposing so much of the inner workings, you make it impossible to change the implementation in the future.

## Summary

What I say to motivate these things:  if you have a constant that is only used by one class, put it inside the class, and make it private.  If you have methods that you don't think are needed, make them private.  Don't go and define public setter and accessor methods for all the internal member unless you know they will be needed.   Expose only the accessor methods that you are sure there is a need for. 

If the object is persisted, then try to hid that persistence mechanism internally as much as possible 

Keep the interfaces as simple, and as client oriented as possible.  People need to start and stop the engine of a car, and so the best UI for that is button that starts and stops it without being concerned about the type of engine.  Similarly, if an object needs to be manipulated by the client in a particular way, then make a method for that way, but hide all the details that you can inside the class. Make a “load” method that accomplishes the result without requiring complexity or unnecessary knowledge by anyone else.