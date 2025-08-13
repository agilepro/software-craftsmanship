---
id: splash-screens
title: Splash Screen Trouble
---

#  Splash Screen Trouble

Whoever invented “Splash Screens” should be publicly humiliated.  It is a piece of shamelss self promotion, however the specific way implemented detract from the desired effect.

:::tip[Key Takeaway]

Splash graphics are annoying after the first few times.  Try to avoid them for the sake of the steady user.

:::

## Definition

A splash screen, or splash graphic, is a picture that appear as the application is starting up.

## Evaluation

Positive:  There is one good thing about it, and that is that it tells you that the application is starting up.  That feedback will prevent you from accidentally starting the same application multiple times.  Feedback is good. 

The way it makes this graphic appear is a violation of the whole concept of windows.  The graphic does not appear in a window, it is just a free floating graphic in the middle of the screen. It has no relationship to other windows.  In some cases it causes strange graphical anomalies, like a hole in screen where other windows can not display.  

It have been use as a way for a program to unabashedly advertise “Hey look at me, I am starting up, isn't that great!”   I am thrilled.  Every single day when I start that program, I get a thrill.  

Some programs take a long time to start up, like 30 seconds or 60 seconds or even more.  The designers of this feature apparently believe that: “you, tiny user, have got nothing better to do than to see my pretty picture so sit down, shut up, and watch the pretty picture.”   Try to use other software while this one is starting up, and sometimes you can't:  there is a strange hole in the middle of your screen that does not act like a normal window.

## How This Should Have Been Done

As soon as a program starts, it should be given a window by the operating system.  What it does with that window is its business, so if it wants to show a splash graphic in that window, fine. But it should be a normal window obeying all the normal window conventions.  

That window should behave like any window: in front or in back of other windows.  Just the very basic window functionality.  If I move the window, then when the application eventually appears it appears in that window where I move it. 
 
This would allow a splash screen to cooperate with other programs at the same time.  Imagine that:  two programs running at the same time!  Cooperating!   What a crazy idea!  Who would ever think that you might run two programs at the same time!

This entry was posted in [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [windows](https://agiletribe.purplehillsbooks.com/tag/windows/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/03/28/hating-splash-screens/ "Permalink to Splash Screen Trouble").