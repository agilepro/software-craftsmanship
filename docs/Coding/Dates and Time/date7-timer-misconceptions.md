---
  id: timer-misconceptions
  tags:
    - design
    - dates
---
#  Timers: Misunderstandings

At some point you may be asked to implement a timer — something that displays the amount of time that is elapsing.  It can be a count-up timer showing the total times that something has been happening.  Or it might be a count-down timer showing the amount of time remaining to complete a particular task.  Most programmers will make some key mistakes the first time they attempt this.  I am rather shocked and amazed at how many incorrect examples you can find if you scan the internet.

**Don’t track the current time** – The biggest mistake that programmers make is to think they need a variable to hold the current time and then to write code to increment that variable every second, e.g. something called “elapsedSeconds” which they maintain. The problem is that you can schedule code to be called every second, but there is no guarantee of exactly when that code will be called.  
Here is an example of the **wrong** way to do it:

```java
class MyTimerTask extends TimerTask {
    public int elapsedSeconds = 0;
    public void run() {
        elapsedSeconds++;
    }
    static MyTimerTask startMyTimer(Timer timer) {
        MyTimerTask task = new MyTimerTask();
        timer.scheduleAtFixedRate(task, 0, 1000);
        return task;
    }
}
```


The above code attempts to increment a seconds counter every second.  The calling code would, presumably, check the ‘elapsedSeconds’ member to tell how many seconds had elapsed.  But actually, this effort to increment a variable at a fixed rate is pointless, a wast of CPU cycles, and also needlessly inaccurate.  This is all completely unnecessary because the OS _has a function to tell you the current time_. 

**Don’t Expect Scheduled Events to be On Time** – You can ask for a timer task to be run every second, but the OS makes no guarantee that the code will be called exactly on the second.  If a number of threads all happen to collide, asking for the same moment, there will be give and take.  Other threads may hog the CPU, causing your particular event to come milliseconds, or even in drastic cases seconds, late.  

**Don’t expect Threads to Sleep Exact Amounts of Time** – Code that uses the `Thread.sleep(1000)` function to loop every second will find that the error builds up over time.  Just like the scheduled events above, if a bunch of threads collide by trying to wake up at the same time, there will be give and take.  Again, if the system is significantly busy, sleep may return late.   If sleep returns 300ms late one time, that error is compounded into your calculation of what time it is.  

**Don’t forget to Compensate for Processing Time** – the second problem with using a loop with `Thread.sleep(1000)` is that your own code does not take 0 milliseconds to run.  This loop, including the sleep, will take slightly more than a second to run, and your timer value will drift by that amount.  During testing, this drift may be quite small, but in heavily loaded environments the drift may suddenly be quite large.  

**Assume that your code will be called at random times** – While timers and events on a fast computer are quite accurate and reliable, you must not make the accuracy of your timer depend upon that, because there is no guarantee. The error might be small and unnoticeable in testing, but you don’t want to discover this sort of thing in production.  Always assume that your code will be called at random times.  Based on this assumption, _you will not code any timing dependencies into the code, and you will not have timer drift problems._  

**Record the start time of a count-up timer** – All you need to do, is to record the starting time for a timer that is going to count up.  This is recorded at the moment that the start-button is pressed, or on whatever other event starts the timer.  It is written once, and does not change after that.

```java
long startTime = System.currentTimeMillis();
```


**Record the end time of a count-down timer** – If this is a count down timer, then record the ending time that it will reach.  For example, if this is a timer that counts down 60 seconds, then at the moment that the timer is started, simply add 60 seconds to the current time, and that is the time that the timer should end:

```java
long endTime = System.currentTimeMillis() + 60000;
```


**Calculate elapsed time when you need it** – Instead making a variable that holds the elapsed time, and trying to arrange for code to update that variable on a second by second basis, you can avoid all this trouble by simply calculating elapsed time on demand.

