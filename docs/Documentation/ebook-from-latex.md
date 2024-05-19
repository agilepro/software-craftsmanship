#  LaTeX eBook 

Having completely finished with the layout of my new book using XeLaTeX, I now want to make an eBook.  The error messages with LaTeX are always completely cryptic, so you normally have to debug by adding a single line of source and rebuilding to see if that break anything.   It is slow and tedious work, and this post contains a list of things I discovered using this method.

*   Good document at [http://folk.uio.no/simek/document/document.pdf](http://folk.uio.no/simek/document/document.pdf)
*   can not use \\documentclass\{scrbook\} — this causes an immediate failure with a cryptic error about \\MessageBreak.   You have to use \\documentclass\{book\} instead.
*   Can not use \\subtitle.   This might be a scrbook feature not available in the regular book
*   Does not have support for \\includegraphics — have to \\usepackage\{graphicx\}
*   graphic file name has to have the extension.  Solution to this is involved because it involves creating a command for including the graphic file name that manipulates the name differently depending upon whether it is an eBook or not.  Throughout the whole book I have change every graphic include:
    *   used to be  \\includegraphics\[width=3in\]\{graphics/grfile01\}
    *   changed to \\includegraphics\[width=3in\]\{\\graphicFile\{grfile01\}\}
*   Then I defined the new command graphicFile in the header for the versions of the book.  This gives a different folder for each version of the book, and it adds a ‘png’ extension for the eBook:
    *   for normal book: \\newcommand\{\\graphicFile\}\[1\]\{graphics/#1\}
    *   for eBook:  \\newcommand\{\\graphicFile\}\[1\]\{graphicht/#1.png\}
*   All of the graphics need to be resized and converted to PNG format.

This entry was posted in [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2015/01/11/making-an-ebook-with-latex/ "Permalink to Making an eBook with LaTeX").