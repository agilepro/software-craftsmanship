---
  title: Content-Free Comments
---
#  Don't make content-free comments

Avoid the inclusion of “content-free java-doc”. This means that a Java-Doc header is created that has no information content in there. 

:::tip[Key Takeaway]

It is better to have no comment, than a comment that does not add value and is not helpful in any way.

The comment should **only** contain information that is **not obvious** from the declaration itself.

:::

## Empty Javadoc

Comments in general should have useful information that is not obvious, or there should be no comment at all. Here is an example:

```java
/**
 * @param ar
 * @param section
 * @param displayLevel
 * @throws Exception
 */
public void sectionDisplayNewUI(AuthRequest ar, NGSection section,
        int displayLevel) throws Exception
```

The reason I say there is no information is that everyone can plainly see that there are three parameters, and it throws an exception. The comment does not add any information.  
You might think this is harmless, but it NOT. Every character that is added to a file adds noise. If that character goes to something informative, then the value outweighs the noise. But if there is no additional information, then the added noise is not worth it. If you are reading a file, looking for information, the extra text means you have more places to look.  
Even if there is a descriptive statement it is not always useful. For example:

```java
/**
 * @param ar the AuthRequest for this page
 * @param section the section to display
 * @param displayLevel the level to display at
 * @throws Exception when an error occurs
 */
public void sectionDisplayNewUI(AuthRequest ar, NGSection section,
       int displayLevel) throws Exception
```


These descriptions are also entirely obvious to everyone, and of no value.  When the method is called “sectionDisplay” and the parameter is called “section” there is no point in adding that this parameter is “the section to display” — that is obvious and therefor of no value.  Describing the parameter “displayLevel” as “the level to display it at” similarly does not tell me anything I did not already know.

## Tell Me Something I Don’t Already Know

If the comment does not add value, it should be left out. A blank space tells you clearly that there is no information there, but a bunch text that contains no information is worse than a blank space, because you waste a reader’s time discovering that there is no information.  
The test is: does this comment tell me something I don’t already know?  Every comment should do so, or it should be eliminated.  
Robert Martin covers this suitably in his book “Clean Code”: [http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/](http://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ "This link leads to an external page")  
On page 63, he says “comments like this clutter up the code, propagate lies, and lend to general confusion and disorganization”.  
If a method is implementing an interface, then it should NOT have any comment or java doc, and instead you should refer to the JavaDoc of the interface it is implementing. This helps to avoid having two (or more) copies of the same documentation in the code. If documentation is needed, simply refer to the documentation on the interface (don’t copy it) and then include any implementation specific details.

## Another Example

Here is another example with a method that returns a value:

```java
/**
 * This method is used to get the user key of a user profile. 
 * User key is unique identification key of a user profile.
 * @return String
 */
public String getUserKey();
```


The @return annotation tells you that this method returns a string.  But everyone already knows that by looking at the signature.  The first sentence tells you that “This method is used to get the user key of the user profile.”  The class is “UserProfile” and the method is “getUserKey”  there is nothing in the first sentence that you do not already know.  The second sentence actually says something that is not obvious from the declaration of the method itself, and so the above comment can be improved to the following:

```java
/**
 * User key is unique identification key of a user profile.
 */
public String getUserKey();
```

Shorter, simpler, and says everything the first says, without the content-free fluff.

## Update

Eclipse, and possible some other IDE environments, automatically add the content-free part of the comment for you.  This should not be a surprise since it just scrapes the code, and produces the format.  This is confirmation that there is really no new information in these pro-forma insertions.  You should however, delete the parts that you do not add to.  That is, either add a real comment to the appropriate place, or delete pro-forma text.  It is a real quandary: it can be very convenient to have the basic framework created for you, but if you have nothing to say there, then deleting that help increase the information content of your source.  The good thing: if you view this as an option to either add a real comment or go to the trouble of deleting it, there is a slightly larger motivation to go ahead and write something meaningful.

