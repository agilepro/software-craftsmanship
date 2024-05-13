#  #27 Don't Declare Variables at the Top

Somewhere long ago you attended a course that said that all variables should be declared at the top of the method.  Modern languages allow you to declare the variable at the point in the code that it is initialized and this is a significant advantage.  However, the outdated idea of declaring all variables at the top of the method persists.  This post explains why this is a bad idea.

**Why Declare Variables?** Very early languages did not require declaring variables and that led to a problem that it was unclear what variables existed and let to the introduction of bugs where a typo caused the creation of a new variable, and made it hard to find out that the the expression is NOT setting the variable it was supposed to.  So avoid this problem, a kind of double-entry accounting was introduced: you have to declare the creation of a variable using some sort of notation saying “I really do mean to create a new variable that did not exist before.”   By making a specific statement to indicate that you are creating a variable, it not only prevents typos from creating incorrect variables in later expressions.  Because it warns you of a second declaration for a particular name, it also allows you to find places where you have two variables with the same name.  

**Why at the Top?** There then was a movement that all variable should be declared at the top of the method.  In some programming languages, it was a requirement that variables be declared before any executable part of the method (PASCAL is an example of a language like this).  It seems like a good idea because all the variables are declared together in one place, forming a kind of quick reference to all the variables in the method.  

**Stack Usage:** Note that most languages (maybe all?) allocate local variables on a stack, and all variables for that function (or block) are allocated in a single push of the stack.  The compiler does the job of finding all the variables in that function, and including them in the same stack frame.  So there is no run-time or efficiency difference in where you define the variable, it is only a readability difference.  

**Problem declaring variable for large scope.** The problem is that variables are not used uniformly throughout the routine.  Some are used for only a few statements.   Proving that the logic in code is correct involves convincing yourself that the variable will have the right value in it, regardless of which of the many paths are taken to get to the line in question.  Having the variable declared for the entire method means that there are many places where the variable might be set.  There is even the possibility that someone will type the wrong variable name, and the more variables that exist at a particular point in the code, the more likelihood that the wrong variable might be used and not noticed.  

**Declaring and initializing.**  Modern languages allow you to declare a variable, and to initialize it in a single statement. This has the distinct advantage that there is no possibility to use the variable in an uninitialized state.  Java implicitly initializes all variables if you fail to do it explicitly, but clear code should always include the initialization.  Often this means simply initializing a variable to null, and later in the routine putting a meaningful value in there. 

**Meaningful values.**  Initializing a variable to _null_ does not mean that it is ready for use.  When an object variable is set to null, any attempt to use it will cause a null pointer exception, which will terminate the execution for the program.  Well written programs will never have null pointer exceptions.  When a variable is initialized, it should be declared and initialized with a meaningful value.  Consider the following sample methods:

### Sample 1

```java
public int mymethod()  {
    ExampleClass var1 = null;
    ...
    ... (block 1)
    ...
    var1 = getExampleValue(1,2,3);
    ...
    ... (block 2)
    ...
    var1.sampleMethod("xxx");
    return var1.totals();
}
```


### Sample 2

```java
public int mymethod()  {
    ...
    ... (block 1)
    ...
    Example var1 = getExampleValue(1,2,3);
    ...
    ... (block 2)
    ...
    var1.sampleMethod("xxx");
    return var1.totals();
}
```


## Discussion

Sample 1 declares a variable at the top, sets it to null.   Then later, it assigns a meaningful value to it.  Even later it makes use of that variable.  What is important is to consider what happens in the blocks of ellipses before and after assigning the meaningful value (block1 and block2).   Sample 2 is the same except that the variable is not declared at the top, instead it is declared at the time that a meaningful value is placed into it.  

Functionally the two samples are the same.  But as you maintain this code, it is possible that a programmer will attempt to use the variable var1 in block 1 before it has been assigned a meaningful value.  In sample 1 this will not be caught by the compiler, and this will be discovered only in testing when a null pointer exception is thrown.  In sample 2, any attempt to use the variable var1 in block 1 will cause a compiler error: the variable has not been declared yet.  

Declaring the variable, and placing a null in it, simply opens the door the possibility of use when it has no meaningful value in it.  In the second sample, the variable never exists with a null in it, it always has a meaningful value in it.  If a programmer attempts to use it in the first block, there is a compile time warning to let him know that it it not in a state to be used.  

**Not just Null:**  This is not just about object pointers being initialized to null.  Numeric variables (such as “numberOfPlanets”) might be initialized with a zero in them, and later have a meaningful value (i.e. 8) stored in them.  That part of the code where the variable has the “incorrect” value in them is code where such errors might be entered.  

