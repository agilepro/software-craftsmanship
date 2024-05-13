#  Avoid Deep Conditional Nesting

Simply put: try to make your conditions as flat as possible.  This makes them generally easier for the humans to parse and understand.
   
I ran across this example today:

```java
daysInMonth[1] = 28;
if (year % 4 == 0) {
    if (year % 100 == 0) {
        if (year % 400 == 0) {
            daysInMonth[1] = 29;
        }
    } else {
        daysInMonth[1] = 29;
    }
}

```


You might recognize that as the formula to calculate the number of days in February. Most of the time February has 28 days, but sometimes, on a leap year it has 29.  

The above conditional expression is correct. However, it is a bit tricky to read, particularly inside the century test level, to notice that there is a condition where nothing is set. (There is no ‘else’ on the year % 100 condition.)  

The same expression can be rewritten in this form:

```java
daysInMonth[1] = 28;
if (year % 4 != 0) {
    //do nothing this is a 28 day February
}
else if (year % 100 != 0) {
    daysInMonth[1] = 29;
}
else if (year % 400 != 0) {
    //do nothing this is a 28 day February
}
else
    daysInMonth[1] = 29;
}

```


Even though the logic is exactly the same — all we have done is transform according to DeMorgan’s laws into another form and rearranged — this form is easier to decode. You can handle one thing at a time. Each steps gets one step more refined. As you eliminate the earlier conditions, there is less complexity you have to hold in your head to remember what all the remaining possibilities are.  

More important, it is easy to see that there are really only four cases: two with February at 28 days, and two with February at 29 days. That is much harder to see in the original formulation.  

When looking for a bug in the logic, the ability to identify all the relevant cases, and the ability to work through the logic is critical. Both expressions above are correct in the logical sense. But if there was a bug in them, the second would make it much easier to find the bug.  

So if possible, flatten your boolean logic expressions to be step-like or list-like.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [practice](https://agiletribe.purplehillsbooks.com/category/practice/) and tagged [development](https://agiletribe.purplehillsbooks.com/tag/development/), [maintainability](https://agiletribe.purplehillsbooks.com/tag/maintainability/), [source](https://agiletribe.purplehillsbooks.com/tag/source/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2016/03/29/avoid-unnecessary-conditional-nesting/ "Permalink to Avoid Unnecessary Conditional Nesting").