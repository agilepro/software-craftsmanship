#  SVN Essentials

This post contains a quick reference to the commands you need to know to use Subversion (SVN).  I assume you already understand the concepts behind source management.  This quick reference is to the commands to use.

## Site Structure

Not all sites are constructed this way, but this page assumes that the URL that you access is structured like this:

```
<url> = <server>/<project>/trunk
```


for example:

```
https://svnserver.com/svn/cognoscenti/trunk/
<server-url>   = https://svnserver.com/svn
<project>      = cognoscenti
<project-url>  = <server-url>/<project>
               = https://svnserver.com/svn/cognoscenti
```


There should be a trunk folder directly within the project folder, and you want to pull the trunk folder so that you do no have to have a copy of all the various branches and tags.  
You will be making a copy on your local disk, and you can put that anywhere, but we will assume (for this documentation) that it will be in a folder at the root of your disk named “playground”  (e.g. C:\\playground)

```
<playground>   = c:\playground\
<project-folder>  = c:\playground\<project>
               = c:\playground\cognoscenti
<sandbox>      = <playground>\<project>\trunk
               = c:\playground\cognoscenti\trunk
```


## Check Out Existing Project

99% of the time, the project will already exist in the server, you will want to get the entire trunk.  You always do this in the **playground** folder.  and you get your working copy of the trunk by doing:

```
cd <playground>
svn checkout --username <user>  <server>/<project>/trunk  <project>/trunk
```


The sandbox-container is whatever folder on your drive where you want to keep all your projects you are working on.   The checkout command will make a working copy of the entire project (trunk, all branches, all tags) in a folder named with the project name (or whatever you place for the second occurrence of the project name.  Make sure there is not already a folder with that name there, or bad things could happen.  
If you want to view or work on a branch or a tag, then of course do the same thing, but put the path to the branch instead of the trunk:

```
cd <playground>
svn checkout --username <user>  <server>/<project>/branches/release1
         <project>/branches/release1
```


## Refresh Your Sandbox

As you are working, you will want to get updates that other people have done, and have them merged into your working copy of the source.  This is very easy, particularly if there are no conflicts.  Do this as often as possible.  The more often you do it, the less likely you are to get a conflict.

```
cd <playground>/<project>/trunk
svn update
```


Always refresh from the sandbox folder (the trunk folder if working on the trunk)

## See What Needs Committing

At any point in time, you can run the ‘status’ command to find out which files you have changed locally.  It is quick and harmless.

```
cd <playground>/<project>/trunk
svn status
```


This will tell you what files you have (1) changed, (2) deleted, or (3) added.

## Commit Your changes

You make changes to source directly in the working copy folders.  Never copy files out and back into this folder.  Never produce compiler output into those folders.  The only changes should be changes that you actually typed into the files.  When you are ready to send them back to the server, it is quite easy:

```
cd <playground>/<project>/trunk
svn commit -m "<your message here>"
```


Before you commit, (1) make sure you are up to date, and (2) make sure you have done a complete build/test with the latest up to date versions of everything.  Always commit from the trunk folder.

## Adding a File

Create the file or folder in the working copy folder exactly where it is supposed to be.  Go to that folder, on the command line:

```
svn add <filename>
```


SVN should automatically detect if the file is binary or text.  If you add a folder in this way, it will also add all the files and folders that are within the folder.  When you have added all the files/folders, go to the trunk folder and commit in the normal way.

## Removing a File

If there was a file that was part of the project, and it is no longer needed, then it should be removed.  If you simply delete a file from your working copy, it will be refreshed from the repository the next time you update.  You need to tell SVN that it should be marked as deleted.

```
svn remove <filename>
```


This works on folders as well.  When you have marked all the files that you want removed, go to the trunk folder and commit like normal.

## Resolve Conflict

Resolving conflicts is never easy.  If you get a conflict, then you need to take some time, figure out what changes you made, what changes the other person made.  Look on line and read up on it.  This short manual can not offer any real advice expect that most conflict are caused by going too long between refresh of the workspace.  Be sure to update as often as possible, and avoid this problem.  
Edit the file in conflict until it is correct, and the project builds, and runs correctly.  Then clear the conflict status by using:

```
svn resolve --accept=working <filename>
```


## Creating a New Project

The best way to start is to go to the server, and create a new root level repository for the project.  There should be only a single folder which represents the project, and is also a complete repository.  Within that single project, there should be a ‘trunk’ project.  There might also be a ‘branches’ and a ‘tags’ folder, but those can be created later just as easily.  
Pull the project working copy to your local working environment and everything is the same as normal:  add all of the source to the trunk folder and commit like normal.  You can use any project structure you need, but keep it all within the trunk folder, so that later, when you make a branch, the branch will be a virtual copy of the trunk and will be a complete virtual copy of the trunk.

## Checking out Part of a Project

I looked into this, and it is ugly.  Don’t do this.  Always check out the entire trunk or branch of a project.

## Terms

**playground** – this is a local-only folder that contains copies of projects from SVN server.  You can’t use any local SVN commands in this folder.  Generally, you can have as many playground folders that you want, or just one, it does not matter.  
**project folder** – this is a folder within the playground that represents the root of a project.  Inside this folder will be the sandboxes for the trunk or for the branches that you are working on.  
**managed folder**  – this is any local folder that contains files which are managed by the SCMS.  Each file in a sandbox folder might have a matching file on the server which also contains all the old versions of that file.  Also known as a ‘working copy’.  
**sandbox** – this is the root-most managed folder that contains the root-most files from the repository.  This folder is special only in that it is the root-most level that you can refresh or use other SVN operations, and therefor it is the only place to get all the source from that particular source.  This is the folder that you want to do all **commit** and **update** operations in.  
**repository** – this is a folder on the server that contains all the files that are versioned together.  When a commit is made, all of the files in a repository get tracked as belonging to a single version.  Things outside of the repository (in a different repository) will have a different version number.  
**project** – the SVN documentation throws this term around: you are allowed to have multiple projects in a repository, but you really should not do this.  Each project (that is group of people coordinating work for a specific release) should have a repository.  It can be OK for a project to have deliverables from two repositories, and it is OK if two projects are in the same repository, so don’t sweat too much if it gets set up differently.  But in general every project should have one repository.  
**trunk folder** – SVN is designed to have a specific folder named ‘trunk’ which contains all the source, documentation, and everything for the project.  The trunk folder should be within the single project/repository folder and the trunk folder should contain ALL of the artifacts for the project.  Never make any other source folders at this level, because it is the contents of the trunk folder that is copied for a branch, and you want everything to be in a branch.   This is the correct place to commit from.  
**branches/tags folder** – siblings to the trunk folder, contains folders that are essentially _copies_ of the trunk folder.  If you feel like you want to make a backup copy of the entire project, you should use the project SVN command to do that, and it should always be a copy of the trunk make into a folder in the branches or tags folders.