**Limit Scope of Variable:** For readibility is makes sense to limit the scope of a variable to the smallest scope possible.  When a variable is needed only inside a conditional block, then it should be declared within that block.  If a variable is not needed at the beginning of the block it should be declared and initialized at the latest possible point.  It should be declared at the point that it can be initialized with a meaningful value.  That way, the variable only exists with a good value in it.  Unfortunately, there is no way in most languages to undeclare a variable, so once declared they exist until the end of the block, however this is not really a problem since if the variable has been properly initialized, there is not a big problem with holding that value a bit longer.  Keep you methods and blocks small if possible, and there should not be any real problem.  

**What is the downside?**  By declaring variables through the body of the code when there is a meaningful value means that you will not have a nice declarations section at the top. How valuable really is that.  It is easy to search and find the location.  The tradeoff is between “time spent finding the declaration point” and “time spent proving what values might exist at a location in the code”.  Reducing the scope that a variable is declared in can greatly help in reviewing code for correctness.  The few lines of code that are exposed to a variable, the easier to scan for all the manipulations.  I spend a lot of time trying to figure what values a variable might have.  Imagine a variable declared at the top of a method, and ten branch conditions before the first use.  It can be complicated to work backward through all the possibilities.  But if the variable is declared after those branches, it can greatly simplify the search.  When reading code, I spend a lot of time figuring the values, but essentially no time finding the declaration of a variable.  That table at the top adds very little value, while reducing the scope add tremendous value. 

**Code Fluff:** I suspect that part of the motivation for creating extra declaration lines is that it makes the code longer.  Note that sample 1 has one more line that sample 2.  If you are a consultant being paid by the line, there is a motivation to put safe, valid lines into the code.  An even more cynical suspicion is that this is a way to make the code more complex, and therefor harder for others to maintain, which means job security.  Let us hope that this is NOT the motivation of any programmers.  The best way to remove any suspicion is to code cleanly, and use as few lines as necessary to do the job, and still have readable code.  

**In some cases you have to use null.**  It would be nice to eliminate the initialization of variables to non-meaningful values, this can not be entirely eliminated.  In some cases variables need to be declared outside of a block, but the value can only be found inside a block.  One example is the variable that you want to use in a catch or a finally block must be declared outside of the entire try statement, but you want to calculate or retrieve the value within the try block.  Another case is a “search result” which must be declared before the code that will iterate and search for a particular value, assigning it to the result for use outside the search block. There are many cases where the logic demands that you declare a variable with a null or empty value in it, so please don’t interpret this as a command to eliminate all uses of such initialization.  However, there are many cases where the variable simple does not need to be declared so early, and this advice is to eliminate those situations.

## Nuggets

:::tip[Key Takeaways]

Variables should be declared at the point in the method that there is a meaningful value to put into them.  

Variables should not be initialized at the top of a method, if they are not needed at the top.Declaring a variable and placing non-meaningful value in it is not a good practice, and should be avoided if possible.

:::

## Addendum

I asked some programmers why they were using this technique, and here is the answer:  
_As per my knowledge before, If we declare variables inside of the loop then we are wasting memory.  I thought that if the variable was declared inside the loop, then not only does the object assigned to the variable need to be created for each iteration, but there needs to be a new variable allocated as well. It seemed to me that if the garbage collector is slow then we’ll have a bunch of variables that need to be cleaned up.  However, if we create the variable outside the loop, then we’re only creating a single variable and assigning a new object to it each time. That one variable might take a bit longer for it to go out of scope, but then there’s only one variable to clean up._  

OK, so this is rooted in a misunderstanding about how the Java language (and other stack oriented languages) work.  Variables are allocated on the stack.  All the variables in a function (or a block in some cases) are allocated at once with a single stack frame, and they are similarly de-allocated at once when that stack frame goes away.  Thus, a variable has a spot in memory, and there is essentially no overhead to having more or fewer variables in a routine.  The named variable becomes a spot of memory on the stack whether it is used or not, and regardless of where in the function it is defined.  If the loop iterates a million times, there is still nothing to clean up except popping the stack frame which eliminates all variables of the method at once.  

All of that was about local variables.  Of course, when you construct an object, that object is allocated in the heap, and of course must be garbage collected.  So there IS a benefit in constructing an object outside the loop, if a single instance is going to be used for every iteration.  That logic about objects in the heap does not apply to local variables allocated on the stack.

:::tip[Key Takeaways]

There is essentially no overhead in allocation / de-allocation of local variables on the stack, and your primary concern should be readability of the code.

:::