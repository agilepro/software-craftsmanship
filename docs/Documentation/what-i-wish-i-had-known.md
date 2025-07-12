#  LaTeX Hints

I do a lot of writing, and I switched recently from a variety of word processors etc. to LaTeX. It is free, well supported, and does a great job of typesetting books. But for a normal business user with a normal experience in WYSIWYG word processors there are some big surprises. Here is what I wish I knew before starting that journey.

First, start by abandoning all hope. Forget everything you know. Then claw your way back to reality from there. There are hundreds of things that we take for granted everyday that is incredibly difficult to do in LaTeX. At the same time, LaTeX offers unlimited capability to format and typeset the most difficult and complex situations.  

The best place to start is “The Not So Short Introduction to LATEX2” by Tobias Oetiker. Hubert Partl, Irene Hyna and Elisabeth Schlegl available in many languages ([ftp://ftp.tex.ac.uk/tex-archive/info/lshort/](ftp://ftp.tex.ac.uk/tex-archive/info/lshort/)) It is a fine reference, but you soon notice a few things. For example, it spends an entire page telling you how to pronounce “LaTeX”. But later never quite gets around to telling you the most important thing you need to know: what the parameters to “documentclass” are, which is the required command at the top of every LaTeX file.  

Another starter reference is [http://en.wikibooks.org/wiki/LaTeX/](http://en.wikibooks.org/wiki/LaTeX/)  

So much of the documentation lacks clear details on exactly how to do things. I have come to the conclusion that this is because nobody actually knows. The LaTeX system is very extensible, and this is the power of LaTeX. Anything can modify anything. Sounds like a nightmare, but actually it all works quite well. I am quite convinced that a small script might be able to make it so that every other page is printed upside down and mirror imaged. Most of the documentation describes parameters saying “enter an appropriate command” without listing the commands, because the authors have no idea what commands are available to you in your environment. This is so frustrating. They will provide an “example” of a setting that works . . . but if you don’t need that exact example, there is no way to know what other things you might need. however, if you dig far enough, there is tons of documentation, and somewhere in the mess you will find it. I hope to give you some short cuts below.

## Which Engine

There are a bunch of different versions of latex out there, each with their own command line name. Different commands will or will not work in different engines. When you download the distribution from MiKTeX (http://www.miktex.org/about) you seem to get a lot of them in the bundle. That makes it easier, but you still have to choose. Once you start using options, you will be locked into one of them. 

I started using **pdflatex** because somewhere it said this was good for making PDF output. But then I found out that it does not allow you to specify a font. LaTeX starts with the idea that you should never know or care about typefaces, and makes it incredibly difficult to select a typeface. There are some packages that allow this, and they work with **xelatex**. I recommend starting with **xelatex**.

## Syntax

The short intro document covers this well. You are working in text. Take your word document, and export to text, and use your favorite text editor. it MUST have the filename suffix “.tex”. 

Some character have a special meaning. On freshly exported text, do a global search and replace: 1) replace all existing backslashes with ‘\\textbackslash’ 2) Replace all occurrences of # $ % & \_ \{ or \} with \\# \\$ \\% \\& \\\_ \\\{ or \\\} Now you have a text file ready for marking up. 

Paragraphs are simply separated by a blank line. If the export did not put blank lines between paragraphs, you should do that now. I use a small macro that adds a return at the beginning of a line, and then moves to the next line.  

All commands start with a backslash, and usually consume the space after the command. Percent signs make the rest of the line a comment. Lots of parameters are delimited with curly braces, although some are delimited with square brackets. Sometimes commas allow multiple values. Some commands 1, 2, 3, four or more parameters, and in some cases some of the parameters are optional. Sometimes the square bracket is used in the documentation to denote an optional parameter, and other times they indicate a required parameter with square bracket around it. Do what everyone else does: copy the example provided, and then carefully attempt tweaks to it, testing each tweak to see if it breaks something. Eventually you will get it close enough or you will decide you never really wanted that in the first place.

## \\documentclass

You tex file must start with the document class command. This defines what you can and can not do in the document, which is kind of important. Some classes will allow you to have chapters, other document classes will not allow you to have chapters. I have not found anyplace that tells you exactly what a document class can and can not do. I suspect nobody knows. The Short Introduction document gives a list of document types and a short description. (`article`, `proc`, `minimal`, `report`, `book`, `slides`) Forget all that.  

If you want to control the size and shape of the text in the way you are used to, you have to use `scrartcl`, `scrreprt`, `scrbook`, or `scrlettr`. These are called the KOMA classes, because calling them the “scr” classes would be _waaay_ too logical. I can’t for the life of me figure out why they didn’t name the classes starting with ‘koma’ but then LaTeX is filled with all sorts of random inconsistencies like this. 

These KOMA classes allow you to control the margins and the fonts within the document you are writing, in a way that is vaguely reminiscent of the way you word-processor does.  

There are options in square brackets. You look at the documentation of the specific document class to find out what you can place there, and even then there are options that you can use which I have not found documented or defined anywhere. Here are some of the settings that I have used, in case that is a help:

```
\documentclass[11pt,executivepaper,headsepline,footsepline]{scrbook}
\documentclass[paper=6in:9in,pagesize=pdftex,
               headinclude=on,footinclude=on,12pt]{scrbook}
\documentclass[10pt,conference,compsocconf]{IEEEtran}
```


The first of these is an executive paper (7.25 x 10.5) sized book, the second is for 6 x 9 book, and the third is a two column conference proceeding for IEEE conference.  
