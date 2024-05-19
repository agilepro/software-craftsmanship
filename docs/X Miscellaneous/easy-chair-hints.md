#  EasyChair: Not So Easy

There is a conference management system called [**EasyChair**](https://www.easychair.org/) which many of the academic conferences use to manage the submission to the conference, the reviewing of the submissions, and the selection of the papers to be included.  It is tried and true, but it has one of the worst user interfaces you are likely to ever experience.  This post is the result of my struggle to get it set up for an event.

## Positives

*   It also has a lot of features– the right features for a conference.
*   It has been used for thousands of conferences successfully, so it has what it takes.
*   Lets not forget one overwhelming positive: it is free for non-profit use.

Criticizing a free service makes me seem ungrateful.  Some of the problems are so easy to fix, it is mind boggling why they allow them to remain.  If I was given access to the source then YES I would dedicate the time to fix them.  However, this is a closed system.  Starting from scratch to make a better system is not an option.  My hope here is that by illustrating the problems (1) others may avoid the problems that I ran into, and (2) maybe the producers will address these problems.

## Why is the UI so bad?

EasyChair is a classic example of a system that grew organically with a large group of people who used it in spite of difficulties.  Like an ancient city with thousands of little unnamed streets: the residents know how to get around, so why should anyone put up street signs?  Street signs are useful only for people who are new to the city.  

If you understand exactly how EasyChair works, then you will be able to use it.  If you don’t understand it you won’t.  If you don’t have an accurate mental model already in your head, you will not be able to pick one up from the UI while using it. This UI was not intended to be used by novices.  Experts should only try. What do you do if you are not an expert: hire an expert, or make sure that the same person who did it last year, is involved this year.  

The point of what we call a “good UI” is that it helps to train people who are new.  It is not the system is unusable.  to the contrary, it is quite powerful and quite reliable.  But it simply does not have features in the system that help to train people.  

Why?  Because they charge for helpdesk functionality.  There is an economic disincentive for them to make it easy to use.  They need a difficult, confounding UI so that they can get paid to answer your questions.  Any more questions?

## Recommendations

**Read the Manual** – I spent many frustrating hours trying to figure out the system, but it was never designed to be figured out.  I was searching for documentation, and unable to find it. Click the “help” button and you get a mostly useless page.  The FAQ page was essentially uselessly brief.  However, on the help page is a link called “[**All Articles**](https://www.easychair.org/conferences/help_all.cgi)“.  This leads to 98 articles, some are useful.  As painful as it sounds, your best bet is to sit down and read all of them.  

**Everything configurable** – I wasted many hours trying to figure out how to assign a paper to a committee member, or to submit a review.  It turns out that the ability to assign papers can be turned off, and then it simply is invisible.  There is no indication that the assignment function is turned off, it simply does not exist.  If you turn “assigment enables” on, then a main menu item appears on the top bar.  If you are new to the program, and have no idea that sometimes a button like that appears, you won’t even be looking for an option, in a different part of the program (the config panel) to enable it.  Configuration is available at “**Administration > Configure**”  

**Help on Config Items** – The configuration page looks like a simple two column table with option names on the left, and values on the right.  Click on the option name on the left to get detailed information about that option.  There is no UI indicator that clicking on these will have any effect.  Once again, if you saw someone else use it, you would learn this, and it would be ‘obvious’ but this is as example of the standard problem with the UI: there are no hints or clues for learning what is possible to be done, but however once you are experienced the capability is there.  Similarly, clicking on the value enables a simple UI that appears in place to edit the value.  Again, there is no indication that the value is ‘active’ in this way, but once you know this the UI is easy enough to use.  

**Enable Everything To Start** – As mind boggling at it sounds, the default configuration is with a lot of things turned off.  When they are turned off, you have no idea that they exist.  In order to learn what is possible, got to the configuration panel and enable ALL the options.  It is easy to see how you might want them disabled later when running the conference, but you have to learn about the function, before you know whether you want it or not.

*   **Presubmission of Abstracts** – Turn On to try out ability to send abstract ahead of the paper
*   Submissions Anonymous – Turn OFF for learning/training because otherwise it is hard to discuss what you are seeing.
*   **Non Chairs see non-assigned submissions** – Turn ON while training/learning so that you can navigate around the submissions.  Turn off later when running the conference.  It is very hard to train people when they can’t see anything.
*   **Submission Page is** – set to “open for submissions” otherwise you can try actually making a submission and it is not obvious why you can’t find the option to do so.
*   **Paper Bidding Enabled** – Turn ON.  When you do this you are required to send an email to the program committee.  If you cancel out of sending the email, it will not turn the option on.  However, the “Bidding” menu item will not appear until this is turned on.
*   **Is viewing bids of PC members by chairs enabled?** – Turn ON so you can see the bids.
*   **Is assignment of submitted papers to program committee enabled?** – Turn ON otherwise you can not see the assignment functions.
*   **Are reviewer’s names visible to PC?** – Turn ON otherwise it is difficult to train/learn what is going on.
*   **Status menu is** – “enabled for all PC members” will allow you to teach/learn because people will have access to status information.
*   **Review menu is** –  “enabled for all PC members” will allow you to teach/learn because people will be able to make reviews.
*   **Permit PC members to enter reviews** – Turn ON to allow people to learn about this, otherwise functions are hidden.
*   **Permit non-chairs see and discuss reviews** – Turn ON so that everyone can see what the effects are.
*   **Permit subreviewers submit reviews and participate in discussion** – I don’t know if you need the subreviewers capability, but you won’t have any idea if you don’t enable for learning.

**Read All the Text on the scree**n – A lot of people complain that there is so much text.  Instead of using standard UI principles to make things obvious at the time you need them, EasyChair includes volumes of text to explain what you need to know.  You have to INTERNALIZE this.  The text is accurate, and almost always necessary.  Don’t expect anything to be obvious, read the text and find out the strange, unexpected ways this program works.  

**Use Bookmarks a Lot** – Once you are at a page that you like, it is often quite hard to find the way to navigate back there again.  Fortunately bookmarks work in the site, so use bookmarks a lot.  

**Do not try to make a web crib sheet, never share links** – The URLs generated by EasyChair are unique to one user, so you can not share them with another.  You can not simply send someone a link.  It will not work.  Like the old fashioned web sites, you have to give them detailed instructions “Go here, then click that, then click that, etc.”  And hope that they can see the things in their view that you can see.

## Demo Mode

To help learn the system, there is a ‘Demo Mode’ available and it looks like a completely separate conference, and it works in a very unusual way, so here are some tips:  

**Config is completely separate from main** – This is the strangest thing that you have to configure demo mode separately from your main conference.  If you want to demo something like the real conference, you must copy all the same values to the demo mode.  

**Config Copy function does not work** – You can copy configurations from one conference to another, but not to and from the demo mode.  For that you need to manually do everything to make it like the main conference.  

**Many Things Don’t Work** – There are many options that don’t work on the demo conference.  The choice of what works and does not work is unclear: for example “Donate to EasyChair” is disabled on the demo mode – not sure why.  The screen clearly states when something is disabled, so there is no real confusion, but if you are using demo mode for training remember to check on whether the think you want people to try is actually working.  

**No Navigation Back** – There is no way to navigate back from the demo mode to the main conference.  Bookmark the main conference, and when you get lost, return there with a bookmark and start from the beginning again.  When you select an identity, it puts you in a new window/tab – the idea is that you kill that window/tab instead of returning to the main conference.  

**Demo Users are Different** – You can’t manage users the same way in demo mode.  Instead, in demo mode you “play” different users.  That is, you remain logged in as yourself, but you adopt another demo identity.  There is a demo “start” page which lists the identities you want to play, and you have to start there and choose a link.  After that, you will be playing the alternative identity.  This means you can NOT actually use demo mode to train people in how to log in, and it can NOT be used to see how it works with people who have not registered yet.  There is, apparently, no way to train people on logging in.  Instead, take them to the demo start page, and have them choose an identity.

## Strategies for Demo/Training

**Set Up Users** – In a regular site, people register themselves when needed, but you can’t do that with the demo site, since you ‘adopt’ various users.  This means that all the demo users have to be set up in advance.  Say you are training to five people, create demo users as “Authors.”  Create one demo user for each person trying the system.  You can’t use their real email address, you have to use a dummy address, so use their name and end the email address with “@demo.easychair.org”.  The system will check and force you to do that, but you can use anything before the at sign. 

**Set up Program Committee** – Create three more demo users and make them program committee members.  

**Set up Chair** – if you are doing this for your own conference, the system has probably make you chairman of the demo conference.  That is probably fine.  

**Pre-fill a number of submissions** – If there are no submissions, or only one submissions, it is hard to get a feelling for how it works.  So make a number, maybe 5, demo submissions from old examples that you have.  

**Prefill some reviews** – again you cant really get the idea of how the sorting works if there is only a single review. One on of the submissions make sure there are 3 reviews.  this will be the ‘review sample’ submission.  You might need a review or two one some other submissions.  

**Trainee Login** – each trainee needs to register a real, regular login.  You can send a link to log in to.  Do not send a link to anything in the demo site directly, because it will not work.  You will need to send instructions on what to click on to get to the demo site.  

**Step 1: submission** – since you set all the trainees up as authors, have them select their demo identity from the list, and pretend they are new to the site and make a submission.  

**Step 2: review** – You can then promote them to be a PC member.  Assign them to review the “review sample” paper.  

**Step 3: paper selection** – Once each trainee has completed a review, visit the pages for selecting the paper, and how that works.  

The documentation claims that any PC member can access the Demo Conference, but this does not work!  The links do not work directly for different users.  When logged in as a normal PC member, there is no menu for accessing the demo site.  Therefor, you have to make ALL people you want to train to be chairs — otherwise the demo site is pointless since only chairs can access it.

## UI Gripes

Here are some of needless obfuscation in the UI. 

**Menu Items Should Never Disappear** – A person learning a program searches around for an option. That is the point of a menu, to show all the possibilities.  If something is not present, the user can spend a lot of time looking trying to find where it is.  The only way to prove something does not exist, is to make a complete map of everything that does exist, and that is tedious.  IF something is disabled, the menu option should remain there, but it should display a message saying “this option has been disabled for this conference” and it might even give the specific parameter that needs to be changed.  

**No Metaphor** – the designers of this program never thought about presenting a consistent metaphore.  Instead, it is a bunch of specific reports or interaction modes that are thrown together that you can navigate between.  The same information is presented different ways on different screens. Again, if you are an expert, you have a internal model of how this all fits together, but it is not clear in the UI 

**Access Problem is Obfuscated** – if you attempt to access a page (either a book marked page or a link) which you do not have access to, you get a login prompt — even if you just logged in!  Remember, some pages are accessible to some people and not others.  Instead of telling you that you you can not access it, it instead prompts you to log in as if nothing it wrong except it somehow forgot who you are.  You then log in, and it redirect you someplace else.  Other people are saying “it works fine for me” but for you, you get a login prompt.  This is very confusing.  

**Log In Prompt does not preserve position** – if you attempt to access “page x” (whatever page) when you are not logged in, you will get a log in prompt, but after a successful login, it will redirect you to some page it thinks you want to be at — NOT the page you originally tried to access.  This is annoying.  After logging in, go back to the page with the link and click the link again.  This time it works. 

**No OpenID Login** – You HAVE to register a new account with EasyChair, you can not use OpenID, you can not leverage Facebook Connect, your Google account, or any other account to log in.  You have to have a new account on EasyChair.   They did handle email addresses correctly: you can have multiple email addresses, and if someone assigns something to you using the wrong email address, you can add that address to your login and claim that work.  

**Not allowed to Test** – the end user agreement says that you will NEVER upload a fake paper to the system for testing purposes.  They have provided the demo mode for that, which is good, except demo mode does not work the same way as the regular conference, particular when it comes to registration.  if they are going to make this restriction, then they should make Demo Mode work exactly like a real conference.  

**You can’t share links** – mentioned above, the web URLs are dependent upon who you are logged in as.  This means that you can not take your URL and send it to someone else.  More confusingly, if you log out and log in as another user, all the bookmarks you have made will not work for that other user.  For example, the following are links to the same page for two users:  

```
user1: https://www.easychair.org/conferences/demo.cgi?a=5830003  
user2: https://www.easychair.org/conferences/demo.cgi?a=5801369  
```

Why they felt the need to use two different values is incomprehensible, since the current user is carried in the normal session cookies.  There are many mystifying things about this system.