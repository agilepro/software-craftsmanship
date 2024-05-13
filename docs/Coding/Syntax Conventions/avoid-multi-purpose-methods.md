#  #22 Avoid Multi-purpose Methods

This post is about the tendency to make a single method which does a lot of things depending upon the parameters sent in.  A method should not have multiple purposes, but should have a single purpose, and that purpose should be clearly named in the method name.  I have an example, and I show how it can be improved.

There is the method that I found “in the wild”:

```java
private ModelAndView createModelView(String accountId, String pageId,
        AuthRequest ar,  String view, 
        String tabId, boolean isRedirectView)
        throws Exception {
    ModelAndView modelAndView = null;
    if(isRedirectView){
       modelAndView = new ModelAndView(new RedirectView(view));
    }else{
       ar.req.setAttribute(BOOK, accountId);
       ar.req.setAttribute(TAB_ID, tabId);
       ar.req.setAttribute(PAGE_ID, pageId);
       modelAndView = new ModelAndView(view);
    }
    return modelAndView;
}
```


Consider what this method does.  It returns either a “RedirectView” or a normal view.  There is a parameter “isRedirectView” that distinguishes between which of these cases you want.  Then there is a parameter “view” which either contains the name of a view to construct (if not redirected) and contains the address to redirect to if it is redirected.  There are two purposes for which you might call this method.  You specify the purpose in the “isRedirectView” parameter. 

Essentially we have two completely different methods contained in one method body.  Outside of the if statement there is no significant code: a declaration of a variable before, and a return statement after.  There is no significant shared code between the two options.  Why is this one routine? 

Rather than make one method for two purposes, it is far better to simply create two methods, one for each purpose.  The result would be something like this:

```java
private ModelAndView createRedirectView(
        AuthRequest ar, String redirectAddress)
        throws Exception {
    return new ModelAndView(new RedirectView(redirectAddress));
}
private ModelAndView createNamedView(String accountId, String pageId,
        AuthRequest ar,  String viewName, String tabId)
        throws Exception {
    ar.req.setAttribute(BOOK, accountId);
    ar.req.setAttribute(TAB_ID, tabId);
    ar.req.setAttribute(PAGE_ID, pageId);
    return new ModelAndView(viewName);
}
```

Here we have two methods, but the name clearly tells you what each does.  One creates a view object from a name passed, and the other creates a redirect view given an address.  In this case there is no duplication of code, but I would say that this approach is worth considering even if there are a few lines of duplicated code, because the advantage of the method name saying exactly what the method does is worth a lot in readability.  

We can eliminate the boolean variable from both methods. We can name the “view” parameter better to reflect the differing roles that it plays.  Furthermore, it turns out that the first case never needed the pageId nor accountID, and so those parameters can be eliminated from the first method.  The signatures and simpler and easier to read.

## Clarity at the Call Site

The real benefit is at the place where you call the method.  Here are two calls to the old method:

```java
createModelView(account, pageId, ar,"download_document",
        "Project Documents", false);
createModelView(null, null, ar,"attachment.htm",
        "Project Documents", true);
```


and here is the same thing with the new methods:

```java
createNamedView(account, pageId, ar,"download_document","Project Documents");
createRedirectView(ar,"attachment.htm");
```

The method name clearly says what is being done. You don’t have to look for the boolean parameter.  It is far clearer to name the method, than to have the meaning depend upon ‘true’ or ‘false’ at a point in the parameters.  The calls are shorted because there are fewer parameters, especially in the redirect case.  You don’t have to pass bogus values in some of the parameters because they are not needed. You don’t have to wonder what the fourth parameter is, because it is clear from the method name.  

Breaking the one method into two is a win all the way around.

:::tip[Key Takeaway]

Never use a single method that for multiple purposes, selected by parameters, when you could just as easily provide distinct methods for each purpose that are clearly named for what they do.

:::