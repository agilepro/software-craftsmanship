#  9 Rules for Designing the Build

Every software product needs to be built, and the script to build it is as much part of the product as anything else.  Here are some guidelines around how to design the build script.  

It does not matter which technologies you use to automate a build: Ant, Maven, Make, Batch files, C shell scripts, and any number of others. You may have your favorite, and for good reasons, but no matter which one you use, there are some guidelines around how you structure the source and design the build:

1.  Don't pollute the source folders with derived output
2.  Build script only reads from the source folders
3.  Keep things as simple as possible
4.  Clearly report errors
5.  Preserve the same folder structure when possible
6.  Place the build settings apart from the product settings
7.  Keep the number of settings as small as possible
8.  Automate as much as possible
9.  Make it as fast as possible

## Don't pollute the source folders with derived output

Your source is checked into a source management system (SCMS), and they (usually) appear as a set of sandbox folders on your local disk.  The changes that a programmer makes within those folders should ONLY be changes to be preserved in the SCMS. 

When a programmer works on a product, there are programming mistakes, and there are mistakes of forgetting to check everything in.  Forgetting to check in a new file, or a modified file can cause the build to break, or worse.  If the programmer removes a file from the product, but forgets to remove it from the repository, then again the build could break for others because they have an extra file.  It is critical that the system be designed to make it as easy as possible for programmers to get everything checked in, every time.  

Generally an SCMS will provide a capability to see the status of your sandbox: what files are changed and what files are new.  You know you have everything checked in when this report shows that there are no modified files, no missing files, and no extra files.  If your build puts extra files into these sandbox folders, then the problem is that these build files show up as “extra” files in the report.  These files cause noise, making it hard to see whether there is a real, important file that you forgot to check in.  

To make it obvious to the programmer that everything is accounted for, it is critical that the build does NOT pollute the sandbox folders with intermediate or final output files.  

The solution is simple: the programmer designates a “build folder” which is outside of the source sandbox.  All intermediate results, and all final results, are written into that build folder, or subfolders of that folder.

## The build script only reads from the source folders

This is the same as the previous: by only reading from the source folders, you guarantee that the build does not pollute the source folders.  

This has another positive effect: if the source is on a read-only media, you can still build directly from it.  If the source is on a read-only shared drive, you can still build directly from it.  If you have kept a set of backup snapshots of the source, you can safely build from those old snapshots without worrying that you will be corrupting them.

## Keep things as simple as possible

Some programmers think it is really cool to build elaborate, complicated scripts that do surprising things.  A build script should never surprise, and should be no more elaborate than absolutely needed.  Building is not something that programmers do for fun. They want it to work.  And, when the product changes, they want to be able to make the necessary changes to the build script to accommodate those changes. They do not want to have to study the script for a long time to figure out how it works for a small change.  

A build script should be straight forward and transparent; logically organized, and methodical, without any tricky aspects.  The script should be well documented, like the rest of the product code.

## Clearly Report Errors

One of the most important functions of the build script is to make sure if there is a failure during the build, that the problems are reported to the user.  This generally means being sure to stop building as soon as a serious error is encountered.  Scripts that ignore errors, and continue on regardless, make it hard for the programmer to find the errors.

## Preserve the same folder structure when possible between the source and the final product

While the run-time folder structure does not need to be the same as the development structure, it makes a lot of things easier if it is.  Files that reference each other with a relative path will need the same path in both.  HTML files include image files and style sheet files, and it is convenient when those are in the same relative relationship in the development environment.  Fewer mistakes will be made by the programmers, and it will be easier to get things done.

## Place the build settings apart from the product settings

The build should be as isolated from the build environment as possible, but it can never be perfectly so.  There are always a few things about the system that are needed: where is the root of the source, where is the build directory, where is the right version of the compiler, etc. 

Do not mix the settings that each programmer needs to change together with settings that define the product. For example, the setting to where the source folder is, should not be next to a setting that defines the schema version of the data files the product reads.  This latter setting is actually part of the product: it only runs correctly when it is set to a specific value.  The settings for the product are part of the product and must be properly maintained as source.  The settings for the build are individually maintained different for each developer.  It should be obvious, that mising personal settings and product critical settings will either cause merge conflicts, or regular loss of build settings, or potential to be running with out of date values.

## Keep the number of settings as small as possible