```java
long elapsedTime = System.currentTimeMillis() - startTime;
long elapsedSeconds = elapsedTime / 1000;
long secondsDisplay = elapsedSeconds % 60;
long elapsedMinutes = elapsedSeconds / 60;
//put here code to format and display the values
```


The advantage of this is that you can run this at ANY point in time, and it will give you the accurate elapsed time.  The above calculation will be accurate whether you run this code every second, 100 times a second, or once every 3.572 seconds. The point is that `currentTimeMillis()` is the accurate representation of the time regardless of when this code is called — and that is an important consideration because thread and timer events are not guaranteed to be accurate at a specific time.  

**Calculate remaining time when you need it** – for a count-down timer, you calculate remaining time in exactly the same way:

```java
long remainingTime = endTime - System.currentTimeMillis();
long remainingSeconds = remainingTime / 1000;
long secondsDisplay = remainingSeconds % 60;
long remainingMinutes = remainingSeconds / 60;
//put here code to format and display the values
```


**Update Display Regularly** – While I have explained that you do not need any code to run to maintain a variable with the elapsed time in it, if you want to display the time to the user, you will need some code to run regularly.   Code must run to update the display, and this will depend upon the technology being used for display.  The important thing to note: this code for display has nothing to do with the calculation of the time!  That seems to be what messes most people up.  

If this helps you think about it: one lazy approach is to update the display 10 times a second.  Because the calculation of the time does not depend on the code being called at a particular point in time, and because it does not matter if you re-paint the screen with the same time, this approach more or less guarantees that the displayed time will show the right time within about 1/10 of a second. This seems a bit of a waste, because 9 times out of 10 you are painting what is already on the screen.  

If you are writing a program with animation of some sort (like a game) which is refreshing the screen 30 times a second, then you need do nothing. Just incorporate the timer display call into your regular screen refresh.  

**Optimize Refresh by calculating Next Display Change** – If you are displaying minutes and seconds, then you would like the display to update right at the time that the seconds value changes.  Or if you are writing a program that does terminal-style output and you want that output to come at the time that the second changes, then you can optimize the scheduling of events by calculating the amount of time remaining until the display will change:

```java
long elapsedTime = System.currentTimeMillis() - startTime;
long timeTillNextDisplayChange = 1000 - (elapsedTime % 1000);
//sleep or schedule callback based on this time delay
```

The variable timeTillNextDisplayChange holds the number of milliseconds you need to wait until the seconds part of the timer will change. You can then schedule a paint event to occur at that time, possibly calling `Thread.sleep(timeTillNextDisplayChange)` and after the sleep do the output. If your code is running in a browser, you can use this technique to update the page DOM at the right time. 

Note, that there is nothing in this calculation of the display refresh that effects the accuracy of the timer itself. The thread might return from sleep 10ms late, or even 500ms late, and the accuracy of the timer will not be effected. On every pass we calculate the time to wait from the `currentTimeMillis()`, so being called late on one occasion will not cause later displays to be late.  

**Performing Operation for Specified Time** – the same approach works when you want to perform a particular operation in a loop, and stop looping after a certain time.  I find it amazing that programmers will propose a timer for this purpose.  Generally, the approach is that the timer will, after a specified time, set a boolean variable.  The loop you are in tests that variable.  It is needlessly complex.  Just make the loop test the current time, and see if the current time is later than a calculated timeout time.  For example, something like this:

```java
long endTime = System.currentTimeMillis() + 2*60*1000;
while (System.currentTimeMillis() < endTime) {
    //perform operation and break if successful
    //also a small sleep to give other treads/processes more time to run
}
//Throw exception if never successful
```


It should be obvious that scheduling a time to set a boolean, and then writing a loop to test that boolean is far less efficient than just putting the test into the loop.  I think some programmers don’t realize that a timer requires a complete thread to be allocated in order to call the timer task.  Even though that task is just to set a boolean at a particular time, the allocation of a complete thread for the purpose of setting a boolean is a huge overhead.

