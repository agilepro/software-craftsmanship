#  XML Schema Validation, or not?

The question is: should a program that reads a standard XML file format use XML Schema Validation when reading the file to make sure that the file being read is properly formatted?  The answer depends upon a lot of things.  It is certainly NOT a foregone conclusion that you should always validate XML when reading.  There are times when validating will constrain the functionality to an unacceptable degree over the long run.

## About Schema Validation

The idea behind validating the schema is that it will warn you when someone submits a file that does not conform to the standard. If programmer A writes an importer for a file format, and programmer B uses it to read a file that is not of that format, then an error is likely. The validation will make it clear that it is B’s fault for submitting a file that is not correct.  

If you don’t do the validation, then the error that occurs may not be as clear. People might think it is A’s fault for writing a lousy importer. So that is the good thing about validation: it makes it clear when the input file is incorrectly formatted.

## In case of a Standard Format with a Published XML Schema

Validating only makes sense when there exists a well designed, published, accessible XML Schema document.  

The problem with using validation appears only after time. In a year or two, the standard might be extended.  If V2 is made to be “backward compatible” with V1, that means that all the same tags will contain the same information. Of course, validation will fail, so you importer will not allow the importing of V2, even though it would work perfectly well. Validation will consider V2 to be an error.  

There may be third party extensions that are useful. The original idea behind XML was that it was extensible, meaning you can add tags in a safe way to carry extra information.  By choosing to validate the incoming file, you eliminate the possibility of reading files that have harmless extensions in them. 

XMLSchema was never designed to handle upgrade/downgrade scenarios. It was designed only for exactly equal version interchange. Thus if you have two servers that interchange data using validated XML, if the exchange format is ever changed, then BOTH servers have to be upgraded at the same time. What if you have 100 server talking to each other: in order to upgrade one you have to upgrade all, and that may simply not be possible.  

Some would say that the proper approach is that the instance file carries an identifier of the schema it purports to implement (it does) and then validate according to the schema thus specified. This guards against corruption. But the automatic access of schema definitions is not guaranteed by any system, and leave you open to the “codex problem” which is that the schema you need might not, or no longer, be available. Over time, as the number of schemas for a particular format increases, the amount of trouble increases as well.  

I have always favored Using XML Schema in development to make sure that the code is correct, and then releasing code that does not validate so that upgrade/downgrade scenarios can be accommodated. However, this does leave you open to getting unpredictable errors when receiving a corrupted file.

## Inventing Your Own Format

If you a specifying a format, you should understand that XML Schema can only represent certain kinds of XML instance documents.  

For example, if you want to represent customer information (e.g. firstname, lastname, street, city, state, etc) as a block of XML but you don’t care which order these tags come in, there is no easy way to express that in XML Schema.  You can make tags optional, but if you have a specific set of tags, they must be in a specific order.  

It is also very cumbersome to allow for the possibility that extra tags might be inserted in the future.  For example, if you anticipate that in the future a customer may have a new data field, such as a Twitter ID or maybe an Id for a service that has not been invented yet.  You must sprinkle the schema literally with a specific structure that matches any tag — literally every container must include this — and even then the order is constrained that they come only after the declared tags.  

The XML Schema validation rules are often unnecessarily strict, with no way to loosen them, without completely loosening and losing all value of checks in the first place.  Often the kinds of checks you want to do on the file are simply not available using XML schema validation.  Enforcing consistency in a file can not be done with schema validation.  For example, if you have a number of groups, and a number of individuals, and you want to make sure that every individual is in at least one group, you can’t really enforce this at the schema level.  Also, of course, schema validation will not tell you is the data is meaningful either.  

The error messages you get from the schema validator are very difficult to interpret.  Every hard core XML experts often have to discuss and experiment to determine what about the file is at fault.  It is not really that the validator is poorly written, but that often the XML Schema itself must be very complicated, and a complicated schema produces complicated, and sometimes ambiguous, error messages.  

My experience has been that constructing a schema that can be used to validate an XML file can often be more work than writing code that will do the kind of validation you want: checking that all the required tags are there, and that all the proper relationships are present.  It can be designed to allow new tags without complaining, while still assuring that the ones remaining make sense.  A little work can assure that the the error message is meaningful in the context that the user lives in, without being a meta-programmer.  

This option may not be available to you:  if you are making a public standard, then standard validation may be required.  But if you are making an internal file format, a programmatic validation may be easier and produce better, more useful, results.