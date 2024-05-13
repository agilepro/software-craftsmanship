#  NULL value in JSON

The value known as **null** and what it means.

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

## Additional Reasoning for the Hesitant

Some will still claim that **null** is a different value than **omitting** the value. If you wish to implement a system this way, then you must also very clearly define the meaning of this difference. How will a phone number set to **null** be handled differently than **omitting** the phone number? After all, the **null** strictly means that we have no value, and that is exactly the same as not having a value.

I am not saying that such reasons don’t exist, but I have designed a lot of systems, and I have never seen the need to consider an **omitted** value as anything other than equivalent to receiving a **null**. When translating to Java, you should set the variable if no value for the variable is received.

However if you use a standard Map in Java to receive the JSON, then it is possible to make a map member with the value of **null**, and that is different from not having the map member. You can iterate the members of a map, and get a **null** value. In my Java code I have to be careful to check the value and ignore it if it is **null**, so that **null** and omitted values are treated the same. In other languages I have used maps where setting a member to **null** simply removed the member, thereby enforcing an exact equivalence.

It is possible thought that you have a good reason to considering a **null** value to be distinct from an **omitted** value, but if so it is imperative that you specify clearly how exactly each of these values differ in meaning and how they should be handled differently.