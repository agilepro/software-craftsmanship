#  The Urge to Merge

Concurrent development of software in a team relies on being able to merge the changes from each person successfully.  Experienced developers will already know this, but there are theoretical limits on how effective merging can be.  

Understand that merging changes is not perfect.  It works well most of the time, but there is always a **risk that a merge will cause a bug**.  Code merging is a line by line symbolic comparison of two versions of the code, and resolving differences generally by determining which change was most recent.

## Merge Conflicts

If two people work on different versions of a source file, and change the same line, usually the merge algorithm will flag this a conflict and request that a human look at the code a decide how to merge.  This is not strictly necessary — automated merge could happen if the changes in separate parts of the line — but the theory is that when changes a close in the code, they might relate to each other, so give it to a programmer.  

Resolving the conflict is a bother, but at least someone looks at the code, and if they understand the context well enough this can produce good code.  Presumably.  

Note that this depends on the length of the line.  If your custom is to make lots of short lines you will get a different conflict pattern than someone who tends to make lots of long lines.  The ability to detect a possible problem, relies on the idea that each line is independent.  But they are not.

## Non-Conflicting Merge Problems

The more insidious problems do not cause a conflict warning because the changes are not on the same line, and they might be any distance away, even in different files, classes, or packages.  

Let me demonstrate with a very simple example.  Consider this buggy code:

```java
1:   long diff = t2 - t1;
 :   . . .
2:   int days = diff / (60 * 60 * 24)
```


Line 1 takes the difference between two time stamps, and line 2 later in the code calculates the number of says.  Line one is in _milliseconds_, but line 2 mistakenly assumes it is in _seconds_.  This is a bug.   The developer Alex working on branch 1 notices this and and fixes the calculation of the difference to be in seconds.

```java
1:   long diff = (t2 - t1) / 1000;
 :   . . .
2:   int days = diff / (60 * 60 * 24)
```


Developer Betty working on branch 2 notices the problem and fixes it by correctly calculating the number of days from milliseconds:

```java
1:   long diff = t2 - t1;
 :   . . .
2:   int days = diff / (60 * 60 * 24 * 1000)
```


Both versions are correct.  They calculate the right results, and both versions pass all the tests.   So one checks in, and then the other.  No merge conflict warnings generated.  The resulting code looks like this:

```
1:   long diff = (t2 - t1) / 1000;
 :   . . .
2:   int days = diff / (60 * 60 * 24 * 1000)
```


This now calculates the incorrect number of days as being 1000 times too small.  Two working branches were merged together to produce a non-working result.   Neither programmer is expecting a problem since everything was running when they checked in.  
How long will it take to find to find this problem?  It depends on how important the calculations of days is to the working of the program.  Hopefully, you have a test that catches this in the first trial run, however test sets rarely check every single small calculation in the system.    If this was just calculated for display on the screen as a convenience, it might not be in a position to easily include in automated testing, and there are many many aspects of a program that are not able to be automatically tested.  There is a possibility that this problem will appear and exist for a long time, because nobody is suspecting that the merge caused the problem.

## How Common Is This?

It is not very common but still a significant risk.  Programmers merge code every day, and can go years without experiencing this kind of thing.  But when it does happen, it is hard to find.  
The change could appear in many ways:

*   One part of the code calculates a value, and another part uses it.  The calculation is change slightly and/or the place the value is used is changed in an incompatible way.
*   A class defines a method and another part where it is used.  One change is inside the method maybe the handling of certain special conditions, and an incompatible change in the call site maybe around those special conditions.
*   A method might be changed in a super class, and an incompatible change in the use in a subclass.
*   One method within a class might be changed in how it uses a member variable, while another method is changed in an incompatible way.

## Conclusion

Should we worry?  Merging of code changes is absolutely necessary for any kind of team development.  You have to use it.   But you should always remember that there is a **_RISK_** of a merge causing a bug.  Therefor, you should always minimize your need to merge.  
The risk of merge caused bugs can be minimized by the following:

*   **Merge as often as you can.**  If Alex and Betty merged their code every day, then the risk is reduced only to changes made on the same day.   Otherwise, they would see the change from the other and would not duplicate the fix.
*   **Don’t wait a long time to merge.** If Alex and Betty worked for a month in isolation, there is a much greater chance that they both run across and fix the problem, and their fixes might be incompatible.
*   **Make small changes and merge quickly.**  Don’t write huge blocks of code, but instead make small changes, get those small changes to “release quality” and merge them quickly.
*   **Merge in and test the other guy’s code.**  Keep merging in changes from the other developers so that if there is any incompatibility you catch it early while you are still developing.
*   **Don’t leave a long time before merging.**  If make a change and merge it today, and something goes wrong, it is probably something to do with the code you changed today.  If you wait a week before merging, the changes you made will not be fresh in mind, and this will take more effort to remember what was changed.

Those are all the same thing. The take-away is to develop a healthy **Urge to Merge** in your team:

:::tip[Key Takeaway]

The problem is thinking that merging is safe.  Since you know it is not, the only resolution is to minimize your need to merge large chunks.

:::
