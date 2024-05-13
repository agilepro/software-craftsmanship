#  Robust Web Application Initialization

When a web based application starts up, it should do so carefully to avoid a number of problems.  This post outlines the problems you might run into, and a list of coding preparations that can be made to avoid these problems.

## Challenges At Start-Up Time

A web application runs in a web server, either a bard web server like Apache, or a web application server like JBoss.  Either way, there can be problems when starting up

*   The application may not be correctly installed into the server or host operating system.  There may be part missing that the application needs.
*   The application may not be correctly configured.  There may be settings that point to needed resources that
    *   are set incorrectly because they were left at default values
    *   are set properly but for some reason the application can not access the resources,
    *   are set correctly but the resources don’t exist.
    *   had been correct, but for some reason been moved, and the configuration was not updated.
*   The application may depend upon other servers running, and those servers may not be running yet.  This is particularly important in a global reboot situation where multiple severs are restarted simultaneously and there is a race condition between which server starts up first.
*   The application might be correctly installed and configured, but simply takes some time, and while that is happening it may start to receive web requests.  It must handle those correctly.

## Sloppiness is not an option

An application architect must set out a design for how the application will initialize.  It is particularly important to take care about race conditions.  Sloppy application designers simply start things up, and hopefully it is all running before the first request.  These developers will start the server, wait long enough, and then try it.  Later, in production, the users have no indication that the server is starting, so they simply access whenever they wish, and sometimes they access just as the server is starting.  Without knowing it, they run into a failure because the server is not ready yet. 

Developers tend to operate the server only in very special conditions: everything is running correctly, and no stress at inappropriate moments.  To make something that runs reliably in production, you have to expect that a web request can come at any moment, particularly at the inappropriate moments.  You have to assume that is anything remote can fail, it will.  You must consider that new installations administrators will make mistakes.  Even if everything is running correctly on one day, something outside the application might change that causes problems the next day.  All of these should be guarded against.

## The Method

This is part of what I call the “Simplified Turtle Shell Model” of server initialization.  It is pretty basic:

*   make a global static variable that says whether the server is initialized or not.  That variable is initialized to ‘false’ during static initialization.  It is set to true ONLY when the initialize code concludes that it has been successful.
*   make a global static variable to store the exception(s) that occur during initialization.  This will be null initially, but if any exception occurs, store it in this place for the rest of the program to see.
*   make a page that displays the initialization error (ServerInitError page).  This is tricky, because you have to make sure that this page does not require anything about the system to be functional.  It must be bare bones HTML generation.  It must NOT attempt to authenticate because the subsystems required for that might not be operational.  If the server fails to start up, you simply display the error to anyone who accesses the server.  Once the server is running you will never see this.  If there is no recorded error, it should display simply that the server is “starting up”.
*   make EVERY regular “controller” (those parts of the code that receive requests from the browser) check whether the server is initialized or not before attempting to do anything else.  Again, it must do this before it attempts to use any subsystem of the server.  If not initialized, it should redirect the browser to the ServerInitError page.
*   make a specific global method to initialize the server, and call all other initialization functions from there.  This should start by checking that all the necessary files exist.  As much as possible, check that all the setting are correct.  If external servers are needed, ping them somehow to make sure they are up an running, and retry several times in case they are just slow.  If anything fails or throws an exception, record the exception.  when it determines that everything is OK, mark the initializes variable as ‘true’ and the application is ready to serve pages.

It is called “Turtle Shell” because everything in the server remains protected from external requests until the initialization routine sees that everything is OK.  Only then, does it come out and serve requests.  
This is the “Simplified Turtle Shell Model”  in the fully elaborated Turtle Shell model the server can return to protected mode over and over again as external conditions change, and it can asynchronously reinitialize itself.  You don’t always need this full model for all servers.

## Testing

It is important that you test this is working properly.  Make a special setting that does one of two things:

*   if the setting is set, it will randomly fail to initialize.  Just test a random number and fail some percent of the time.  Start the server enough times and you should see the failure.
*   if the setting is set, put a long delay in the initialization, like 20 or 30 seconds.  This will allow you plenty of time to attempt to access the server while initializing, and assure that in all cases there is no situation that a person might access a half-initialized capability.  Put the delay before everything else, so that you are really testing without any sub-system initialized.

With this simple model implemented, you should avoid a lot of errors in production, and have far greater assurance that if there is a problem, then the right people will find out about it, with a good error message, and will address the situation quickly and effectively,

:::tip[Key Takeaway]

It is not the case that good software never encounters errors.  Good software is good because when it does hit an error, it is designed to help people identify and eliminate the error quickly with minimal effort.

:::