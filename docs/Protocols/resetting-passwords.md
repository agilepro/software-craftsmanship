#  Resetting Passwords Correctly

Never send a password through the email. There is never any need to do so. If your program does this for any reason, it is not following the best practice.

## Setting

People need to have passwords (technically: a shared secret) to prove who they are. Manually setting up and managing passwords is an administrative burden, and also potentially a security leak. So you want the ability for a user to request an automated password reset. This way the web site is self-service. Users can get this help at any time of the day without being a pointless drain of administration resources.  

A password reset involves sending a message to the user’s email address to prove that the request came from that person. Whoever responds to that message clearly is the owner of the mailbox.

## The Wrong Way

The wrong way to implement a password reset is to change the password to a new value, and send them the value. Because you should never send a password through the email — multiple people could see it. If someone else has and is using your password, you have no way to know this.  

Some systems send the user name in one email, and the password in another, to reduce the risk when a single email message is lost. This helps a little, but if the attacker knows the user id, this is no help at all in reality.  

The password that was sent is not safe until the user changes their password: you want them to log in with this unsafe password and change the password to something private. However, this approach does not guarantee that they follow through. A lazy user will just leave the password from the email in effect, and anyone with access to that old email will have access to the account.  

Also, there is a denial of service attack: if anyone can request your password to be changed, and that actually does cause your password to change it may cause you to be locked out of the account. Even if the attacker is unable to receive the email message, and unable to gain access to your account, it is a bother for you causing you to have to reset your password again.

## The Right Way

User requests a password reset like normal, but instead of changing the password and sending it to the user, you send a web link with a token in it. The token is associated with the ability to reset a password on a given account only one time. Nothing happens in the account at all, until the web link is accessed from a browser. There is no information in the token, just a long random number that the server can associate with the action of changing a password on a particular account.  

The operation of changing the password happens over a secure socket which guarantees privacy and therefore security. No password is ever present in an email message. Since the only thing they can do is reset the password, there is no possibility that lazy users will fail to do this.  

The token can only be used once, also known as a “nonce.” As soon as it is accessed by the user, the token is discarded and can not be used a second time. This prevents someone from surreptitiously accessing the account. The token might fall into the wrong hands, but they can only reset the password, and the owner of the account will obviously know about that.  

The token can only be used for a period time, like 24 hours (or less). Any token that is not used int hat time can be discarded and forgotten about. If a request times out, the user simply has to request another

## Discussion

The correct way is so simple.  Why implement any other pattern?  

No matter what approach you take, a password reset requires secure access to a mailbox. If someone takes over a user’s mailbox, they can request undesired password resets. Given there always is this danger, sending a token that enables a password reset is superior in many way, and avoids a number of security problems, over sending a new password by email.  

The SSOFI open source identity server implements this protocol for you, so if you are looking for a freely available single sign-on service, consider this option.

This entry was posted in [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2016/03/10/resetting-passwords-the-right-way/ "Permalink to Resetting Passwords the Right Way").