---
id: grounding-design
title: Grounding Design for the Real World
tags:
- design
- practice
---
#  Grounding Design for the Real World

One common rabbit hole that programmers often fall into is creating designs for abstract capabilities that then prove to be useless in real life. To avoid this, we must focus on concrete real-world examples when designing capabilities. 

A software application can be very complicated.  Often we make up new names for parts of the software based on analogous things from the real world.  That e-commerce software has a “shopping cart” because it plays a role roughly analogous to a shopping cart in a real store — but analogous does not mean exactly the same.   Word processors offer a “style paintbrush” because it works in a way analogous to a pain brush that paints on a particular style — but nobody expects paint brushes to work this way in reality, because it is just an analogy.  The labels we place on these features are part of an elaborate metaphor that we construct the software on.  Such a metaphor is useful, because all the parts of the software (which is new to the user) are related to something that the user has experience and familiarity with.  If the metaphor is constructed well, the learning time for the user is greatly reduced. 

The problem comes with taking each of the analogies, and trying to think about what people might do with them abstracted away from the actual software.  For example, “How would people like to use the shopping cart?”  The answer should be: _people don’t want to use a shopping cart, they want to purchase products_.  The difference is subtle, but important.

## A Silly Example

When programmers start falling into this rabbit hole of “designing the feature” instead of designing the product, I relate this parable about designing a car:  Consider that a car must have a steering wheel, but what is the best place for that wheel.  Tradition says that in countries which drive on the right side of the road, the steering wheel should be in the front row, left side of the car. 

One designer says: “Wouldn’t it be convenient to have a steering wheel on both sides of the car?  Then the passenger could take over driving at any time and especially if there is an emergency.” 

Another designer say: “Some people might want to put the guests in the front seat — especially if they tend toward motion sickness.  We should have an option for the steering wheel to be in the back seat for a driver located there.” 

Yet another: “It is pretty easy to imagine a case where you have to park a car in a space so tight that you can’t get out, and so having the steering wheel optionally on the outside of the car would be really handy.” 

For each of these, there is a clear advantage in offering the feature.  What is difficult is assessing how useful each of these might be.  Of course, I have chosen a situation — the automobile — that most of you readers are familiar with, and quite readily recognize that the situations are rarely needed in a standard car.

## The Problem

The problem is when you start considering component of system away from the whole.  The reality is that the component is an integral part of the system, but when talking about it in isolation, that fact of integrity is lost.  The aspects of that module are exaggerated, and the dependency on the rest us purposefully ignored.  This is necessary when you do detailed design.  There are aspects of a steering wheel which can and should be designed independently of the car. 

The problem is when you take this too far.  If you consider just that module, your assessment of the value is often going to be grossly distorted. 

The solution to the problem is to always return to the big picture — the complete customer — before assessing the value of an idea.  Always use a story that involves a real user doing a real thing.  User spend 20% of the car life driving to the store and buying groceries.  That is a real scenario, and it is a significant usage of a car.  Now lets see how those steering wheel examples help in this.   Don’t need a steering wheel in the back seat?  Not surprised.

## A Somewhat Better Example

E-Commerce systems have a component known as a “shopping cart” or a “shopping basket.”   You can imagine a team sitting around the table: how can we make this shopping cart better?   Let’s make a print function so people can print the contents of a shopping cart.   Let’s make a save and restore so that people can retrieve a shopping cart in the future, and so they can start shopping with the things they normally buy already in it.   Let’s make a function that lets me transfer a shopping cart to another user.  These are the kinds of things that you might come up with if you consider shopping carts in isolation. 

In isolation, those seem like obscure, but vaguely useful features.  But, when you consider the entire shopping experience, they are not important features at all.  The shopping cart is just a temporary holding place.  Nobody wants to store and manage a dozen different shopping carts for long periods of time.  While it would be convenient to have “the normal things” in a shopping cart, instead of having to store and remember where the shopping cart is, maybe a better idea is a feature to let you pick from recently purchased items.

## Finally

I am not sure how well these examples motivate my point.  Most of you get the main message, which is to use REAL WORLD user stories.  Consider what a real person has to do, and walk through a complete real world process.   Look out for, and avoid, scenarios that start in the middle and encompass only part of a real story.  Avoid treating the component as if it stood on its own.  Consider the whole system.  Assess the value of a change only when the entire scenario is considered.   This will help ground your design in real work necessary actions.