## When are Timers a Good Idea?

I talk so much about the inappropriate use of timers, you might get the idea that I thikn Timers should never be used.  That is not the case.  There are appropriate times to use timers:  

**Sparse executions** – if you have a small task that takes a fraction of a second, and you want this to be run a couple of times a day.  This is really a great example of how timers should be used.  Note that this example is that “_you want code to run at a specified time_“.  It is convenient to write code to run, and then use a timer schedule to say to run it at noon and midnight.  Having a thread spending 12 hours waiting for a few seconds seem overly complicated.  

**Many Different Small Tasks on a Single Thread** – the real advantage of a timer is that you can have many different scheduled tasks share the same thread.  One timer can have many timer tasks scheduled, and it uses only one thread.  Using the loop/sleep idea above would either require a a thread for each kind of task, or would require some complicated management of the various times that tasks are supposed to run. This is exactly what the timer and timer task classes were written to do, so use them.  

**But NOT Timeouts** – A timeout is when you want to stop something at a particular time.  By using a timer, you are causing a code on a thread 2 to run, in order to stop code on the thread 1 from running.  Thread 2 can not actually stop thread 1, all it can do is set a variable that Thread 1 checks.  And if you think about it, usually thread 1 can just check whatever situation that was being checked by thread 2, and it can do it on a single thread.  

**And NOT tracking time** – You already have a reliable function to tell you the time, so setting up a timer to increment an integer every second is just silly.

## What about a StopWatch class?

Someone commented that if you want a timer that starts and stops (pauses) it is better to use a Timer object for that.  That is completely silly.  Here is an implementation of a StopWatch class:

```java
class StopWatch {
    long startTime = 0;
    long priorTime = 0;
    public void start() {
        if (startTime == 0) {
            startTime = System.currentTimeMillis();
        }
    }
    public void stop() {
        if (startTime > 0) {
            priorTime += (System.currentTimeMillis()- startTime);
        }
        startTime = 0;
    }
    public void reset() {
        startTime = 0;
        priorTime = 0;
    }
    public long readTimeMillis() {
        if (startTime > 0) {
            return priorTime + (System.currentTimeMillis() - startTime);
        }
        return priorTime;
    }
}
```

As you can clearly see, this class allows you to start the time running, and stop the time running any time you want, and you can do it as many times as you wish.  Calling start when it is already running has no effect, and calling stop when it is not running has no effect.  When the stop watch is running, every time you read the time, it will be current and correct.  When it is not running, it will have a fixed time value.  Calling reset of course sets the time back to 00:00. 

There is no need for a Timer object.  More importantly, there is no need to update anything asynchronously.  It takes zero CPU cycle for the stop watch to run (if you are not looking at it — of course if you are updating the screen, then CPU cycles are spent.)  

Refreshing the screen: if you are displaying the timer value on the screen, then you may need a Timer object _to refresh the screen_.  This can be done a lot of ways depending upon the technology used for the graphics.  One way is to “invalidate” the area of screen (sometimes this is called “repaint”) every so often.  This timer for screen refresh is completely separate from the stopwatch.  A good example is if you have 20 stop watches running, you sill only need one Timer to refresh the screen.  That screen update Timer is needed only when the StopWatch is visible.  Consider an application where 20 stopwatches are “running” and only one is visible at a time, or only on some of the views.  Having 20 timer for 20 stop watches would be a terrible way to implement a stop watch.  The StopWatch needs no Timer, only refreshing the output might need a timer, and that Timer should be tied to the display, and not the StopWatch object.

## Summary

*   Don’t make a timer task to just keep track of the current time
*   Use the current time to determine if enough time has passed.
*   Separate the calculation of the elapsed time, from the performance of the code that is displaying it. These are different things.
*   Assume that code executes at random times, and don’t make your timer accuracy depend upon the operating environment calling the code at the right time.