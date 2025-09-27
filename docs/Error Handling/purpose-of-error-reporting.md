#  The Purpose of Error Reporting

Error messages are part of every user experience, but too often these messages are poor, cryptic, and insulting.   Too often programmers do a half-hearted attempt at writing error messages, mostly because they mistakenly assume that users will never see them.  Too often programmers misunderstand the potential that results from writing correct error message.  Error messages can be the key to usability.  Error messages can help train users, and guide administrator.  All you have to do is understand the _purpose_ of error reporting.

:::tip [Key Takeaway]

The purpose of error reporting is to help users or administrators to resolve the problems that the system encounters, either by helping to train the user to avoid mistakes, or to help the administrator to get the system properly implemented.

:::

A "mistake" might be any aspect of a request that can not be handled, whether reasonable or not, and whether intentional or not.  "Implemented" might involve changing configuration settings, changing the design, or fixing bugs in the code.

## Reducing cost, and improving friendliness

Support costs can sink a product faster anything else. All of the most successful products are there because the cost to support them is far less than the price of the product. The most important element in reducing support costs, is to provide a means that users can solve the problems themselves. To do this, we need accurate information about a problem that needs attending to.  

Too often error messages are not meaningful to users. Cryptic and incomplete, they serve only to cause the user to call support. If it is inconvenient to call support, the user just gets angry. If there is a real error that is preventing the user from using the product, and if support is not instantly available, then the user incurs a real cost of work loss. This experience, more than any other, is the reason that people stop using a particular product.

## It is about Problem Resolution

The purpose of error reporting is then help solve the problem that caused the error. Users might solve the problem themselves, or they might pass the error report on to the support department. The contents of the error should:

1.  clearly explain the problem that the program experienced, and
2.  be complete enough that upon delivery to the support department they have the information they need.

If the error message does not include enough information to solve the problem, _then it has failed_.  

A “problem” is simply a situation that the program is not able to handle.  The program was designed to handle a wide variety of normal, expected situations.  Anything that falls outside of these normal situations is a problem.  Anything outside of the normal path is an exception.  

This matches nicely with the programming concept of an _Exception_ which is a programming language feature that not only stops the program operation, but also carries a message.  The exception is the right mechanism to communicate error reports to the user.

## Sources of Exceptions

There are three main sources of exceptions

1.  configuration errors with settings not quite matching the environment
2.  users operating contrary to planned behavior
3.  actual program logic errors within the program

Lets assume that the last category, program logic errors, is mostly eliminated by good development practices.  These are the kinds of exceptions that one strives to completely eliminate, and most mature software has very few of these in production situations.  

Users make errors when their internal model of how the program works is incorrect.  They make the 'wrong' action because they think it is the 'right' action.  This might be the fault of the program because the user interface does not represent the model in a clear way to the user.  Or it might be simply that the user is too new and inexperienced to have learned the way the program works.  Either way, this user is in need of help to understand why the operation they did does not work, and the best option they should have used.  

Improper configuration is similar.  The incorrect configuration setting might be a mistake by the administrator, or it might be a result of an unexpected change in the operating environment.  Either way, information and guidance is needed.  Cryptic, incomplete, or accusatory statements are not useful.  Regardless of whether it is the production user or the administrator that ultimately makes use of the information, the the first priority is for the program to produce a clear statement of why the current situation was an exception.

## Recognizing Your Limitations

Ideally, we would like to produce a message that tells the operator exactly what to do at this point to recover from the problem.  Sometimes this can be accomplished, but usually that is exceedingly difficult.  

For example, the program may be trying to contact another server, and that attempt fails.  Here are potential things that a person must do to remedy the situation:

*   Perhaps the address was specified incorrect, you might want to say “Specify the correct server address”
*   Perhaps the remote server was shut down, you might want to say “Turn the remote server on”
*   Perhaps the network cable was pulled out, you might want to say “Plug the network cable back in”
*   “Change the firewall configuration that is blocking the connection locally”
*   “Change the firewall configuration on the remote machine”
*   “Repair the broken network interface card”
*   “Correct the DNS server setting so that the address can be resolved”
*   “Reduce the load on the remote server that is causing unacceptable response times”
*   “etc.”

