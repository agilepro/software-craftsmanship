#  JSON/REST API – Timestamps

In this post, I lay out the reason that you should always transfer dates in a JSON/REST API as an integer epoch value: the number of milliseconds since Jan 1, 1970. If you think it should be anything else, please read on….  

## Setting

You are designing a JSON/REST API because you are implementing a web user interface in JavaScript, and it is going to use HTTP requests to get the information to display on the page, and to update the information back to the server. WE assume the client side is JavaScript, and the server could be any language, however I will be considering the use of Java mainly. 

In the JSON representation, you must convert whatever internal format you are using to a string, and it must be parsed on the other side. So what is the best string representation for a date? See earlier post “[Storing Date Values in Files](https://agiletribe.purplehillsbooks.com/2014/01/17/storing-date-values-in-files/)” which is relevant to this discussion. There, I consider two potential formats:

*   A) An integer epoch value
*   B) An ISO-8601 standard date format

The internal format for a date/time value in JavaScript is the epoch value: milliseconds since Jan 1, 1970. For any kind of manipulation in JAvaScript you will need to convert to and from that. On the server you have a similar conversion. For a Java based server, the internal representation is epoch value, just like JavaScript. This is widely common across languages, but not universal. When your server is talking to the database, the database may have a different internal representation, and it may have a different transport representation to/from the DB.

## Comparison of Approaches

Performance: ( A > B ) The performance of an API if critical. If you can 10 record in the time that the other format can read 5, it makes a difference to how you can scale the entire engine. Conversion in Java from the internal epoch value to a string representation of that integer is blindingly fast. No calendars are needed, you don’t have to figure out what day it represents, you don’t have to parse out all the different fields. The ISO format must take into consideration the time zone that you are in, and that you are reading. This means that to do the conversion, it must access time-zone maps, and those take up memory and time to access. On the JavaScript side again conversion from epoch value to a integer representation is very fast. 

Compactness: ( A > B ) The ISO format is always twice as long or longer. We always think that disk space and bandwidth are free, but if the file is half the size, it makes a difference.  

Precision: ( A = B ) Both formats represent time values covering all of history down to millisecond resolution. There is no particular advantage of one format over the other in terms of precision. 

