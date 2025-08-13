#  TimerTask Pattern

When implementing a TimerTask class, there are a couple of things to remember.

## Basic Pattern

You implement a class that extends TimerTask, and implements a run method.  I will start here with a prototype class implementation, and talk about the various parts lower.

```java
public class MyTimerTask extends TimerTask {
    private static long timerDuration = 60000; //milliseconds
    private static long lastRun = 0;
    private Exception lastError = null;
    private int errorCount = 0;
    public void run() {
        long thisRun = System.currentTimeMillis();
        if (thisRun < lastRun + timerDuration) {
            return;  //ignore calls that are too soon
        }
        try {
            lastRun = thisRun;
            //do your work here
            //since you succeeded, clear out the last error
            reportErrorCount();
        }
        catch (Exception e) {
            if (sameException(e, lastError)) {
                errorCount ++;
            }
            else {
                reportErrorCount();
                e.traceException();
                lastError = e;
                errorCount = 1;
            }
        }
    }
    public static void scheduleOne(Timer t) {
        MyTimerTask singleton = new MyTimerTask();
        t.scheduleAtFixedRate(singleton, timerDuration, timerDuration);
    }
    private void reportErrorCount() {
        if (lastError==null) {
            return;
        }
        if (errorCount>1) {
            write("Error reported "+errorCount+" times: "+lastError);
        }
        lastError = null;
    }
}
```


The run class will be called for every timer tick. The hosting code must get or construct a timer object (the same timer can be used for multiple TimerTasks) and then call the schedule static method to get it going.  Something like this:

```java
Timer timer = new Timer();
MyTimerTask.scheduleOne(timer);
```


## Control The Time Period in the Class

How long in the timer tick?  As long as you want, in milliseconds.  Generally I have found is that classes are designed to be called at a certain rate.  Some classes are called every second, others aim for every 30 seconds, others for every hour or day.   These different time periods have different implementation styles, and so it is rare that you have a timer class that is run in wildly different time spans.  It is never the case that one program wants it to run once a day, and another runs it once a second.  

Because of this, it does not make sense for the hosting code to decide how long the timer duration should be.  It makes sense then that the class controls this internally.  Make a static variable (in this case '**timerDuration**') to hold the default size.  

You might make it configurable, and then it makes sense to put the code to fetch the configuration value, and use that when setting it in the factory method.  However you do it, for the most part, most code outside of the class does not need to know what the scheduling period is, and so keep this detail inside the class.

## Use a Static Schedule Method

You have to construct the class, and then schedule it on the timer for a specified rate.   This feels like redundant code every time the class is used, so it is recommended to make a static method (above called “scheduleOne”) that constructs the instance, and places it on the timer, setting the timer duration.  

This way, nothing outside the class needs to know about the singleton instance nor needs to know about the scheduling duration.

## Ignore Fast Calls

If you pause or hibernate the host computer there will be a period time that the clock is not ticking.  Java made the choice that if the for some reason a number of timer ticks is missed, it will “catch up” by calling you run routine a bunch of times as quickly as it can until caught up. For example, if you hibernate the computer for 1 hour, and the timer was supposed to run every minute, then when you wake the computer up, the timer will be called quickly 60 times.  If it is hibernated for a complete day, it will call 1440 times quickly.  

For most background processing this is not necessary.  Most background processing goes to look if there is something to do, and continues to work until all the work is done for this minute.   Getting called 1440 times right together is pointless:  the run method should have handled everything on the first call, and the other 1439 are simply redundant calls.  This depends on the design of your timer task, but most background processing will be like this.  

To avoid making a thousand useless traces, and to avoid making a thousand unnecessary DB queries to see if there is work, it is a good idea to write down the time every time run is called.   If run is called again _before_ the duration has passed, then just return quickly and silently.  This allows the Java runtime to fulfill it's commitment to call you 1440 times a day without creating needless redundant processing.  Exit the routine before you do anything else, specifically before you trace anything to the log.   It should be as if the call had never been made.

## Avoid Redundant Exception Tracing

If the timer task is scheduled to run every minute, and there is a configuration error that causes an exception, then you should catch and report that exception, but you don't want to put that detailed stack trace into the log 1440 times a day.   If you have already reported an error, you really don't need to report anything again. 

A simple way to do this is to remember the last exception reported, and to compare any new exception to it. If the new exception is equal to the old one, then don't report it.   If it is not equal, report it, and then store the new one in the lastError variable. 

Comparing is two exceptions are equal is not easy to get perfect.  Sometimes you can get convert both to strings and compare the strings. But some exceptions have small differences, like file names with random unique values in them that are part of the exception report.  It probably does not have to be perfect because you have certainly reported an error once, and if the new exception is similar to it that is good enough.  Another possible way is to compare the stack traces and if they are identical there is no reason to re-report.

## Count the Redundant Errors

This is not strictly necessary, but sometimes I put a counter (“errorCount”) to track the number of times that a particular error would have been reported.  
You then report that in two places:

*   when you successfully run without error, you report the error count and clear out the last error.
*   when you catch a different error, you report the count for the last error, and then set it up for reporting the new error.

This all works on the assumption that once the TimerTask starts getting an error, it will get the same error over an over.  That is quite common.  Also it sort of assumes that you wont get a different error every time, or say one of three errors randomly.

You can obviously be a lot more sophisticated about how you suppress the redundant error reporting.  You might keep a set of errors that have already been reported.  However in my experience, usually background processing will tend to get stuck on a single error, and report it forever.  This helps to eliminate all the useless tracing into the log files.