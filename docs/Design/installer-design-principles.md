#  Installer Design Principles

Software needs to be installed.  This has been a large pain point in many of the software products I have seen. Proper installer design can make a huge difference in the supportability of a product. 

The installer is used only once by a user.  Actually it is likely to be used more than once, but the designers conceptually think of it being used only once, by a special person, and then the product itself is used by many people.  Since installation is such a small part of the overall use, it is often given a small part of the consideration during design.  It ends up taking more than a small part of development, but is generally perceived that any time spent on the installer is wasted.  

Extremely poorly written installers can cause huge support headaches.  It makes sense to spend a little time during design to get the installer correct, so that the first experience that a user has with a piece of software is good.  After a good install, they are much more predisposed to have a good experience with the product itself.

Here are a set of installer design principles that can be used to help guide the design of a specific installer.  

1. Don't clutter the manual with things that they might need, instead use software to detect a problem, and tell them only when there is a problem.  Use the error reporting system as a manual that appears when you need it. 

2. make sure that all settings are needed.  Eliminate unnecessary settings.  

3. Less configuration up front, simplify installer.  Move as much configuration to the run-time product as possible.

4. avoid doing things in installer, when they are also have UI for setting during administration. Just do it one place: administrate at run time.  

5. DB initialize and upgrade should be part of the server itself. Should generate SQL scripts for users.  

6. Do not require running anything on DB host.  Only use the standard DB API to talk to the DB.  Don't make assumptions about the location or structure of the installed database.  

7. Don't force the user to re-enter values that have already been entered.  

8. Don't break a URL into separate pieces, and prompt for the separate pieces.  Just prompt for the complete URL and do not require people to understand the meaning of the parts of a URL.

9. User should be able to test setting immediately to know that they are not creating a problem for later. 

10. System should define and control all configuration input, and all log output.  Don't depend upon separate configuration settings, or be effected by other, separate configuration files.

11. keep the number of modes of server to minimum, default new installations to single mode. 

12. Require only the bare minimum for the server to run. Server itself should offer config options in Admin console. 

13. don't ask the user to do something that can easily be automated with a little programming.  

14. System should avoid unnecessary correlations between configuration values and settings.  Don't require the same value to be entered in three separate places in slightly different ways.  

15. We should not be wasting manual space teaching people how to use external technology.  Refer them to the proper external resource. 

16. make entry points as basic as possible. Don't force people to remember/type long complicated addresses. 

17. URLs should be treated as opaque values  

18. design systems to work together with users needing only a single unified ID.  Don't require several different user IDs, in various parts of the system, to be set up for a single user.  

19. all settings should have a test if possible.  A manual test while configuring the value, and for critical values a test when the system starts. 

20. make manuals consistent with installation process. 

21. don't use the manual to fix poorly implemented software.  Fix the software first.  

This list was created by reviewing existing products, and finding violations to the rules, and attempting to write a rule that would have prevented that problem.  There was a much longer presentation that detailed how these primciples were violated.  I have not yet figured out how to convert that to a form suitable for presentation here.  But, if there is demand, more details could be included.

This entry was posted in [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [administration](https://agiletribe.purplehillsbooks.com/tag/administration/), [configuration](https://agiletribe.purplehillsbooks.com/tag/configuration/), [installer](https://agiletribe.purplehillsbooks.com/tag/installer/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/01/05/installer-design-principles/ "Permalink to Installer Design Principles").