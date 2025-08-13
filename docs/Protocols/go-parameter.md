#  The "go" Parameter

Web pages can be designed to be **reusable** like subroutines that go and do something for the user, and then return. For example, the login may need more information, redirecting to a page to prompt for that information, and when done return to the page you were on. These pages need to be designed to be able to redirect correctly back to the original. This post proposes a convention to use to make all such pages work the same way.  


:::tip[Key Takeaway]

To construct a web page that is invoked to do a task, and then returns to the caller, create a parameter (named “go”) that the calling page can use to pass the return address.

:::


The convention we have used on a lot of projects is to have a parameter called “go”. The only purpose of this is to provide a location to return to when processing is complete. The go parameter is always a complete web URL, so it simply sends a redirect to the browser with that address. Here is the pattern:

```java
String go = request.getParameter("go");
....
response.sendRedirect(go);
```


The go parameter is particular good for edit pages. Imagine a page that allows you to set your email preferences, and you want to be able to go to that page from any page, the user edits preferences, and then return. You pass the go parameter to the preference edit page. It places this in a hidden go field of the form. The form posts to a controller. If editing is concluded, the controller redirects the browser back to the address in the go parameter. The pattern is pretty simple, and the closer we stick to exactly this pattern, the easier it will be to make reusable pages.  
What about sub-subwindows? It turns out if done properly, there is no problem with recursive calls. Page 1 might call page 2. That page 2, which has a go parameter in the URL, can redirect to another page 3. It pust the whole URL as the go parameter to page 3. The URL must be UrlEncoded when it is passed as a URL query parameter (just like any other value you want preserved). When that page 3 redirects back, the receiving page 2 will have it old go value again as a parameter, and it can return finally back to page 1. As you recurse in multiple times, the URL might get long, but everything decodes correctly as you return from the pages. You should not, in general, be recursing in more than one or two levels.

### URL values

The go parameter should include the entire fully qualified URL. This means you have to know that URL — the one that the user actually used.  This can sometimes be tricky to get from the J2EE framework.

It must be properly encoded. Do this:

```java
thisPage + "?go="+URLEncoder.encode(go, "UTF-8");
```


Never this:

```java
thisPage + "?go="+go;
```


### Opaqueness

The go parameter should be considered an “opaque” value. That is, never lookedc at the value and write logic to deduce things from that. One page, should never make conclusions about another page, from it's address. Any attempt to look at the go address, and manipulate it, will cause convoluted spaghetti logic eventually. 

Consider that the user is in a domestic product page which the system does not know whether it is a domestic or international product. The page may start up, realize that it needs more information, and redirect to a page that asks the user to clarify whether this is domestic or international. the user fills in a form clarifying that it is international, and controller handles the form post, but then at the end of the controller, it should NOT look at the URL and try to figure if you were on a domestic page, and change that to the address for the international. Instead, the controller should redirect to the address specified in the go parameter, and then let the domestic page have the logic to redirect once again to the international page.

I know this seems like a violation of MVC it actually isn't. The domestic page is not a pure view: it actually has some controller logic to decide to redirect to the clarification form in the first place. It would actually be the address of that controller that we are redirecting back to. The point is that the logic of what the domestic page can and can not display should be in one place, and not split between the domestic page controller, and the form response controller which handled the user input.

### Wrong Ways to do this

There are a lot of ways to do this incorrectly:

*   Use a session variable: this is wrong because you can have multiple browser windows open at the same time on the same session. One window might write over the other window's return value, and they both end up going back to the same page. Or worse.
*   Use a cookie: same problem as a session variable
*   Use a static variable: same problem, but this time across all users of the server.
*   Save in user profile: same problem, but this time across all browsers logged in as that user, regardless of the client machine.
*   figure it out from the context: in this case the code “assumes” that because you just logged in, you must want to go to your home page. Not if you were just looking at a project and want to edit it. I have seen elaborate code to try and figure out what just happened in order to redirect you to the proper place. It is far clearer logic to have the calling page pass a go parameter, and then there is no complicated logic.

the point is that passing as a parameter, in the URL, or in the form post parameters, is the only way to accurately store the return value that that particular browser window came from, and the only way to guarantee that the browsing will return to the start location, regardless of what happens on other users and browsers. It even returns correctly if the server is shut down and restarted in between user navigation.  
