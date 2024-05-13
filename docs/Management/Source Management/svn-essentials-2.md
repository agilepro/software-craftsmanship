#  SVN Essentials 2

Most of what a developer needs to know about SVN is covered in [SVN Essentials](https://agiletribe.purplehillsbooks.com/2014/10/20/svn-essentials/).   However, if you are a project lead, and responsible for a project with multiple releases, you might need to also knows these details about branching and tagging.

## A Word about the SVN Way

I was familiar with a bunch of other SCMSs and had learned branching and tagging there.  The big problems with most such systems is how opaque and confusing they can be.  A tag is a magical thing that can be sued to retrieve code in the future.  A branch is even more confusing, because you can check code in on a branch, and keep it separate from the trunk.  The confusion comes mainly from reusing the location of a piece of source remains the same, when you look at different versions of it.  Imagine you have a project like this:

```
myproject /
    A.java      (tip revision)
    B.java      (tip revision)
    C.java      (tip revision)

```


You then go and tell the source management system to check out a particular branch “x” for editing.

```
myproject /
    A.java      (branch a)
    B.java      (branch a)
    C.java      (branch a)

```


The problem is that these look exactly the same.  You check out the branch in the same place that you check out the trunk code.  The annotation telling you what branch the file is from does not appear in the file system.  It is not clear at all.  It is very hard to tell exactly what version of the file you are actually looking at, and that created so much confusion on early projects that most programmers were prohibited from touching the branches.  
SVN decided to map branches into positions in the file system, and to use file folders to help you keep track of which version you are working on.  The trunk code is in a folder called trunk, and the branches are in folders under the branches folder.   You can see both the trunk and the branch at the same time:

```
myproject /
    trunk /
        A.java      (tip revision)
        B.java      (tip revision)
        C.java      (tip revision)
    branches /
        branch_a /
            A.java      (branch a)
            B.java      (branch a)
            C.java      (branch a)
```


By mapping the logical versioning to locations in folder, it is quite a bit easier to keep it straight.  In many ways the branch is actually a copy of the trunk, and so you create a branch by using the **svn copy** command. From the branch copy, you can still see all the history from the trunk, but otherwise it is just a copy made at that time, and like a normal copy, you can continue to modify.  
The same mechanism is used for tags.  For all intents and purposes, a tag is a copy made at a point in time so you get back to it.  SVN implements the tag as a copy in folders under the tags folder.  

There is a lot of sophistication that happens in the SVN server under the covers, but as a user you can ignore that.  A branch or a tag acts like a copy.  Merging code from on place to another is done exactly as you would if you merge code from classes in one folder, to classes in another folder.  You can use fancy three way merge tools to do this, or you can just edit the code and copy/paste lines.  It does not matter how you merge, because as far as SVN is concerned, you simply commit the new code however you accomplished the change.

## Using Branches

You make a release 15 of a product.  You want to start coding on release 16, but what if customers have a problem with release 15.  You might be in the middle of development for release 16, but need to get a quick fix for release 15 to the customer.  That is what branches are for.  

Generally, just before a release, there is a “code freeze” where the only change allowed are those needed to fix problems discovered in the final testing phase.  It is the code freeze point that you want to branch, so that other developers who are already working on the next release can get going.  

The biggest mistake I have seen in programmers thinking they will freeze the trunk (that is where the current release work has been done) and then go do the work for the next release on a branch.  Then, when release 15 is announced final, the changes on the branch will be merged into the trunk.  You can do this, but it is a backwards way to do it. If you do this, once you merge the changes for release 16 into the trunk, you no longer have any branch holding release 15 any more.  Because you want to always get back to exactly what release 15 was, the proper way is to put release 15 on a branch, and continue release 16 work on the trunk.  

All main line work should almost always be done on the trunk.   Release 15 is worked on the trunk up to the point of a code freeze.  At that point, a branch is made for release 15.  Once the branch is made (a copy of the trunk) then coding for release 16 can proceed on the trunk.   In code freeze, there are relatively few changes being made.  When you make a change on a branch, if that bug also exists in the trunk, you also need to make the change on the trunk.  You might be able to make the change in one place, and merge it fromt he branch to the trunk, however this is never guaranteed, and as the code base drifts apart over time, it is far safer to have an intelligent programmer simply re-implement the fix in both places taking all the proper precautions in each code base to make sure it is done correctly. 

Note that while a branch can bear the name of the release, it is impossible for the trunk folder to have the name of the release.  Otherwise you would have to keep renaming the trunk folder as you start new releases, but that is a huge bother.   Just get used to it.  The trunk is where all work for all future releases are done, and you make a branch only when a particular release gets to the code freeze stage.

## Create a Branch (e.g. codefreeze time)

Making a branch is easy.   You have to make up a unique name.  Let’s say you have reached the code freeze point in a release known as “release 15” you might make a branch for release 15.  Instead of working in your local SVN sandbox for these operation, you instead do them directly on the server

```
cd <playground>
svn copy <server>/<project>/trunk
         <server>/<project>/branches/release15
         -m "explanation about this commit"
```


This will branch the entire trunk, which you should ALWAYS do.  Never attempt to branch part of a project.  Never branch individual files.  The reason is that you will need to build the branch, and you will presumably need all the files that you have in the trunk in order to make the build.  Imagine that years from now the trunk will be changed in ways that you can not foresee.  You need to make sure that the branch has captured everything necessary to build that version.  

Editing and committing changes to a branch is done exactly the same as on the trunk.  Adding files and removing files is also identical.  It really does work just like a copy of entire trunk.

## Create a Tag

A tag is done exactly the same way.  Way you want to memorialize what you have on Nov 21, 2014, the day of an important demo.

```
cd <playground>
svn copy <server>/<project>/trunk
         <server>/<project>/tags/demo-2014-11-21
         -m "explanation about this commit"
```


or if you want to tag something on a branch that became the final release

```
cd <playground>
svn copy <server>/<project>/branches/release15
         <server>/<project>/tags/final-release-2014-11-21
         -m "explanation about this commit"
```


This just like a branch, except being a tag, you should not ever edit anything in a tag.  You want that to be permanent.

## Merging

If you need to merge code developed on one branch with code developed on another branch, you will have to look elsewhere for advice.  

My suggestion is to _avoid the need to merge in the first place_.  Simply don’t go an work for weeks or months on a separate copy of any source.  If you are working on a capability that needs to be hidden from some developers until it is ready, then implement a compile time or a run time switch.  Working on a new feature?  Make a configuration parameter that hides the button that launches the new feature from the user interface.  With that one small change, you can continue to develop the feature in the trunk.  The advantage of developing in the trunk is obvious:  as soon as someone commits a change that might conflict with your new feature, you can address it immediately.  If someone makes a wide reaching change, like renaming a class, you can incorporate those changes immediately, and continue working on your feature.  If your feature requires a new method in a class that others are using, you can change that class, check it in, and other code that does not use the method is not affected.  By having everyone work on the trunk you are eliminating the conflicts are they occur, and you avoid building a huge pile of debt.  

If you take the alternate approach of working for a long time on a branch, you build up a lot of technical debt.  There are many many conflicts building up.  By not incorporating those changes from the others on a daily basis, you are not only delaying the merge conflict, but actually exacerbating the problem because on your branch you will continue programming in a way that creates more conflicts with the trunk code.  When you eventually merge, you not only have a large job to resolve all the conflicts, but you generally can not do this incrementally.  You can not test anything until all the merge conflicts are resolved.  Since the chance of making a mistake is proportional the number of merge conflicts, you greatly increase the chance that a mistakes makes its way through the merging process into the testing process.  You then have to do a much more thorough test — and don’t think this can be automated because the tests themselves might have merge conflict mistakes in them. 

I have worked many large projects, and never had the situation that a feature needed to be developed on a branch.  I had many programmers _tell me_ that they needed to work on a branch, but I resisted every time I could.  They often think that by working on a branch they will be less bothered by daily changes by other programmers.  However, this logic is flawed.  If there is a change that would effect your work, it is far better to address that change now, rather than in the future.  Remember this:  the only code that is checked in is code that has run all the tests, and has been proven to be correct in some sense.  You are not incorporating random changes from others, but only the well considered, well written, well tested code that has been committed.  You will almost certainly have to deal with that change, you are far better off dealing with it now, than delaying that work to be done in one large pile later.  Then, as you work forward, you are testing all your own changes with that other change incorporated.  Had you been working on a branch, all the testing you do there is pointless, because you don’t have the changes of the others.  

Use a compile time switch, or a run time switch, to hide the UI from the user, but don’t hide the code from the other developers.  Refresh your working sandbox daily from the committed trunk, and address any problems immediately.  Develop your changes directly in the trunk with all the rest, and the entire team will be more productive.