Support: ( A > B ) This surprised me, but parsing of ISO-8601 is [not supported](http://stackoverflow.com/questions/2201925/converting-iso-8601-compliant-string-to-java-util-date) in the standard Java libraries. You have to get a separate third party module to generate and parse these. IT is freely available, but I don’t like cluttering applications with extra modules unless I have to. JavaScript and Jave do have equivalent support for ISO-8601. I don’t know about C++, C#, PHP, Perl, Node.js, etc, but there is a potential problem. However, for the integer epoch value, EVERY environment universally can generate and parse an integer string value.  

:::warning[Update]

Since this was written Java has been extended to support much of ISO 8601, so this section needs to be rewritten.

:::

Integrity: ( A >= B ) Both formats should theoretically convert reliably from an internal epoch value in the server, to the same epoch value on the client, however there can be conversion errors with the timezones. Integrity is preserved with ISO dates ONLY if everything is implemented correctly! ISO allows for shorter forms showing just date and some of the time. These are still valid ISO date values, but they do _not_ preserve the exact value. Programmers take short-cuts and generate strings that look like ISO dates. There are many errors that a programmer can make that will work most of the time, but fail unexpectedly. These problems simply don’t exist with epoch values. With epoch values, you are guaranteed that the internal version on the Java server is the same as the internal version in the JavaScript environment on the server, exactly to the millisecond.  

Human Readability: ( A ?? B ) The one “advantage” of ISO-8601 is that it display a meaningful date value with days, hours, minutes, etc. It is easier for a human to look at the value and know what it is. The reason I mark this as (??) questionable is that there is a dark side to human readability that encourages programmers to be MISLEAD about the value they think they are seeing. I will argue that in a separate section. In the end, I am convinced that you do NOT want the value readable. If you want to know the value, you can easily take it to an [Epoch Value Converter](http://www.epochconverter.com/) page and find out what it means. So the value plainly there and visible for inspection if you need to … the question is: how often are humans going to read these files? This is an API protocol! This is for machines to talk to each other. For debugging, you can use an epoch converter, but there is no real need for humans to read these files on any kind of regular basis.

## The Dark Side of Human Readibility

Human-readable date values are problematic for one reason: time zones. It is easy enough to think the “time” part will be a couple of hours off, but people usually forget that this effects the **DATE** portion. They see two values showing “4-26-1990″ and they think they are on the same day — but they may not be! 

The fact that you can see something like a date, fools the viewer into thinking that the value represented will be on the day they experienced. It is actually misleading.  

You have to convert at every point correctly! Every client and every server needs to support every time zone and any other one might generate. While this information about time zones is relatively stable, it does sometimes change, and that can introduce a source of error. If a particular environment uses a time zone that another environment does not know about, you get a failure to communicate.  

Some of the problem with computational complexity of ISO-8601 format is reduced if you always use UTC time zone (Zebra Time — from the Z that designates the time zone.) However, this raises the human readability problems. It is NEVER in the local time, which reduces or eliminates the value of human readability.  

For example, a timestamp value for 6pm on Nov 21 in California, will have a UTC date value of Nov 22, which will cause the human reader to think that it occurred on a _different day_ than a value taken _two hours earlier_ at 4pm. Having the date part change int he “middle of the day” is not human readable, and causes more problems than it solves.  

Programmer often make mistakes when manipulating date/time values in human readable think that if you want to find the “beginning of the day” that they can set the hours & minutes to 00:00, but that only works if the representation is in the same time zone as the user they are working with! Several times recently I have had a server working in one time zone represent just the date part, truncating the time value to 00:00, but then when this is transported to a client in another time zone, it sees the previous day, and then proceeds to truncate the time to 00:00 again, yielding an error of more than one day in the date values.  

Most programmers make the mistake that thinking that the time zone affects only the “hour” part, so it is incredibly common for a programmer to strip the time off of a date value. For instance (and I had to find this exact bug recently) a client and server were in different time zones, the client was sending a date (without time) to the server, which was storing it as a complete date (using midnight as the time) and then the full date/dime was sent back to the client which interpreted it as 11pm the previous day. So the day was appearing always one day less than in should have been — and this was a big problem for the users.  

It is very easy for the programmer to compose a string for the date above: “1990-04-26T00:00:00Z” and think they have specified April 26, only to find that this is _really_ a date time on April 25 for all of the western hemisphere!  

It gets worse when you consider daylight savings time. Many programmers don’t seem to understand that PST (Pacific Standard Time) and PDT (Pacific Daylight Time) are actually different time zones according to the ISO 8601 format. Similarly what can happen is like above, but accidentally specifying “1990-04-26T00:00:00PST” but of course, April should be in daylight time. What happens is that same problem that the 1 hour shift causes the date to be interpreted as 11pm the previous day. And so on.  

If you do track the time zone properly, you probably are aware that the daylight time change does not happen at midnight — because otherwise you would have two midnights on one day of the year that would mean it is hard to say which midnight caused the date change. So it is moved to 2am. That avoids the date problem, but you still end up with the largely ignored problem that 1:30am occurs twice on one day a year, and those different 1:30am times are distinguished by the time zone they are in. How much do you want to bet that setting a meeting for 1:30am is messed up on half the systems out there?  

The point of using a text encoding that is “human readable” is that people can view the value and know what it means. My experience has been that this is actually a distraction that causes more bugs than it is worth.

## Summary

Look at the **advantages** of the epoch value:

*   Nobody expects it to be human readable, so it never gets approximated or distorted.
*   Humans never mistake it for being on a different day than. The epoch converter will convert two epoch values to the same appropriate time zone and you can compare them appropriately.
*   It is very fast on every platform
*   It is compact by more than a factor of 2
*   Every operating environment on the planet can deal with it
*   The millisecond value on the server is always the exact same value on the client JS environment
*   There are almost no failure modes to worry about.

The epoch value has none of the problems that the “human readable” values have. Remember that you create a JSON REST API as a data transfer format for machine to write and read.  Focus on the approach that is BEST for machine to machine reliability.