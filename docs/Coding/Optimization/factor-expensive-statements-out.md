#  Optimize Loops

If you are are calling a method on an object, it is not always clear whether it is an expensive operation (takes a long time, lots of CPU power) or an inexpensive operation.  If you have a loop, and you are calling the same method with the same parameters multiple times, you run the risk of making a very expensive mistake. 

In my experience, performance problems are usually caused by calling an expensive method in a loop, when the programmer thought it was an inexpensive method.  Methods that have loops that call methods that have loops that call methods that have loops can cause exponential behavior in code.  Everything works fine with a few records, but when the number of records gets large the whole thing blows up.  

Here is the thing: local variables are cheap and fast.  There is essentially no overhead in using a locale variable to hold and value for use later in the routine.  For example:

```java
MyClass tempObj = getTheObject();
String nameOfObj = tempObj.getName();
```


is almost exactly as efficient as:

```java
String nameOfObj = getTheObject().getName();
```


One might argue that the style of the single line is a little simpler and thus easier to maintain, I don’t disagree, but it is important to remember that from a performance point of view, these run essentially the same.  The creation of a variable causes almost no overhead.  The variable memory is allocated by the compiler and takes NO time at runtime, and assigning the pointer into the variable is such a small expense compared to a method call, which cost 10 to 100 times more.  So for performance reasons, don’t worry about creating local variables.  
The real benefit is in loops.  I have recently seen things like this:

```java
for(int i=0; i<= att.get("umember").size() -1; i++){
    firstNamelist.add(att.get("umember").get(i).getFName());
    lastNamelist.add(att.get("umember").get(i).getLName());
}
```


If this loop runs 100 times, then the att.get function is called 300 times, and the att.get().get(i) is called 200 times.  At design time, we don’t really know how expensive either of these calls are, but I have seen cases where such an operation required parsing and iteration of a large complex structure. As that structure gets bigger, this loop gets exponentially more expensive.  
and all for nothing!  It is trivial to include just a few local variables and eliminate the problem, and in many cases inprove readibility.  Here is the improved version.

```java
ValueSet valSet = att.get("umember");
int last = valSet/size()-1;
for(int i=0; i<= last; i++){
    UserRec uRec = valSet.get(i);
    firstNamelist.add(uRec.getFName());
    lastNamelist.add(uRec.getLName());
}
```


The point is that for large data sets, this might run HUNDREDS of times faster.  Is it harder to write?  Certainly not.  Is it harder to maintain?  No.  One might easily argue that this is as easy to maintain, or easier, than the original version.  While there are more lines, each line is less complicated.  The variable names add meaning to what is happening in the code. Since the lines are less complicated, there is a lower chance of making a mistake while modifying them.  
But the real winner is that this makes far fewer method calls.  It calls a method once, saves the result in a local variable, and then reuses that variable multiple times.  That is a tremendous savings.  
Nuggets

:::tip[Key Takeaway]

If you are calling a method two or more times with the same parameter values, you should consider creating a local variable, calling the method once, and reusing the local variable multiple times.  The cost of the variable is FAR less than a method call, and it might prevent an exponential cost for the routine.

:::

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [loops](https://agiletribe.purplehillsbooks.com/tag/loops/), [performance](https://agiletribe.purplehillsbooks.com/tag/performance/), [variables](https://agiletribe.purplehillsbooks.com/tag/variables/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/10/14/factor-expensive-expressions-out-of-loops/ "Permalink to #31 Factor Expensive Expressions out of Loops").