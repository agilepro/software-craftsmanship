#  Always use a brace even if not needed

In C, C++, Java, and other languages, you use curley-braces — '\{' and '\}' — to indicate the start and the end of a block of code.  However, the braces are optional if the block is only a single line.  This is an option you should never use.  Always use the brace, even if it is a single line.

## Avoid this:

```java
if (filter!=null && filter.length()>0) {
    List filteredPatterns = new Vector();
    for (NewsBunch tpatt : allPatts)
        if (tpatt.digest.indexOf(filter)>=0)
            filteredPatterns.add(tpatt);
    if (filteredPatterns.size()>0)
        allPatts = filteredPatterns;
}
```


## Properly braced:

```java
if (filter!=null && filter.length()>0) {
    List filteredPatterns = new Vector();
    for (NewsBunch tpatt : allPatts) {
        if (tpatt.digest.indexOf(filter)>=0) {
            filteredPatterns.add(tpatt);
        }
    }
    if (filteredPatterns.size()>0) {
        allPatts = filteredPatterns;
    }
}
```


It is not a huge difference.  Here are the reasons:

*   **Never have two ways of doing something, when one way would do.**  I hope all agree that mixing single line bodies with and without brackets is a bad idea.  Pick one and stick with it.  But which one?
*   **If indenting is 100% correct, then they are about the same**, but this puts a big burden on getting the indenting correct.  Without the braces, if the indenting is incorrect, it is easy to see and find.  But if you don’t use the braces, there it is harder to find the indenting problem, and subsequently easier to make a mistake.
*   **Code is not static, and adding and removing braces when adding or removing lines is extra work.** Then, when a a line body becomes a 2 line body (e.g. by adding a debug line) you have to add the braces or it is a bug.  When a 2 line body becomes a one line body, removing the braces are a bother, and likely to be forgotten.  It is better and more consistent to always have the braces.
*   **Simpler is better**.  By simpler we do not mean fewer characters, but fewer things to thing about.  If you always put the braces in, then there are fewer decisions to make, coding is easier, and fewer chances for bugs.
*   **In very complex conditionals the closing brace helps you follow the syntax.**  Statements nested many levels deep, and if statements that are longer than a line, all conspire to make the code hard to read.  The braces are an unambiguous way to indicate the lexical structure.  Use it.
*   **There is no real savings in not typing the braces.**  Time is spend in coding thinking, not typing.  The time spend typing the two extra characters is far outweighed by the time spend thinking about it, especially by maintainers reading code that is unfamiliar.

If you are not entirely convinced by the arguments above, then I understand.   We are of course talking coding style here, not fundamental right and wrong, so it is possible, even common, for people to hold different opinions, and still be able to write reliable code.  In this case we worry about maintainability of the code.  A programmer learns to read code, and reading faster depends upon having fewer unusual things in the code. Regularity and uniformity of the code makes the code faster to read, and therefor easier to maintain.  Uniformity helps to prevent errors.  So, for the sake of picking one arbitrary choice over another, choose to put the braces in. 

_Once you get used to it, all of the arguments above will make more sense._

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [code style](https://agiletribe.purplehillsbooks.com/tag/code-style/), [indenting](https://agiletribe.purplehillsbooks.com/tag/indenting/), [source](https://agiletribe.purplehillsbooks.com/tag/source/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2013/06/14/always-use-a-brace-even-if-not-needed/ "Permalink to Always use a brace even if not needed").