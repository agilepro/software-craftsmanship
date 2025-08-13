#  Improving the Code through Installation Manual Analysis

What can you learn from your install manual that can make your product better?  Below I outline a technique to work through an existing installation manual, and methodically find clues on how to make a software product better.

## Setting

First, you need to understand that I work with some very backward teams that insist on using the waterfall method for developing software.  This means that they do not have a set of tests that are automated to run on every build that verifies that the checked in code is still good.  Without these tests, they live in fear that a small change the code might break everything.  

The result of this is that when a particular exceptional situation is encountered, instead of changing the code to handle it they put instructions in the installation manual asking the user to avoid the situation.  When I say that the code should be changed to handle it, there are a couple of possibilities: the code might be changed to understand and treat the exceptional situation differently in order to successfully perform what needs to be done.  In other cases, the code should simply test for this situation, and give a clear warning that it can not work in that situation.  Either way, it is better than filling the manual with descriptions of situation that might or might not pertain to the user.

## Procedure

It is a bit like a code review.  What you do is simply go through the installation manual line-by-line, and on every sentence to ask two simple questions: 

**(1) Why is this sentence in the manual?**   

**(2) How can we eliminate this sentence from the manual?”**  

Some of the sentences are clearly necessary, and to those sentences there is usually a very clear reason: the user needs this instruction, the instruction is necessary for the product, and there is no way to eliminate this from the product or the install.  Every sentence in the installation manual is a “cost” in terms of taxation on the user when the install is being performed, and while there is no strict accounting of that cost, if ti gets too high the user goes away with a bad impression.  You should be able to find a clear and unambiguous reason for every sentence in the manual.  

In the case of the team in question, many sentences had little or no purpose, or the purpose could be eliminated.  We find that we can eliminate those lines in the manual, and the lines fall into one or more the following conditions:  

1. **The line is meaningless.**  This is just poor writing.  There are a lot of sentences that don't actually say anything that the reader does not already know.  What are the assumptions we can make about what the reader knows? These lines can simply be deleted:  a shorter manual is easier to read and that makes install easier.  (example sentences are self-referential sentences that add no value, like “The admin commands section contains the commands for admin.”)  

*2. *Manual steps that are unnecessary and can be eliminated.**  Instead of asking the user to copy a file from one location into the file structure, just put the file there in the first place.  Having a unix and a windows version of a text file is an unnecessary complication that can be eliminated.  

3. **Manual steps that could be automated.**  Write a program to do the work, and then you don't need to document and bother the user.  

4. **Warnings of special conditions that could be automated.**  For example, WebLogic does not work correctly with a specific version of Java when a specific database JDBC driver is used.  Instead of putting this in the manual, test for this situation in the code, and produce a detailed warning ONLY if it is encountered.  

5. **Instructions about other products that are unnecessary**: for example, there is a lot of text in the manual on how to set up Active Directory.  We can assume that if the customer has Active Directory, then they have someone who knows how to use it.  Our instructions are likely to not match their version, and we run the risk of instructing incorrectly.  

6. **Special restrictions on external that can be eliminated.**  One of the reasons we have instructions on how to use other systems (#5) is that we have restrictions preventing us from using those systems under all conditions.  Work on the product and eliminate those special restrictions.  For example there used to be a restriction that Java could not be installed into a folder with a space in it.  The instruction is still in the manual, although I doubt there is any need any more for the restriction.  

7. **Special restrictions that can be tested an automated.**  Instead of burdening the user to check that a particular condition is true, we should automate a small test, and verify that it is true.  If not, we should produce a detailed message that explains the problem that needs to be fixed.  For example DB character sets: we will always require a particular character capability.  Design a small test that checks the database, and then produce a detailed message only when it fails. 

8. **Unnecessary parts of our product that can be eliminated.**  We have a script for starting and stopping the server.  Yet EVERY app server has a well defined and robust way to start and stop applications that are installed.  The user who chose WebLogic will already know how to use WebLogic to start and stop the server.  Let then use this native app server capability, than building our own “extras” that we have to explain to people how to use.  There is effort to test this and maintain this, so there is waste in the development team that can be eliminated as well. 

9. **Information on extremely rare situations**: some customer in the past needed a very particular configuration that was difficult, and so this got written up and included in the manual.  If, it is unlikely that any customer in the future will need these instructions, then it is just cluttering up the manual.  This special configuration should be written up as a knowledge base article and placed on the web site.  It is OK to have a brief mention, but the reader should be referred to the web site, and the entire thing should not be included here. Shorter manuals are easier to read, making the software easier to install.  

10. **Things that are being done during install that should be done when the server starts up**.  For example, DB initialization, which really should be handled by the server when it starts up, and not by some scripts.  Consider “Iterable”.  The basic install is NOT iterable.  That is, it can be done only once.  Regular configuration settings might need to be done once, and then later again when the environment changes.  Thus configuration needs to be able to be done multiple times, while the basic install is done exactly once.  When we do things during install that need to be done again, they should NOT be part of the BAT or SH scripts that can be run only once.  (This should be obvious, so if it is not, please think about it.)

## Conclusions

**Caution:** the installation manual exposes only part of the difficulty of install, so we won't find all the problems this way, but it is a good place to start.  
Because this team had a habit of writing up manual procedures for the user, to avoid limitations in the code, the manual itself was a mine of valuable suggestions on how to make the code more robust and secure.  Needless manual steps are eliminated, unnecessary parts of the product are eliminated, and conditions are built into the code to test for, and in some cases accommodate exceptional situations.