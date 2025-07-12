---
  id: brainless-getters-and-setters
  title: Getters & Setters Brainless
---
#  Brainless Getters & Setters are a Waste

Someone long ago set a pattern that all members should have a getter and setter method.  Some are persuaded that this is OO and this is encapsulation, so a lot of inexperienced programmers do this by default.  But this is a problem.

## YAGNI

The principle of YAGNI is that you should not do anything until you need it.  When you need a getter and setter, then you should implement it at that time.  Implementing it before that time is a waste.  

What is the waste?  It increases the number of lines of code.  More lines means more effort to maintain. The example below had a 57 line class, versus a 17 line class. The full-blown class is more than three times the size, but offers no additional functionality.

## Example

Here is an actual class developed by someone who believe in all the pre-agile OO development principles.  This **over-blown** class not embellished in any way from what the developer constructed:

```java
package com.company.symfoware.analytics.common.security;
public class User {
    private String id;
    private String name;
    private String dbId;
    private String dbPassword;
    public User(){}
    public User(String id){
        this.id = id;
        this.dbId = null;
        this.dbPassword = null;
    }
    public User(String id, String dbPassword){
        this.id = id;
        this.dbId = id;
        this.dbPassword = dbPassword;
    }
    public User(String id, String dbId, String dbPassword){
        this.id = id;
        this.dbId = dbId;
        this.dbPassword = dbPassword;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getDbId() {
        return dbId;
    }
    public void setDbId(String id) {
        this.dbId = id;
    }
    public String getDbPassword() {
        return dbPassword;
    }
    public void setDbPassword(String password) {
        this.dbPassword = password;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}

```


I will claim that this **lean class** functions exactly the same:

```java
package com.company.symfoware.analytics.common.security;
public class User {
    public String id;
    public String name;
    public String dbId;
    public String dbPassword;
    public User(String id, String dbId, String dbPassword){
        this.id = id;
        this.dbId = dbId;
        this.dbPassword = dbPassword;
    }
}

```


The lean class has exactly the same functionality. It stores four values for the user. The getters and setters of the over-blown class allow immediate reading and updating of each data member . . . there are no restrictions. 

The lean class is easier to read and understand. For the over-blown class you can’t scan it easily. More than this: to be assured that the getters and setters do not do anything complicated, you have to read each getter and each setter to check that all it does is a simple assignment. By simply allowing the members to be accessed, then you _know_ that there is no extra side effects. This is where the cost of maintenance comes from. 

The over-blown class does not allow for any additional safety. The password is not any more or any less protected. There is no additional security. There is no additional memory control. Nothing is changed in the over-blown class as far as run time functionality is concerned. There is no additional runtime benefit to unnecessary getters and setters. 

The over-blown class does not protect the developer from any danger during development. There is no reason to believe that calls to the setter will have fewer programming errors than simply assigning the member. The wrong value can be assigned to a variable exactly equally to passing the wrong value to a method. There is no additional type-safety, nor any additional type coercion. There is no additional design-time benefit to unnecessary getters and setters. 

The over-blown classes are larger, which takes more memory, but we should not be concerned about this small effect. The over-blown class methods impose a small overhead, but again this is probably not significant enough to worry about. I would not argue that this should be avoided on this basis. My argument is based purely on maintenance costs which is the real cost of a real code base.

## But what if you need a Setter!

If you need the setter, implement it. Once you determine that you need to control the setting of a particular member, you change it to private, implement the getter/setter, and update all the places that call it. This is trivial to do with a reasonable IDE . . . or even with just a text editor. 

Because you can change the access from public to private, you have 100% confidence that the change is accomplished everywhere. Whether a member is public or private is a factor of the interface. Changing whether public or private is just an interface change like anything else.

## Dreaming of No Change

The argument for defining getters/setters up front is that you can not change the interface later. But that is the problem. You certainly CAN change the interface later. Agile is all about allowing for changes, and managing those changes through the code. Nobody can promise that you will never need to change an interface. Interfaces changes happen all the time. You need to add a function, you add a method, that is an interface change. Sometimes the parameters to a method need to be changed. 

It is no greater cost changing a member from public to private than the cost of changing the parameters to a method. The Agile approach is to only implement the methods that you need at time. You do NOT implement all the possible methods just in case you need them. This is a waste. Implement only the methods you need, and change them when you need to make a change. Experience shows that you do less overall work and less maintenance cost when you work in this way. 

The idea that you need to fill in all aspects of a class that you might need is precisely the programming behavior that agile is fighting against. Implementing a method that is not used is a waste, no matter how easy it is to create the method. If I can create 1000 methods with the press of a button, those 1000 methods are still a waste if they are never used or never needed.

## Avoid Waste

The idea of elaborating getters/setters for all data members is founded in the idea that you can not make changes later to the interface. However, Agile development say to implement only what you need now. If you need to make a change, do so, but don’t do it in advance. Thus creating all the getters and setters in advance is a waste, one that can TRIPLE the cost if maintaining a set of classes, for no benefit.  
Automatic brainless creation of getters and setters is a waste that can be easily and effectively avoided.

## References

*   [The Magic Setter Antipattern](https://javax0.wordpress.com/2015/03/25/the-magic-setter-antipattern/) – Peter Verhas, March 25, 2015, Setters and getters are evil.
*   [OOP Getters() And Setters() – A New Programmer’s Frustration](http://www.bennadel.com/blog/1377-oop-getters-and-setters---a-new-programmer-s-frustration.htm)
*   [Why bother Getters & Setters](http://cfrant.blogspot.com/2008/10/why-bother-getters-setters.html)