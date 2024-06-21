---
id: error-first-design
title: Error-First Design
tags:
- error first design
- exceptions
---
#  Error-First Design

There is “mobile-first” when creating your UI, but there is something you should do before you start designing the UI:  you should design the error handling/display mechanism first.

:::tip[Key Takeaway]

Start any project by writing code that catches all exceptions and produces a error display or response.  That way you are always guaranteed to see all exceptions that are thrown.

Start all method implementation code to throw "Not implemented yet", and then replace with proper functionality.

:::

## Situation

You are starting a project: It will have a server component — maybe Node.js, maybe TomCat — that will serve up data in a JSON format from REST requests, to be consumed by an Angular JS client UI. You flesh out the very first data path. A very basic home screen that make a call to the first API. You create the HTML with the angular extensions, and _voila_, you have the first screen running.  

It is at this point, you should implement an error alert panel to display errors of any kind from client or server.

## Why?

You know as the project proceeds, you are going to encounter errors. Bugs. Failures. Whatever you call it. Not all active development goes at the same speed. Can you make it all the way to the end without encountering a single bug? Unthinkable! Naturally during development you will have times when different parts are out of sync, and maybe just written incorrectly. You know it will happen, again and again. Your goal is to flesh these out during development, so the customer never sees any. 

Does it make sense to wait until the END of the project to implement the mechanism that displays an error message? The middle of the project? The earlier you write it, the more benefit you are going to get from it. Every day you wait delays the benefit. Once it is written correctly, you will always get an immediate display of the problem and the error report.  

Part of this is driven by the “fail-first” philosophy of development. Code should be explicit (as possible) in defining what it can and can not handle. A method method is passed something that it is not expecting, it should throw throw an exception. That is the easy case. If you are expecting an object, say a customer, which is a valid, current customer, then it is reasonable to test whether it is a real, valid customer and throw an exception if not. While it is not possible to validate all assumptions, having a few assumption tests that cause clear error indicating the assumption that is violated helps make the code reliable.  

The opposite approach is the “try to make anything work” approach. If the method is expecting a valid object, but it gets a null, it simply returns as if nothing happened. If an object is in the wrong state, you write code to try to put it into that state, and then continue. This kind of code seems on the surface to be resilient, but it is not. It allows sloppy code to be written and to persist. You want code that acts predictably in a wide variety of inputs, but if the input falls outside of the expected range, you want it to fail completely with an exception. An exception stops all processing, and alerts the user and the programmer that something is wrong. Some programmers feel that this will expose them in some way. They feel that if their code throws an error, that the code is broken, and they will be blamed. It is the opposite. If their code is written to only accept valid values, and to clearly communicate nonsense input, then they will always get valid input …. eventually.

## How to Accomplish

Every web page might encounter an error. It is not the case that some web pages will get error, and others will not. It is possible on every web page to get an error. For this reason, every web page need to have a mechanism to display that error. A couple of choices exist: you can make a pop-up error dialog. Or you can make a panel that exposes itself in the page. There may be others. It does not matter how you do it, but what matters is that you establish a pattern, and put it into every page.  

The earlier you set this pattern, the better integrated it will be in every page. It seems trivial when you have only a single page, but soon the number of pages will grow. You don’t want to be going back to all those pages and retrofitting all of them. The error handling mechanism essentially needs to be the same on every page. That is, you hope you never see it. So there are few stylistic aspects to it. It should be basic, reliable, and simply presentable, but as the site adopts different fashions there is little need to adapt the error window. Therefor there is no benefit is waiting to see how the rest of the site turns out. you might start with a yellow-green design. Later you might rework the site around white-blue colors. None of this matters to the error display window. So don’t want. Pick a simple, but reliable, design and implement it first, and make it the same in all the pages. 

The protocol from the server to the client needs to carry this as well. If you are writing in Java, you will use Exception objects to carry the information about what failed. That Exception needs to be translated into something that can be carried to the client. A JSON/REST API will encode that exception into JSON, and return it in a standard way. The client exception mechanism needs to understand that exception encoding, and display it to the user. Once again, while the API structure and form may change over time, there is rarely any reason to change the Exception encoding format. Once set, you can use the same mechanism across the entire API, and it will be consistent. What you DON’T want to do, is to implement a lot of API methods without exception handling, and later have to go back and retrofit the API calls.  

I really can’t say this too much: every page can have an error, every API call can have an error, and once the pattern is set, it rarely changes. So set the pattern up front, both for the API exception transmission, and for the web page display of the error, and you will probably be able to use those patters for the rest of the project.

## But will you really need it that early

The biggest mistake is thinking that you can put it off to later. What you want is a clear indication to the programmer and to the user every time something is coded incorrectly. If there is no reliable error message, then the programmer starts putting debug trace statements into the code. They can’t trust that they will get an error message, so they do the next best thing. It is often good enough. Once there is a lot of trace statements, you have a flood of output, but the programmer is learning how to use this output. Once you learn the patterns of the output, the programmer gets comfortable with way of determining whether there is a problem. Here is the issue: people who are not familiar with particular trace output will not recognize when things are going wrong. If you wait until later to implement a clear, consistent error message, then multiple inferior mechanisms will grow to fill the need. This is a waste.  

A bigger waste occurs when you decide encounter errors and you do not yet have an error display mechanism. Errors start happening, but nobody notices them. Because of that, you may run into later errors that are very hard to debug, because you were not aware of the earlier problems. It is quite important to be informed of every error that occurs, so that the programmer will debug the root cause of the problem, and not the unintended side effect.

## Conclusion

Putting in the mechanism before any of this can happen will allow you to catch all error as they happen. It will prevent the waste of chasing the wrong error. It will prevent waste of putting a lot of debug statements. It will produce a program that everyone can clearly see when an error occurs.  

It will take the same amount of effort to implement this later, as it is to implement it up front. Once implemented, it rarely changes, so there is no benefit in waiting. Delaying allows inferior mechanism to be implemented, diminishing the incremental value of the proper mechanism. And most importantly:

So don’t be foolish. As soon as you have the first web page, with the first API call implemented, go ahead and implement the exception passing mechanism, and the error display UI capability. Nothing elaborate, but make it reliable. And then include the same thing in every web page, and in every WEB API call. This is the most efficient way to make a program.