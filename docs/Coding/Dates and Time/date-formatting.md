#  Configuring Date Format

There is endless discussion on how to format dates on the web, but most of this discussion is completely useless because it ignores the real world issue: different users want to see dates differently.  No single date format will be suitable to everyone.  This post is how to structure your product so that everyone sees the date values formatted as they would like to see them.

## Not a Problem of Ability to Format

Many of the discussion about formatting dates talk about how you can create a format string, like “YYYY/MM/dd HH:mm”   or   “%y/%M/%d %h:%m”.   There are a small number of different standards for setting the date, and they all give you far more flexibility than you could ever need.  You can put any field in any order, with any delimiter, and there are usually options for padding with zeros or not.  Some will allow you to print the year in hexadecimal or octal formats just for overkill.

This post does not talk about the expressibility of these format languages because every one I have used has been more than sufficiently powerful.  Pick one.  I will use the date format string consumed by the Java date format function for all my examples here, but if you prefer a different format string, suit yourself.

## The Problem is Multiplicity

When a developer programs an application they can specify the format for the date in the code.  Specifying a static format that does not consider the user who is viewing the output is the problem.  On the web you have many people from different cultures viewing the same report.  It is important that the date be presented in the format suitable for each different user. 

*   Rule #1: never specify the date format directly in the source code

Many applications give the administrator the ability to configure the dates for the application as a configuration value.  This is superior to hardcoding the value in the source code, but it still does not address the issue of letting different users see the date format in their own way.

*   Rule #2: application wide configuration value is not sufficient

Applications often give a way for users to create/specify reports and other display constructs.  When creating a report, the designer of the report often has the ability to specify the format string for display in a particular application, or for a particular report, or even in  a particular column.  Once again, does not address the issue of letting different users see the date format in their own way.

*   Rule #3: settings on data display objects is insufficient.

The question is: how best to structure that which offers reasonable flexibility with reasonably easy configuration.

## Too Flexible is a Problem

One possibility is to offer the ability for each user to specify their date format on each application / report / column.  This does allow each user to see the dates formatted the way that they want, but is overkill because it is too much trouble for the user to do this on every report. If you have to visit a report, and then specify a date format, in order to see dates in the right format, is a lot of additional trouble.  There are presumably many report, and most users will view each report only a few times, so additional work is not valuable.  If it is trouble, people will not use it, and therefor they fail to see dates in the right format.

*   Rule #4: user configuration of every date value being displayed, or even of every report/column being displayed, is too much trouble to use

What the user wants is a way to specify a single preference, and have that preference automatically apply to all the reports they visit.  Ideally this will work across multiple applications and multiple server hosts.  That requires some form of standard.

## Standardized User Locale Settings

Conceptually you might think of a user ability to specify in their profile their favorite format.  Thus I can set “YYYY/MM/dd” and someone else might specify “MMM dd, YYYY”.   My setting is set only once, and it automatically is used on every report and data display page.  Sounds nice!  But there are two problems:  

First, there is no standard to allow one to do this in a generic way across all applications.  We would need a setting in the browser where you specify your preferred date format, and we would need a way for the browser to send this to the web application.

*   Rule #5: the perfect solution would be for the browser to have user preferences on date formatting, but there is no standard for this.

Some systems allow the user to specify the format for dates in their user profile.  This works well, and is probably the best solution, but it does have the drawback that the user has to set this up for every profile

*   Rule #6: a setting in the user profile for date formats is probably ideal.

## One Format is not Enough

Even if there was a standard, a single format is not enough.  Sometimes you want a fairly short date like just month/day for example, or year-month-day, or sometimes just year/month  e.g. “I worked at the company from June 1990 until Dec 1996” or “Weather forecast for June 5 is ….”. Sometimes you want a longer more precise date  e.g. “The car was rented on 6/5/2012 6:15pm and returned on 6/17/2012 8:42am”.  In some cases it is important to know the seconds as well.  The length and precision of date format needed depends upon the application and the use that it is making of a date.  
Microsoft made a reasonable attempt in defining, for each user, a long date format, and a short date format.  Every application could then display a date properly in a long format or a short format, and the user could decide exactly how these formats should look.  
It is not clear that two formats is quite enough, and my example above imply that there are at least 4 to 5 different date length/precision needed.  I don’t think anybody has done a serious study of the number of different format styles that are needed across all applications.  That is why all the languages/operating environments simply throw the job on the programmer allowing the specification of a date format.  
JavaScript defines also a long and short format.  On my computer, these formats appear like this:

```
toString() => Tue Jul 24 2012 13:09:30 GMT-0700 (Pacific Daylight Time)
toLocaleString() => Tue Jul 24 2012 13:08:31 GMT-0700 (Pacific Daylight Time)
toLocaleDateString() => Tuesday, July 24, 2012
toLocaleTimeString() => 13:09:15
```

Here you have only what I would call a long date format, a really long date/time format, and a time format.  Theoretically the user can modify these setting in the OS user settings, but I have not yet figured out how to do that.  If a user wants to see 2012/07/24 they are out of luck with the built in java script functions.  (You can, of course, specify a format string, but that gets us back to the problem of how the user specifies that format.)  
Also, there are differences across browsers.  For the full date time:

```
Chrome: Tue Jul 24 2012 13:09:30 GMT-0700 (Pacific Daylight Time)
IE: Tuesday, July 24, 2012  1:09:30 PM
Mozilla: Tuesday, July 24, 2012  1:09:30 PM
```

Which leaves us with this gem:

*   Rule #7: the application must determine how many different ways a date will need to be displayed, and offer the user a way to configure the format for each.

## A Compromise

Many applications are simply not in a position to offer user-specified date formats because there is a lot of user interface work that needs to be done to allow users to configure their own formats.  There is a compromise that works reasonably well.  Many people learn their preferences for date format from the culture that they live in.  A culture will display and modify dates in particular ways that all the members of the culture are used to and learn to like. 

An application then might have configurable date format settings, for each of the date styles needed, associated with each language/locale setting.  Thus it might have a setting for EN\_US and another setting for EN\_UK and a different setting for FR and DE.  An overall default setting for all language/locales that have no other setting, and a generic “EN” setting will work for English users that are not in US or UK.  
For example:

```
EN_US:
   date-time: MM/DD/YYYY  hh:MM a
   date-only: MM/DD/YYYY
EN_UK:
   date-time: DD.MM.YYYY  HH:MM
   date-only: DD.MM.YYYY
DE:
   date-time: YYYY.MM.DD  HH:MM
   date-only: DD MMM YYYY
```


It is not perfect, but it is better than just a single set of formats for the entire application, and it is far easier to implement than complete user-configurable settings.  It allows a culture to see settings that are likely to be familiar to them.

## Time Zones

I assumed in all this discussion that a user is seeing the date in their own time zone.  This is a given.  All dates should be stored in the system as UTC (universal) date/times, and the conversion to timezone is done at the same time that the date is formatted.  Timezone can effect both the date at the time: something might display as May 13 in some timezones, but May 14 in other timezones.  Because of this, it is important that the date and time is always converted at the same place, according to the current timezone setting.

## Implementation

IT is worth mentioning that for a web application, the best way to implement this is to ship the UTC date in the web page to the browser, and then to use javascript to format the date appropriately for the current timezone, and also with a format specified by the user or other application setting.
  
Setting this pattern in place from the beginning, to NEVER format a date on the server, and to ALWAYS format the date in the browser, you put into place the appropriate architecture to always offer the best support for dates and times.