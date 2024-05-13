#  Don't Abuse Singleton Pattern

The Singleton Pattern is when you create an object that is designed that there be a single instance of that object in the program. There are times that this pattern is appropriate.  There are also times that it is not appropriate, and a class with static methods is more efficient.  How can you tell when and when not to use the Singleton pattern?

## Example

Consider the example of a class called UserManager that manages all the users in an application.  By its nature you will never need two instances of UserManager.  There is only one place to go to find existing users, or to add new users, and this class is the place to do that.  
Generally the pattern is that you have a “getInstance” static method that returns the single instance of the object.  Then you make calls on that instance:

```java
UserManager uMan = UserManager.getInstance();
User user = uMan.findUserById( "A2R3T1F3" );
```


You could put this on one line, but you still would be making two method calls.  A very simple example of such a class might be designed like this:

```java
class UserManager {
    private static UserManager inst;
    private Hashtable<String, User> table = null;
    private UserManager() {
        table = new Hashtable<String, User>();
    }
    public static UserManager getInstance() {
        if (inst==null) {
            inst= new UserManager();
        }
        return inst;
    }
    public User findUserById(String id) {
        return table.get(id);
    }
    public User saveUserById(String id, User user) {
        return table.put(id, user);
    }
}
```


Notice that the constructor is private, only accessible within the class.  The only way to get an instance is with the getInstance method.  The class holds a hashtable of all the users.  This is a fairly typical use of the singleton pattern, however **it is a bad example**.   This is actually abuse of the singleton pattern.

## Alternatively use a Class with Static Methods

Notice that the exact same functionality can be provided through static members and static methods.  A static member is a member that there is only one instance of.  We only want one member anyway.  And if all the data members are static, there is no real reason to create an instance of the object.  If you make all the methods static, they access the static members, and you get the same capability in an easier to use package.  
The class with static methods might look like this:

```java
class UserManager {
    private static Hashtable<String, User> table =
        new Hashtable<String, User>();
    public static User findUserById(String id) {
        return table.get(id);
    }
    public static User createUserById(String id, User user) {
        return table.put(id, user);
    }
}
```


A couple of things to notice immediately: you don’t need a constructor, and you you don’t need the getInstance method.  You also don’t need a variable to hold the instance.  There is no particular advantage in holding the user table as a member of a singleton instance, you might as well simply declare it as static data member.  In a moderately complex class, these savings are a pretty small part of the class.  The real benefit comes from how you use it.  It takes only one line to look up a user:

```java
User user = UserManager.findUSerById("A2R3T1F3");
```


This is (1) far easier to use, and (2) a slight bit more efficient to execute.   The real point is: why force the calling logic to go get an instance, and then call a method on that instance?  If you know you will only even need a single instance, then just make the data members and methods all static.  It is easier and more efficient.

## When is Singleton Appropriate?

The singleton pattern is appropriately used when you have an interface and multiple implementations of that interface.  Lets extend this example slightly, and imagine that the system can be configured to either store user information in a XML file, or in a database.  You will also need a Factory class that determines which of several implementations to instantiate, in this case based on system configuration values, and returns the correct, single instance.  

It might look something like this:

```java
interface UserManager {
    public User findUserById(String id);
    public User createUserById(String id, User user);
}
class UserManagerFactory {
    private static UserManager inst;
    public static UserManager getUserManager() {
        if (SystemConfig("UserManagerType")==USER_MANAGER_FILE) {
            inst = new UserManagerFile();
        }
        else {
            inst = new UserManagerDB();
        }
        return inst;
    }
}
class UserManagerFile implements UserManager {
    ...
}
class UserManagerDB implements UserManager {
    ...
}
```


This is a proper singleton pattern where you have two implementations of the UserManager interface, but while the application is running, there will only ever need to be one instance of one of them.  Either all the users are stored in a file, or all the users are in a DB.  The calling code must get an instance, and then call the method on the instance.  You really do need instances of the classes because the two implementations have different data members: the file oriented one probably caches all the users in memory, while the DB one might only hold on to a connection to the DB, so you really do need to have instances of the objects to hold this data.

## Why Does this Pattern get Abused?

In my experience, programmers tend to dislike using static methods.  I believe that somehow they feel that they are not really making it “object oriented” unless you have an instance.  It is really just a package of static methods.  This is true.  Yet, you do have encapsulation in the sense that the class hides the data inside itself, and presents only well defined methods to the outside world.  The singleton pattern straddles the boundary between needing data objects, and just providing encapsulation. 

Some programmers feel that if they implement the singleton pattern, it will give the option in the future to make a different implementation and slip it in easily.  This is sort-of true, because the call sites already have the “getInstance” call.  Note that this is not really true because the singleton pattern with multiple implementations requires an interface and a factory class — if you have not provided those you really can not swap in another implementation without reworking all the code.  

If you did implement the interface and the factory just in case you need it, I must response with “**YAGNI**” in the loudest possible voice.  (You Aren’t Gonna Need It)  It is a very bad programming practice to slip architectural features in that you don’t need today, and might never need in the future.  These kinds of embellishments clutter the code, and create extra work, without providing any value.  If in the future you find you really do need the singleton pattern, it is not hard to find and replace all the call sites with the appropriate code; this is a mechanical change which the compiler will find for you.  

Based on the principle of “Keep It Simple” you should always use static members if possible (that is if you need only one instance) and you should use static methods if possible (because they don’t need any data beyond static data).  If all you need is a set of static methods, then you should implement a set of static methods.  Embellishing it to make it look more elegant as a singleton class is just a waste of effort that complicates the code unnecessarily.

## How should a Singleton be called?

Imagine that you have a class where the Singleton Pattern is justified.  How, then should it be called?  As a client of the class, you have to get a pointer to an instance. You have only four options:

1.  Hold a reference in a static variable and initialize by ‘lazy evaluation’ that is, test for null, and then initialize when null. After that the value is set.
2.  Hold a reference in a static variable and initialize at static initialization time. Are you sure that the singleton it ready at that time? This is a concern.
3.  Hold reference in local variable, and initialize every time with call to getInstance().
4.  Don’t use a variable at all and call in the method chain. If only one reference for one call is needed, this is fine.

In general, **getInstance()** should be quite efficient, and there should be little reason to hold a copy of the reference in your own static. In a sense, your static is duplicating the job of the singleton class which also has to have a static. A single shouldn’t ever change, but if it ever did, you would be left holding a stale reference. Option 4 is OK if you need only one call, but this pattern encourages inefficiency when multiple calls are needed. So, for all these reasons I believe you should use option 3 and get the instance every time.