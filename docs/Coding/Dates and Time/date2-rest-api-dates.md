---
tags:
- design
- dates
---
#  Date Value Protocol

:::tip[Key Takeaway]

Always transfer dates as an integer epoch value: the number of milliseconds since Jan 1, 1970 UTC.

:::

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

Support: ( A = B ) ISO-8601 parsing is provided after Java 8.  I am not sure about support in other languages.  Integer parsing has always be provided by Java.

Integrity: ( A >= B ) Both formats should theoretically convert reliably from an internal epoch value in the server, to the same epoch value on the client.  But the ISO version offer multiple representations of the timezone.  Programmers take short-cuts and generate strings that look like ISO dates, but fail unexpectedly. These problems simply don’t exist with epoch values. With epoch values, there is one representation and it is hard to convert incorrectly.  

Human Readability: ( A ?? B ) The one “advantage” of ISO-8601 is that it display a meaningful date value with days, hours, minutes, etc, but this is also a drawback because people will sometimes misread the value by carelessly ignoring the timezone.  Sometimes dates will be generates that look right to the casual observer, but in fact are improperly constructed.  This is for an API between services, how important is it to be human readable?

## The Dark Side of Human Readability

Human-readable date values are problematic for one reason: time zones. It is easy enough to think the “time” part will be a couple of hours off, but people usually forget that this effects the **DATE** portion is affected by timezone as well. They see two values showing "4-26-1990" and they think they are on the same day — but they may not be! 

Which of the following two values represents a later point in time?:

* 1990-04-25T22:00:00-05.00
* 1990-04-26T00:00:00-00.00

The first one is actually three hours later than the second.  Most of us forget that the timezone indicator can change the date.  Of course, you know it when you think about it, but if you are like most people you concluded from a casual glance at two values that the first was before the second.  Here are the epoch values for these times:

* 641095200000
* 641088000000

Some of the problem with computational complexity of ISO-8601 format is reduced if you always use UTC time zone (Zebra or Zulu Time — from the Z that designates the time zone.) However, this raises the human readability problems. For most humans this not the local time, which reduces or eliminates the value of human readability.  

Programmer often make mistakes when manipulating date/time values in human readable think that if you want to find the “beginning of the day” that they can set the hours & minutes to 00:00, but that only works if the representation is in the same time zone as the user they are working with! Several times recently I have had a server working in one time zone represent just the date part, truncating the time value to 00:00, but then when this is transported to a client in another time zone, it sees the previous day, and then proceeds to truncate the time to 00:00 again, yielding an error of more than one day in the date values.  

Most programmers make the mistake that thinking that the time zone affects only the “hour” part, so it is incredibly common for a programmer to strip the time off of a date value. For instance (and I had to find this exact bug recently) a client and server were in different time zones, the client was sending a date (without time) to the server, which was storing it as a complete date (using midnight as the time) and then the full date/dime was sent back to the client which interpreted it as 11pm the previous day. So the day was appearing always one day less than in should have been — and this was a big problem for the users.  

It gets worse when you consider daylight savings time. Many programmers don’t seem to understand that EST (Eastern Standard Time) and EDT (Eastern Daylight Time) are actually different time zones according to the ISO 8601 format. Similarly what can happen is like above, but accidentally specifying “1990-04-26T00:00:00PST” but of course, April should be in daylight time. What happens is that same problem that the 1 hour shift causes the date to be interpreted as 11pm the previous day. And so on.  

If you do track the time zone properly, you probably are aware that the daylight time change does not happen at midnight — because otherwise you would have two midnights on one day of the year that would mean it is hard to say which midnight caused the date change. So it is moved to 2am. That avoids the date problem, but you still end up with the largely ignored problem that 1:30am occurs twice on one day a year, and those different 1:30am times are distinguished by the time zone they are in. How much do you want to bet that setting a meeting for 1:30am is messed up on half the systems out there?  

The point of using a text encoding that is “human readable” is that people can view the value and know what it means. My experience has been that this is actually a distraction that causes more bugs than it is worth.  None of this is a problem with the less-readable Epoch values.

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