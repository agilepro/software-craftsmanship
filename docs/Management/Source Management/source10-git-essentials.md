---
  id: git-essentials
---
#  GIT Essentials

This post contains a quick reference to the commands you need to know to use Git, the source management system. I assume you already understand the concepts behind source management. This quick reference is to the commands to use. 

Git claims to be so powerful that you can juggle and swap commits and branches and servers and repositories to make your head spin.  the main Git documentation seems overly impressed by these capabilities to the exclusion of the basics.  Here, I assume a team working on software with one central repository and that will serve 99% of the needs of most projects.  Developers will always refresh all the files of the latest trunk tip revision, and when ready they commit all the files back to the trunk forming a new tip revision.  The command below are focused on supporting that pattern, and helping developers make sure they do not make mistakes in the process.

## Site Structure

You will be making a repository on your local disk, and you can put that anywhere, but for this documentation we use an example of a folder at the root of your disk named “playground” (e.g. C:\\playground)  The project URL will be some URL that is provided by the hosting site to access the repository.

```
{playground}   = c:\playground\
{project}      = my-project
{sandbox}      = {playground}\{project}
               = c:\playground\my-project
{project-url}  = https://gethub.com/my-user/my-project.git
```


## Set Up Global

After installing git executable, you need to tell it who you are.  Once you set these, Git will remember who you are, and all uses of Git on you machine will be for this one user.

```
git config --global user.name {your-name}
git config --global user.email  {your-email}
```


## Check Out Existing Project

You always start with a project that exist in the server.  Create the project on the server if there is none yet. Every project has a web address which ends with “.git”. You always check out the files into the **playground** folder. and you get your working copy of the entire repository in a folder named after the project.

```
cd {playground}
git clone {project-url}
cd {project}
```


(– Right now I don’t have details of how to access a branch –)

## Refresh Your Sandbox

As you are working, you will want to _frequently_ get updates that other people have done, and have them merged into your working copy of the source. This is very easy, particularly if there are no conflicts. Do this as often as possible. The more often you do it, the less likely you are to get a conflict.

```
cd {playground}/{project}
git pull --rebase
```


Always refresh from the sandbox folder. For this to work, all of you local changes have to committed.  

If you have local committed changes, you MUST use the rebase option, otherwise Git will treat all the changes from all the other users as a change that you made.   Yes, unbelievably, without the rebase, the central repository will have a new duplicate commit attributed to you, with changes that you never made.  Rebase will make it so that the only changes in the repository attributed to you, are changes that you actually made.  On two occasions before we learned to use rebase, team members removed a commit, rolling back to an earlier state, and this had the effect of actually losing a bunch edits of other people.  It is dangerous to merge without using rebase.  

It is a bother to have to commit all your changes just so you can pick up the latest source.  All those commits become a permanent part of the final record, even if you are doing the commit just for the purpose of pulling the latest code.   To get around this, stash works fairly nicely, and makes GIT perform the way a system should:

```
cd {playground}/{project}
git stash
git pull --rebase
git stash apply.
```


This will pull all changes from others into your sandbox, and then merge your changes on top of that.  Not quite sure what happens if there is a conflict.

## See What Needs Pushing to Server

At any point in time, you can run the ‘status’ command to find out which files you have changed locally. It is quick and harmless.

```
cd {playground}/{project}
git status
```


This will tell you what files you have (1) changed, (2) deleted, or (3) added.  
Be aware that in certain situations GIT will not tell you about changes on the server that you have not picked up yet.  It only tells you about your own local changes.   If your status looks clean, you then need to “pull –rebase” in order to get everything from the server.

## Push Your changes

You make changes to source directly in the working copy folders. Never copy files out and back into this folder. Never produce compiler output into those folders. The only changes should be changes that you actually typed into the files. When you are ready to send them back to the server, it is quite easy:

```
cd {playground}/{project}
git commit -am "{a decent useful commit message}"
git push
```


Before you commit, (1) make sure you are up to date from the server, and (2) make sure you have done a complete build/test with the latest up to date versions of everything. Always commit from the trunk folder.  The only way to update from the server before a commit is to use the stash option mentioned above.  

Yes you need to do both the commands.  The Git developers seems impressed with the ability to commit to a local repository without sharing that with the rest of the team, but unless you are working entirely solitary without any team, this is really an exorbitant overhead as well as a potential failure point when you do one and forget the other.

## Adding a File

Create the file or folder in the working copy folder exactly where it is supposed to be. Go to that folder, on the command line:

```
git add {filename}
```


Git does not seem to care whether it is binary or text. If you add a folder in this way, it will also add all the files and folders that are within the folder. When you have added all the files/folders, go to the trunk folder and commit in the normal way.

## Removing a File

