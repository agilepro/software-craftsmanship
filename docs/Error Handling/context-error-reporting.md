#  Context Error Reporting

One of the biggest mistakes I see programmers make when writing an error message is to forget to include details about the context into the message.  The message effectively “assumes” that the reader knows the context, but that assumption is not always valid, and the error message can fail communicate.

## Error Messages

Briefly remember that the purpose of an error message is to communicate that the program is unable to respond to the user.  The message should include a concise and accurate description of what it was trying to do, and as much as possible about why it is not able to do it. (More detail at: [Exceptions Speak about the Context they are Thrown From](https://agiletribe.purplehillsbooks.com/2013/02/21/exceptions-speak-about-the-context-they-are-thrown-from/).)  

A user might encounter an error message because they _tried_ to do something wrong.  For example, they tried to send an email, but instead of an email address they entered a URL.  Email requires an email address, and the error message should say something like “I can’t send the email because that destination does not look like an email address” and it should include the value that the user supplied.  

A user can also encounter an error message when they are doing the right thing, but do it in the _wrong context_.  Error messages too often fail to anticipate this.  If the error message only reports that the user action is impossible, and it does not include the context that might explain why it is impossible, then the user can be very frustrated.

## User Session is an Important Context

Consider the scenario of an option to “Change a Program Setting” which is reserved for the people who have been given “administrator” status for the program.  Attempt to use this by non-administrator should produce an error message.  The user, Betty, is an administrator, but is borrowing a machine from Charles and did not realize that she is actually logged in as Charles at the moment. 

First consider the worst error message:

```
You don’t have administrator rights and cannot change this setting.
```

The direct claim against the person is impolite, but more importantly it is false:  Betty actually is an administrator of the program.  It is important to remember that the software system does not really know anything about people in the real world, it knows only about user accounts which are used to access it.  It might make a claim about a user account, but it should never make a claim about a person.  Also, this message might be read by many people, particularly if the original user seeks help.  The sentence make a claim about the reader of the sentence, and that obviously can not be valid in all situations. 

A better message is:

```
The logged in user doesn’t have administrator rights and cannot change this setting.
```

This is more polite and more accurate: the program is making a claim about the user account, and this is factually correct.  But the real problem is that Betty did not know that the browser was logged in as Charles.  This error message assumes that the user knows who they are logged in as.  Also, if this message is forwarded to someone else for support, the first question that a support person is going to have is: who were you logged in as?  

Clearly, the program that generated this message “knew” who the user was that was being tested.  It actually checked the access rights of a user Charles.  So why not include that detail in the error message?  
The best message is:

```
User account for “Charles” doesn’t have administrator rights and cannot change setting for “Backup Location.”
```

This message includes the details of the user account that fails to have the privileged, it mentions that administrator privileged is needed, and it includes details on the specific setting that was being set at the time.  This gives Betty what she needs to know, and probably she will address the situation immediately. 

Also, if this message is forwarded to a support person it contains all the relevant things directly in it.  This is the right error message to help the user solve the problem.

## Including Context is not Unreasonable

This is not a contrived example.  In analysis like this, one can always include more information and make an error message better in some estimation.  My point is that the routine that found the problem probably had all this information readily available.  It had to have been looking for the requirements behind setting the “backup location” and it has to know that the user was Charles.  It might be unreasonable to ask the coder to go and fetch a lot of extra information to include in the error message, but certainly in this case ALL THIS CONTEXT is readily at hand in the routine that discovers the problem.  All the programmer has to do is to include the context that is all available and include it into the error message.
 
You can’t estimate exactly what context will be needed to solve the problem.  There will be many error messages that have nothing to do with the user account.  Including user account might be superfluous, but usually the information that is readily at hand in the routine that discovered the problem is usually relevant to the error.

## Summary

Users can make mistakes because they are doing the wrong thing.   They can also make mistakes doing the right thing, in the wrong context.  You error message needs to be useful both for operational error, and context errors.