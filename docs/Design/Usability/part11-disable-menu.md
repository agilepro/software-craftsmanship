---
id: dont-disable-ui-elements
title: Don’t Disable UI Elements
---

#  #32 Don’t Disable UI Elements

The concept of “**disabling**” a user interface element seems like a good idea to let users know that a particular action is not available. The problem is that most implementations made a disabled element _completely dead and unreactive_.  This is a problem for any user learning to use the program.  The dead element gives no indication of _why_ it is dead.  There is no way for the user to find out!  The user just has to “_just know_” why it is dead.   The most important aspect of a good user interface is that it help people _learn_ how to use it, and that means eliminating things that users have to “_just know_” ahead of time. Such elements should _never_ be completely dead, instead, they should produce a message explaining why the function can not be used at that time. 

## Background

Early 1980’s saw the first modern graphical user interfaces. The Macintosh sported menus that drop down from the top of the screen. One UI guideline was ingrained into the common GUI consciousness:

> If a menu option is not immediately available for use, disable the option, and indicate this by changing the color to grey.

Is this good? Is this bad? The visual indication is clearly good. By why do you have to _disable_ the menu and make it completely unresponsive? Menu options that are dead can not tell you why you don’t need that option. Disabled menu items are silent about why they are disabled.  It can take minutes or hours to figure out why an option is disabled.  In some cases it can take forever.  What a bother. 

I can’t count the number of times a user has exclaimed: “oh that’s why I can’t use that function, I never knew I just had to . . .”  Or they have told me “I tried to do it, but the menu was disabled and I don’t know why . . .”  

**Example:** You see an icon that looks like a printer, and you want to print, but the icon is disabled.  Why is it disabled?  There could be many reasons, but a dead icon simply does not tell you.  It might be something simple, like you have to select a default printer.  Or it might be an indication that the network is down. Or it may be that you need a newer printer driver that supports a particular capability.  Hunting for the reason can take hours and lot of guess work.  Go to the manual or the online help and search “disabled print icon” and you probably don’t turn up much. Generally you have to do trial and error changes to the system until something re-enables the icon. How long this takes depends on how much you know about the internals of the system … many users simply give up.

## User Protection  

Why do we disable menu items? The response is usually along the line of “protecting” the user. People (users) are afraid of computers and applications; people can accidentally do the wrong thing and cause problems, so in order to make a more friendly and comfortable environment, we should only offer them operations that make sense at the time. Thereby preventing people from accidentally using the wrong option. In summary, we need to protect people from doing the wrong thing.

Protecting the user makes sense, but it ignores a critical aspect: users need to _learn_ the system they are using. No, Virginia, people don’t read the manual. The point of a friendly user interface is that you can use the product without attending a training course. Just start using it and learn by experimentation. If you want to (graphically) re-size the object you are working on, look around for a menu option that looks appropriate, and try it. Oops, it was not what you wanted, no problem there is the “undo” command. A well designed application can be learned by trial and error.  

If I do something completely ridiculous, it is not because I am a “bad” person who needs to be restrained or punished, but it is because _I don’t understand the model/metaphor that the program is presenting to me_. Therefor, the appropriate response that a friendly program should make is to explain: (1) what the operation does, (2) what it requires to operate correctly, and (3) why I have not met this condition. Through my exploration of the program, this kind of response will actually help me have a better understanding of the program, and it will help me use it better. I was still prevented from doing the ridiculous operation, but instead of a simple dead menu item, I got a pop-up error message that explained why I can’t use that operation. Once I learn that a particular path of action does not make sense, I will not use it, not because I was prevented, but because I will understand the program. 

Simply disabling the menu option does not help me in this way. Due to my misunderstanding of the system, I THINK I need to use a particular command, but it is disabled, so I now believe that program is wrong (not me). A disabled menu gives me no information to teach me what I should be doing instead. I am forced to go outside of the system, maybe even look something up in the manual, or most likely bug a coworker who knows the program, and find out externally why the system does not work for me. In the end, my misunderstanding of the system will be corrected, and I will come back to use the system.

## An Example