If there was a file that was part of the project, and it is no longer needed, then it should be removed. If you simply delete a file, GIT will assume you want to delete the file from the repository.  If you commit using the normal method the file will be removed.   So nothing special needs to be done as long as you are committing with the -a flag.

```
{delete the file}
git commit -am "{a decent useful commit message}"
git push
```


This works on folders as well. When you have marked all the files that you want removed, go to the trunk folder and commit like normal.

## Resolve Conflict

Resolving conflicts is never easy. If you get a conflict, then you need to take some time, figure out what changes you made, what changes the other person made. Look on line and read up on it. This short manual can not offer any real advice expect that most conflict are caused by going too long between refresh of the workspace. Be sure to update as often as possible, and avoid this problem.  

I am not including any instructions here, because every attempt at using GIT to resolve conflicts has failed.   In every case I have simply pulled a new copy of the repository, and simply made the changes again.  This is lame, and I am sure there is a technique that works, but it depends on how many conflicts you get and need to resolve.

## Creating a New Project

Go to the server (GitHub or GitLab), and create a new project. There should be only a single folder which represents the project, and is also a complete repository.  

Clone the project working copy to your local working environment and everything is the same as normal: add all of the source to the trunk folder and commit like normal. You can use any project structure you need, but keep it all within the trunk folder, so that later, when you make a branch, the branch will be a virtual copy of the trunk and will be a complete virtual copy of the trunk.

## Branching

Some source management systems allow you to branch on the server, but not all the GIT-based ones do.   Some require you to pull all the source, branch the source on your client, and then push the branch to the server.

## Terms

**playground** – this is a local-only folder that contains copies of projects from SVN server. You can’t use any local SVN commands in this folder. Generally, you can have as many playground folders that you want, or just one, it does not matter.  
**project folder** – this is a folder within the playground that represents the root of a project. Inside this folder will be the sandboxes for the trunk or for the branches that you are working on.  
**managed folder** – this is any local folder that contains files which are managed by the SCMS. Each file in a sandbox folder might have a matching file on the server which also contains all the old versions of that file. Also known as a ‘working copy’.  
**sandbox** – this is the root-most managed folder that contains the root-most files from the repository. This folder is special only in that it is the root-most level that you can refresh or use other SVN operations, and therefor it is the only place to get all the source from that particular source. This is the folder that you want to do all **commit** and **update** operations in.  
**repository** – this is a folder on the server that contains all the files that are versioned together. When a commit is made, all of the files in a repository get tracked as belonging to a single version. Things outside of the repository (in a different repository) will have a different version number.  
**project** – the SVN documentation throws this term around: you are allowed to have multiple projects in a repository, but you really should not do this. Each project (that is group of people coordinating work for a specific release) should have a repository. It can be OK for a project to have deliverables from two repositories, and it is OK if two projects are in the same repository, so don’t sweat too much if it gets set up differently. But in general every project should have one repository.  
**trunk folder** – Git does not map versions into local file folders, so there is no specific local trunk folder.  
**branches/tags folder** – Git does not map versions into local file folders, so there is no specific local branch or tag folder.

## Things to Avoid

*   Never check in part of a sandbox, never add some files leaving others unadded.  The reason is obvious: if your build requires a file, and you don’t check it in, you might be breaking the build for everyone else.  The only way you can prove that the collection of files checked in is always buildable is to build before checking in, and checking in all the files in your build.
*   Never go a long time between commits – The longer you wait, the greater chance of a conflict.  Linus Torvolds says you should not go more than a few hours of programming between checkins.  I agree.
*   Don’t mix generated files with source files – your source tree should be pristine and only have things that are source.  Generated files should be written to a different folder so that they are never confused with the source, and accidentally checked in.
*   Don’t check in generated files, because it would be possible to get a generated file that does not match the source because someone only checked in the generated file, and failed to check in the source.  Instead build for source every time.  (Exceptions are made if the builder is very rare, esoteric, or expensive.)
*   Don’t give pointless messages with commit: When people look at the commit, they will get a list of files, so you don’t need to put the list of files in the message.  Don’t just say “fixing bugs” since that is most of the time true.  The message should be something that will allow you 6 months from now to locate the work that you did.

## Colors

Git comes configured by default with atrocious colors using dark red on black with is unreadable.  This can be modified with a config call, but nowhere can I find a place which mentions what all the options are.   Here is how you change them:

```
git config --global color.status.added "green bold"
git config --global color.status.changed "yellow bold"
git config --global color.status.untracked "cyan bold"
git config --global color.diff.old "red bold"
git config --global color.diff.new "green bold"
git config --global color.diff.meta "yellow bold"
git config --global color.diff.frag "magenta bold" git config --global color.status auto
```


This makes the colors readable on a black screen for most monitors