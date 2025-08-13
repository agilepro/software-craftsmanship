#  BibTeX Essentials

Books and article with cite other references.  LaTeX will format the references (bibliography) section quite well and quite automatically as long as it is given a BibTeX file to read the information from.   If you have a list of references that you want to cite, here is how to structure this as a BibTeX file.

## Citing a Reference

In your book you are going to cite a reference using the **\\cite\{UniqueKey\}** command.  That is pretty much all you have to do.

```
Soldiers in the British Army were heavily discouraged from deserting
but still almost 10 percent did.\cite{agostini2007deserted}  That 
tells a lot about the situation that soldiers found themselves in.
```


As long as the key specified matches a reference entry in the file, this will cause two things to happen:

*   In the place that you put this comment, a citation will appear according to the citation style specified.
*   At the end, in the Bibliography, a reference entry will appear, again in the reference style specified.

No matter how many entries you have in the bibliography, LaTeX will include only those references that were cited in the text.

## BibTeX Fundamentals

The BibTeX file is a text file, like all other files used by LaTeX.  You can edit with any good text editor, and some editors even include modes to highlight different parts of the file in different colors.   Generally the file extension is “.bib” and so the most common name is “Bibliography.bib.”

The Bibliography.bib acts as a database for all the references that you know of.  LaTeX will include only those references that you actually cite from.  So you can compile and build a single Bibliography.bib file over time, and use the same one on many papers and books.

The file is filled with text blocks that start with an @ where most of the information is enclosed in braces.  Each block represents a single thing that can be referenced.  There are four main types of references that I typically encounter, and these look like this:

```
@book{UniqueKey,
  author = {author last, first name},
  title = {put the title here},
  year = {year published},
  publisher={publisher name if you have one}
}

@article{UniqueKey,
  author = {author last, first name},
  title = {title of the article},
  journal = {title of the journal},
  year = {year published},
  volume = {volume number},
  number = {issue number},
  pages = {286--295}
}

@unpublished{UniqueKey,
  author = {author last, first name},
  title = {title of article or work},
  year = {year published},
  note = {Unpublished paper}
}

@online{UniqueKey,
  author = {author last, first name},
  title = {title of article or work},
  year = {year published},
  url = {web address of the page},
  urldate= {date accessed in 2020-04-04 format},
  note = {Online; accessed 04-April-2020}
}
```


There are a few more reference types which you can find if you look, but they are rarely used in my experience.

## Unique Citation Key

In order to be able to cite a particular reference, you need to have a unique key to refer to it.  This key can be any combination of letters and numbers.  It needs to be unique within the file, that is no two reference entries should have the same key, because obviously you would not be able to refer to both.

It does not matter what the key is, but by combining author name, with the year of publication, also with a part of the title, you can usually come up with a key that is quite unlikely to repeated.  Tat the following example:

```
@article{agostini2007deserted,
  title={Deserted his Majesty's service},
  author={Agostini, Thomas},
  journal={journal of social history},
  pages={957--985},
  year={2007},
  publisher={JSTOR}
}
```


The key is the word after the first open brace: “agostini2007deserted.”  The author's last name is Augostini, and this article was published in 2007.   That gets pretty close to unique, but Augustini might have published two thing in 2007.  To get a unique key, we add the first word of the title “deserted.”  It is unlikely that there are two works published in 2007 by someone named Augustini that have “deserted” as the beginning of the title, so this is unique enough.   If the title starts with quite common words, you might need to include several of them — enough to make the result unique for that reference entry.

## Author Names

LaTeX seems to prefer names in the “**last, first**” format.  Some output format require the names the other way around, and LaTeX will sort that out.

Some references have multiple authors.  Put each author in Last, First form, and separate the authors with the word “and.”

## Searching on Google Scholar

There are many places where you can get the reference created for you automatically.  For instance on every Wikipedia page there is a “Cite this Page” link and on there you can find a BibTeX entry created for you.  The biggest help comes from Google Scholar (https://scholar.google.com).  Go to that cite and search for a book.  Here is an example and it produced a display of the found book like this:

![](https://agiletribe.purplehillsbooks.com/wp-content/uploads/2021/02/scholar.png?189db0&189db0)

Note the quote marks, this will give you a citation for this reference.  It lists a number of them, but the one you want for BibTeX is at the bottom of the window:

![](https://agiletribe.purplehillsbooks.com/wp-content/uploads/2021/02/scholarCitation.png?189db0&189db0)

This will then produce in the browser the right BibTeX reference entry:

```
@book{akrigg1997british,
  title={British Columbia place names},
  author={Akrigg, G Philip V and Akrigg, Helen B},
  year={1997},
  publisher={UBC Press}
}
```


## Example

Given the following example of the bibliography that someone had collected:

```
Agostini, T. (2007). "Deserted His Majesty's Service"
Journal of Social History, Vol. 40, 
No. 4 (Summer, 2007),(No. 4), pp. pp. 957-985.

Akrigg, H. B. (1986). British Columbia Place Names. ( Sono Nis 
Press, Victoria ) Retrieved Dec. 14, 2020, from gov.bc.ca: 
https://apps.gov.bc.ca/pub/bcgnws/names/4468.html

Allan, G. H. (2012, July 11). Letter to E. F. McCall,
Personal communication
```


This just needs to be converted to this and you have a Bibliography.bib:

```
@article{agostini2007deserted,
  title = {Deserted his Majesty's service},
  author={Agostini, Thomas},
  journal={journal of social history},
  pages={957--985},
  year={2007},
  publisher={JSTOR}
}

@book{akrigg1997british,
  title={British Columbia place names},
  author={Akrigg, G Philip V and Akrigg, Helen B},
  year={1997},
  publisher={UBC Press}
}

@unpublished{allen2012letterMcCall,
  title={Letter to E. F. McCall},
  author={Allan, G. H.},
  year={2012},
  note = {Unpublished personal correspondence}
}
```


If you know what the various parts are, it is pretty easy to put the tags around them and set up the right associations.