To build the product, each programmer will need to make sure that they have the right settings for their environment.  This should be as few as possible.  If they are too numerous, then it can be tedious to assure they are all set.  If there are many, then there is a higher likelihood that one or more is wrong.   It is worth the consideration to make sure that there is an absolute minimum number.  Within the build, other settings can be derived from those initial settings, but that should be entirely automated.  

Put all these setting in a single, clear place, either a config file or a small script holding the settings.  The developer copies this file to their build folder, and edits it.  This file should contain only build settings, and the build settings is the only information read from the build folder.

## Automate as much as possible

Do not force the programmer to take steps in the middle of the build, or to finish up the build in any way.  The more automated it is, the more success programmers will have.  The build script must be treated as an important part of the product.  Ideally a single command, “build”, is sufficient.  Usually, the programmer will have to set up a few settings, and then it will be exactly this easy.  The programmer should not have to know anything about the product in order to build it.

## Make it as fast as possible

The primary focus of a build is on methodically assuring that it is complete and correct.  Without compromising any of these, it is worth considering how to make the build fast.  The faster it is, the fast the turnaround between coding and testing.  The programmer will build the product many many times a day.  A build that takes 7 minutes instead of 10 minutes might end up saving a lot of waiting time every day.  More importantly: when there is a critical build, or you are responding to a critical customer problem, that turnaround time can make a big difference.

## A Successful Pattern

Above are the design guidelines.  There is a simple pattern that I have found useful:

*   the source sandbox has a “build” folder that has things in it necessary for the build: the default config file and the small shell script.
*   The developer creates a new build folder on a writable file system.
*   The developer copies the contents of the build source folder into the actual build folder.
*   Note that the main build script (the ANT file for example) is NOT brought to the build folder, and remains in the source sandbox under version control.  Things brought to the build folder have to be so trivial that you can assure they will essentially never need changing.
*   The developer edits the config file to make the 3 to 6 settings necessary for the build to run.  Since this editing is done outside of the sandbox, it has no chance of accidentally being checked in.
*   The first step of the build is to validate to the extent possible the settings that the programmer has set.  Clearly the source and output folders should exist.  The idea is to stop the build if anything looks wrong before the build wastes a lot of time, or misbehaves.
*   The second step is to remove everything from the build directory that might be left over from a previous build, assuring that all parts are properly rebuilt.  (Note: this may not be suitable for some languages, and in that case this requirement is relaxed.)
*   The build is designed to write all intermediate and final results into folders within the build directory.
*   Test files often product output, and those should also be written to a folder under the build folder, and compared to files maintained in the source sandbox.

This patterns can be used with Make, Maven, Ant, and any number of other build technologies.

## Build Fails

There are some many way that a build can be done wrong, here are some common ones to avoid:

*   Don't ask the programmer to edit a settings file in the source sandbox, because it might accidentally get checked in, and write over other programmers settings.
*   Don't use the default mode of compilers that write the object code out into the same folder as the source file. This produces a large number of extra files that hide whether all the files are properly checked in or not.
*   Don't attempt to run programs directly from the sand box . . . for instance don't configure a web server to serve JSP files and images directly from the source sandbox.  Server can and do write to some directories at some times, or they update some files.  The only updates in these folders should be one make on purpose by the programmer in the course of programming.
*   Don't write test output directly to the source sand box. There should be a manual step to copy the reference output, only when the programmer is assured that the results of the test are correct. Otherwise you run the risk that the invalid test output gets checked into the SCMS.
*   Don't require that some of the source folders be deleted or moved in order for the build to work.  The code should check out from the SCMS in exactly the format that is needed for the build to run.
*   Don't spread the settings for building inside the actual sizable build script, forcing the programmer to hunt for the place to make the change.  Deliberately identify all of the settings that the programmer needs to make, and put them all in one file that is copied to the build folder.
*   Don't put the build script into the build folder, or programmers run the risk that someone else will make an important change to the build script, and they will not get it.  The actual build script should remain in the SCMS sandbox folders, under version control.
*   Don't require the programmer to manually clean up after the last build in order to assure that the build is done correctly.  The build script should work repeatedly many times in a row without any other clean up than what is automated.
*   Don't build a bunch of folders that are exactly like the findal product, except that there are a couple of extra source folders in the middle that need to be removed.  Instead, think about making within the root source folder, a single folder that reflects the final product, and the folders outside this to hold things that are needed for the build, but not part of the delivered product.  For example, JSP files are shipped in the product directly without compiling, but JAVA files must be compiled and not included.  Do not mix JSP files together with JAVA files — keep the Java separate from the folder shaped like the product.