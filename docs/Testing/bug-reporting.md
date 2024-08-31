# How to Report a Bug

This page is for people who are using software and want to report a problem that they would like fixed.

:::tip[Key Takeaway]

To report a reproducible bug, enter the exact sequence of operations needed to reproduce the faulty behavior.  Start from a unambiguous starting point, and report every mouse click necessary to cause the problem to happen.

:::

## The Perfect Bug Report

**(1)** include a clear starting point.  For web based UI, you can usually specify a URL as the starting point so that the developer can enter that URL in to get to the beginning position.  If you are running an app or installed software, it is usually best to start by launching the software.  The starting point must be a place that everyone can get to without fail.

**(2)** include specific details about the configuration of the system you are using.  Different people logged in as different users will often see different behaviors.  You need to include details about:

* what browser are you using?
* what computer / phone / tablet are you using and what version of the operating system?
* what extra devices are attached?  How are you connected to the network?
* What user id are you logged in as?
* If the problem involves a document or file, include the file in question.
* Is there anything else that might be relevant to the software in question?

**(3)** include step by step instructions of exactly what you need to do to cause the problem to happen.  If you need to click on a button, state exactly which button must be clicked on.  If you need to enter a value, specify exactly which value must be entered, every letter exactly.  If you need to press a key, state exactly which key.

**(4)** when the step by step instructions reach the point where the software misbehaves, state exactly what you expect it do to, and then describe what it actually does, and how that is different.  Include a screen shot if possible showing the wrong behavior.

Before you file the bug report, follow the instructions that you have written, and be sure that it reproduces the incorrect behavior.  The developer must be able to do the same.  If the developer is successful in seeing the errant behavior, there is a good likelihood that it can be fixed.  Or alternately, fix the documentation describing what is supposed to happen in that situation.

## Make it Reproducible

The person reporting the bug want to get the problem fixed.  The developer want to know what the problem is, so it can be fixed.  A bad bug report just wastes everyone's time.

A good bug report is **reproducible**.  That means, from the bug report **anyone** can follow the instructions, and see the problem.  Just seeing something happen once is not good enough.  the bug report should be complete enough that anyone following the instructions will reliably see the problem happen.

So create the bug report, and then follow the instructions one last time to make sure that the bug is reproducible.  If it does not happen, then improve the report until you have a description that makes it reliably happen.

The hardest thing is to include all the details of your own specific software / environment configuration.  The developer, working on a different instance of the software, might have a difference that prevents the problem.  Try to include all the details you can think of that might be relevant.  Still, if _you_ can make it happen reliably, that is sometimes enough to investigate.

More important, once the bug is fixed, following the instructions will demonstrated that the bad behavior no longer exists.

## Why Go to This Trouble?

One of the biggest frustrations for the developers is when a bug report contains vague, unclear descriptions of the problem to be solved.  Examples include descriptions of problems like this:

* nothing works
* I tried to edit and I couldn't
* the screen is wrong
* I can't delete anything
* email does not work

What is missing from all of these is a description of _how_ the error is caused.  Software almost always includes many different ways to do the same thing.  The bug might appear only on one specific way.  Or, the problem might depend on specific data that the user entered. There might be a dozen ways to send email, and the email might only fail for one particular addressee.  These details are critical for finding the problem.

When a developer sees a vague message like "email does not work" the developer will attempt to send an email one way.  If that wya to send email works, then the bug report is _thrown away_, because it is obviously _incorrect_.  In reality there might be a very specific situation required.  For the user, that might be every way they have tried, but that does not mean they tried the way that the developer did.

We see this all the time.  For example the bug report might say "Impossible to enter name".  So the developer enters the name "John" without problem, and the bug report is thrown away.  It might be that the bug involved entering the name "O'Reilly" (notice the punctuation in the name -- this is a real problem I once encountered) and so the detail of exactly what name was being entered is important.

The report can not just say "Do this operation they way that I usually do it" because the developer might usually do it a different way.  The developer does not know your personal patterns.  Instead, you need to make a specific list of exactly what UI operations you do to reproduce the bug, and don't _assume_ that the developers runs things in the way that you do.

## What if You Can't Reproduce the Bug?

A lot of time you will see something happen, but when you try, you can't make it happen again.  Should you file a bug report?

The answer depends on the nature of the bug.  If something very critical happened, for example an important file was deleted, or the entire system was restarted, you might want to report anyway just to let the developer know that "something" happened.  You don't know exactly what.  Include whatever details you have (what exact screen, what document, what position, what were you doing, etc)  There are some elusive critical bugs that need to be reported from multiple angles in order to find them.

If the bug is not critical and you can not reproduce, it is possible that you make a mistake.  Or that the combination of factors will never happen again.  In this situation it is probably better to remain silent about it than to appear foolish.  Keep your eyes open.  Try for some minutes to try and make it happen again.  But if you can't, then don't waste everyone's time with a frivolous report.

## Summary

Don't file a vague report without a precise sequence of steps to reproduce the bug.

Don't assume that everyone uses the software exactly the way you do, or that there is only one way to do a particular thing.

Don't assume that because you saw it happen once, that it always in every situation does that same thing.

You don't want your report to be _thrown away_, so provide all the evidence necessary to prove that the bug exists, by including all the details to make it happen reliably.