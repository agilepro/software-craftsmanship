#  Constant Abuse

Constants can be useful, but constants can also be abused making code hard to read because you always have to go look somewhere else in the code just to understand what you are reading. This post is about a clear example of how constants can be used to make code much harder to maintain, particularly when they are arbitrary symbolic representations of something that is already supposed to act as a constant symbolic value.  

I am currently charged with taking over a lot of code that is written with fields names placed into Java constant at the top of the file, and then the SQL queries constructed using string concatenation with the field names. At the top of the file is the following block:

```java
private static final String TABLE_VALID_USER = "valid_user_table"
private static final String TABLE_USER_MANAGEMENT = "V1_USER_MANAGEMENT_TABLE";
private static final String TABLE_ROLE_DEFINITION = "V1_ROLE_DEFINITION_TABLE";
private static final String TABLE_ROLE_MANAGEMENT = "V1_ROLE_MANAGEMENT_TABLE";
private static final String TABLE_USER_STATUS_DEF = "V1_USER_STATUS_DEFNITION";
private static final String COLUMN_NAME_OPEN_ID = "hashed_open_id";
private static final String COLUMN_NAME_INTERNAL_USER_ID = "internal_user_id";
private static final String COLUMN_NAME_USER_ID = "hashed_open_id";
private static final String COLUMN_NAME_USER_NAME = "name";
private static final String COLUMN_NAME_ROLE_ID = "role_id";
private static final String COLUMN_NAME_ROLE_NAME = "role_name";
private static final String COLUMN_NAME_USER_STATUS_CODE = "status_code";
private static final String COLUMN_NAME_USER_STATUS_NAME = "status_name";
private static final String DEFAULT_USER_STATUS = "Pending";
private static final String AS_NAME_COUNT = "cnt";

```


Later in the code, there are SQL queries that are constructed like this using these constants in the string construction.  
What you have to remember is that these are very far apart in the code, so to find out what a field name is, you have to scroll up and down all the time. To be able to read the query, requires a lot of mental exercise. I realize for the original programmer this is not a big deal, because the column might be hashed\_open\_id but that programmer felt that the constant name COLUMN\_NAME\_USER\_ID was a perfectly acceptable replacement for that. The good news is that this is explained to be the user id.  
The bad news is that the actual column in the database is named hashed\_open\_id which is not obvious. When you read the code, you have learn this new, arbitrary symbol COLUMN\_NAME\_USER\_ID and you have to remember that it really means hashed\_open\_id and you have to do this for every column in the table! It would seem to double the amount of things that you have to learn in order to read the code.  
To understand the query, you need to have knowledge of the database. When using the database, you have to have the real column names in mind. The Java constant symbols are not helpful when dealing with the SQL data browser.

```java
String sql =
    "SELECT "
        + "COUNT(" + COLUMN_NAME_OPEN_ID +") as " + AS_NAME_COUNT + ", "
        + "FROM "
            + TABLE_VALID_USER + " "
        + "WHERE "
            + COLUMN_NAME_OPEN_ID + "= ? "
        + ";";

```


Wouldn’t it be better to just use the real table names and the real column names directly? If you did so, the query would be in the code as:

```java
String sql =
    "SELECT COUNT(hashed_open_id) as cnt, "
    + "FROM valid_user_table "
    + "WHERE hashed_open_id= ? ;";

```


This latter query is dramatically easier to read and understand, especially if you know the actual table structure. You can easily see exactly what the table name is being manipulated, and what columns are involved. Go back to the original, and try looking up the values in the constants to arrive at the same understanding. And you HAVE to know the table structure because it is manipulated by other classes and other programs. Does anyone really believe that using constants as an extra level of symbol redirection in this way is a benefit?  

Theoretically, if you decide to change a column name, then you go to one place, and it propagates through the entire code. Hey, that is cool, but how often do you do that? And it only changes this class … there are other classes and programs, some written in different languages, that manipulate the table. One change of the constant will never change everything.  

Readability is important. Isn’t the ability to read, review, and quickly understand code by the programmers that are going to maintain the code more important than the rare convenience of changing a column? Consider code that lives for 10 years. How many new programmers will have to read this code? How many times will a column name change?  

And, imagine that you do need to change a column name from hashed\_open\_id to standard\_user\_id is it really that hard to do a search and replace? You probably had to do the same thing in some SQL scripts used to create the table. The constant is not a universal symbol for the column name. The column name is a universal symbol for the column name. Why not use it directly everywhere? The point of a column name is to be a symbol for the data in the column.  

Can anyone think of any reason that an extra level of indirection to make Java constants for each column is worth the problems that it causes?

This entry was posted in [Uncategorized](https://agiletribe.purplehillsbooks.com/category/uncategorized/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2016/03/09/constant-abuse/ "Permalink to Constant Abuse").