---
id: appropriate-tech-for-ui
title: Appropriate Technology
---

#  Appropriate Technology for UI

There is general agreement that a Graphical User Interface (GUI) is a superior way to interact with a program, however a GUI is not always the best way.  We need to learn to use “appropriate technology” that is, the right technology at the right situation.

## The Goal was Reasonable

The issue at hand was an Installer, that is a small program that help with the installation and configuration of a piece of software. This can often be complex.  In 2006, a decision was made to make a GUI program that would help with the configuring of the software at install time.  Seemed like a good idea at the time.  Reasons: you can prompt for all the values that are needed, and even be somewhat smart about only displaying what is needed according to earlier answers, and to check values for correctness.  Maybe even offer picklists instead of having to type in the result.

## The Results Varied

What we found instead is that many customers had a problem with the approach:

*   They were installing on servers, and would have preferred an approach that did not require a display screen.
*   Did not want to run such software on certain machines, for example DB servers are kept pristine and no other software allowed to be run on it, even temporarily for configuration of DB.
*   Found it difficult to automate.  The GUI must be run by a person every time, but if you are setting up a couple servers identically you had to manually make sure that everything was typed in the same, instead of using an identical script.
*   Tedious to do a re-install because the GUI forces a live person to have to be there.
*   Difficult to automatically install a build for testing made a barrier to automatic testing of the product after a build.
*   Unable to embed the product installation inside of another install.  Before 2006 all capabilities of the product were always available from an API sot hat another program could always accomplish the actions.  The GUI installer represented a capability that could not be driven by another program, and had to actually be driven by a person.  Furthermore, if the embedding product used different terminology, there was not way to change the GUI to match the terminology of the rest of the combined product.
*   The GUI was much more sensitive to the environment than a command line, and sometimes a given platform could not be certified ONLY because the GUI installer would not run.

Backing off on this, we considered the question: when is it appropriate to use a GUI, and when not?   It was clear that a GUI should be used when supporting are non-technical people.  Business people, who are not programmers, and have little practice with programming techniques, need a UI that hides the complexity, and presents a conceptually more focussed paradigm.  That is clear.  What we failed to realize earlier is that the installation is not being done by a technically illiterate person.  To the contrary, most installation is done by people who are quite accomplished at programming, scripting, configuring systems and server.  These administrators manipulate property files all the time, as well as log files, and all sorts of data files.  Using a text editor is second nature to them.  Furthermore, they understand conceptually how the servers are constructed and what si possible.  They must know this because in order to configure a server, you have to know how all the surrounding technology works, so you can have the right values to configure.

It seems that by providing a GUI, we were attempting to simplify a situation, that by its nature can not be simplified.  

Looking at the resulting GUI, we found it offered little actual help.  Most configuration can be thought of as name/value pairs.  The GUI prevented the possibility of a typographical error in the name of a property.  But it generally did very little to verify the values.  If you entered the wrong server name, or an invalid path, it would simply take the value.  Later, of course, there would be an error, but validating the data in the GUI, one of the requirements of the approach, was not achieved.  

Often, we found the GUI installer was a barrier to getting new settings in the product.  New options would fail to show up, and so the user could not choose them.  The interaction between choices and pages that showed up was complex and bug prone.  People knew what they wanted to set, but the GUI prevented them from doing it.

## Getting Back to the Roots

Several important customers demanded what we called a “Silent Installer” — that is a way to install the product that did not present any GUI nor required attendance by a person.  They wanted to simply put values into a text file, and then have the installer proceed from the command line.

*   They had no problem typing values into a text file.   The administrators doing the install are very familiar with text editors, and had no problem doing this.
*   They wanted the repeatability that comes from specifying the values once, and then using that specification a number of times.
*   In some cases they wanted other programs to generate the set of setup properties, and this was like an API for install.

I was then put into a position of presenting this to the development team.  I said “Let’s get rid of the GUI installer, and go permanently to a command line installer.”  

This was very unpopular.  Why?  Because everyone knows that a GUI is superior to a command line. IT seems like an obvious decrease in quality to return to a command line.  But this is where the idea of “**appropriate technology**” comes in.  The best software has a good fit between the need and the technology used.

## Asking the Wrong Question

Response from product team was “We asked the people in Europe, and they would prefer a GUI for installer, and the people in Japan would as well.”  

If you ask someone “Do you want a GUI?” the answer is always “yes.”  If you ask “do you prefer a GUI” and similarly the answer is yes.  

The problem with these questions is that they do not reflect the tradeoff that is the reality.  It is like asking the question: “would you like to solve global hunger and poverty?”   Why would you ever say “no?”  

Asking an abstract question like “would you prefer a GUI?” does not give an accurate consideration of the alternative.  Most people I have asked have changed their mind once I explain that all the values would be accurately tested and a good error report produced if anything is done incorrectly.  This is like a modern compiler.  Programmers still program with a text editor because that is far easier than a syntax directed GUI.  Typing text is fine, and the compiler finds and reports any problems.  The typing is not a problem.  The normal problem with a command line installer is the assumption that it will blindly install without any feedback, without any testing. 

If you asked the question this way: “Would you like us to focus on improving the GUI for the installer, or improving the GUI for the end user?”  In this case you get a different answer.  There is a limited amount of time to spend on development, but the GUI for end user is VERY important, while a GUI for the install time is nice, but not important.  Most people would agree that we don’t need to make the installer “pretty” we just need to make it reliable.  A reliable, accurate command line would be fine for most administrators.  

This is a problem in general:  if you ask in the abstract “Do you want X?”  Then answer is often “yes” but that is meaningless.   Even the question “Do you prefer X over Y” is meaningless if you don’t include the complete story of what is being traded off.  

The only real way to answer ANY usability question is to let people actually use it.  Our preconception of what you mean by GUI and what you mean by command line can be faulty.  I can make a very poor GUI, and a very nice command line, but your assumption is going to be that a GUI is better than a command line.  If you ask a person which they prefer, without actually showing them, their answer will be based on the assumption that a GUI is better than a command line, and NOT based on the reality of the actual implementation. 

30 years ago, when the Macintosh appeared on the market, most people thought it was a silly toy and would never be used in the office.  People had never used a GUI, and none of the systems in use in the office has a GUI, so they saw no need for it.  Those who believed that the GUI would change the world had to FIGHT for people to accept it.  This is always the case with UI and usability.  You can not \*imagine\* what a changed world will be like, and people will always opt for what they know, over what they don’t know.  Once again, the ONLY way to get an accurate opinion of a usability approach is to implement it, and get people to use it.  Only after real use in real situations will they have an informed decision.  Comments before actually trying it are not reliable.

## Summary

This all seems very arrogant to write this page saying that you should not believe people when they say what they want.   I can easily imagine that readers will think I am just trying to defend my position that a command line installer will be preferred.  It may seem that I just want to discount and ignore the real evidence of people who say they prefer a GUI approach.  

However, time and time again we find that if you ask someone to “predict” whether they will or will not like a particular UI, they are wrong as many times as they are right.  It simply is unreliable to ask this sort of question of a person.  Many studies have shown this.  It may be that they are right — that a GUI approach really is better — or that they are wrong.  But we should NOT use this as input to development course.  Instead, we should implement the new approach, and get people to try it.  Only then will we know the real answer.