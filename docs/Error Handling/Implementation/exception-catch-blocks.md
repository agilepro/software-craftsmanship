#  Exception Catch Blocks

Exception handling must be done correctly so that the problems are accurately reported, and so that problems can be addressed quickly and effectively. Poorly coded exception handling causes a risk that will not be noticed until there is a critical customer problem.  Then it is too late. Common kinds of mistakes include:

*   Failing to describe the function itself that is failing
*   Attempting to guess what exception it just caught, without grounds for such assumptions, and making a new exception that duplicates that (possibly inaccurate) guess.
*   Failing to include parameters that include critical details about the situation that failed
*   Failing to catch all exception, and only handling a specific subset
*   Handling different kinds of caught exceptions arbitrarily differently: wrapping some and not others
*   Failing to re-throw based on an assumption that the exception must be innocuous.

I have encountered numerous example where the exception message was simply wrong: it did not describe the problem. Inappropriately, it described a different situation, which wastes time. Sloppy coding will waste not only the time of customers, but also consultants and support team.

## Example of Poor Exception Handling

This example unnecessarily duplicates the catch blocks.

```java
public Object createInstance(String className) throws FrameWorkException {
    final String CLASSFUNCTION = CLASSNAME + ".createInstance(): ";
    Object instanceObject = m_objectMap.get(className);
    if (instanceObject == null) {
        try {
            className = className.trim();
            Class loadedClass = this.getClass().getClassLoader().loadClass(
                className);
            instanceObject = loadedClass.newInstance();
            m_objectMap.put(className, instanceObject);
        } catch (InstantiationException instExcep) {
            throw new FrameWorkException(
                "InstantiationException for class :" + className,
                instExcep);
        } catch (ClassNotFoundException clsNotFoundExcep) {
            throw new FrameWorkException(
                "ClassNotFoundException for class :" + className,
                clsNotFoundExcep);
        } catch (IllegalAccessException iae) {
            throw new FrameWorkException(
                "IllegalAccessException for class :" + className, iae);
        }
    }
    logger.debug(CLASSFUNCTION + "Exit ");
    return instanceObject;
}
```


The duplicates blocks add nothing to the output.  When you catch the exception “IllegalAccessException” that exception already describes itself when converted to string.  There is no need to add the clarification that you received an IllegalAccessException, because the exception itself makes that clear.  Other than the unnecessary text, there is no other difference in the catch blocks.  
The duplicate catch block fail to describe what THIS method was trying to do, which was to create an instance of a class.  There should have thrown an exception that said “Failed to create instance of a class.”   Otherwise, the resulting error stack has no indication of why the IllegalAccessException was relevant.  
For this reason, it is far better to have a single catch block.  That block should not focus on what is received, but rather what it means that the current method failed.  This single block will be easier to maintain in the long run. Here is the block of code again without the unnecessary duplicated catch blocks.

```java
public Object createInstance(String className) throws FrameWorkException {
    final String CLASSFUNCTION = CLASSNAME + ".createInstance(): ";
    Object instanceObject = m_objectMap.get(className);
    if (instanceObject == null) {
        try {
            className = className.trim();
            Class loadedClass = this.getClass().getClassLoader().loadClass(
                className);
            instanceObject = loadedClass.newInstance();
            m_objectMap.put(className, instanceObject);
        } catch (Exception eee) {
            throw new FrameWorkException(
                ErrorMessage.FAILED_TO_CREATE_INSTANCE_OF_CLASS,
                eee, {className}  );
        }
    logger.debug(CLASSFUNCTION + "Exit ");
    return instanceObject;
}
```


   
This all come from a simple idea:  the exception you throw should explain the what THIS method failed to do.  You are catching exception that already explain what their method failed to do, so you don’t need to duplicate that, just focus on what THIS method failed to do, and make a single catch block to do this.

## Multiple Catch Blocks is almost never Warranted

Of course, there is the rare situation that you actually need to respond to different exceptions differently.  This is extremely rare, less than 0.1% of catch site.  However it might happen that when you get a particular exception, you want to handle it differently.  Even in that case it is usually best to have a single catch block, and simply use an ‘instanceof’ condition to do the special thing.  If the handling of that exception really is totally different, then use a separate catch block, but I am still looking for a good example where this is necessary.  

The rare cases I have seen is where exception is being used inappropriately to send a result.  For example, throwing an exception when you reach the end of the file — this should never be done because there is nothing exceptional about reaching the end of a file.  The read method should have a return value that indicates the end of file.  Exceptions should be reserved for things that are truly exceptional, and in that case, there is almost never anything that cane be done in a catch block beyond enhancing the error message appropriately by wrapping the exception. 
 
Consider this booklet on exception handling:  [Articulate Error Handling](http://www.lulu.com/product/paperback/articulate-error-handling/2612130)

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [exceptions](https://agiletribe.purplehillsbooks.com/tag/exceptions/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/01/3-exception-catch-blocks/ "Permalink to #3 Exception Catch Blocks").