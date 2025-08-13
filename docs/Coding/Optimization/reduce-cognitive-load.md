#  Reduce Cognitive Load

Deeply nested IF statements can be hard for the brain to unwind and process correctly.  In many cases, the branch statements are selecting for a single, or a small set of conditions for which processing will be done, and outside of those conditions nothing will be done.  Given this, the code can be structured to avoid complexity, make it easier to understand, and less costly to maintain.

The brain operates as a stack machine, but when that stack gets deeps it is hard to keep things straight. This can be somewhat avoided by keeping condition and consequence together. Within a given routine, there will be a certain number of different paths. Once a path is finished, make it return. This means that the reader can forget about that branch, and concentrate on the other. 

This code is well written from the point of view of efficiency, and is not really very cluttered, but it could be made less cluttered. Here is the original:

```java
public boolean equals (Object o) {
    if (this == o) return true;
    if (o != null) {
        if (o instanceof SpecException) {
            SpecException obj = (SpecException)o;
            boolean res = true;
            res = this.errorCode == obj.errorCode;
            if (!res) {
                res = this.errorString == obj.errorString ||
                   (this.errorString != null && obj.errorString != null &&
                   this.errorString.equals(obj.errorString));
            }
            return res;
        }
        else {
            return false;
        }
    else {
        return false;
    }
}
```


## How to make it better?

*   The big if statement has a small else statement. State the logic the other way, and the if part will be small, and the else large.
*   The if part then does a return, so there is no need for the else block.
*   Get rid of the do-while statement, it does not do anything. Instead of using a break statement to skip the second condition, just go ahead and return the result.
*   You don't really need the 'res' temp variable.

Here is the result. It has been reduced from 21 lines down to 10. Each if condition has an immediate effect on the result value. There is no indirection of placing the result in a variable and then returning the variable. This version will run a very slight bit faster, but that is not the point. It keeps the condition close to the effect in order to reduce the cognitive load on the reader.

```java
public boolean equals (Object o) {
    if (this == o) {
        return true;
    }
    if (o == null) {
        return false;
    }
    if (!(o instanceof SpecException)) {
        return false;
    }
    SpecException obj = (SpecException)o;
    if (this.errorCode != obj.errorCode) {
        return false;
    }
    if (this.errorString == obj.errorString) {
        return true;
    }
    return (this.errorString != null && obj.errorString != null &&
            this.errorString.equals(obj.errorString);
}
```


It is not just that it is shorter (which always helps) but that each condition works more or less immediately.  If the condition is true, it takes action, and returns, getting that branch completely out of the way.  When reading the code, you can consider the condition, and the put it out of mind, knowing that all the following statements are for the case that the condition does not exist.  Generally, the 'easy' cases are tested first, and the conditions get more specialized further down.  It is easier to keep track of the conditions on a particular line. 

Also in the transformation, we eliminated a local variable or two. Reduced the number of blocks.  Simplified some of the complex expressions.  All of this helps make the code more readable and maintainable.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [complexity](https://agiletribe.purplehillsbooks.com/tag/complexity/), [structure](https://agiletribe.purplehillsbooks.com/tag/structure/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/29/19-reduce-cognitive-load/ "Permalink to #19 Reduce Cognitive Load").