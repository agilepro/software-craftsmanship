---
  title: Insulting the User
---
#  Avoid Insulting the User

Error messages are incredibly important in communicating to the user when something happened that the program was not designed to handle.  Programmers usually write these messages, and there are common pitfalls to avoid. 

The exception message is important to help the user recover from a problem that the program was not anticipating.  The user enters a value.  The program processes that value.  But for some reason, the program made some assumptions around the value that would be given.  Often the programmer knows about these assumptions, and subconsciously always tests the program with appropriate values.  But the user has no understanding of the internals, enters a value that the programmer never dreamed of, and the exception is thrown and displayed.

## Example

Imagine a program that keeps track of user information.  The UI prompts the user for a name.  That name is passed into a subsystem that reads and writes a files with that name.  The subsystem was developed by a programmer who was expecting to be given a valid file name.  A different programmer linked the name entered into the form by the user, and used that name as the name of the file, since that is an easy way to associate them. 

But not all characters are allowed in file names.  Thus it is possible for a user to have a real name that includes characters that can not be used in a file name.  It is rare, and almost never happens.  It is possible that the two programmers involved never though that anyone had such names. 

The programmer writing the subsystem expecting a file name, might then throw an exception like the following:

```
Don't use invalid characters
```

There are many things wrong with this message.

1.  The command tone used this way implies that someone did something and it was their fault.  You can almost imagine this message being appended with the phrase “you idiot.”   The programmer understands perfectly well that some characters are not allowed for file name, but notice that the user who enters the name, has no idea that this is going to be a file name, and no reason to anticipate a problem.
2.  It doesn't tell you what character caused the problem.  How is the user supposed to know which character was found problematic?  It really should include the problematic character.
3.  It doesn't tell what specific characters are not allowed.
4.  It doesn't explain that this is supposed to be a file name, which would allow some users to avoid problem characters.

The biggest problem is that the user is left feeling blamed for a problem that there is was no way for them to know about in advance.  The programmer is thinking that it is entirely obvious that invalid characters are bad, so callers should just get it right before they call.  But it is not the user's fault.  Being blamed for something you had no control over leaves a very bad impression.

## Use Apologetic Tone

When creating an error message, you should use an apologetic tone for one very good reason: if the user is making a mistake, it is because the user does not understand the rules or logic of the system. That is not the fault of the user! It is responsibility of the system to accurately explain the logic of the system to users. A user error then is a mismatch between what the user thinks should be done, and what the system allows to be done.  
While one would never be this wordy, if we spell it all out, your apologetic error message is:

```
I'm sorry that the user interface of this program, your past experience with it, 
or experience with other similar programs, have led you to believe that you 
could take such an action at this time, but you can't because . . .
```

What does that mean to say that an error might be the user's fault? **Users don't go and do things that they know will not work.**  That would just waste their own time. The only reason they do something wrong is because the don't know it won't work. If the user does not know something, isn't it really the fault of the system for not making this transparent? Regardless of how obvious a programmer might think it is, the vast majority of the time a mistake is the fault of the system, so write your error messages in accordance, and you will have happier users.

## Include Details

Include as much information as you can:

*   What test was done?
*   What value failed the test?
*   What values would have been acceptable?
*   Why was it doing the test?

## Write for any Context

The programmer of the subsystem has no way to know what ways their subsystem will be used.  They can not anticipate what situation the ultimate user is actually in.  It is then very bad form to expect the user to understand the context that the code is it — since that may be very far removed from what they are doing. 

It is critical for the programmer to understand this. Do **_not_** assume that the caller will know the context.  The programmer knows this is a file name, but the caller's caller's caller might not.  The error message must explain the context as seen at that point as much as possible.  The subunit deals with files, and there is a problem with the file name, so the error message should say all that if possible.

*   Assume that the caller know exactly nothing about the situation, and explain in the error message as much as possible about what the current method is doing, and what went wrong.

## Summary

It does not take any extra time to write a good error message.  Include the details.  Explain the context. Remember that It is NEVER the user's fault.  Create the message right the first time because you never have time to go back and fix them.   And do all that as politely as you can, because the user might be someone you don't want feeling insulted.