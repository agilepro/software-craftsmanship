#  Test Software Like a Real User

Always test the software running in the same way that customer will run it.

Some programmers have their own favorite ways to run the software they are working on, that is run differently than the way that the customer will run it.  This is evil.  Programmer is not testing what the customer will get, but testing something else.  Is that good enough?

### Examples

If you are working on a server, it is pretty clear that the customer will want to run that software as a service.  Some developers don’t want to run the software as a service, so they run it in a different manner.  

Generally a customer does not run software in a debugger.  Some developers like to always run in a debugger, because it is more convenient for them. 

Customers generally start software either by clicking on an icon or choosing in some other pre-configured way.  Some developers like to pass special parameters into the running software, and so they start the software on the command line so they can pass special parameters.  

Customers do not run the software in an IDE, but some programmers like to run the software directly from the IDE because it is more convenient for them.  

Customers generally run a completely finished and packaged code.  Some developers find it convenient to leave the code unpackaged, and in some cases not completely compiled into the destination form.  They leave files where they are in the development environment which may not be the same as the place for those files in the production environment.  

Developers often have significantly more powerful working environments than the customer will have.  A simple example is memory available:  Some developers will allocate a tremendous amount of memory to the running program when testing, far more than the customer will have.  This is often done because the program runs better with more memory.

### Generalization

These are programmers who are lazy, and have convinced themselves that it is OK to run the software in a way different from the customer, because _it does not matter_.  They are convinced that the way they run it is the same as the way the customer runs it, and will expose all the same problems.  It is hard to say whether this is true or not.  

I have seen problems all the time that show up in customer environments, that never showed up in developer environments.  Sometimes because that problem does not show up when run the way the developer runs it.  As a professional, your first concern is to address all the problem that the customer will run into.  

In many cases, the program will _run better_ the way the developer sets it up.  This is not the goal of testing.  The goal of testing is to see exactly how the customer will see it.  There may be a function that is very sensitive to memory, that takes 2 seconds in a lot of memory, but 2 minutes in memory half that size.  If you are really testing, you must test configured in the same way that the customer will configure it.

### Temporary Testing

I am not trying to say that debuggers and special modes should never be used.  If there is a problem, you may need a special tool to find it.  But that should be a special situation, and you should realize that you are not experiencing the program like the customer.  

When running the program to “try out” the implemented functionality, or to test the functionality, or to demonstrate the functionality, then these special modes should not be used.

### Server / Service Case in Point

In windows software can be configured to run as a service, which is then controlled by the operating system. A service will be automatically started when the OS boots up.  If the data center power were to go out, all the servers will be rebooted, and you will want the servers to restart automatically. It would be the worst possible design if because of a power outage you have to send an administrator to the server room and restart all the services.  Similarly there are times, for example when installing OS patches, that the server has to be rebooted.  Requiring that all services get started manually is a error-prone way to run a server.  The point of a service is that you configure it to be “running” and if the host is rebooted, the service come back up “running” 

However, some programmers like to run the server from the command line, because the debug output is displayed directly to the screen. Convenient for the programmer because they can immediately see things happening in the server.  When configured as a service, there is no window to display in, so this output has to go to a file. The programmer has to read and view a file, instead of seeing the output directly in a window.  (Actually, a simple program “tail” will read a file and display it to a window, and you have all the same benefits, but most programmers are too lazy to set this up.)  

From the developers point of view: running from the command line is “the same” as running as a service, so it should not make a difference.  Is this really true?  

There are many differences of running as a service, but the biggest problem lies in how programmer designs the program.  If the programmer is always seeing the stream of output going by, when an error occurs, it may be obvious what is going on.  Later, when doing the same thing as a service, it is NOT as obvious.  Is this an argument for running from command line?  No, exactly the opposite.   We should be primarily concerned that when the customer runs into the problem, that everything is there to address the problem.  As long as the programmer is taking a short cut, and making it easy for them to find problems running their way, they are consequently NOT making the customer environment easy to find problems. 

Programmers often rely on special output to find problems.  A customer hits a problem, and calls support.  The developers say “reconfigure your system like X, and try to do it again.”  This is a problem: the system was not designed to support finding problems the way the customer run it — if you want to find problems you must run it how the developers run it!   Those should be the same.

:::tip[Key Takeaway]

Running how the customer runs it should be the BEST way to find and fix problems.

:::

I don’t know how to emphasize this more.  If the programmers use a crutch, then they will naturally make the software work better with the crutch.  Take the crutch away, and the program is worse.

### Quite Obvious, Really

If the programmers would run the server as a service, then they would add in the necessary capabilities to find and fix problems.  Instead of adding in convenient mechanisms that work only when running in developer configuration, they would be adding convenient mechanisms that work when configured the way that the customer uses it.  

If the programmers ran with the same amount of memory that the customer is expected to have, then critical dependencies on memory will be found and fixed before it gets to the customer. 

If the programmers don’t use command line arguments, then they will find a way to control what they need without using command line arguments, and that same mechanism will work for customers.  

The thing you need to remember is that programmers are **_designers_**.  At every moment, they are looking at the product, and determining how to make it best for the customer.  They can only do this if they are actually in touch with the way that the customer does.  

They may believe that is “doesn’t matter” but they will never know for sure.  A careful programmer always runs the software in a way that is as close as possible to the customer, so that they really know what the customer is experiencing.

:::tip[Key Takeaway]

If you are not running it the same way the customer will, then you are not really in touch with what the customer will experience.

:::