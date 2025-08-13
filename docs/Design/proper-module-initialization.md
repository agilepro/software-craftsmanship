#  Proper Module Initialization

Given a module that is designed to be re-used across many applications, what is the correct way to initialize it, and why?

## Scenario

A developer, Carlos, has made use of the module version 5.0 and everything is running.  He wants to upgrade to the latest version 6.1 and does not want anything to break.  That means that the exact same initialization parameters from version 5.0 need to work in 6.1.  

However, version 6 has some additional capabilities that can be specified.  Those capabilities are optional: if you don't specify them, then suitable defaults are provided.  If new parameters are provided, it is OK for version 6.1 to have different behaviors.  Carlos' application provides only parameters that were in version 5.0, and in that case the behavior of the module needs to be the same as 5.0.  

It may even be the case that an initialization parameter 5.0 needs to be slightly changed: that is there are new options, or old options for a value retired.  How do you allow new developers to use the new features, without breaking the old developers compatibility?

## Solution

Experienced developers are not going to be surprised. . .  
Initialization should be from a Java Properties object, which is a hashtable of name/value pairs.  We document the named values that can be set.  If any setting is missing, a suitable default is provided.  Any additional settings that it does not know about is ignored.  

Properties objects can be serialized into a configuration file.  A second configuration option is to pass in the File object that identifies a configuration file for the module.  It must be a File object, which means it specifies the full path, to the exact file.  This allows the application hosting the module to put the configuration file anywhere it deems appropriate.

## Never Assume the File Location

The module should NEVER assume that it can find and load the file from a fixed name or path.  The fill path to the configuration file (if there is on) must be passed to the module for initialization.  Modules that assume a particular path, or a particular file name, force a constraint on the host application.  First, they require that a file system be available, and that is not always the case.  Second, there can be another module that requires the same file name, and so the two modules conflict.  Allow the hosting application complete freedom in picking the name and location of the configuration file, if ti wants to go that way.

## File Not Always Appropriate

The Properties object is clean and fully self contained;  the hosting application can construct this object from any source it wants, generally a configuration file, or a configuration database, but in some cases it may want to calculate the values passed in based on other configuration values.  This can have some powerful advantages.  

If an application contains many such modules, it is a maintenance nightmare for each module to have its own configuration file.  The administrator is forced to make sure that all the various files have consistent settings.  A well designed application has one configuration file, and avoids having any duplicate or redundant settings.  If you use many modules, it is quite likely that multiple modules will need the same values, and equally likely that they will pick different names.  The best approach here is that the hosting application reads its “master” configuration file, and then copies the values into multiple positions in the Properties object as needed for the module it is initializing.

## Configuration overloading

If the modules have uniquely named property values, it is possible for the hosting application to read a single master configuration file which has properties for all modules in it.  The same Properties object is passed to each module.  WE call this configuration overloading because all modules get all the properties, but are sensitive only to their own.   This is elegant, but has one drawback: redundant properties are still redundant, even if they are in the same file.

## Best Practice

The best practice is this:

1.  the application reads its configuration file.  Then,
2.  for each module, it constructs a Properties object, and
3.  copies the appropriate values from its configuration file to that object,  which is passed to the module for initialization

A naming convention can be used to allow new module properties to be specified that the host application does not know about.  For example the properties for the “Email” module might be prefixed with “email-“.  The host application would find all the properties in its configuration file prefixed with email- and copy it to the Properties object for the email module.  Thus a host application property “email-port” would become a property for “port” in for initializing the email module.  This naming convention will allow the administrator to use configuration properties that exist in the 6.1 version of the module, in an application that was originally designed for the 5.0 version.

This entry was posted in [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2012/10/14/proper-module-initialization/ "Permalink to Proper Module Initialization").