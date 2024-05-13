#  Source Management – 7 Rules

Those new to a source code management system tend to make a few predictable mistakes. These 7 rules are helpful to be learned right away and form a good practice from the beginning. I also have seen some experienced programmers who could benefit from following these rules.

## 1\. Sandbox sync with running environment

You sandbox is the place where you have all the source checked out to. In some cases the runtime environment needs a source file that does not need to be compiled. Examples include html files, css files, js files, jsp files, etc. There is no compile step.  
Often the runtime environment is in a different place. Learn how to synchronize the sandbox properly with the runtime environment (e.g. a servlet engine like TomCAt or JBOSS). A one directional copy (from sandbox to runtime) is fine until you change a file in the runtime environment. Making a change in the runtime environment allows you to get instant feedback on whether the change is right, and so this is an important development technique. Only, be sure to get those changes back to the sandbox ASAP. There are two approaches:  
(1) Never make changes in the runtime, only in the sandbox, and always copy all the file from sandbox to runtime quickly and often.  
(2) Allow changes in runtime, but use a bidirectional sync tool that understands the files that were changed, and synchronizes them appropriately in the right direction.

## 2\. Update Often

You are working in a team. Never go forward on your own and code for a week. Not even for a day. You need to have all the latest changes in your environment constantly. If Jack added a new variable to the class, you want that new variable in your environment as quickly as possible. If Betty renamed a method, you want to get that renamed method as quickly as possible. Try to update as often as possible.  
There is a realistic limit. If you make a change to a piece of code, you are going to want to run and test it that your change is still working. But every time you you are not right in the middle of editing or testing, you should consider updating. Hourly is a good goal. Certainly every time you sit down to start programming (e.g. at the beginning of the day or when returning from lunch) the first thing you should do is update and bring in all the change from the other developers.

## 3\. Locally sync before update

The update will merge changes into the files that you have made changes, but it is absolutely critical that all your changes are in the sandbox when you do this. Using hint #1 above, be sure that the runtime and sandbox are synchronized, before doing the update form the source.

## 4\. Test after update before commit

Before you commit, you must test that your changes are working. Before you test, you have to get all the changes from everyone else, and test your changes with all of them. If you ahve been updating regularly, this is not a problem. Just make it a habit: update all the source, build, and run the tests, before committing.

## 5\. Probe update before commit

After you have run the tests, and you are ready to commit your changes, do one more update. You should see no changes, but do it just to make sure. Then do the commit.

## 6\. Only source, never check in generated files

Source is source … it is the beginning point for making a product. You have no need to check in the class files, or the object files, or whatever the compiler generates. The source should give you everything you need to build the product, and nothing more.  
There are several problems you can run into if you fail to heed this. Checking in object code can ultimately lead you to losing the source. If someone checks in a class file, and the build starts using that class file, then the tests are testing the class file, not the source file. The source file could get changed and nobody would notice it. The source file might even be deleted as not being needed. Later, when you need to make a change, the source file is not there, or is not correct any more for the product. Avoid these problem by NEVER checking in the output of the compiler.

## 7\. Never build in the sandbox

The build produces output. That output should never be written into the sandbox folders that are managed by the source management system. The are two problems. You might end up checking in some of these output files, and run into the problems above. Also, every build is causing a lot of changed files to appear in the source management system, and that forces everyone to get a new copy of all these output files every time anyone makes even a small change.  
The second problem is that if you do not check these files in, then you have a lot of noise when you go to check what changed. For example, make a one line change, build the 100 classes, and the source management system sees 101 changes. It is important to be able to see quickly what has and has not changes. What if 102 showed up in the list because of a file you did not mean to change? Would you see it?  
The build should READ from the sandbox folder, but all output should go to a different folder, separate from the sandbox. Design you build like this, and you will never have the problem above. The Java compile default behavior is to put all the class files in the same folders as the source files. Don’t use this! There is a “-o” parameter that allows you to tell the java compiler where to put the classes. Set up the build script to do this, and avoid this problem

## Summary

The point of these practices is to allow you to focus on the job of programming. There are important logic problems to be solved in making the code right. These rules allow you to avoid a whole other set of problem which can take time and effort. That is a waste. Avoid as much unnecessary effort as possible, so that you can focus on the coding task.