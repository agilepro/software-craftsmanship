---
  id: git-branching
---
#  Git Branching

I found a lot of the documentation is incomplete and only useful to those who already know how to do it.  Plus, they usually are based on unrealistic scenarios.  Here are the notes that are useful to me to make and control branches.

## Setting

There are many ways to use branches, but let me be very specific on how I use them.  I have a development project and everyone uses the trunk.  At appointed times we make releases.  Occasionally, a couple of month after a release, a customer asks for a very minor revision to a release, at a time when development is heavy and the trunk is not in a state to release. 
 
I make a branch from the version that was used for the release.  Then we put only the changes on that branch needed for patch releases.  We don't do a lot of work there, and we only use it for small fixes on old builds.

## Access a Branch

To access a branch that was created by someone else:

```
git checkout {branch-name}
```


NOTE: git local repositories will drift away from remote ones and occasionally get into a state that causes failures with cryptic error messages. If these branch commands are not working for you, before you waste a lot of time debugging what is wrong, go and clone a new copy of the remote repository. That usually fixes the problem with being able to access branches.  
When done, return to normal mode with

```
git checkout master
```


## Make a Branch

First pull a fresh copy of the repository in a clean place so you are sure there are not any unexpected files or any wayward settings in the clone.  I usually

```
git clone {repository URL}
```


This will clone a repository from the server and make a set of files and folders in the current directory.  Change directory into the new folder that was created by the clone.  Dump the change log:

```
git log >out.txt
```


Review the output and find the commit you want by date and time, and make note of the commit hash.  Now make a branch based on that hash.

```
git branch {branch name} {commit hash}
```


That makes the definition of the branch, but so far you do not have access to the file versions of that branch.  Make that branch your current branch

```
git checkout {branch name}
```


That will copy out all the right versions of all the files into the file system.  Now you have to push that to the main repository.  (Might be able to do this and the last step in either order, but I know this order works.)

```
git push --set-upstream origin {branch name}
```


At this point you have a functional clone of the branch of the repository.  Edit the files, commit the changes, and push the changes just like normal and your changes will be on the branch.

## Deleting a branch

If there is a branch on the remote repository that you want to delete:

```
git push origin --delete {branch name}
```


You will still have a local copy of the branch, and that can be deleted with:

```
git branch -d {branch name}
```


This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [practice](https://agiletribe.purplehillsbooks.com/category/practice/) and tagged [branch](https://agiletribe.purplehillsbooks.com/tag/branch/), [git](https://agiletribe.purplehillsbooks.com/tag/git/), [repository](https://agiletribe.purplehillsbooks.com/tag/repository/), [source](https://agiletribe.purplehillsbooks.com/tag/source/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2018/02/01/git-branching/ "Permalink to Git Branching").