Some simple examples. I use a photo-graphical program that allows you to increase and reduce the color depth of the image. For example, a JPG is 16 million colors, and you have an option to reduce the image to 256 colors. Once you reduce the image to 256 colors, the option to reduce becomes disabled. This makes sense to anyone who understands what is going on, but what about who does not understand? The user wants to do something, and thinks it is called “reduce colors” but the menu is disabled. The user is left on his own to discover why the menu is disabled. Maybe the user (1) thinks the command does something other than it does, or (2) does not know that the image is already in 256 colors. Imagine how much nicer the program would be if when he chooses this option, it pops up an explanation about how the picture is already 256 colors, and this operation only works when the image has more colors than this. It is nice to have the menu gray as an indication, but disabling prevents me from learning how the program works.  

The same program has filters (smoothing, etc) that work only when you have a 16 million color image. With a 256 color image, when you try to use a filter is it not disabled. Instead, a window pops up telling you that the filter options only work with images with 16 million colors. This is so much more helpful than simply disabling the menu.

## Preventing Error Messages

It gets worse. Many software QA people believe that “preventing users for making mistakes” is extended “preventing users from ever experiencing a pop up error message”. I don’t know how many times I have heard someone say: “_If the user is only going to get a pop-up error message, then the button should be disabled._” This is actually a codified rule in the Fujitsu software quality standards.  

What is the matter with users getting harmless pop up error messages? The answer is simply: usually these error messages are completely useless. They do not explain anything about the program, and often end up blaming the user for being “bad”. They often use techno-jargon, or worse, simply contain an “error code” which is meaningless to the user.  

So in summary, our programs are so poor at teaching users how to use them, that we go and prevent the most important way that people learn: trial and error.

:::tip[Key Takeaway]

Trial and error does not work without the error part.

:::

When my dad took me skiing when I was young, he always said “if you don’t fall down at least once every day, you are not trying hard enough.” It is impossible to design a program where everything that can be tried will be successful.

:::tip[Key Takeaway]

Error messages are the learning experience that allows a program to be discovered.  Without them the user can not learn.

:::

## Common Lore, Fighting the Good Fight

Most intelligent people can understand the above reasoning, and will agree that good, well designed error messages are helpful for people to learn the program. But the rule to disable menu items still exists.  

Try searching google for “disable menu” and you will find thousands of messages from people seeking to find ways to disable menus, and to find code support for disabling menus. Here are some examples:

*   “As user security may not permit a user access to a specific menu option(s) we need to disable them so if the user clicks on the option nothing happens.”
*   “I am working with the BasicMenu sample and would like to disable my menu entry, when no document is open.”
*   “You can use system policies to disable menu commands and their corresponding toolbar buttons. When you disable a menu command and toolbar button through a policy, users cannot use that command or button.”
*   “Does anybody knows how to disable the menu when you click the right button on your mouse? This is to control the desktop display for PCs meant for the public. Do we need special software?”
*   “if there’s nothing in the clipboard (state), then the Paste command should be disabled (menu).”
*   “if your program is in read-only mode, then commands that edit should be disabled…”
*   “Obviously, if there is no selected object at all, you’ll want to disable the menu item, thus reinforcing the connection between the item and its object.”
*   “visually disable menu item(s) which the user not allow to activate.”
*   KDE UI Guidelines: “If an action should not be executed (e. g. Cut when nothing is selected) then you should disable the entry in the menu.”
*   Eclipse GUI guidelines: “A command should only be enabled if it can be completed successfully. If this is not the case, the command should be disabled.”
*   GNOME UI: “Sometimes it does not make sense to allow the user to interact with a control in the current context, for example, to press a Paste button when the clipboard is empty. At these times, make the control insensitive to minimize the risk of user error.”
*   NASA UI Guidelines: “Dim (or gray out) unavailable or invalid options.”
*   Apple UI Guidelines: “When a menu item is unavailable—because it doesn’t apply to the selected object or to the selected object in its current state, or because nothing is selected, for example—the item should appear dimmed (gray) in the menu and is not highlighted when the user moves the pointer over it.”
*   SGI UI Guidelines: “In general, disabling entries when selecting them would give the user an error message. For example, if a menu entry works on a selection (such as “Cut” and “Copy”), disable it if there’s no current selection. “
*   Sun GUI Guidelines: “Disabled commands have dark gray text (instead of the usual black) on the usual light gray background. They are completely inoperative and are not highlighted in response to user actions.”
*   Java Look and Feel Design Guidelines: “If an application feature is not currently applicable, make the corresponding menu item unavailable and dim its text. When menu items do not apply to the current context, they are dimmed and cannot be activated. Keyboard navigation skips over them.”
*   Microsoft Official Guidelines for User Interface Developers and Designers: “If a menu item is not appropriate or applicable in a particular context, then disable or remove it. Leaving the menu item enabled and presenting a message box when the user selects the menu item is a poor method for providing feedback.”
*   Smith and Mosier HCI Guidelines: “When function keys and other devices are not needed for current control entry, and especially when they may have destructive effects, disable them temporarily under software control so that they cannot be activated by a user.”
*   “On the other hand, if the option is not available for a reason the user has no control over, then remove it. Otherwise the user will go nuts looking for the magic way to enable it.”

