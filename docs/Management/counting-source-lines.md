#  Counting Source Lines

I rarely count the number of lines of source — but here is a quick script to do it. 

I think it is a mistake to count lines, because it rewards the wrong kinds of behaviors.  Even being aware of the number of lines has a tendency to make you do the wrong things.  However, I work with some very conservative departments that insist on reporting lines.  

Because I rarely count them, I always forget the script to do it on windows. So I am putting it here so I can find it in the future when needed.  
This relies on the old NTRESKIT program called WC.EXE. This counts lines, words, and characters.  

The other thing to know is how to iterate across the file system. Here is the script.

```
FOR /F %G IN ('dir /s /b') DO c:\NTRESKIT\WC.EXE -l %G &amp;gt;&amp;gt;out.txt

```


starting at the current directory, this will recurse through all the folders, and count the lines appending each to the out.txt file. Take this file into a spreadsheet and sum the first column.  

I am sure there are way kewler ways to do this, but since I do this rarely, it works….

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [development](https://agiletribe.purplehillsbooks.com/tag/development/), [development method](https://agiletribe.purplehillsbooks.com/tag/development-method/), [source](https://agiletribe.purplehillsbooks.com/tag/source/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2016/02/22/counting-source-lines/ "Permalink to Counting Source Lines").