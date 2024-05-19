---
id: latex-for-authors
title: LaTeX Essentials
---

#  What an Author needs to know about LaTeX

This post is for authors who choose a publisher who likes to use LaTeX for layout, and want to make changes to the marked up source directly.  It is quite easy to edit LaTeX files, as long as you just know a few things to avoid.  Here is the minimum you need to know to be effective at editing the content.  

You are the author, and you are responsible for the content of the book.  You are not a LaTeX expert and you don’t need to be.  Mixed in with the content are a bunch of LaTeX command which will ultimately cause the book to be formatted properly.  Having someone else responsible for the layout is a good idea because LaTeX commands are capricious and there are a lot of esoteric rules you need to know to alter the way a particular publication will look.  But you can leave that to the LaTeX experts!  Your job is to focus on the content, and get the written word correct regardless of the formatting and style of the printed layout.

## Basics

The source file is a text file.  That means you can use any text editor, whatever is your favorite.  If you have no preference, MS WordPad will do fine.  Better editors like TextPad offer coloring of command for TeX files, so look for that since it will help you avoid mistakes.  

Most of the words and sentences in your book will appear as exactly the same words and sentences in the source file.  A blank line separates one paragraph from another.  A paragraph can all be on one line, or as many lines as you like, as long as there is no blank line in the middle, because that would start a new paragraph.

```
This is a paragraph on one long line.
This is
a paragraph
on multiple
lines.
```


## Special Characters

You are free to include most characters in your text.  There are just ten special ones you need to be careful about.  These are  `$`, `%`, `#`, `\`, `{`, `}`, `^`, `\`, `~`, and `&`.   If you want one of these characters to appear in your text, you need to put a backslash before them.  For a `$` to appear, you must type `\$` into the source. Thus, use  `\$`, `\%`, `\#`, `\\`, `\{`, `\}`, `\^`, `\_`, `\~`, and `\&`.

## Commands

When you first look at a LaTeX source file, you will probably immediately notice commands in an among the text, and these commands start with a backslash.   The general form is backslash, then command name, then open curley brace, some text, and close curley brace.  The following are some commands that you might see:

```
\chapter{Chapter Titles are Important}
\section{The Section Title}
\index{Newton, Issac}
\begin{quote}
\end{quote}
\emph{This phrase will print in italics}
```

The first starts a new chapter, and the text in the curley braces is the title of the new chapter.  The second starts a section, again the section title in the braces.  The third will cause an index entry in the index to point back to this location in the book.  The fourth and fifth are placed around block quotes.  The sixth will make a span of text to be set in italic font.  Some commands have no parameters, some have multiple parameters, and some have optional parameters in square brackets:

```
\newline
\addtokomafont{chapterprefix}{\raggedleft}
\setmainfont[Ligatures={Common,TeX}, Numbers={OldStyle}]{Palatino Linotype}
```

One important think to know is that commands without any braces will consume any white space after them.  To avoid this put a pair of braces with nothing between after the command.  Thus `\newline{}` and `\newline` are the same thing, except the latter will consume the white space and it will be as there was no space there. For the most part, stay away from the complicated instructions.  Those are not likely to have any significant content text in them.

## Quote Characters

LaTeX is set up to have proper quotation marks where the marks that start the phrase are different than the ones that end the phrase, but the writer needs to do this manually — there are no smart quotes.  It is pretty easy: there is a “before” single quote character and an “after” single quote character.  For double quotes, just use two of them.  It works like this:

```
He yelled ``Watch out!'' before jumping in the pool.
```


The BEFORE quote character is the key that is usually on the top left of the keyboard, above the tab key, and on the same key with the tilde character.   The AFTER quote character is the normal apostrophe which is usually on the right of the keyboard next to the enter key.  LaTeX will transform these character into the appropriate begin and end quote supported by the font you have selected.  
You should not use the double-quote character (") at all, and you can not use the special unicode before-double-quote nor the special unicode after-double-quote.  

## Hyphens and Dashes

LaTeX has three kinds of dashes.  

* The short is a simple hyphen which appears between words to make a single hyphenated  word.  To do this use a single hyphen character as you would normally expect. 
* An N-Dash is a bit longer, and is used to specify a range of things, such as pages 32–35.  For an N-Dash use two hyphens together.  
* An M-Dash is a longer dash that is used to separate a part of a sentence from another part.  For this use three hyphen in a row. 

Here are some examples:

```
The state-of-the-art video-game failed on first-run.
Please read pages 3, 12--15, and 20--23
Mr. Jobs---no relation to Steve Jobs---was the first in line.
```


## Conclusion

So if you can use a text editor, can handle a few special characters, and some commands that start with backslash, that is all you need to know to edit the content of your LaTeX formatted book source.