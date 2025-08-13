---
  title: Folders & Organization
---
#  Avoid Creating Lots of File Folders

How do you organized the many files in a project?  Making lots of folders with a few files in each is not any more organized than a few folders with lots of files in each. 

:::tip[Key Takeaway]

In general, the more folders you use, the harder it is for a new programmer on the project to find things.  Grouping by logical category does not help people unfamiliar with the logical categories specific to a project.

:::

Making a development project with lots of folders does not mean that the project is more organized.  However, there is a seemingly irresistible desire to make a folder for every possible purpose, and then put the one or two files that fit in there, all in the name of keeping the project organized.  This might make the programmer feel good, but it is a large pain for anyone new who has to join the project or review the source for any reason. 

I ran into this problem again today, and here is the situation:  A web project had 19 JavaScript files.  The developer had placed them into 9 folder.  Here is what the folder list looks like: 

[![](folder-organization-img1.png) 

I have the job of helping to debug the scripts.  I am tracing the way that the execution thread, searching for, opening, and examining files.  I find myself needing to open the “jsonDataManager.js” or the “userManager.js”.   So I end up opening a lot of folders and closing them again trying to find the right file.  The actual complete file hierarchy looks like this:

```
scripts\
    module\
        appConfig\
            appConfigFactory.js
            appConfigModule.js
        connect\
            connectFactory.js
            connectModule.js
        inbox\
            inboxFactory.js
            inboxModule.js
            inboxService.js
        interstage\
            userManager.js
        pageNavigator\
            pageNavigatorFactory.js
            pageNavigatorModule.js
        requestDetail\
            requestDetailFactory.js
            requestDetailModule.js
        requestList\
            requestListFactory.js
            requestListModule.js
            requestListService.js
        settings\
            settingsFactory.js
            settingsModule.js
        utilities\
            jsonDataManager.js
            utils.js
```


First of all, developers get an **A+** for naming the directories logical names.  The “settingsFactory.js” is in the settings folder.  They really tried to make this nice and logically laid out.  But still, I am looking at the folders trying to figure out what logic was in possession of the person when they decided to add the “jsonDataManger.js” file.

## Why Do You Make So Many Folders?

“_Because it is more organized this way._” is the response. “_We have a folder for each main concept, and we put the file for those concepts in those folders.  All nice and neat.  Everything in it's place._”  
But listen carefully to what comes next:  “_When someone wants to find a file, they just remember the module that file is part of, open the folder, and read the file.  SO easy._”

*   It is so easy only IF the person knows the mapping between the files and the module name they are in.  Case in point, you have to know that “userManager.js” is part of the interstage module (whatever that is).
*   If you don't know this, the folder in between is just a barrier to getting to the file!
*   To navigate this, you need to know more than just the file name, you have to know what module the file belongs to.
*   To know this, yoe might need to know the logic behind why a particular file was associated, and when learning the code, when you have no idea what a particular file does, you have no basis to make a logical deduction about that!
*   This is easy for the original designer to navigate these folder, because that designer used a logic that was familiar to them, but to a novice this is nothing but a barrier.
*   New programmers need to find files by name while they don't have the knowledge of what module a file falls into.
*   What is happening is that the programmer experienced with the project has forgotten what it is like to not know the logical structure of the project.  It might be easier for the experienced programmer, but an experienced programmer will already know where a file it.  It is the new programmer on the project who should be considered in terms of being able to find things. 

Let's consider the alternative, and lets put all the files into a single folder.  It would be like this:

```
scripts\
    appConfigFactory.js
    appConfigModule.js
    connectFactory.js
    connectModule.js
    inboxFactory.js
    inboxModule.js
    inboxService.js
    jsonDataManager.js
    pageNavigatorFactory.js
    pageNavigatorModule.js
    requestDetailFactory.js
    requestDetailModule.js
    requestListFactory.js
    requestListModule.js
    requestListService.js
    settingsFactory.js
    settingsModule.js
    userManager.js
    utils.js
```


Why is this any less organized?  Here are some points in favor of a single folder:

*   If you know the name of a file, it is easy to scan and find it.  They are alphabetical so it is quite fast and easy.
*   One doesn't have to know the logical relationship between a file and the module.
*   One doesn't have to double click to navigate down into the folder.
*   The modules are still quite organized:   The **requestList** module consists of the two files that start with **requestList**.  Putting them in a folder does not make this any clearer.
*   There is no arbitrary forcing of a file to be in a module just because you have to pick one.  The file “jsonDataManager.js” was put in a module called “utils” which exists just to hold all the things that don't belong in any specific module.
*   Fewer folders means fewer things in the project means easier to learn.  Really!

The folder might help organize files that are poorly named for their module, but if that happens you just change the name of the file to be whatever module you want it part.  Changing the name is no harder than changing the folder the file is in, so just use the right names and everything is just as organized.

## Resist this Temptation!

Programmers are tempted because they have been brought into projects that were disorganized.  When starting a new project, they seem to think to themselves: “_I am going to make this project so organized that it never can get as disorganized as that Project X!_”  So they try hard to really really organize things by making lots of folders, and putting exactly the right things in the folder.  
But this does not make it more organized.  It just makes more folders.  
The organization of a project depends upon dividing all the code into chunks that are logically consistent, and by giving everything good, meaningful names.   These are important.  
Making lots of files folders, and having only 1 or two files in each does NOT make it more organized.

## Defense from the True Believer

**Just go to the logical module and the file is there!** —  Only to those people who are previously familiar with the files or the logic used to organize the file.  If they are all in one list I do not need to know this.  
**When you open the folder, all the files are there together! —**  If you name the file properly, they will all be together in the list, so there is no advantage to the folder.  
**Sometimes you need to group files with different names! —**  Then rename them.  There are vanishingly few cases where you can not name the files properly.  
**It is easy to open folders**. — Just a double click, but that requires extra work, and that is multiplied when you don't know exactly which folder to open.  The point is that the folder adds nothing, so this effort is pure waste.  
**With lots of files in a folder you have to scroll**. — Scrolling is far easier than opening several folders.  In any case if you kept to around 20 files per folder you would never have a scrolling problem.  
**Use and IDE that reads and flattens the file list**. — OK, so you agree that a flat list is better, why not just make it that what actually exist?  Why make a structure that you then have to use a special tool to unscramble?  The real answer is that I don't always have an IDE available, especially when working at a customer site or a developer who wants help.  
**You just need to do a search.** — It is well established that one can scan the list and find the file faster than you can enter the command to search.

## Conclusion

:::tip[Key Takeaway]

Don't make lots of folder with only a couple files in each.  Worry more about your code structure and names, but put many files together in a single folder.

:::

Anything up to 40 files is fine.  When you get more than 50, think about splitting, but only if there is a clear and compelling way to divide the files.