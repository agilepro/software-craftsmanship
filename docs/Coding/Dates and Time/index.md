# Dates and Times

Values that represent a date or a time are usued commonly in most programs.  When I started this guide, the Java support for dates and times was only halfway there.  Java 8 added the `java.time` package that largely addresses the technical problems, but you still need to understand the concepts to use them.

So many people have surprisingly erroneous concepts about dates and times.  Most of the confusion comes from handling of time zones which are honestly more complex than most people think.

Here I present a set of guidelines which if followed should avoid most of the problems that programs encounter when programming around dates and times.

## Guideline Summary

* Never use a timezone in the server (except some special situations)
* Use java.util.Date in server because it has no time zone.
* For JSON API: Always use ISO-8601 in UTC timezone.
* Never use a function that depends on the default system time zone.  Never use ZoneDateTime or LocalDateTime.
* Use DateFormat (with time zone) for creating string representation of date values
* Use Calendar (with time zone) to get parts of dates for specific time zone