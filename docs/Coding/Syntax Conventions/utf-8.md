#  UTF-8 Encoding Always

Wondering what encoding to use for your web pages?  Wonder no longer.  Always use UTF-8 encoding.  It is the single best encoding, supports the most characters, the most languages, and is available on every browser.  That is all you need to know: always use UTF-8.

One of the stories recently is this one: [Why the #AskObama Tweet was Garbled on Screen: Know your UTF-8, Unicode, ASCII and ANSI Decoding Mr. President](http://www.hanselman.com/blog/WhyTheAskObamaTweetWasGarbledOnScreenKnowYourUTF8UnicodeASCIIAndANSIDecodingMrPresident.aspx)It is a clever article that pokes fun at the complexity, while at the same time providing a well written tutorial on UTF-8 encoding.The article is hiding a darker aspect. The company that made the twitter display is in deep do-do right now, and for something that I have seen repeated many many times here and outside: failing to generate UTF-8 encoded web pages. It was the company that made the web page that displayed the twitter message that was at fault. The twitter message was fine, but when a twitter message, properly encoded in UTF-8, was placed into a web page claiming to be 8859-1, you get the garbage. If they had ONLY used UTF-8 encoding, they would not be embarassed in this way. You definitely do not want this sort of thing happening in a demo to an important customer. 

:::tip[Key Takeaway]

Never, ever, ever think that ISO-8859 is sufficient for ANY task.

:::

Most web servers and other web page support default to ISO-8859-1 character set/encoding. Your first job as a program is to change that to UTF-8. There is no reason — ever — to leave it as 8859-1. There is no advantage that 8859 has over UTF-8, and there is no browser in the world that can not handle UTF-8.  

If you are a programmer working on a web project, the first thing you need to do is point your browser at your project, and check the “Page Info” in the browser. It had better say UTF-8 encoding. 

If the page info for a page in your project says ISO-8859-1, just remember, this is a time bomb waiting to happen. Someone will paste text from MS Word with a smart quote in it, or a fancy dash, and they will get garbage. No reason to let this time bomb tick: learn how to use UTF-8 now, and leave ALL other encodings behind. UTF-8 is the only character encoding you will ever need for display of web pages for any time, now or in the future.  

One additional note for the techno geek: UTF-8 can represent over 4 billion different characters. It can encode hundreds of times more characters than all known character sets combined — even the ones that some people claim to be outside of Unicode. This is because UTF-8 is an encoding, not a character set. Characters that are not today included in the Unicode character set might some day be mapped to an official range in Unicode. When this happens, you are already set for it, because UTF-8 does not have to be changed. As a web site designer, you really need only choose UTF-8 today, and never have to worry about it again.

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/), [practice](https://agiletribe.purplehillsbooks.com/category/practice/) and tagged [character encoding](https://agiletribe.purplehillsbooks.com/tag/character-encoding/), [HTML](https://agiletribe.purplehillsbooks.com/tag/html/), [UTF-8](https://agiletribe.purplehillsbooks.com/tag/utf-8/), [web](https://agiletribe.purplehillsbooks.com/tag/web/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/11/03/23-utf-8-encoding/ "Permalink to #23 UTF-8 Encoding").