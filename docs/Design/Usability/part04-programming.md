---
id: usability-and-programming
title: Dependent upon Programming
---

#  Usability is Dependent upon Programming

The discussion came up of how to improve usability of the system.  One position was to hire a usability expert to draw us a specification of a highly user friendly system, and then deliver that to the development team to implement it. I disagreed, and claim this will not work, and this post is my explanation.

**Setting:** We have a development team that is competent in programming the system using all the normal software engineering techniques.  When the product management team asks for a feature, it is implemented in a predictable amount of time, and when delivered it does exactly what it it was defined to do.  

**What is wrong then?**  While it performs the required function, it is usually not convenient to use.  It is not forgiving in your use of the feature.  Often the user is expected to get multiple factors in line with particular values or setting, for it to work.  Deviation from the precise defined path can sometimes lead to error messages complaining that things are not right, however it can be inconvenient for the user to set everything up correctly.  Users complain that it is difficult to find the function that they need, or that many mouse clicks are needed to do simple things.  Sometimes the path to navigate is slow, requiring a refresh of a complicated screen unnecessarily as they traverse to some other display.  It is hard to put your finger on it, but users feel it is simply not pleasurable to use. 

**Usability:** These are all things discussed under the banner of “usability.”  It is hard to precisely measure usability.  It depends upon so many thing, including the expectations of the user, which is based on systems that they have used in the past.  People find operation natural and intuitive if the system is similar to what they are used to.  The biggest barrier we have on this team is that the development team lives and works in a culture that is very different from the one that the target customer lives in.  How can one anticipate what a foreigner will find natural, without knowing so much about that foreign culture?  

**Formulation of Usability:** Usability is elusive because there is no strict formulation that equates to usability, but instead depends upon a whole lot of things coming together. Sometimes you have a beautiful user interface, that ends up being simply unusable, so the look of the user interface is not most important element.  Instead, it is a dynamic quality related to the way that things combine together, and the way the right things are available when you need them, and not when you don’t.  

**Complexity:** The best UI designers know you can not simply write down a spec and have a team implement it. One reason is that the complexity is so great it is hard to simply imagine how it all will work.  Even a simple screen that dynamically shifts to lay itself out as the window is resized is very difficult to imagine, but this is nothing compared to the complexity of being able to rearrange and redefine things.  Without actually having something running it is impossible to account for all the variables that are changing simultaneously.  

**Unreasonable Effort:** If you could imagine the precise behavior, another reason is that creating a precise description of how all these moving elements will interact is more difficult than writing the program.  It makes no sense to spend 10 person-years writing a specification for a program that takes only 1 person year to code.  

**Knowing the User:** This all assumes that the designer can know what the perfect design is for the user without being the user, but that is impossible.  Above I mentioned that it all depends upon what the user knows and is used to, and a designer will naturally have a different point of view than the user.  The only way to design a user interface is to build it, and to observe actual users using it.  You then observe what works well, and what does not, and you re-design.  You must have an iterative cycle of trying, changing, trying, changing, etc.  

**Dependence on Infrastructure:** Even when you implement a cycle of improvement, it is not possible for a UI designer to work completely independently from the development team.  There is a heavy dependency between the form of the UI, and the underlying data structures.  Without a knowledge of how the information is made available, a designer would end up making designs that are very slow or uncomfortable to use.  

**Disconnect:** This is probably the biggest source of poor user experience.  Some development manager will hire a designer to make a “new” UI.  That designer uses a graphics program to make a sexy, flashy user interface with all the possibility.  But then it is implemented and has to be severely compromised because it would either take too long, or the right things are simply not available.

**Cost:** Often the supporting constructs that is needed is not easily implemented in the technology available, and this makes the development cycle extremely long.  Given an infinite amount of time and money, any user interface can be implemented in any technology with any infrastructure.  

**Opportunities:** What works best is when the designer works closely with the information architect, and with the user interface technology experts.   When these people work closely together, they can exploit “opportunities.”  By opportunity, I mean that a specific capability can be made, that works a specific way, looks a specific way easily and quickly.  The UI technology may offer certain kinds of constructs that can be used.  The design might have to be bent a little to make space for the built-in components, but if this is done a final implementation can be done very quickly.  By working opportunistically, the development team works with the designer to make something that works for the user, even though it does not match the original design.  

