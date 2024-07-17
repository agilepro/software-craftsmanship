# Simplified (Swedish) Path Notation

This simplified path notation is easier to generate and faster to parse than the notations that came out of some programming languages. It is useful for specifying the location of any object in a JSON structure.

## Basics

**Dots** The path is a list of elements separated by dots (period characters). This means that the names of the elements can not use a period in the name itself. If the element being addressed has a dot in it, the dot should be stripped out before building the path. To parse a path you need only separate the path into a list of strings using the period as a delimiter.

**maps** The path item for an element in a map is of course the name value that addresses that element in the map. This works exactly the way you would expect from JavaScript and other programming languages.

```
customer.home.street
customer.home.city
customer.office.street
customer.office.city
```

**lists** For path item for a list element is simply the integer index to that element using 0 as the first index. This is the only way that this simplified notation is different than programming language approachs that use square brackets around the integer index.

```
customer.addresses.0.street
customer.addresses.1.street
customer.addresses.2.street
```

**Schema** The simplified notation works for schemas with a slight modification. The path into a schema is virtually the same as the path into the data represented by the schema, but there is one small difference: When the schema includes a list, there are no list indices to use. Instead a hash symbol (#) indicates the presence of a list.

```
customer.addresses.#.street
```