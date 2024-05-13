#  Individual Exception Classes are Monstrously Overweight

My last post was you can avoid a lot of waste in a project by recognizing program logic errors, and keeping the exception being thrown very lightweight. In this post I talk about a particularly heavy exception, the individual exception class, which is constructed to communicate just one thing. They are just too heave for most use, and here is why.

## What is an Individual Exception Class?

This is a complete class that is dedicates to communicating a single thing to the user. Instead of throwing a generic exception object with a string explaining the problem, a complete exception class is created, and that is thrown instead. In the logical extreme, every possible exceptional utterance is represented by its own Exception class. For every possible thing the program might want to say to the user, there is a class to represent that.  

Let me give you an example. I found this in a real live open source project recently, and it is not an unusual example of how an exception class might be written:

```java
/*******************************************************************************
 * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
package com.company.engine.product.api;
public class NoXxxxFileInUploadException extends IllegalArgumentException{
    private static final long serialVersionUID = 3410221492413480890L;
    public static final String MESSAGE = &quot;Expected one Xxxx file and optionally&quot;
        +&quot; one image file but no file with a Xxxx extension was found&quot;;
    public NoXxxxFileInUploadException() {
        super();
    }
}

```


There you have it, 27 lines of text to maintain to say one thing: a file with the particular extension was not found. It communicates that one thing quite exquisitely. This is compiled into a Java class, which is included in the project. When you ‘throw’ an exception, you only throw a pointer, so it does not matter how big the class is in memory. What matters only is how much effort must be spent by the team maintaining the product.

## What is the Alternative?

The question in front of us: why not just throw a POJLE (Plain Old java.lang.Exception) object that has a string in it? Compare these two throw statements:

```
throw new NoXxxxFileInUploadException();
throw new Exception(&quot;Expected one Xxxx file and optionally one image file&quot;
   +&quot; but no file with a Xxxx extension was found&quot;);

```


Lets compare these two approaches on different dimensions: 

**Number of throw sites** – if you are throwing the same exception from dozens of places, the over head of the class might be warranted. But consider this error carefully. There is likely to be only one place in the code that is testing for this particular problem. It is most likely that there is only one place in the code that throws this. Why would you have multiple sites testing for this exact thing? I checked, and in the code base in question, only a single throw site was found. Thus the entire over head of the class must be loaded onto a single throw site.  

**Throw site complexity** – this is true that the one line of code to throw the exception class is cleaner than the two lines for the POJLE, but to understand what that one line is doing, you have to go refer to, read, and understand the custom exception class. Because of this, it is not conceptually simpler. With the POJLE, you know exactly what it is doing, and exactly what the message will be to the user. I would argue that the POJLE is simpler to understand, and easier to maintain.  

**Complexity of code base** – when your code base includes dozens of these exception classes, the complexity of the code base is certainly increased significantly. Any measure of cost for maintaining will go up. A simpler code base costs less to maintain.  

**You can test for the exception class and handle the exception** – it turns out it is _just as easy_ to test for a particular exception message string! Yes, you can say “catch (NoXxxxFileInUploadException e)” which is supported by the language. You can just as easily catch all exceptions, and test the string. The real question is: how likely are you to need to catch this class. If no file with a particular exception was found, then there is not much the program can do about it. You simply have to tell the user, and hope they can find a file with the right extension. Programs almost never should catch specialized exceptions (see discussion: [Exception Catch Blocks](https://agiletribe.purplehillsbooks.com/2011/10/01/3-exception-catch-blocks/)). You probably shouldn’t ever catch this exception, and exceptions are incredibly rarely used in this way. Back to YAGNI: you should not construct a class until you actually see a need for a class.  

**Project source overhead** – the Cognoscenti project that I work on has 1079 exception throw sites, each with strings to describe the situation. If I had to have 1079 classes, it would be monstrous overhead.  

**Project runtime overhead** – class files are not free. These exception classes are small, but do take up memory and disk space, and this does increase load and transfer times. A project without all these files is leaner, faster, and easier to maintain.  

**Expressibility** – this is the real problem. When a programmer has to create an entire class to express something simple, they are (a) less likely to report the problem in the code, and (b) likely to re-use an existing class for something slightly different. In the first case you have no message. In the second case, you have a message that does not precisely describe the situation, and that can be _worse_ than no message at all. The thing about requiring the programmer to write a string in the throws statement, is that they have complete freedom to describe the situation the best they can. They are not constrained to existing classes, and they are not forced into the overhead of writing and checking-in a new class. With the lightweight approach, you are more likely to get a get message if you keep with the POJLE.  

**Translatability** – This is an environmental exception, and so should be translatable. However, this is easy to accomplish with a Java property bundle. The entire statement in English is the ‘key’, and the translator provides a corresponding localized version in it’s place. This message has no data values. Yes, if there were data values, then you should use a template and data value style “Translatable Exception” but the key should simply be the complete message as shown. There is no need for making a numeric “message code” which is then mapped to English and all other languages. The original English message is the key.  

**Method signature** – you can state exactly what kinds of exceptions a particular class will throw. This is a broken idea, and you can see my discussion of this at: [Method Exception Signature](https://agiletribe.purplehillsbooks.com/2013/04/04/method-exception-signature/). One should avoid this bad idea, and as such the creation of a class does not help at all.

## Summary

I have created exception classes for projects, usually only one per project, with special capabilities needed, for example automatic association with resource bundles. There is nothing wrong with this. But I have never endorsed the idea that each exception should be represented by a single class, and that each exception class should represent a single error message. It is the kind of think that the “Programming Nazis” like to do: they simply feel that it is so nice and organized to have a class for every possible message. The real result is that you have very few such messages to the users, and the message quality is low. 

It is smarter to make it as easy as possible to allow programmers to communicate as good a message as possible to the user. This will reduce the cost of developing the code, reduce the cost of maintaining the code base, and improve the quality of the messages and therefor improve the quality of the program overall.

:::tip[Key Takeaway]

Never create a class when a simple string will do just as well.

:::