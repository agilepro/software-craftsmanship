---
  id: storing-dates-in-files
  name: Date Value Storage
  tags:
  - design
  - dates
---
#  Date Value Storage

XML and JSON files store and transport data.  What is the best way to store a Date-Time value? Always, always, always use the integer epoch format: the number of milliseconds since Jan 1, 1970 UTC. This post tells you why.

## Options

The date-time value can be stored as

*   a string showing month, day, year as well as the time.
*   an integer counting the number of seconds of the epoch (since Jan 1, 1970)

When we consider a string showing year month day, etc.  the clear standard is the ISO 8601 date string format.  This is the format that looks like this:  **1990-04-26T04:26:00.000Z**    This format has been around for decades, and is well supported on all platforms.  It shows the year “-” month “-” day “T” hour “:” minute “:” second “.” decimal fractions of a second followed by the _time zone_ indicator.

## Considerations Against Human Readable Format

Date values are problematic for one reason: time zones.  We don’t agree on what time or day it is right now throughout the world. Nor do we agree on what time or day it was for any point in history.  Programmers make this mistake _so often_.  The programmer is working in one time zone, all the test users are in one time zone, a simple date value like “4-26-1990” seems like a pretty stable quantity.  Then you get into user testing with users in different time zones and it all blows up.  

Most programmers make the mistake that thinking that the time zone affects only the “hour” part, so it is incredibly common for a programmer to strip the time off of a date value.  For instance (and I had to find this exact bug recently) a client and server were in different time zones, the client was sending a date (without time) to the server, which was storing it as a complete date (using midnight as the time) and then the full date/dime was sent back to the client which interpreted it as 11pm the previous day.  So the day was appearing always one day less than in should have been — and this was a big problem for the users.  

It is very easy for the programmer to compose a string for the date above:  “1990-04-26T00:00:00Z” and think they have specified February 14, only to find that this is really a date time on Feb 13 for all of the western hemisphere.  

It gets worse when you consider daylight savings time.  Many programmers don’t seem to understand that PST (Pacific Standard Time) and PDT (Pacific Daylight Time) are actually different time zones according to the ISO 8601 format.  Similarly what can happen is like above, but accidentally specifying “1990-04-26T00:00:00PST” but of course, April should be in daylight time.  What happens is that same problem that the 1 hour shift causes the date to be interpreted as 11pm the previous day.  And so on. 

The solution of course is that all dates should always be stored and interpreted according to a single time zone, and by convention that time zone is always UTC (also known as GMT).  Recording a date using any other time zone is almost surely going to cause a problem at some point.  So instead, use the “Z” time zone, but that still trips people up.  A meeting 8pm on April 26 in California, is actually coded “2014-04-27:04:00:00Z” — you have to be prepared that the date part looks like the wrong date!  

If you do track the time zone properly, you probably are aware that the daylight time change does not happen at midnight — because otherwise you would have two midnights on one day of the year that would mean it is hard to say which midnight caused the date change.  So it is moved to 2am.  That avoids the date problem, but you still end up with the largely ignored problem that 1:30am occurs twice on one day a year, and those different 1:30am times are distinguished by the time zone they are in.   How much do you want to bet that setting a meeting for 1:30am is messed up on half the systems out there?  

The point of using a text encoding that is “human readable” is that peole can view the value and know what it means.  My experience has been that this is actually a distraction that causes more bugs than it is worth.

## The Advantage of the Integer

There are two basic advantage of the numeric data-time value.  
First is that it is fast to convert.  Conversion to and from string does not require a calendar, and it does not require knowledge of the hundred or so time zones that exist.  Furthermore, the rules behind time zones can change.  Keeping to the “Z” timezone eliminates some of this complexity, however it is still slower than simply converting an integer.  

Second, it is universal.  The internal working of time in Java, JavaScript, and most other languages is based on this integer value.  It is not human friendly, but it is very system friendly.  No matter where you run a program, the epoch value is the same at the same instant of time.  There is no time zone dependent version, and so there is no opportunity for confusion.  

Since it is not human readable (well, you can read the integer value easily enough, but that value does not have any automatic meaning to people) there is no expectation for certain values to exist, and therefor no confusion when it shows what appears to be the wrong day.

## Conclusion

When writing a date value into a file of XML or JSON for storage in a file on the disk, or for machine to machine transfer, always use the integer value of the date: the number of milliseconds since Jan 1, 1970 UTC. 
 
It is not very readable, but that is not the point. It is fast, and it is universal, and you will have fewer bugs in the implementation.