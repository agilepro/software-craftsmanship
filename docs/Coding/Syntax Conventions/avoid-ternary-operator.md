#  #21 Avoid Ternary Conditional Operator (? :)

There is a Java conditional operator, known as the ternary conditional operator, which is often used in entirely inappropriate situations that make poor code.  Abuse of this operator is so common that I advise avoiding it completely unless you know really what it is doing.  Actually there are cases where it works OK, but in many situations it creates larger, slower code.  

I am assuming that you understand the basics:  (cond exp) ? (result 1) : (result 2)    The conditional expression is tested, and if true result 1 is returned, otherwise result 2 is returned.  Programmers often use this because it is visually terse, and it looks more sophisticated than an if-then-else statement. 
 
Here is an example of code I found “in the wild” that is an example of a poor statement:

```java
out.write(((task.getDueDate()==0)?"":" due date:"));
```


What this is doing is calling a method getDueDate, and checking if that is zero.  If not it writes out a prompt for due date (into a web page in this case), but if so, it !?!?! writes out a null string into to the web page.  This is functionally equivalent to:

```java
if (task.getDueDate()==0) {
    out.write("");
} else {
    out.write(" due date:");
}
```


Obviously, the first form is written in a single line, making it more compact.  Sometimes being more compact is good, and sometimes it can be bad, so I don’t want to focus on that at this time.  Instead, please note that when the due date is zero, it makes a completely unnecessary call to the write method, with a null string which produces no output.  It is far better to not call that at all.  This is better way to write this:

```java
if (task.getDueDate()!=0) {
    out.write(" due date:");
}
```


That is the correct way to write this logic.  It is clear, easy to read, unambiguous, and it does not cause any extra, unnecessary operations to be called.  
Actually, the story gets more interesting, because this is clearly a prompt, there is clearly going to be a value displayed after this.  The original code was something like this:

```java
out.write(((task.getDueDate()==0)?"":" due date:"));
writeValue(out, formatDate(task.getDueDate()));
```


That second line is not needed in the case that the due date is zero, and we must assume that the formatDate function returns a null string when the date is zero.  But note that formatDate is called even when we already know that the due date has been tested for zero.  And then writeValue is called as well will a null string.  All of this is unnecessary.  
A far better way to write this is:

```java
if (task.getDueDate()!=0) {
    out.write(" due date:");
    writeValue(out, formatDate(task.getDueDate()));
}
```


The point being of course that you do not need to call format date if you already know that the due date is zero, and you don’t need to call write value if the know that the due date is zero.  The above, of course, can not be accomplished with the ternary conditional expression, and that is the second problem: programmers who use the ternary form believe that because it is visually compact, that the resulting code is compact, and don’t see the big picture.  
There is one more improvement that I will include, because the above code requires two calls to the getDueDate function, and it would be better to have one and save the result in a local variable.  Here is the best form:

```java
long dueDate = task.getDueDate();
if (dueDate!=0) {
    out.write(" due date:");
    writeValue(out, formatDate(dueDate));
}
```


Once again, this is readable, clear, unambiguous.  It does not look clever and sophisticated the way that the ternary operator does.  But remember, sophisticated code is not necessarily better.  Simple code is easier to read and maintain.

## In Defense of the Terniary Operator

I have presented above a “bad example” of the ternary operator.  Are all examples bad?  No, there are cases where use of the ternary operator are OK.  That is it, just OK.  It is acceptable to use the ternary operator in a case like this:

```java
int a = (b>c) ? f(b) : f(c);
```


Here we have an assignment statement, and you have a condition to choose between two values.  Either you want a to equal f(b), or to equal f(c), but one of these values needs to be assigned.  This is equivalent to:

```java
int a;
if (b>c) {
    a = f(b);
} else {
    a = f(c);
}
```

This is visually more verbose.  In this extremely simple example, and one in which both the true and the false branch need to be executed, it is OK to use the ternary operator.  But keep in mind that the ternary operator is NOT more efficient either.  It is just dangerous, and if you know what you are doing, use it with care.  But less senior programmers should simply avoid this kind of statement.

:::tip[Key Takeaways]

If the condition is simple, and the results expressions are simple, then the ternary operator is OK  

If your expression is more complex, or the result expressions are complex, then the ternary operation is less easy to read and understand.  

If you need to do multiple statements in the branches, then the ternary operator will lead you to less than optimal solutions.

:::