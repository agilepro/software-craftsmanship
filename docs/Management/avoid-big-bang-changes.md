---
  title: Big Bang Changes
---
#  Avoid "Big Bang" Changes

There always comes times when program needs to be changed, and some existing classes need to change roles.This post talks about strategies to avoid making a big change all at once.  The problem with a big change, is that when doing the change in isolation of other developers, you run a significant risk of clash and ultimately bugs.  Here are some techniques to make all changes, no matter the size, implemented incrementally.  

The source code is _continually_ going through changes because that is what development is. Much of this proceeds in a steady move forward, but occasionally you need to go back and change something that already exists. This is entirely normal, because programming is a process of discovery, and if we knew the end product before we started we would be doing waterfall method and never get anything finished. 

A well managed Agile team is used to the fact that things are changing all the time, and readily incorporate changes into their working sandbox, and regularly commit their changes to the others.  When there is a big structural change, there is a desire to “break off” from the group and in a separate environment make a big change, and then check in all at once.  I have seen programmers break off for weeks and in some cases months to make a structural change.  But all this time, the other developers are working as well.  We already know that the working separately causes problems (see:  “[#5 Avoiding Bugs Caused By Multiple Programmers](https://agiletribe.purplehillsbooks.com/2011/10/03/5-avoiding-bugs-caused-by-multiple-programmers/)“).  This is even more true when making structural changes.  The desire is to “get it all working” and then check in, but this is misguided.  It is better to plot a course to implement incrementally, working together with the team like normal, and to eventually get there.  I will seem like it takes longer for that one developer, but actually this is a faster approach, because there is no built up backlog of errors addressed after the fact.

### Always make “additive” changes

Say you have class with a method with two parameters to get something, and because of a change in design, it is determined that three parameters are needed. Never simply change the existing method.  

Instead, add a new method with three parameters, and change the old two parameter method to call the three, with a dummy value for the new parameter (or some other scheme). Mark the old method deprecated, but leave it there.  

This way, all the existing code remains working. Switch some of the rest of the code to use the new three parameter method, and fully test that the new parameter is functional and working. This should be checked in at this point with both new and old functions exposed so that others can incorporate the changes in their working areas.

Finally, search through the code, and replace all occurrences of the two parameter version with the three parameter version. This might be a week or so later, depending upon the team situation.

Only then, remove the original method.

### Changing a member type

If you have a class with a public member of type X, and you need to change it to type Y, you must be careful. First, you must add a new member of type Y, so that you have both X and Y. There may be limitations of times that the value works in both forms, so design it to work in all the cases that used to work at least.  

Then you change all the setter methods to update both the X version and the Y version. Any of the code that uses X still works, and new code using Y works as well. Code should be checked in at this stage so that others can start merging these changes in their working area.  

Search through the code and remove all the use of the old X version. This can take a while, but you have plenty of time, since the old member is still functional. 

Note that the new member has a different name. It is a bad idea to replace one member of type X, with a member of type Y, and preserve the same name, because this forces you to change all the code that access it all at once.  

It is often useful to change the update functions first, and the read-only uses can wait a bit longer. It is easier to support read-only behavior than full read-write on the superfluous member.

### Slightly changed forms of methods

It is often the case that you need to provide a new form of a method that does essentially the same thing as the old, but just a little differently. For example, a method might return an Array of object, but the new form might require a Vector result. It is pretty easy to write a quick function that reads the old Array, stuffs the values into a Vector, and returns that. This gets you up and running quickly.

But, due diligence requires that you maintain good code for the long term, and this means copying the original method, and changing it to put the results in a Vector, instead of an Array. You can then create a quick conversion wrapper that works in the other direction, reading the Vector version, and re-representing it as an Array. Now you still have both versions working, but you are on a path that the new version is long term maintainable.  

Eventually you can remove the old method, first making it private, and later removing it entirely.

### Inheritance Changes

One tricky change is changing the inheritance relationship of classes. Still, this can almost always be done incrementally. If you know a class is going to be placed under another, or implementing an interface, you can add methods in advance of making it inherit. Remember, that you can always add methods to a class, so adding identical methods before they are required takes the pressure off at the time of switchover.

Sometimes the parent class will have members that duplicate the child class. No problem, just be sure that the setter methods update both of them. All the code that uses will use one or the other, and there is no issue. This gives you time, but continue moving forward, and eliminate the redundant member, and change all the code to use the one in the parent.

### Never Remove anything until you know all use of it is eliminated

This is pretty obvious, so I won't belabor it. Old methods and members can be left to give you time to eliminate all use of them, before getting rid of them. But be sure to follow through.  

Once you know that a member is not being used anywhere, it should be removed immediately. If you ever run across a member that you know is not used anywhere in the program, you should immediately remove it. Leaving it in will cause others to believe that it is useful, and waste time maintaining the functionality. There is no danger in removing a function: if it is truely needed, it can be added back in quickly enough. But there is lots of danger in leaving it there.  

Similarly, anytime you see code that is commented out, and you know it has been commented out for some time (say, 1 month or more) then immediately delete it. If it is really needed it is easy to add back in, but while it remains there, it will cause unnecessary search result, and even sometimes maintenance activities on the code. Once code has been commented for a long time, it has not been tested at all during that time, and is likely to contain more problems that it is worth by saving the code.

### Persistent Classes

A special case of consideration around persistent classes, because you must assume that people will keep finding old versions of the class in database many many years in the future. Once a version of a class has been released, you can never simply delete it. This means for the most part that all preserved members must remain in the class, and must have a consistent meaning.  

You can eliminate a member, or make a new member to carry that value, but you must include a conversion routine while reading the object. You must expect that forever you will see the old form, but if you convert while reading, and if that conversion remains in the object, it solves the problem. This assumes that the forms are similar enough that you can convert. If you can't, then you need to use a whole new object.

Be sure to include plenty of comments on what the old form used to be, because the old form is no longer in the code. The conversion code must remain working for a long time.

### Conclusions

The point of all this is that at no time do you make a bug change that requires a lot of work all at once. Here is an extreme example:  

Say there are 15 classes that require a new form of a method. Because you are adding a duplicate method, you can add the duplicate method to one class at a time, as a conversion wrapper of the old method. You can check in after adding one method to one class, because everything remains running. Nothing is broken. Once all the classes have the new method working, you can start changing the surrounding code that calls this, from the old method to the new method. Again you can check in at any time because both forms are working. Finally, you get all the calls converted, and you can eliminate the old method.  

There is always a way to make changes incrementally. There is never (really almost never) any reason to be forced to make a switch from one form to another, causing a large amount of code to be migrated at once.