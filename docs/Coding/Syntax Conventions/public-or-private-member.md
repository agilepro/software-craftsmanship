---
  title: Public vs. Private
---
#  Public or Private Member Variables?

When is it OK to make member variables public?  
Consider this class:

```
class Sample
{
    public String name;
    public String value;
    public Sample( String n, String v) {
        name = n;
        value = v;
    }
}
```


General Java guidelines recommend that the two member variables should be declared private, and that you should have getters and setters for each of them.  Some amount of guilt is dished out on those who are “lazy” and take the easy way of declaring public members that can be accessed directly. 

Like most things, the decision is not so easy and straightforward.  If it were always the case that all members should be private, Java would not have included the capability to have public members.

## 1      Functional Dependency

The first question to ask is whether there are any dependencies between members that need to be maintained.  For example, in the sample class above, there might have been included a “type” member, and the value must be appropriate for the “type”.  In this case, whenever the value is set, you want to either set the type at the same time, or you want to check that the value matches the type.  It would be very bad for the “type” member to be public, because it could be changed by an external routine, and made inconsistent with the current value. 

Members having a functional dependency is probably the primary reason that getters and setters should be used.  

How do you know if there is a functional dependency?  Look at the code and imagine what would happen if any public member were to change at any time.  Are there any assumptions that might be invalidated.

## 2      Future Structural Changes

Clearly, if a member is made public, then forever in the future, in order to maintain compatibility it must retain the same name and type.  You can never change it.  For example, if a mechanism was developed that stored character strings more efficiently than the String class, the Sample class could not be modified to use it without becoming incompatible with code that used the old version. 

Declaring the string private gives future coders the ability to change the internal structure of the object.  This is another tough value judgement.  What is going to change in the future?  Anything could change.  I would not assume that something is going to change unless there is a good reason for it to change, and you understand the parameters of the change.  Otherwise, if you do not know how things might change, then flexibility you build in for change is not likely to work.  Code can be changed rather easily, as long as it is cleanly written.  So, there is no point in taking a lot of preparation for change that might happen in the future.

## 3      Base Class / Sub Class

If you expect a class to be a base class for other classes, then you need to think about the differences that those classes will have.

## 4      Members that Represent the ID

Some objects have an id that is used to uniquely identify them.  These objects should have their ID set when they are constructed, and the ID should not be able to be changed.  It is not important to ever be able to reuse these objects to hold new instances . . . instead construct a new object with the new Id passed in the constructor.  The members that hold the ID clearly must be private in order to assure that they never change.

## 5      Simple Containers

All that being said, there are still a large number of classes that benefit from having public members.  If the class is used primarily as a container for data.  For example, the class represents a row in a database table.  Or a class is put together as a collection of other data types so that multiple values can be returned from a function at the same time.  

In these cases, the getters and setters actually cause a significant overhead.  Methods are more expensive.  The sample class mentioned above is a good example.  It is designed to hold a name and a value.  You might argue that the name is an ID, but clearly the value is simply a holder of a value.  The class does not need to manipulate the value in any way.  Indeed, the class itself does not care about the value at all.  Perhaps this is the key: does the class care about the value in any way other than that it holds onto the value. 

In these cases, it is not only acceptable to use public members, but it is preferable.  

Here is the class with getters and setters.  There is a lot more to maintain;  you can’t ignore that extra cost.  This is a simple class, but the getters and setters double the size of it.  What is the benefit of that increased maintenance cost?  Not enough to warrant it.

```
class Sample
{
    private String name;
    private String value;
    public Sample( String n, String v) {
        name = n;
        value = v;
    }
    public String getName() {
        return name;
    }
    public void setName( String newName ) {
        name = newName;
    }
    public String getValue() {
        return value;
    }
    public void setValue( String newValue ) {
        value = newValue;
    }
}
```
