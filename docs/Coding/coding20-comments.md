---
id: "commenting"
name: "Commenting"
---

# Commenting

No coding guide would be complete without a section on comments.  The recommendation for comments is simple:  use comments to add information that is important or necessary to understand what the code is expected to do, and omit comments that have no value.

:::tip[Key Takeaway]

Write your code with proper naming and organization so that it is as clear as possible.  Then use comments to add details that are necessary to understand the goals of the code, that can not be gotten from a light reading of the code itself.

:::

## Commenting Goals

Comments are for the code maintainer, the person who must take on a body of code, read it, understand it, and be able to then make modifications in the code.  Comments are for the other people to understand what you did.

Comments prevent errors during the maintenance phase.  Bugs are introduced when a programmer misunderstands the way a body of code will react to a particular situation.  That is when a programmer will add something to a body of code that will fail or cause other parts of the system to fail.  

Comments allow the original coder to give a high level picture of how the various parts of the code are designed to work together.  The code itself can only include the detail of the current immediate situation.  A high level understanding of the design will help all the various collaborators to evolve the code in a more coherent way.

Comments should not include general information that a typical programmer on the project should be expected to know.  For example explaining the difference between an integer and a float is something that every programmer should already know, and including that in a comment is a waste.

Comments should be added judiciously.  For example copying a complete design spec into the comment might be useful at one level, however hundreds of lines of comments will clutter the code making it hard for the programmers that already know the code to get things done.  For larger explanations, the comment should include a reference to the spec when it is necessary, and allow the maintainer to navigate away from the code itself to pick up this material.

Comments should always be added when a piece of code violates a norm or a guildeline.  That is, if the code works in a surprising or unusual way than a typical programmer on the team might expect, there should be some explanation there so that the maintainer does not accidentally do the wrong thing.  Rules of thumb coding guidelines apply 98% of the time, and for those other 2% a comment is needed to assure the maintainer that this violation is on purpose.

Comments are a way to clarify jargon in the group.  For example, a loan application service might have 50 different specific reasons for rejecting an application, so there could be quite a bit of code dedicates to various grouping of reasons.  It is only natural that names will be developed within the group for the various kinds of reasons for rejection.  A method name incorporating that jargon might be perfectly clear to a coder experienced on the code.  But a new user could be greatly helped by explaining that the method is doing in non-jargon terms.  Avoid simply repeating the jargon in the comment, and try to write something that could be understood by someone with zero experience on that particular code base.

## Bad Comments

Comments take up time from the code maintainer when reading the code, so it is important that what is explained provides value to offset the time needed to read them.  There is a _cost_ to including a comment, so the comment must provide _value_ or else it should be eliminated.  In many cases it is better to have no comment, than to have a poor comment.

Too often boilerplate comments are included that have no actual content, and simply waste the reviewer's time.  IDEs will generally add these boilerplates automatically as an aid to the programmer.  The programmer must then fill in the rest of the comment to give it value.  If the programmer will not fill in useful details, then the boierplate must be removed.  Here is an example:

```java
/**
 * Either accept customer or not
 * @param customerName
 * @param customerCity
 * @param transactionAmt
 * @return boolean
 **/
public boolean acceptCustomer(
        String customerName,
        String customerCity,
        float transactionAmt) {

    // logic here
}
```

The comment above is completely useless, it takes up space, and it is a waste.  Simply reading the signature of the method tells you everything that is in the comment.  It is better to omit the comment, and just let the maintainer read the signature.

Beyond boilerplate code, some programmers are driven to add comments that add absolutely nothing to aid the reader.  I have seen entire libraries where the comments simply repeat the method name or variable name in the comment.  For example:

```
// this is the activating status code
final static int ACTIVATING_STATUS_CODE = 200
```

The above is pure waste and the code would be better, cleaner, and easier to read if it was removed.  Only add a comment that contains some bit of information that can not be gotten by reading the code itself.  


> Always code as if the person who ends up maintaining your code will be a violent psychopath who knows where you live.

## Commenting Guidelines

* **Document WHY** - The comment shoud be used to document the "why" of the code, and not the "how".  People can read and see what the code is doing.  What is missing is the reason why it is doing that.

* **Omit Content-free Comments** - Never include comments that just duplicate what is already there.  For example, if the method is named `activateFlayRodsOnTruddle` the comment should **not** be: "This method activates the flay rods on the truddle."  This duplication adds no value, and is actually a waste because it adds more clutter to the code.

* **Remove Empty Boilerplate** - When an IDE adds a boilerplate comment to the code, either fill it in to make the comment useful, or else delete it to eliminate waste in the code.

* **Explain Jargon** - There are a lot of situations that a body of code adopts a specific jargon for a specific meaning.  This is normal human behavior and it helps us work together efficiently. But a new coder on the project, or a person hired to maintain an old code base, may not be familiar with the jargon.  