#  We don't need Programmers . . . we only need Designers

Today's post is a reflection on a classic misunderstanding often made by people who don't understand how software is produced.  This misunderstanding can be particularly harmful when held by management making decisions on team structure.  The full quote is: “**We don't need any programmers here.  There are plenty of programmers in India.  Here, we just need people who can tell programmers what to do.**”  Let me explain why this is a classic management mistake.

## Programming Is Design, not Manufacturing

The source of the misunderstanding is thinking of programming the way that we thing about manufacturing.  If I want to built toys, I will have someone make a design for the toy.  That might involve CAD drawings, precise specifications for materials to use, thicknesses, and probably a design for how the toy will be assembled.  You then can hire a factory in any part of the world, and instruct people to manufacture the toy.  The reason you can do this is that all the essential decisions about the toy have been made in the design specifications.  Given those specifications, any competent team can follow the instructions, manufacture the parts, assemble the result, and produce essentially the same thing anywhere.  

The problem with this model is that with software, there is no manufacturing.  As soon as it is “decided” how the behavior will be, there is nothing else that has to be manufactured in any traditional sense.  There is no need for a factory to take the results of the design, and there is no need to hire unskilled workers to assemble anything.  Once the design is complete, the resulting program can be more or less instantly made available to millions of people by FTP download: there is no need to manufacture anything.  

In traditional manufacturing, you might have 10% of the people working on the design, and 90% then working at relatively unskilled positions in a factory putting the product together.  For mass production it might be 1% design, and 99% putting the product together.  

Software, however, is 99% design, with maybe 1% in routine tasks which might be comparable to  manufacturing.  There are some routine tests that need to be run (largely automated) and there is some bookkeeping, but the vast bulk is simply _**deciding what the program should do**_.  Once the designer decides what the program should do, there is very little else to programming . . . you are essentially done, and the result can be instantly made available to the customers.  There simply is no manufacturing needed.

## A Specific Illustrative Example

Let me give you a very very specific example to illustrate this.  Let say that a customer has requested that the product be enhanced such that it will send an email message when a very specific situation occurs.  It is clear to everyone that someone will need to work with the customer, and to understand their business well enough to precisely define the condition that will cause the email message.  They don't want the email going just anytime, and they don't want extra message, nor do they want missing messages.  That someone will have to understand exactly what the email message will say: what data fields will be included in the content of the message, and how to structure that message to be meaningful to the recipients.  Once this design is understood, it generally takes only a few minutes to write the program that does it.  

To put this into perspective: the programming code that would implement the above design might take about “1 page” of source code.  Think of it like a one page specification that precisely defines the condition that will be tested, and the variables that will be tested, the data values to be used in the message, and the way the message is constructed.  A programmer defines those things in a formal language.  Then automatic processors (known as compilers and builders) take that definition, and produce the final code.  During the compilation, this specification is subjected to millions of tests to make sure that it is syntactically correct, and that it is logically correct with respect to the rest of the program.  There are also run time tests that are automatically run on the produced code.  What would normally be manufacturing has been completely automated in the software field, and there is no longer any need for people to do this.  

The logic is usually complicated, and hard for a designer to work out all the precise dependencies.  The best way to work out that you have a logically consistent design, is to write it up as code, and let the automated logic checking in the compiler and tests to work that out for you.  Such a design is never correct when first written, but a designer will work in an iterative manner: attempting a compile, addressing the logical problems, resubmitting.  Those logical problems often must be taken back to the customer: the customer said they wanted condition X, but you may find that condition X never happens, and they really wanted condition Y, but you need to verify that with them.  This is a normal part of design: working out what the customer really wants.

## Separation Increases the work.

Some people mistakenly think that it might be a good idea to separate the design from the programming.  To do this, the designer will have to write a precise specification of the desired functionality in English.  First, all of the conditions will have to be carefully defined, and the quantities that are to be used, and an English language description of the output format.  Pictures will have to be drawn approximating the output.  Such a specification for the email problem above could be 10 pages to 50 pages in length.

