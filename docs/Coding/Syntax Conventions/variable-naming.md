#  Variable Naming

Here are some coding guidelines about using meaningful names in the program. Most of them are taken from from **Clean code** book  
Choosing good names takes time but saves more than it takes.

## Use Intention-Revealing Names

The name of a variable, function, or class, should answer all the big questions. It should tell you why it exists, what it does, and how it is used. If a name requires a comment,then the name does not reveal its intent.  
for example:

```java
int d; /*elapsed time in days*/
```


This will be better if written like below

```java
int elapsedTimeInDays;
```


## Avoid Disinformation

For example we have a group of **accounts**. Do not refer it as **accountsList** until it is actually a List. Another example is while working on a web application. We must try to avoid some standard variable names like request, config and context for our own variables. For example in our case we have request to join a Role or a request to create an Account. In this case instead of using request as a variable name we must put context of the request as prefix of that request. so in our case it will be roleRequest, accountRequest.  
Another point here is to have names which looks similar because they have similar representation. In clean code they have given a good example of that  
**XYZControllerForEfficientHandlingOfStrings** and **XYZControllerForEfficientStorageOfStrings**  
If you look at above two names they look similar. We should try to avoid this.

## Think about other Programmers instead of Compiler

Programmers generally think about the compiler and write programs to satisfy compiler. But we must think about the programmer who will be using/reading/maintaining our code in future. for example as shown in the code below:

```java
public void copyCharArray(char array1,char array2){
    for(){
    //do something here
    }
}
```


Compiler will work fine here. But instead of having **array1** and **array2**. It will be best to use **source** and **destination** in this case.

## Use Pronounceable Names

We must use variables that we can pronounce easily when having a code review or a team meeting. So that will less confusing for other programmers even if the logic is complex. Code clean book gives a good example of this  
**private Date genymdhms; /\* Generation year month date hour minute and seconds\*/**  
Instead of this we could have  
**private Date generationTimestamp**;

## Use Good names for flag/comparison

Here is an example of that from our code.

```java
public boolean isVisible(AuthRequest ar, int displayLevel)
throws Exception
{
    int visibility = getVisibility();
    if (visibility != displayLevel)
    {
        return false;
    }     if (visibility != 4)   //Note use of "4"
    {
        return true;
    }
    // must test ownership
    return (ar.getUserProfile().hasAnyId(getOwner()));
}
```


The second if condition is trying to compare visibility with variable 4. I think this is a check whether this note is private or not. Programmer in future will find it hard to understand what is this comparison for. so instead of having 4. We can use **SectionDef.PRIVATE\_ACCESS** or some variable names like final int **PRIVATE\_VISIBILITY.**

## Pick one word per Concept

We must use one word for one concept that must be used in complete application. For example to get a value we may not use different method names at different places we must use a standard convention that could be either fetch or get or select anything. But every where there that should be same.

## Adding a Context helps

As discussed earlier in **Avoid Disinformation.** Adding a context in the variable name helps to understand variable names. In our application we have context at various places that helps us. For example NGPage and NGBook both have a variable called key. Whenever we are using both of them we refer them as bookKey and pageKey. So adding a context book or page with the key variable name help us to distinguish between both the variables.  
These are few points about having meaning full names for variables or methods. In case any one would like to add more into this or would like to make any correction. Please do it.  
We should follow these coding guidelines wherever possible.  

:::tip[Key Takaway]

Leave the campground cleaner than you found it.

:::

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [Example Code](https://agiletribe.purplehillsbooks.com/category/example-code/) and tagged [variables](https://agiletribe.purplehillsbooks.com/tag/variables/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2023/01/17/variable-naming/ "Permalink to Variable Naming").