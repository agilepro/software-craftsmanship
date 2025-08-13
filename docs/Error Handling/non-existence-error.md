---
  tags:
  - Coding
  - "Null"
  - Error Handling
  - Exceptions
---
#  Null vs. Error?

You call a method to retrieve information about an object with a  particular ID, but the record does not exist.  Is this an exception?   Or not?  It is hard to answer.

## The Situation

Imagine you have a set of users who can be registered in a system.  Each user has an ID.  There is a method to get the user profile for the user, and you pass the ID and get the profile back.  What if the user does not exist in the system.  Do you throw an exception?  Or do you return null? 

Imagine you have a list houses for sale, and they are all indexed by their street address.  A method returns the information about the sale.  If called with an address, and the record of the sale does not exist, should the method throw an exception?  Or just return a null?

## Usage

If the method can return null, then the burden falls on the calling routine to check for null.  If it is inconceivable that you can ever do anything with a null value, then it seems pointless to ever return null.  The key lies in that word: inconceivable. 

If you are making an application where users manage their bank accounts.  The client GUI is calling back to the server for details on particular accounts from a list of accounts retrieved a few seconds earlier, then it is pretty much inconceivable that a request for a missing account is a legitimate request.  The list of accounts will not change typically across the few minutes that the users is using the GUI.  So any request for an account that does not exist is exceptional and warrants an exception.  The exception will reset the application to some sort of initial state, because the exception is so rare there is little utility in designing a more elaborate response. 

However, if the request is coming from an external partner, who might have accounts listed in association with a title escrow, then it is possible that the account might have disappeared in the days or months that the escrow was in operation.  In this case, the program may need to design a more elaborate handling of accounts that disappeared.  It would want to capture this information, and store the fact that the account number did not work.  This is not an exception, per se. 

The rule should be: exception should be used only when the situation is exceptional.  That means, the exception is unexpected.  If the calling program is prepared and anticipates this error, then the exception object should not be thrown. 

Catch and Continue: What you really want to avoid is forcing a calling program to catch and continue.  It is marginally acceptable to do that, but exceptions sometimes cause code in the middle to roll back transactions.  Exceptions really should be exceptional and should not be used for returning values.

## Offering Both Options

In many situation I find it convenient to offer both.   imagine a method to get information about a bank account.   One version (getAccountOrNull) return a null if passed an account number that is not in the system anywhere. Another version (getAccountOrFail) will throw an exception when the account does not exist.  The advantage of having a method that throws an exception, is that the exception will be uniform and consistent.  You get better quality exceptions in this case. 

Offering both options allows the caller to decide whether they are willing to handle the null or not.  We have put in place the naming standard “OrFail” and “OrNull” to tell whether the caller needs to expect a null back or not.  In actual practice, fi one of the options is far more likely to be common, then one of these qualifiers is used, and the opposite form simply has no qualifier.  Thus you might have “getAccount” and “getAccountOrFail” as the two options.

## Not Always That Luxury

You don't always have the option to offer two methods.   Which do you implement?  How confident are you that request for non existent will be a failure of the calling code. 

Example: login session.  A request to the server will use a session id, and the code will ask to look up the session details.  If the session does not exist, then there is literally nothing else the code can to.  There is no point in keeping track of a session id. There is nothing that can be done with it ever in the future.  And there is really no point in handling anything further . . . the session is gone and you need to reestablish a new session. 

Example: users in a group.  A user id is a persistent thing.  A user id might be stored any number of places.  Users can leave the system, and you need to be able handle requests on users that do not exist.  In this case, returning null or having both options would make sense.

## Conclusion

It is a tough choice.  Instead of trying to decide which approach is better, consider offering both, and then see if there is a good reason to eliminate one.  
 

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [errors](https://agiletribe.purplehillsbooks.com/tag/errors/), [exceptions](https://agiletribe.purplehillsbooks.com/tag/exceptions/), [null](https://agiletribe.purplehillsbooks.com/tag/null/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2017/06/29/is-non-existence-an-error/ "Permalink to Is Non-existence an Error?").