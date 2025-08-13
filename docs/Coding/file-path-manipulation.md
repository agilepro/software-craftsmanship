#  File Path Manipulation

Three guidelines that make sense when handling files and paths.

*   Never Use Backslash in File Paths  
*   Don't use File.pathSeparator
*   Converting slashes from the user

When writing software that is portable, you have to face the situation that file paths on windows are composed with backslashes, and file paths in Unix require forward slashes.  

One approach is to attempt to construct correctly in both environments.  Make the file paths with backslash when the program runs in windows, and make them with forward slashes when running on Unix.  There are some features of Java that were designed to allow this.  This can greatly complicate the code handling, which is the source of bugs.  The interesting thing is that inside the Java code, you can always use slash instead of backslash.  In fact you can freely mix forward and backslash and they both work equally well.  

When composing URLs though, you must use only forward slashes. In many web applications you have to handle requests for URL style paths, and find resources in file style paths. The continual switching between slash and backslash is complicated.

## Never Use Backslash in File Paths

Always use a forward slash instead.

The smart approach then is to always use forward slash in all paths, file paths and URL paths.  Essentially never use backslashes in file paths.  In Java a forward slash will always work in place of a back slash when opening and manipulating files.  

The mistake behind attempting to make file paths fit the operating environment is immediately obvious if you consider a distributed system which has both Unix and Windows machines.  Consider a Java client running Windows talking to a Java Server running on Solaris.  If a file path is passed as a data value between them, the windows client might put backslashes into the path that it passes to the server.  If the server was to use that, it would have incorrect characters in it.  If the server does some manipulation of the path value, and the client does other manipulation, you will have inconsistent result.  Since you never know what platform is hosting a remote module, you need to assume the worst, and always convert file paths to your local format anytime you receive one from a piece of remote code.  As a data value passes through the system, it might get converted many times back and forth, and certainly there would be a lot of unnecessary testing of whether a path is in local form or not.   

All of this conversion is really silly: a distributed system should pick one format for the entire system, and use that everywhere on Windows, on Linux, and on Solaris.  The host of a piece of the distributed system does not matter: the entire system always uses forward slash.

## Don't use File.pathSeparator

This is a string provided by Java so that you can write code that checks either for a forward slash, or a backslash.  This of course tremendously complicates the code that manipulates paths, bloating the code with many lines, and slowing down the operation of such code.  

Don't use any of these:

*   File.PathSeparator
*   File.pathSeparatorChar
*   File.separator
*   File.separatorChar

Instead use a “/” instead.  The slash literal is clear, easy to read, and everyone knows what it means.

## Conversion on Entry

As soon as a path is received from an outside source (user entry or configuration file) convert the file path to have all forward slashes.  Then any code looking for slash characters or inserting slash characters is greatly simplified and becomes easier to maintain.  Converting a path once when it enters the system will end up being far smaller amount of processing, than if all the code that touches that path has to accommodate the various different slash characters.  

When we receive a path from the user, it is possible that they have entered a backslash, either by typing, or else by cut/paste, convert backslashes to forward slashes.

```java
if (path.indexOf("\\") != -1) {
    path = path.replace('\\', '/');
}
```

This is the fastest way to convert backslashes into forward slashes through the entire string.

## Use the File object when possible

Whenever possible, use a File object to carry a path around and manipulate.  If you have a method that is going to manipulate a folder, then the parameter to that method should be a File object, and not a string.  That allows for easy testing of whether the folder exists, and it helps assure that the path is of the right form.  It also does not matter whether the string passed in has forward or back slashes, so you don't need to convert.

```java
File folder = new Folder( givenPath );
```


If you then need to find a subfolder, use the File constructor that has two parameters.  
Wrong:

```java
File subfolder = new File( folder + "/" + subFolderName );
```

Right:

```java
File subfolder = new File( folder,  subFolderName );
```


This avoids use of a slash character completely.  You know that the folder is a complete path, and the subFolderName is a simple name.  The result is a proper path represented as a file object. 

Instead of parsing a file path and finding the slash positions, use the File methods as much as possible:

```java
File parent = folder.getParent();
```

Once again, this guarantees that the slash is found and parsed correctly, and there is no need to fiddle with slash characters.  
The one problem with the File object, is that when converted back to a string, it uses the separatorChar of the OS that it happens to be running on.  If you are passing the string elsewhere, you might need to convert this to forward slash characters.