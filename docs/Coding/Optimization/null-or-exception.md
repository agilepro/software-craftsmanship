#  Return Null or Exception?

I am writing a getter function, and the requested object can not be found.  Do I return null?   Or do I throw an exception?  The answer is “it depends.”  Sometimes both options are needed, but how to decide?

## The Landscape

Assuming there is some sort of collection, and there is a getter method to retrieve an object from the collection by id.  If the object is found return it.  But if the object is not found, what do you do?  This depends on the code that is calling.

When you are **not sure** whether the object exists, you want a null back.  Imagine that the id was input by the user.  It might be correct, it might be wrong.  If it is wrong, you want to do something friendly, like ask the user to enter the value again.  The null return allows the calling code to branch, and to do one thing if the object exists, and something else if the object does not exist.

When you are **confident** that it exists, then an exception is preferred.  Consider code that just got a list of all the objects of concern, and you have an iterator fetching the details.  In this case, virtually all the objects are going to be there.  In some cases it is absolutely guaranteed (for example using a memory structure that is transaction locked).  In these cases, adding code to check for null is a waste.  There is no conceivable chance that it will fail to find the object, and there is no utility is writing code to handle the null.   In the infinitesimally small chance that you can't find the object, you just want a reasonable error message thrown, and you want everything to stop processing and leave.  You have hit a chance that is unlikely and unimportant, just show an error to the user.

## Implement for Both Cases

Since it depends on the situation around the call site, the source object might need to offer both options.

```java
public Student getStudentOrNull(String id) throws Exception;
public Student getStudentOrFail(String id) throws Exception;
```


I have used a pattern of adding “OrNull” to indicate that when not found it will return a null, and “OrFail” to indicate that it will throw and exception if the student is not found.  
I put “throws Exception” on the “OrNull” case because there might be any number of other reasons that it might still throw an exception.  The OrNull just indicates what it will do if the object is not found.

This gives me the ability to decide according to the call site.  If the student id came from an external source, I am probably going to have to write code to handle the case where the student is not found.  So that routine will call the OrNull method.  I will have to write:

```java
public String findStudentName(String newId) throws Exception {
   Student newStudent = getStudentOrNull(newId);
   if (newStudent != null) {
      return newStudent.getName();
   }
   else {
      return "* John Doe *";
   }
}
```


However, if the id came internally, like iterating a list of ids that came from the collection just a millisecond ago, then testing for null is a waste.  Because I am super confident that student should be returned, I can write a shorter form:

```java
public String findStudentName(String newId) throws Exception {
    return newStudent.getStudentOrFail(newId).getName();
}
```


I don't have to test for null, and I will never get a NullPointerException.  I am super confident that this will never happen, but if it does happen the method will send a nice exception explaining that the user can not be found, instead of the rather opaque NullPointerException.

## A Third Option

The third choice is a special object that represents a non-existing student, or a NullStudent object which is an instance of Student but also has some way to distinguish it from a real student.

I won't go into a lot of detail on this because I don't think this pattern is good in general.  I have used it a couple times, and it can be helpful when you have a data structure with a lot of optional parts.  But in general I find that if you do this, then ANYWHERE you work with an object, you are always having to test if it is the null object.  You have to write special cases into most routines to handle the NullStudent object differently.  It is much faster to test for null directly, and it wastes no memory.  Since there is really nothing to know about the student you did not find, I find simply returning null to be the best response in the case where the calling code wants to handle situations where the object can not be found.

## Don't Catch the Exception

One thing you should NOT do is to implement only the exception returning version, and then catch the exception to return null.   For example: 

```java
// don't do this!
public Student getStudentOrNull(String id) {
   try {
      return getStudentOrFail(String id)
   }
   catch (Exception e) {
      return null;
   }
}
```

The reason this is bad is because there are many different exceptions that may fly out of a routine.  Catching those other exceptions and then continuing is a very bad practice.  This can create code that never dies, throwing exceptions, but continuing to process, sometimes even in loops.  In theory, if you test carefully for exactly the exception involved, then it is possible to implement this, but the pattern is almost always abused and implemented incorrectly.   It is just a really bad pattern that you need to avoid.  

Exceptions should be for things that are exceptional, and treating it like a null return violates that.  Throwing an exception is more expensive than returning null.

## Language Extension

I really would like to see this as a language extension that tell whether a method returns null or not.   If a method is declared to NOT return a null, the it would have to throw an exception instead.  You could have two versions of a getter, and the call site selects which version is desired.  Basically, the compiler could enforce that a null is never returned from the case that declares that it will not return a null.

At the call site, if have a guarantee that a method will not return null, then you are safe in chaining calls together.  However, if the method declares that it might return a null, then the caller is appropriately warned to deal with null results.

I am not holding my breath, and anyone can implement this using a naming pattern as I suggest above.   Still — seems like a useful language feature.

## References

*   [Exceptions vs. status returns](https://nedbatchelder.com/text/exceptions-vs-status.html) – 2003 blog post from Ned Batchelder argues whether a status return or an exception should be used for error conditions.