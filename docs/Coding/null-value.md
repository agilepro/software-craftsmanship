#  NULL value in JSON

The value known as **null** and what it means.

:::tip[Take Away]

The token `null` should essentially never be used in a JSON file.  If an attribute does not have a value, omit the attribute.  Lists should never have a null in them.

:::

## Origin

In most computer programming languages, a variable is implemented as a space in memory where the value will be stored.

If the variable has not been set, many data types offer a value **null** which means simply that the variable has no value. Either the variable has not been set yet, or the value was removed from the variable. The meaning of **null** is unambiguous: _there is no value here_.

JSON is a text-based format for transferring values from system to system independent of particular operating hardware and system software. It depends only on the character set and character encoding of the stream so it is extremely portable.The JSON format defines support for the most common data value types: strings, numbers, and booleans.

Here is an example block of JSON:

```json
{
 "name": "Justin Time",
 "home phone": "555-123-4567",
 "mobile phone": "555-404-4321"
}
```


## Options for No Value

But what if Justin does not have a home phone? There are two ways to send this in JSON, the first is to simply **omit** the value, and the second is to send the value as **null**. Null is a special symbol in JSON. Note that the **null** is not in quotes so that it is not confused with a string that just happens to have the value “null”.

```json
{
  "name": "Justin Time",
  "mobile phone": "555-404-4321"
}

{
  "name": "Justin Time",
  "home phone": null,
  "mobile phone": "555-404-4321"
}
```


Most argue that these should be considered EXACTLY the same. JSON is not a programming language which allocates memory for variables, so there is no variable that that needs that needs any setting. Null means “there is no value” which is exactly the same as simply omitting the entire line from the JSON.

Because omitting the value makes the JSON representation slightly smaller, most people prefer omitting the value.  The data will transfer and parse a tiny bit faster. There is no additional information in sending the value with **null** specified. Some will point out that including the **null** is a way to indicate that a home phone value _could have existed_, but what a receiving system would do with that is unclear.

Declaring that you will always treat a **null** value the same as an **omitted** value will simplify the logic handling them, and more importantly will clarify the meaning to the users so that they make fewer mistakes. The caller can use either without worry because there really is no difference.

## Empty String

With strings (things surrounded by quotes) there is another option and that is to use an empty string, which is the quotes with nothing between. This would look like this:

```json
{
  "name": "Justin Time",
  "home phone": "",
  "mobile phone": "555-404-4321"
}
```


In a strict sense this is not saying that there is no value here. There is a value, but it is a string without any characters. If you think about a phone number, it still means that there is no phone number.

Perhaps an empty string should be considered exactly equivalent with a **null**. All of the systems I have built have always treated an empty string as exactly equal to a **null** because I have never found need to treat these values differently. Again, the code in a program does not need to worry about what the difference means because (if everything is coded consistently) there is no difference.

## Never put a null in a List

Lists contain a number of values.  Null means "this is not a value".  Why would one ever put a non-value into a list?  

Imagine this example:

```json
"list": [
  { "name": "object 1" },
  null,
  null,
  { "name": "object 2" }
]
```

What is the meaning of those nulls?  There is object 1, then no-value, no-value, and finally object 2.  There are really only two values in the list.  What is the purpose of the no-values?

This issue become more important when we consider the meaning of the list as a whole.  If the null values were omitted, would you still have an equivalent list?  Is this the same list, or a different list?

```json
"list": [
  { "name": "object 1" },
  { "name": "object 2" }
]
```

What about a list with only 5 nulls in it, is it an empty list?  Are these equivalent?

```json
[ null, null, null, null, null ]  ?=  [] 
```

To consider the list with and without the nulls is an invitation for bugs.  Having multiple ways to represent the same thing is a waste.  Better to simply omit the null values always for lists in JSON.  

In an environment where values are mapped to memory locations, some might argue that the list is actually four spaces long, and two of the spaces are empty.  What value is there of recording that the second space was null?  How is this different than no spaces being null?

In JSON there is no need to allocate a space for the nulls.  Elimination makes the message smaller and faster with no loss of information.  Beyond efficiency, the semantics are unclear as to what this null within a list _means_ and how to recipients of the message are expected to properly deal with it, which can lead to bugs and failures.

## JavaScript and `undefined`

JavaScript (and TypeScript) offer three possibilities for when you don't have a value like a phone number: (1) the key is missing from the map, (2) the value is "null", and (3) the value is is "undefined".  Once again, none of these represent a phone number, they all represent that you don't have a phone number. 

Unless you have a really good reason, these three options should all be considered semantically exactly equivalent.  While there is a technical difference between these options, I don't know of any pre-defined semantic difference that would be meaningful in regular program logic.  Any decision made on the basis of one of these, should cause the same decision with the other two as well.  The value "undefined" means the value is not defined, while "null" means the value is defined as not being there.  I can't honestly imagine any reason you would want to treat those as different.  I you can imagine a difference, then be sure to document that exact semantic difference clearly.


## Additional Reasoning for the Hesitant

Some will still claim that **null** is a different value than **omitting** the value. If you wish to implement a system this way, then you must also very clearly define the meaning of this difference. How will a phone number set to null be handled differently than omitted the phone number? After all, the null strictly means that we have no value, and that is exactly the same as not having a value.

I am not saying that such reasons don’t exist, but I have designed a lot of systems, and I have never seen the need to consider an omitted value as anything other than equivalent to receiving a null. When translating to Java, you should set the variable if no value for the variable is received.

However if you use a standard Map in Java to receive the JSON, then it is possible to make a map member with the value of null, and that is different from not having the map member. You can iterate the members of a map, and get a null value. In my Java code I have to be careful to check the value and ignore it if it is null, so that null and omitted values are treated the same. In other languages I have used maps where setting a member to null simply removed the member, thereby enforcing an exact equivalence.

It is possible thought that you have a good reason to considering a null value to be distinct from an omitted value, but if so it is imperative that you specify clearly how exactly each of these values differ in meaning and how they should be handled differently.