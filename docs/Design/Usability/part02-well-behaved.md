---
id: usability-is-well-behaved
title: Being Well-Behaved
tags:
- design
- usability
- user interface
---
#  Usability Means Well-Behaved, even when the User Isn't

Users of a program found that sometimes, when they went to log in, they did not get a place to enter the username & password.  Instead of the normal login prompt, they got a blank screen, and it was completely impossible to login. Sounds like a bad bug that needs to be fixed immediately, but the development team response was even more surprising: this was the user’s fault!  

:::tip[Key Takeaway]

Usability does not demand that the program be fully functionality in all possible situations, but it does demand that it be well behaved in all situations.  

Users hate products that require the user to follow a very narrow winding path, when any deviation from that path results in failure.  This is almost the definition of unusable.

:::

It took quite a while to isolate what caused the problem, and that was that the browser window had been sized down to around 600 pixels wide.  That is small for a screen, but a lot of people like to put two browsers on the screen, each taking half, so it is really not that unusual to have browsers that narrow. 

We know that when you make things narrow, the layout can get ugly, or you might have to scroll.  But in this case the logic in the login prompt had a clear bug in it: a completely blank window was presented to the user.  Instead of a login prompt, or even a misshapen login prompt, you got just a big white space.  It was not apparent to the user that by making the window larger you could log in, so most people thought the server had crashed, or something worse.  They completely failed to use the product, and they were not happy about it either.

## The Response

The response from the development team was to point to a part of the documentation where it said:  

```
The minimum size of the Browser Window when using the Console is 1024×768 pixels. 
The Console buttons and icons display properly if you use this size window or larger.
```
  
From this it was concluded that the user was simply not following instructions.  Their logic was that it is clear that you must have the browser set with a width > 1024 pixels.  This is the “[documentation as legal agreement](https://agiletribe.purplehillsbooks.com/2012/08/13/documentation-and-legal-contracts/)” mindset which I discussed in an earlier post.  

Actually, it is not clear at all.  It says that it will look proper at that width, so I might expect things to be layed out funny, but it does not say that the product absolutely fails to operate at a width less than 1024.  But it is silly to even consider this kind of legal argument: the documentation is NOT a legal contract on what the user is and is not allowed to do!

## Expectation of Usability

Our goal is **good usability**.  That means, that anything the user does, the program should behave in a reasonable manner.  This does not mean that it has to look perfect in all situations, and it does not even mean that it has to be usable in all situations.  It is reasonable to assume that there are “extreme situations” that the program can not support.  But it has to be clear what the problem is in those extreme situations — there has to be a clear way for the user to recover from extreme situations.  

As for the actual handling of browser width, is it reasonable to make a minimum width for the page, and force the user to scroll when the browser gets too narrow.  In certain situations it might even be acceptable to simply display a message saying that the browser is too narrow — although I really can’t imagine any situation that this would be better than scrolling that all browsers naturally support.  

It was pointed out that this was really not a question of user violating any agreement, but in fact this is a very serious usability problem that makes the product look bad.  The response from the development team was:  

```
As mentioned in Comment #1 and Comment #2, Console is designed at 1024×768 pixels screen. Please let me know whether customer requested this feature. If no customer is requested, we will give priority to other things.
```

I am not kidding.  This was the actual response after many people had discussed over _an 18 month period_.  The conclusion was: user breaks the law, user pays the consequences.  It is their fault.

## Conclusions

How do you convince people that good usability means that the program is a **safe** environment where you can try anything you want without risk.  Nothing you do is irreversible.  It might not be clear what the effect of combinations of actions might result in, so just try it.  There should never be a big penalty to any action.

The program should not be expected to be used in one particularly, strictly defined way.  Different people use things differently, and they are hard to predict.  More importantly, people need to experiment with the product to get it to do what they need.  A product that expects that people are not allowed to experiment will never be used for much beyond exactly the examples in the manual.  

The documentation is not a legal contract that outlines how the user may and may not use the product.  Writing a program that expects the user to read the documentation, and then never deviate from a prescribed path, is a perfect recipe for unfriendly and unusable products.  Users should be able to use a product without reading the manual.
