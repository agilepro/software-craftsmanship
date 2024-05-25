#  Test Errors before Logic

When writing code, you naturally want the code to be readable so it can be maintained easily.  Generally, you try to [reduce the cognitive load](https://agiletribe.purplehillsbooks.com/2011/10/29/19-reduce-cognitive-load/), and one recommendation is to handle exception cases that might occur up front, in a small, localized block of code, before falling through to the main block of logic.  

Try to keep the test for the error, and the response exception located closely together.  don’t spread this across a routine by having the test high in a routine, and the response far down.  

If there is a condition that must be met for a block of code, consider what happens when that condition is not met.  If the ELSE is only going to be an exception throw, then you can structure the code to be more readable by expressing the opposite condition, throwing an exception up front, and then continuing the logic.  

## An example  

First we have a piece of real code that placed the response of an error situation after the normal logic, and further from the test for it.

```java
if ("registerNewAction".equals(mode)) {
    String userId = reqParam("registerEmail");
    if(emailHandler.validate(userId)){
        profReq = emailHandler.createReq(2, userId, getTime());
        emailHandler.sendEmail(userId,profReq);
        response.sendRedirect("?openid.mode=confirmationKey");
    }else{
        throw MyException.newBasic("The id supplied (%s) does not appear"
        + " to be a valid email address.", userId);
    }
    return;
}
```

Assume that the logic is correct in the code above, you can see that the logic is exactly the same in the sample of code below.

```java
if ("registerNewAction".equals(mode)) {
    String userId = reqParam("registerEmail");
    if (!emailHandler.validate(userId)) {
        throw MyException.newBasic("The id supplied (%s) "+
            +"does not appear to be a valid email address.", userId);
    }
    profReq = emailHandler.createReq(2, userId, getTime());
    emailHandler.sendEmail(userId,profReq);
    response.sendRedirect("?openid.mode=confirmationKey");
    return;
}
```

The only difference between these is how the invalid email address is handled.  It is a small, and subtle change.  The first block tests that the email address is valid, and then has a block handling the correct email, followed by an else block throwing an exception.  The second example tests for an invalid email address, and immediately throws an exception.  Then for the rest of the method we know that the email address is valid.  By putting the test and the throw together, it is obvious that the rest of the logic is only for valid email addresses, and does not tolerate them.  That is: an invalid email address stops the processing and nothing else here will do anything because an exception is thrown.  We get that possible error situation off the table.  We don’t have two blocks: one block for valid email, and another for invalid.  We have one code that tests and stops processing of invalid email, and so we can then focus on the logic with the assumption that all real situations will have valid email addresses.

## What if there are many tests?

The example was shown with a single test, and may not appear very dramatic, but consider for yourself what happens when you have three things to test.  The pseudo code  structured to save exceptions to the end might look something like this:

```java
if (test1) {
    if (test2) {
        if (test3) {
            doSomethingInValidCase();
        }
        else {
            throw MyException("test3 failed");
        }
    }
    else {
        throw MyException("test2 failed");
    }
}
else {
    throw MyException("test1 failed");
}
```

And here is the same logic with a “quick error” approach:

```java
if (!test1) {
    throw MyException("test1 failed");
}
if (!test2) {
    throw MyException("test2 failed");
}
if (!test3) {
    throw MyException("test3 failed");
}
doSomethingInValidCase();
```

As far as I know, both of these produce entirely equivalently efficient runtime code — both versions should be equally efficient — the only difference is readability.  The error test and exception is located close to each other, and clearly associated.  You can obviously have as many tests as you want without effecting the readability of the code.  If you don’t do this, the level of nesting in code gets deeper, there are more possibilities that you have to keep track of.  

If additional tests and exception responses need to be added int he future, it can be done easily, with minimal change to the code.  If the conditions themselves change because the test and exception is located close, the change is made.

## Discussion

Clearly, your comfortableness with this way of structuring code will depend upon whether you are used to it.  We all “like” code that is structured the way that we normally do it, and so new ways to structure code always appear uncomfortable at first.  I can only suggest that you try this — the reason for structuring a particular way is never enough.  

This does have the tendency to place a number of tests for validity before the main logic.  Subroutines or methods will have a set of validity tests immediately at the top of the routine.  This is a good practice, because it makes you think about all the possible situations that need to be handled, and it eliminates the need to consider cases that you have excluded by throwing an exception.  You can have the test and the throw directly in the code, or you can make use of a method for this.  This is the “assert” pattern.  Thus properly structured, the above multi-test case might look like the following using assert methods.

```java
assertTest1();
assertTest2();
assertTest3();
doSomethingInValidCase();
```

Packaging both test and throw in one method has the advantage that even if there are hundreds of places that need to make the test, you get the same, consistent, exception thrown in every case.  However you are not forced to package as an assert method — you can mix assert method calls in among regular test / throw statements without any loss of readability.  

It has been my experience that structuring code this way makes it easier to maintain in the long run.