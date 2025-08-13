#  LaTeX Unicode Characters

While typesetting a travel diary, I wanted to include place names in their local language using their local script.  The book is written entirely in English, and have only a standard text editor, without any exotic script support.  I can look up the local name of the city online, but cutting and pasting can be a challenge, here is how to do it.

## Use UTF-8 encoded text files

I was NOT able to use UTF-8 source files, and I do not have a text editor for UTF-8 files, but I wanted to reinforce before the more exotic solutions below, is that the best approach will be now, and in the future, to edit and store your LaTeX source files using UTF-8 encoding.  This encoding allows  for more than 1 million different characters, and it is reasonably compact for the ASCII characters that form the bulk of the formatting statements.  UTF-8 is an encoding for the first million Unicode characters, and that is sufficient for all the spoken languages today including a lot of special symbols.  

The advantage is clearly you can copy characters from a browser (they all support Unicode now) and paste (Windows supports Unicode) and the characters can be saved reliably.  XeTeX assumes that the input files are in UTF-8 by default.  

I was in a position that I was not able to use a UTF-8 encoded characters in the source file.  This is a limitation of my text editor (and those of the people I share the source with) which has to be ISO-8859-1 character set without any special encoding.  So I had to come up with something else to put a few special characters in the middle or an otherwise completely ASCII document.

## Entering Characters Codes

You can enter Unicode code-point values (the number associated with a character) using carets (^) followed by hexadecimal values.  The values must use lowercase letters!

*   **^^41**  represents a capital A
*   **^^25** represents a percent sign (%)
*   **^^7e** represents a tilde (~) note that the 'e' must be lower case

The original version of TeX supported this for 255 characters.  XeLaTeX (or XeTeX) extended the TeX engine to support Unicode characters in general.   This is a format with four caret characters followed by four hexadecimal digits.

*   **^^^^6771 ^^^^4eac**   represents the two Japanese characters 東 京 for the name of Tokyo
*   **^^^^0416**   represents the Cyrillic character Ж

Apparently even larger numbered characters can be accessed using five/six carets and 5/6 hex digits.  
Any character created this way is parsed at the very initial stage or parsing the file.  A character entered this way acts exactly as if it was typed in.  For example the command **\\textbf** could be equivalently entered **\\te^^78tbf** because the lower case x is at hex position 78.  I don't recommend doing this, but I mention this just to make it clear that this syntax is converted to a character before it is interpreted by the TeX interpreter.  Any character entered this way is processed through the system exactly as if you typed the character into the source.

You can NOT use this to cause a special characters to appear in the output without using the normal escaping.  For example, if you want the book to have a backslash you can not simply put ^^5c — the hex value for backslash.  You will still need to use two backslashes (^^5c^^5c) to escape the backslash just like you were typing backslashes into the source.

## The \\char command

TeX offers a command for entering character values, that starts with \\char followed immediately by a decimal number.

*   **\\char65** represents a upper case A
*   **\\char126** represents a tilde (~)

There is (apparently) a hex version of this in XeTeX (and XeLaTeX) that allow you to specify four digit hexadecimal values after a double quote character.  Like this:

*   **\\char”6771 \\char”4EAC**   represents the two Japanese characters 東京 for the name of Tokyo
*   **\\char”0416**   represents the Cyrillic character Ж

I have not yet found the documentation for this, so I don't know the actual defined behavior.  These act like regular TeX commands, which means they consume the space after the command.  If you then want a space between two words, you need to use the regular trick of using another slash or using the two curley braces.

*   **\\char”6771{} \\char”4EAC**   represents 東 京 with a space between them
*   **\\char”6771\\ \\char”4EAC**   represents 東 京 with a space between them

I have been told that these will cause the output of that position in the _font_ to be displayed — which might not be what you want.  For high numbers it is likely to be the same as the Unicode character, but for low values it will not necessarily be the same for non-unicode fonts.  It should also be obvious that this can not be used in a command, or to create characters that do anything other than cause the character to appear in the output.  

If you are using the TeX already, you are probably already used to the consuming of a space at the end command, however it is really a bother to remember to add the things to assure spaces between foreign words.  I find that the caret notation is preferred not only because it is shorter, but because it does not have this extra space consuming behavior.

This entry was posted in [LaTeX](https://agiletribe.purplehillsbooks.com/category/latex/) and tagged [character encoding](https://agiletribe.purplehillsbooks.com/tag/character-encoding/), [UTF-8](https://agiletribe.purplehillsbooks.com/tag/utf-8/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2015/04/07/adding-unicode-characters-to-latex-documents/ "Permalink to Adding Unicode Characters to LaTeX documents").