#  Email Address IS your ID

Some sites still require a “user id” which is separate from your email address.  Why?  

It seems mostly an anachronistic habit.  Sites that allow you to create an account, or even sites that require an administrator to create an account for you, used to always be centered around a unique identifier called a “user id”.  There were generally some restrictions on the form.  Early systems required that the identifier be no more than 8 characters, and consist only of letters and numerals.  Some had to be case independent, meaning that it did not matter whether you typed upper or lower case letters, the identifier matched either way.  Some systems used these identifiers in special ways, for example as a name of a file that stored information about that user.  

When you start using many sites, you run into the problem that your preferred user id is already take by someone else.  Such userid collisions are increasingly common, but are completely unnecessary.  The only point for a “userid” is to provide a unique identifier for that user at that site.  

For the past 15 yours, everyone online has an email address.  Often, your newly created account requires an email address, at least so that it can send you an email to reset your password.  

We know that your email address is unique.  Because I receive email, I know that nobody else in the world has my email address.  The system can (and should) prove that I own the email address by sending an email message to it.  Given that it is unique, all uses can be identified by their email address.  So why have another unique quantity called a user id?   If the purpose is to uniquely identify the user, the email address does that perfectly.  

Reasons that programmers give for not using an email address as an id:

*   **Email addresses can be long.**  Yes, longer than an 8 character ID for sure, but we no longer need to conserve that kind of space. Email addresses typically run 20 to 30 characters, and a long one around 40.  The real limit on email address size is how long they can be before people reject the idea of typing or copying such a long value.  The email addresses of all the users of Facebook take up less than $1 of diskspace, so spending a moment trying to save that space is pointless.
*   **Program needs a simpler, shorter identifier:** Sometimes a program needs  a simpler key value to associated all the information with that user.  Long key values can be wasteful.  If you need a key value, create one internally (a simple integer will do) and associate it with the user id, but don’t force the user to be your hashtable.  Given the email address (friendly to the user) you look up the internal key (friendly to the program) and you are done.  There is no need to force the user to remember that internal key.
*   **Email addresses contain @ sign and other characters**. Yes it does, and you should allow any character in the unicode set.  Don’t confuse the requirement that a user enter a unique id, with the requirement for an internal key value.   Allow the email address to have any value that works as an email address, and then find your internal key value from a lookup table.
*   **I want lots of accounts for one email address.** Obviously you are a tester and not a real user.  Set up a mail server and create a lot of email addresses.  Most people of a site need only one or two accounts, and have email addresses readily available for use for that.
*   **We don’t want to expose email addresses.**  You don’t need to expose the unique identifier of a user.  The purpose is to allow the user to enter it and be uniquely identified.  Whether your application displays this to others is a completely different, and unrelated decision.
*   **People expect a user id.**  Possibly, if they are over 60 years old, but the population is readily being replaced with those ‘young-uns’.  When you ask for an email address I have found that all users are never confused by that.

Here is a list of guidelines:

*   Identify users with their unique email address
*   Test that the email address works so you know they own it.
*   If you need an internal key that is smaller and simpler, create that on demand, but don’t bother the user with that value.  They don’t need to know it.
*   When logging in, if they fail to provide the right password, offer a password reset capability through email.  Don’t change the password until you have proof that they have received the email message.
*   When logging in, if there is no user with that email address, offer to register them.  Don’t create any account until you have proof that they received the email message.
*   Don’t display the email address for users on the screen or in the links.

The result: you never need to bother users to learn a new ID. You never need to report that that ID is already taken.  You don’t need a function testing and reporting if an ID if available.  You don’t need a “send me the user id for this email address” function, because the user id is the email address.  All this makes it easier for the user, and for the programmer.  It is a win all the way around.

This entry was posted in [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/12/08/email-address-is-your-id/ "Permalink to Email Address IS your ID").