Everyone is looking for ways to disable menus, and disable means to make it non-functional or “dead”. I would claim that in everyone of these cases, the program would be far more helpful to people learning it if a pop-up message would tell them why the command is not useful at the moment, but the code libraries to support menus do not work this way!  

How do we change this? Disabling menu items seems to be one thing that the common programmer pick up, but misapplies. It seems to be a simple thing for Quality Assurance people to check for and insist be changed.  How can this be corrected?  

There may be guidelines existing that concur with my position, but **I can’t find them**! Searching the web only yields millions of cases of people trying to figure out how to disable menu items. I am looking for something telling people to NOT disable them.  

I did find some things:

*   [Bruce Tognazzini](http://asktog.com/Bughouse/10MostWantedDesignBugs.html) calls this the “Mysteriously Dimmed Menu Items” problem: “**Bug:** Designers offer no way for users to discover why a given menu or option has been dimmed (grayed out), nor how to turn it back on.    **Proposed Fix:** Make grayed-out objects clickable, revealing what has caused the object to be dimmed and what the user can do about it.”
*   [GNOME UI guidelines](http://developer.gnome.org/projects/gup/hig/2.0/menus.html#menus-menubar): “Do not disable menu titles. Allow the user to explore the menu, even though there might be no available items on it at that time.”
*   [Palm OS Guidelines](http://www.palmos.com/dev/support/docs/ui/UI_Actions.html#976720): “Never dim or gray out a button to show that it does not apply to the current situation. If the button depends on a certain user context, display an alert dialog that explains why the button does not apply. For example, To Do List has buttons at the bottom of the main form that apply to the currently selected task. If the user has not selected an item, tapping one of the buttons results in an alert dialog explaining how to select an item”
*   [Sun UI Guidelines](http://docs.sun.com/app/docs/doc/802-2109/6i63jrkb7?q=OpenStep&a=view): “When an application is in use, it is not uncommon for commands to have no valid function. For example, when a text editor does not have any documents open, its Save and Close commands have no function. In situations like this, a menu command that has no current function should either be disabled or it should open a panel explaining the function is not currently available.”
*   [Apple Guidelines](http://developer.apple.com/documentation/mac/MoreToolbox/MoreToolbox-147.html) suggest a help balloon to explain why a menu item is dimmed: “Remember that the help balloon you provide for a dimmed menu item should explain why it isn’t currently available or, if more appropriate, how to make it available.”
*   [Mark Levinson](http://dotnetjunkies.com/WebLog/mlevison/archive/2004/12/3.aspx) agreed: “we gray out menu items when they’re not available but don’t do anything to tell the user why they were greyed out.  So the user is expected to use their innate genius and grok why the item is greyed out.  What we really need is for industry behemoth (is MS listening) to help solve this problem.  We need both a standard UI guideline and BCL classes that implement it. “

## Call to Action

I can’t be the only one with this opinion. Please use the comments on this message as a way to collect links to UI guidelines that concur with this position. If you know of a good UI article stating when it is bad to disable menus, PLEASE enter a comment with a link to that article. If you know of a discussion of this topic anywhere, PLEASE make a link to that discussion in a comment. I would greatly appreciate it.