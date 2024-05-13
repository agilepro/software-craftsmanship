#  SSO: What is it?

Single Sign On (SSO) is a term that is used and abused in the industry.  Most of us think we know what it means — and most of us do, but still many of us have a slightly different and occasionally incorrect interpretation.  There are some side issues and assumptions.  This is an exploration around what must be included in a SSO framework.

## Definitions of SSO

**Wikipedia:** a user logs in once and gains access to all systems without being prompted to log in again at each of them.  
**Tech Target:** Single sign-on (SSO) is a session/user authentication process that permits a user to enter one name and password in order to access multiple applications. The process authenticates the user for all the applications they have been given rights to and eliminates further prompts when they switch applications during a particular session.  
**Open Group:**  Single sign-on (SSO) is mechanism whereby a single action of user authentication and authorization can permit a user to access all computers and systems where he has access permission, without the need to enter multiple passwords.  
**Authentication World (!):** Single Sign On (SSO) (also known as Enterprise Single Sign On or “ESSO”) is the ability for a user to enter the same id and password to logon to multiple applications within an enterprise.  
**IBM Developer World:** SSO, the ability to log in once and be authenticated to all your network resources.  
**Atlassian:** Single sign-on support means users authenticate once and are automatically logged in to everything.

## Advantages / Benefits

*   Reducing password fatigue from different user name and password combinations
*   Reducing time spent re-entering passwords for the same identity
*   Reducing IT costs due to lower number of IT help desk calls about passwords
*   Reduces human error, a major component of systems failure and is therefore highly desirable but difficult to implement.
*   Enforce uniform enterprise authentication and/or authorization policies across the enterprise
*   End to end user audit sessions to improve security reporting and auditing
*   Reduce need for developers to understand and implement identity security in their applications

## Not Just ID Management

Most sources agree that SSO means that the user “logs in once, and accesses many applications”.  Note that the critical action is “logging in”.  It is the action of logging in that must be done once. 

Note that Authentication World above gets it wrong!  Instead of talking about a single login action, they talk about simply a unified identity:  “enter the same id and password to logon to multiple applications”.  This would imply that you are still logging in many times, you just have a unified identity.  This is not single sign on.  This misunderstanding is probably the single biggest misunderstanding about SSO.  Many IT people believe that SSO means simply that you can use a consistent ID/password in all applications.  That is actually just centralized (or distributed/federated) ID management.  You can have centralized ID management by using a corporate LDAP directory server, and configuring applications to use LDAP authentication.  Most experts agree that simply using the same ID in multiple applications does not meet the requirements of SSO.  To be SSO, you must only be prompted to log in once.

## OpenID

In the HTTP/Web world, OpenID is an open protocol for SSO.  It allows one application to defer login to another service called an OpenID Provider.  The user actually logs into the OpenID Provider, but then the protocol proves to the original application that the user actually did so.  Elswhere I have written about OpenID:  [Web 2.1: How OpenID will rescue Web 2.0](http://social-biz.org/2008/06/15/web-21-how-openid-will-rescue-web-20/),  [How Not to use OpenID](http://social-biz.org/2008/07/26/how-not-to-use-openid/), and [SSO Much Fun: Identity Update](http://social-biz.org/2012/05/26/sso-much-fun-identity-update/).

## Adapting Legacy Systems to SSO

There are some challenges when adapting existing software to use SSO.

*   **Letting Go:** Many applications are oriented around the “login prompt” and they have to redesigned to let another (remote) service do the log in.  Instead of controlling the login state of the user, they need to be rewritten to be more “event oriented” and to receive the login state, and react appropriately.  This is not difficult.
*   **Global ID:** Many applications control their own list of users. Allowing a person to use an application is accomplished through the action of “adding a user” with a specific name and password.  Of course, SSO is designed to eliminate all these different usernames and passwords that a person must maintain.  This means that the application needs to “accept” an ID from outside of itself.  That may require an extension to the records that it keeps on each user.
*   **Profiles:** You may be able to eliminate application specific IDs, but that does not mean that you eliminate application specific profiles for each user. The application still has to maintain a list of users, and still needs to record information about that user.  Many developers see this “user profile record” as being conceptually the same as a user identity.  But when moving to SSO, you must separate the concept of a profile from the identity.
*   **Changing IDs:** Since the profile and identity are separate concepts, you need now to worry about how to handle the situation when a user changes their identity.  In reality this is no more tricky than the situation when a user changes their email address, but for applications that consider the identity to be the key value to access information about the user, there needs to be a redesign to allow that key to change.
*   **Multiple IDs:** Like changing identity, there can be periods of time where a user has multiple identities in use at the same time.  If you system is properly designed this is not a problem, but once again some legacy systems are designed specifically around this being impossible, and complications can arise.
*   **Users without Access:** This is also a tricky change.  Many legacy systems were designed with the idea that giving access to the system was the act of creating a user id.  It is impossible for a user id to exist for someone who has not been allowed access.  Thus, having a user id is the same thing as being allowed access: authentication and authorization are the same thing.  However, in a SSO environment, people will have user ids long before they might be allowed access. The application need to be prepared to receive visits from authenticated users who are not authorized.  This is not complicated … the application still has a user profile on all users, and the application just tracks authorization in this profile.  The administrator (or some other mechanism) needs to give the user authorization only when it is warranted.  But this is different than simply being authenticated.

## What does not count as SSO?

The point of single sign on is to provide a single point to access all applications. Using a SSO protocol to access an identity that is unique to that application, is not SSO.  

If you have 20 applications  an each application shares an identity with one other, so that you have only 10 identities for each user, you have not achieved SSO!  You have simplified your environment, but the real goal is to allow a user to use a single identity for all their things.  

If you are developing 3 applications, and you allow for SSO access to those three with an ID specific to those three, while the user is using dozens of other applications, then you have not achieved SSO.  You may have reduced the number of usernames and passwords, but this does not really address the problem.  

It is clear: SSO does not simply mean you use an SSO mechanism, but you must also allow a user to use a Global ID when logging in.  

OpenID allows a way for a user to bring their own ID to any application.  To allow the user to really log in once, and access all applications, those applications must be written to accept the ID that the user brings!  The application needs to let go of control of the ID, and accept whatever ID the user wants to use. In today’s hyper connected overlapped world, no single authority can hope to enforce a consistent ID on all users of all applications.  And there is no need to enforce a centralized ID system. All you really want is for a user to be able to prove they are who they say they are — the form of the ID should not matter.

## The Surprising Conclusion:

:::tip[Key Takeaway]

In today’s hyper connected world, to implement SSO, the application **must** allow the user to bring their own ID to the application, and to use whatever ID they bring.  Otherwise, you fail to provide “single sign on”.

:::


This entry was posted in [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [design](https://agiletribe.purplehillsbooks.com/tag/design/), [OpenID](https://agiletribe.purplehillsbooks.com/tag/openid/), [security](https://agiletribe.purplehillsbooks.com/tag/security/), [SSO](https://agiletribe.purplehillsbooks.com/tag/sso/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/12/01/sso-what-is-it/ "Permalink to SSO: What is it?").