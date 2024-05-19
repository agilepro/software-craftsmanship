---
  title: Overloaded Methods
---
#  Avoid Overloading Methods

One of the things that programmers learn with object oriented programming is that you can overload methods. That is, have the same method with differing parameters.  This can be convenient sometimes, but most of the time, it is an exceedingly bad idea.  
Recently, I was using a code library, and a particular class had all of these overloaded methods.

```java
    public Message authResponse(ParameterList requestParams,
                                String userSelId,
                                String userSelClaimed,
                                boolean authenticatedAndApproved)
    public Message authResponse(AuthRequest authReq,
                                String userSelId,
                                String userSelClaimed,
                                boolean authenticatedAndApproved)
    public Message authResponse(ParameterList requestParams,
                                String userSelId,
                                String userSelClaimed,
                                boolean authenticatedAndApproved,
                                boolean signNow)
    public Message authResponse(AuthRequest authReq,
                                String userSelId,
                                String userSelClaimed,
                                boolean authenticatedAndApproved,
                                boolean signNow)
    public Message authResponse(ParameterList requestParams,
                                String userSelId,
                                String userSelClaimed,
                                boolean authenticatedAndApproved,
                                String opEndpoint)
    public Message authResponse(AuthRequest auhtReq,
                                String userSelId,
                                String userSelClaimed,
                                boolean authenticatedAndApproved,
                                String opEndpoint)
    public Message authResponse(ParameterList requestParams,
                                String userSelId,
                                String userSelClaimed,
                                boolean authenticatedAndApproved,
                                String opEndpoint,
                                boolean signNow)
    public Message authResponse(AuthRequest authReq,
                                String userSelId,
                                String userSelClaimed,
                                boolean authenticatedAndApproved,
                                String opEndpoint,
                                boolean signNow)
```


I am not making this up!   Defining and using such a collection of methods making reading the code difficult, and it produces a lot of cruft in the code.  

Of course it is even worse if the underlying variants of the method do completely different things.  That was not the case in this situation.  The convenience of defining 8 versions of a method is swamped by the extra complexity it causes in maintaining the code.   It would be reasonable to define the last one or two, and then require the call sites to pass the values that are defaulted in the other versions.  Typing the extra parameter does not really cause extra time of the programmer, nor does it complicate the code very much.  Once it is written there is no extra cost at all.  

I have seen a couple of cases where overloading a method makes sense, but very very rarely, and my general advices is: simply don’t ever overload methods unless you have a very good reason for doing it, and it can’t be done any other way.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [overloading](https://agiletribe.purplehillsbooks.com/tag/overloading/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/25/16-avoid-overloading-methods/ "Permalink to #16 Avoid Overloading Methods").