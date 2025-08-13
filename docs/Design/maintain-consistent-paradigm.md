#  Maintain Consistent Paradigm

Reading code is made more challenging if the way it is created and described differ in arbitrary ways.  Someone maintaining — and therefor reading — your code will be greatly helped if you create a consistent paradigm for both describing the code, and implementing the code.  Arbitrary differences increase the complexity.

## TL;DR


I think most of us will find this intuitively obvious.  Every algorithm breaks the problem to be solved into parts along certain conceptual lines, and the documentation should be consistent.

Below is an example where this was not followed, and created some code that is harder to read than it should have been.  It is a small difference, but the point is to look out for and eliminate these kinds of problems when they occur.

## Example

This is code I came across as an example designed to explain how the java function **compareTo** works.  I apologize, but somehow when I originally learned this function, I knew that a positive means one is greater, but which?  Is the parameter passed greater than the object you are calling, or is the object greater than the parameter?  Silly of me, but I decided I would once and for all learn what it is so I could be more confident about my code.

I search for examples, and hit this one:

```java
public void foo1(BigDecimal bg1, BigDeciman bg2) {
    int res = bg1.compareTo(bg2);  //compare the values

    if (res == 0) {
        System.out.println("Both values are equal");
    } else if (res == 1) {
        System.out.println("First value is greater");
    } else if (res == -1) {
        System.out.println("Second value is greater");
    }
}
```

First thing to note is that this example operates correctly, so this is not a question of whether the code is right or not.  The string values being printed is essentially documentation in this case, documenting what the meaning of that condition is.

Notice that the conditions are an equals conditions, but the documentation is about greater than or less than.  Equals should work here, but it is an unnecessary conceptual difference.

The equals case is clear, but notice that greater and lesser cases are described oddly.  First is greater and second is greater are accurate descriptions, but needlessly different.  I am trying to make a correlation between the 1 / -1 and whether the parameter is greater or less.   Switching point of view from first to second confounds that.

So the logic is expressed one way, and the language in another.  So I rewrote the example like this:

```java
public void foo2(BigDecimal bg1, BigDeciman bg2) {
    int res = bg1.compareTo(bg2);  //compare the values

    if (res == 0) {
        System.out.println("Both values are equal");
    } else if (res > 0) {
        System.out.println("First value is greater than second");
    } else if (res < 0) {
        System.out.println("First value is less than second");
    }
}
```

These changes:

*   The conditions are set to greater than and less than instead of using an equals comparison. The **compareTo** function is used to find which value is greater than the other.  (Some implementations of **compareTo** return arbitrary positive and negative values and so you really should do this anyway for correctness.)
*   The greater than conditions is matched with a greater than description
*   The less than condition is matched with a less than description
*   Both descriptions use the values in the same order as the expression in the code: main object first, and parameter second, which allows for an easier to grasp and remember the mapping.

## Discussion

I really found the first example unnecessarily hard to read.  It was hard to really map the description of the function to the operation of the function.  By using a consistent paradigm for both the explanation and the actual programming statement, the example is easier to read, easier to grasp, and easier to remember.

That is what you are looking for in code.  Elegant code works in the same way that it is explained, and it fits with the way that the rest of the code works into a paradigm that supports understanding of the entire code.

Avoid arbitrary differences in the way the algorithm is described, and the way it is implemented.  Be more transparent and clear.  Name variables accurately for the function they actually are used for.  Do the operations in an order that would be naturally be done in.  At the very least, don't introduce arbitrary differences.  Be consistent.