**Design Intent:** This happens all the time:  a designer will do a sketch of a screen layout.  If that was delivered in a single shot to the developer to implement, it would impossible to know exactly what was important to the designer.  Is it OK to change the color from bisque to almond?  Is it OK if the buttons are square and not rounded?  Is it OK if the font is a little larger?  The innumerable details of real capabilities of the environment encroach on the original design, and can be viewed as “changes” from what was requested.  There can be hundreds or thousands of minute changes in a single screen — but most of these don’t make the slightest difference.  The way this is handled is that the developer implements something close, and shows it to the designer.  Back and forth, until they get something they want.  But they are not done there.  Then the designer shows it to users, and once again the suitability is assessed and changes are suggested.

## Form and Structure

I was a bit surprised to hear the opinion that a User Experience Designer should be able to come up with a clean, usable design, and it is simply an engineering job to implement it,and that there is no need for the designer to know anything about the structure or capabilities of the system that the developers are using. 

**Sculpture:** By way of analogy, I might point out that an artist can not design a sculpture without understanding the material being used for the sculpture.  A sculpture made from glass will have entirely different capabilities from a sculpture made from granite.  As will a sculpture made from bronze.  The material and ultimate form are deeply intertwined.  

**Architect:** A better example might be an architect for a building.  An architect could never design a building without a strong knowledge of the building materials to be used.  It would be silly to think of an architect simply drawing an abstract 3D space and telling the engineers that “it is an engineering problem to build the building.”  Every real world architect knows that you have to carefully consider the space, the materials, construction techniques, even the ability to get the materials to the place they are needed.  

Similarly, in software, the user interface and the design for usability is deeply intertwined with the underlying technology.  Every program is different due to the nature of software.  Every program has a collection of methods and capabilities that are unique to it.  And because of that every user interface has unique challenges that must be met.  Similarly, every program has unique opportunities.  The best and most successful programs learn to leverage the opportunities to quick put together an acceptable UI, which is then refined into a great UI.  

**Learning from History:** What is funny is that we went through this process a couple years ago.  We hired a design firm, and they made a quite nice visually looking user interface.  We passed that on to the development team.  The resulting UI looks very close to the defined screens that had been submitted.  But in general we are disappointed with the interaction.  The actual dynamic behavior is cumbersome.  When multiple things are ont he screen, the interaction between them is not as smooth as it should be.  It sometimes take a long time to fill in the screen.  If the data size is the same as what was used in the examples, the screen looks fine, but when lots of rows appear, then scrolling bars appear in unpredictable places, and sometimes multiple nested scrolling bars inside each other.  When you type long words, the layout can depends upon how the words wrap to the next line, and that can cause unexpected changes in the layout of the rest of the screen.  It should be clear that such details could never be specified in advance without knowing a multitude of details of the internals of the system.  Or a better way to put it is: it is far easier to write the program, than it is to know all the details and write such specification that would encompass all the interactions.

## Summary

The idea that someone really smart will sit down and write a long detailed specification that will have “good usability” is simply unworkable.  Good software can not be designed that way.  

Instead, the design of the entire product must be done together with the development team.  It must be done incrementally, with different experts evaluating different aspects.  

Usability comes not from looking at pictures and evaluating the visual aspect, but can only be evaluated by actually trying to perform tasks and that can be done only on working software.  Ultimately the only person who can test the usability is the real user, and not the designer or the development team.  

Good user interfaces and good usability can not be designed independently from the development of the program itself.

## Resources

[Usability in Software Design](http://msdn.microsoft.com/en-us/library/ms997577.aspx) – a good article from Microsoft that gives a good overview of the situation.  
[Usability 101: Introduction to Usability](http://www.useit.com/alertbox/20030825.html) – From Jacob Nielsen, co-founder of Nielsen-Norman, This is the article to give to your boss or anyone else who doesn’t have much time, but needs to know the basic usability facts.  
[Why doing user observations first is wrong](http://www.jnd.org/dn.mss/why_doing_user_observations_first_is_wrong.html) – Don Norman explains why usability is not an “up front” operation, but something that must be tested later.

> All of us usability theorists have long argued for iterative design, trying to get rid of the lengthy, inflexible linear project schedules that stymie flexibility and change, that slows up projects. Instead, we have championed iterative design, with frequent, rapid prototyping and frequent, rapid test.

[Peter Merholz Speaks with Don Norman](http://vimeo.com/2963837) – Entertaining interview with the Don Norman, inventor of the term “User Experience”