Clearly, we would like to tell the user/administrator exactly what to do to resolve the problem, but this is generally not possible.  Distinguishing between these reasons would require extra sensory information that the program simply does not have access to.  

It can be misleading to jump to the conclusion on any one of these.  For example, the programmer might think that a failure to connect is always because the administrator specified the wrong value, and send a message to “Enter the correct server address.”   That works fine if that is the problem, but imagine what this is like when the real problem is the firewall configuration.  The administrator has actually specified the right address, but the program is saying that it isn't.  That makes the program look foolish, but even worse, it insults the administrator implying that they are not very reliable about setting such values.  

The program simply does not have enough information to determine the cause of the problem, and should therefor should avoid making an _unjustified_ recommendation.  Instead it should stick to what it does know:

*   the remote server could not be successfully contacted
*   the parameters values it used to attempt contact
*   the parameter names that are expected to hold these values
*   possibly an error message returned from the networking system
*   the purpose for which it was attempting to contact the server

Given this accurate information, there is a good chance that the user/administrator will be able to solve the problem.  The goal of the error message should simply be to include as much of this as possible into a single package. Accurate and friendly error reporting is critical to assuring that a person can solve the problem, and ultimately like a product.

## Verbose Log Files

One trap that system designers fall into is misuse of a log file.  The program dumps lot of status information into a log file in the hope that if something goes wrong the right information will be there to solve a problem.  The log files tend to be huge, even when the server is operating correctly.  If there is a problem, it is quite difficult to sort out what it is related to this problem, and what is not.  

When the system is running well, there should be very little activity in the log.  Yet, when a problem occurs, the user/administrator need lots of information.  The more known about the problem that occurred the better.  The solution is obvious: when you encounter a problem, generate lots of information about the status of the program _at that time_. The more information about the program status that you generate at that time, the better chance of solving the problem.  Don't make the user/administrator hunt and search for the information, but try to gather everything relevant and present it.  

Some programmers worry that they are providing too much information when a problem occurs.  In the example above, in the case where the network cable is pulled out, there is no need to supply the configuration parameter name.  However, sometimes that is needed, and the program does not know when it is needed and when it is not.  The guideline is simple: if there is a problem with the server, people need as much information as possible.  If one bit of that information helps solve the problem, the result is a happy customer.  Leaving information out that causes the problem to persist for hours or days.

## Exceptions are for People (Too)

An exception is thrown by a routine that is unable to accomplish its job. This exception also carries a message with it.  An effective program will use that moment to fill in all the additional information that the user may not have known, and may need to know to solve the problem.  

All of that information about the program status at the time of the problem should be put into the exception message.  In an upcoming post I will talk about how to do this.  At the top level, the information in the exception message should be not only reported to the user, but also should be written into the log as a record of all problems that occurred.  The exception object itself become the mechanism for communicating to the user/administrator.  

The log file might be acceptable for the administrator, but the regular user has no access to the log file.  Just as it is impossible for the program to know the cause of an error, it is impossible for the program to know whether this information is useful to the production user or not.  It might be.  In many cases, the exception reported from deep in the system might be because the user just typed something wrong.  A system that hides this information from the user, continuing _as if nothing happened_, does not allow the user to learn from actions.  

In a way, you can think of the error message as replacing part of the user manual.  Rather than forcing the user to memorize a long tedious manual, if the error message contains that information, it can be presented at the time that problem occurs.  Instead of having to look up which config parameters are relevant, if the error message itself lists the parameter names and values, then the problem resolution is immediately started in the right direction.

## Summary

*   Properly functioning systems should be quiet, without a lot of distracting status output
*   When a problem occurs, the program should gather and report as much as it can about what it was doing, and why it was doing it. Be verbose only when problems occur.
*   This information should be gathered and reported using an Exception object which is thrown to also stop the normal program execution.
*   The error message should speak to users, as well as being permanently recorded in the log file.
*   Error messages are not things to be hidden, but instead things that help guide people to learn and to resolve problems.
*   Good error messages can supplement the manual, and reduce the need for the user to memorize details about the inner workings of the product.

The purpose of error reporting is to help users/administrators to resolve the problems that the system encounters, either by helping to train the user to avoid mistakes, or to help the administrator to get the system properly configured.