:::tip[Key Takeaway]

It can be many times as much work to write the specification document, as it is to write the program itself.

:::

This will be significantly more work for the designer, and also more work for the programmer, but the real cost is that the English language will not be perfect.  Until subjected to the kinds of automated testing that the compiler and builder provides, the logic in the design is often flawed.  By suggesting that the designer work without the logic checking aspects of the compiler and builder, you have no real ability to make a clear and consistent design.  That inconsistent design can not be typed up by a separate programmer and made to work.  So what happens is that the programmer has to keep coming back to the designer, and the designer has to take this back to the customer.  

The entire process is made 5 to 10 times as complicated and expensive. By imagining a distinction between “design” and “programming” you greatly increase the cost: even if some fo the people are paid at one half, or one quarter the normal rate, you don't get a benefit.  In fact, what happens most of the time is that the time delays increase to a point where the organization is unable to ship the final product to the customer in any reasonable time frame.

## Programming is Not Typing

Some people have this idea that programming is work that requires “typing in long programs” and that the effort is the typing involved.  Therefor, you should be able to tell someone what to program, and they will happily spend days writing up a program.  However, programmers actually spend a very small fraction actually typing.  Most of the job of a programmer is _thinking_.  Given that you understand what the customer wants, and given the structure of the current product, you have to work out a compromise that makes the customer happy, and does not break the product.  Not only is there a lot of thinking involved, but it is a two way street with the customer.  It is never possible for a customer to say “I want X, Y, and Z” and to be able to produce that without any consideration of the existing product.  There is always an aspect of “Producing X is not possible, but I could make X' would that be satisfactory?”   Figuring out X' can not be done by a designer who does not know the internals of the existing program. 

Worked out precisely what X', Y', and Z' are that will satisfy the customer is 90% or 95% of the job.  The typing it up takes less than 5% of the time.  There is plenty of evidence that attempting to send this 5% to someone in India to save the typing effort actually takes more effort than the typing.  Just like typing a 50 page specification takes a lot more effort than typing a 1 page piece of code.

## The Main Misconception

It is my belief that people in management make these mistakes, because they conceptualize programming as if it was manufacturing.  They believe that 10% of the work is design, and the rest can be shipped to a  factory someplace where the labor is cheap.  Therefor, lets not have any programmers close the customers.  They believe that programming is a manufacturing kind of activity — mostly a lot of typing, and we the designer can just tell them what to type, it will all be done efficiently at that factory which will mass produce the code for the customer.  

Once you understand that management makes this mistake, there is plenty of evidence supporting this.  The separation of design from programming, as if they were different disciplines.  The attitude to just get warm bodies called programmers to mass produce the programming.

## A Better Approach

However, a smart organization, and there are many today, will get the programmer DIRECTLY in contact with the customer.  The programmer IS the designer.  Armed with an understanding of how the product is currently constructed, the programmer/designer can listen to what the customer wants, and can proposed workable design while sitting around a table.  Customer says they want X, the programmer/designer can instantly suggest X' and the customer can instantly respond whether that is suitable.  This single session can save months of back and forth, but there is more:  when the programmer/designer tries making a formal specification of the function (in Java code) and starts checking that using the logic testing tools, the programmer invariably finds that the proposed design is not 100% consistent or workable.  Yet, because the programmer has discussed what the customer wants, there is a greater likelihood that the programmer/designer will come up with something suitable for the customer.  The final design has to be verified with the customer, but because of the interaction, it is more likely to be close to what the customer wanted, and you will converge more quickly.  

Such an approach can make software that is better for the customer, in a fraction of the cost.  

However, silly management thinks that treating software like manufacturing will save money, and so often, repeatedly, makes the same mistakes, and then complains about how the software is late and over budget.  

**_Will they ever learn?_**