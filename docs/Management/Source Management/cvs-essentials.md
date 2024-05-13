#  Essential CVS

I wrote up these cheat notes about 10 years ago, and I still use them today.  Just a short, brief, introductory instructions to using the CVS source management system.  Essentials that you need to get started.

## 1\. I don’t have any source and I need to get it.

This is where you use the GET command. Go to the directory that you want the tree to be built under. Run the command:

```
cvs get <directory>
```


For example:

```
cvs get Terminator/common
```


This will make a directory “Terminator” in the current directory, a directory “common” within that and get all the files and directories recursively within that. It will give you the tip revision of all of the files. You can specify all versions as of a particular date, or marked with a tag, but in normal use this is rare. GET is the same as CHECKOUT and also CO.

## 2\. I have got my sandbox (a folder tree of files), now what?

Go ahead and start coding. The files are all editable. There is no special checkout of individual files.

## 3\. How do check in my changes?

Now make sure that your tree is up to date and in sync with the master. This is done with UPDATE. Go to the highest directory that contains all the dependencies for what you are building, usually the top directory in the sandbox.

```
cvs -q update -d
```


This gives you a report of what it does, the first letter indicate the category:

*   **?** a file that cvs does not recognize, it is in your local directory but not in the archive. Temporary files will appear this way. Check to make sure that you did not forget to ADD some source files.
*   **U** a file that received some merged changes from the archive. This means you have to build and run the tests again. The client/server version also has a P marking that means the same thing.
*   **A** a file that you have added but not committed.
*   **R** a file that you have removed but not committed.
*   **C** Uh-oh, it tried to merge the changes, but found a merge conflict. The conflicts are marked in the source file; you must go edit. Usually it will not build until you do so.
*   **M** a file that you have modified, but did not receive any merged changes.

If you get and U or C reports, then you must rebuild and make sure that the tests run (you have new source so you don’t want to check in something that might be broken). After the build and all tests pass you do UPDATE again. Repeat until you do an UPDATE and there are no U or C reports.  
Now you can commit. Go to a directory that is above all of the changes you have made, again for the example “Terminator” will do.

```
cvs commit
```


This pops up an editor that lists all the files you are updating, and allows you to enter a summary of the changes you are checking in. Save and exit the editor and all you changes in all of the tree under the current directory will be committed in a single operation. If you want to specify the comment without the pop up editor, you can specify on the command line:

```
cvs commit –m “Here is a description of the changes”
```


Your commit is now complete.

## 4\. How can I see what have I changed?

At any point in time you can do an UPDATE to identify what files you have changed. You should feel confident about doing UPDATE at anytime since we only check in non-broken source, so the merged changes should usually not break your local source. If it does break it, then it was probably a change that you would have to respond to before checking in anyway. But there are times when you want to make sure that you do not get unexpected changes, so you can get a list of changed files without update by using:

```
cvs –n update
```


Occasionally you will notice a file in the list that you don’t think that you changed. See the changes that you have made in this file by going to that directory and typing:

```
cvs diff file.ext
```


This will show only the changes you have made from the version you checked out. There may be other changes in the current version on the server made by others if you have not done an update.

## 5\. I just created a file, how do I check it in?

The file exists locally, but not in the cvs archives. If it is a text file, use:

```
cvs add <file.ext>
```


If it is a binary file, and this includes doc, xls, db, etc. then you must turn off the searching for and substitution of keywords by using:

```
cvs add –kb <file.ext>
```


It will not actually be added until the next time you COMMIT. Make sure you use the right upper/lower case characters because even though the file system is not case sensitive, cvs is in certain places.  

WARNING: if your new file existed before and has been removed, cvs is supposed to reinstate the original file first from the so called Attic. Because of an apparent bug on NT this does not work. You know you are in this situation if after the cvs add you get the following message: cvs add: re-adding file xx (in place of dead revision 1.x). After this message your cvs commit will fail for that file.  

The workaround: (experts only) go to the cvs Attic directory in the cvs repository and rename the offending file. Then execute the cvs commit.

## 6\. How do I remove a file that is no longer needed?

Delete the file from you local directory like normal. Then use:

```
cvs remove <file.ext>
```

This will only delete the file the next time you do a COMMIT. What really happens is that the archive is moved into a directory on the server called “attic” so that if you request an old version of the file you will still be able to get it, the way it was before it was deleted. One restriction about cvs is that in order to support the recover of old file versions, it is not possible to delete directories.

## 7\. Who changed this file last?

In order to see the current settings on the file, as well as the date and comment of all the check-ins in the history of the file, go to the directory where the file is and use:

```
cvs log <file.ext>
```


## 8\. How do I make sure I have all the latest source?

The UPDATE command gets you all the latest files, but it will not add new directories to the tree unless you use the –D modifier:

```
cvs -q update –d
```


:::tip[Key Takeaway]

Learn the above commands — these are what you need for 99% of what you will be doing with CVS.

:::