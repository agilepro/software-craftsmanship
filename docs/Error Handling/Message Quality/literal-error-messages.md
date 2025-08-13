---
  title: Should be Literal
  tags: 
  - Poor Error Message
  - Error Handling
  - Exceptions
  - Accuracy
---
#  Error messages should be very literal

We all struggle with the correct wording for error messages.  There are often many edge cases to consider.  One guideline that can help, is to make the error message a literal representation of what the service was doing, and what it is that didn't work.

:::tip[Key Takeaway]

The error message should be as direct a translation of the code that failed into words as possible.

:::

## Situation 1

A method in a REST-style API was parsing the POSTed JSON object. A very good pattern is that the parts of the object that were required were tested and an error message sent back if a required part was missing. This is easy to do. If a command requires a parameter, then test that the parameter exists, and return a reasonable explanation of what when wrong. 

The operation in question expects a JSON array named “activities” to be in the posted object. The operation is designed to work on those entries, and so if they are not there, the entire call is pointless. The code was this:

```java
if (!input.has("activities")) {
    throw MyException.newBasic("Specify at least one activity to perform operation");
}
```

OK, so far so good, but lets consider that error message. Imagine that you know nothing about how the code works. Imagine you are a programmer someone else using the REST API. You understand it is an operation on a bunch of activities, you code it up, you think you have coded it correctly, you run it in a test. You get back this message:

```
Specify at least one activity to perform operation
```

The first question you are going to have is: how do I specify at least one activity? It doesn't tell you. Maybe you did specify the activities, but you mispelled “activities” (e.g. “actvities”) or maybe you thought the array was simply named “activity”. From your point of view, you _have_ specified at least one activity. The error message doesn't really tell you what is wrong. It says what your goals was — and you might know that — but your failure in how to specify the activities is not clear. How frustrating.

## A Better Error Message

The test being done was that a field named “activities” needed to exist. Imagine how things would be different with this code:

```java
if (!input.has("activities")) {
    throw MyException.newBasic("An array named 'activities' is required");
}
```

This actually says a lot more. It says you need an array of activities to work on, and it tells you the name of the array that it is expecting. Now, if you had thought the name of the array was “activity” you would clearly understand the problem. If you simply misspelled it you would find it as well.

## Reflections

The old error message said you _need_ to specify at least one activity, without actually knowing whether you did this or not. That was not in fact what it was testing. The code was only testing that a data member existed. It did not verify that the contents of the member was properly formed to be called an activity. It did not actually test whether the array has any members. It could have been an empty array, and that would be no activities to work on, but it did not test for this. 

The programmer was translating up to a _higher contextual level_. The operation needs to operate on a set of activities. There is a data member to represents those activities, so please be sure to deliver activities. However, this translation up to the meaning of the error does not help resolve the error. Because it implies something that it really does not test for, the error message can be confusing. One might even say deceptive. 

It also made some assumptions about the problem. The error message made the assumption that if you did not include a data member named “activities” then the programmer simply didn't know that activities needed to be specified. We don't have enough evidence to conclude this. All we really know is that a specific data member with a specific name is missing.

## Scenario 2

A user is accessing a service that depends on user group.  The request returns the following error message:

```
User Group XYZ is invalid
```

What was actually happening is that XYZ is a new user group which had just been created, and the server had not been set up yet.  The user group XYZ actually was valid, it jst was not in the DB.

The code in question did a query of the DB, and did not get a record back.  Does that mean that the Id was invalid?  In many cases that will be true, but in fact 'validity' of a user group is not defined by its presence in the DB.  Normally all valid user group IDs will be in the DB, but as you can se, not always.

Instead the error message should just be a literal translation of what the service was doing.  It was reading the DB and didn't find any record.  So, just report that:

```
User Group XYZ not found in the registry
```

That is the true and accurate description of what actually happened.  Because this is actually what the service was doing at the time, the error message will be correct in **all** the edge cases.

## Conclusion

The recommendation is to avoid generalizing, and abstracting to a different level of meaning. If you expect a field named “foo”, simply say that foo is needed and not found. If you a test that start date must be before end date fails, then don't report that the duration must be a non-negative value! Simply say that start date must be before end date. 
