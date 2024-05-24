# Avoid Using Indexicals

An indexical is a word that is a part of speech which derives its meaning from the context in which it is uttered.  They are shortcuts that refer to the current context.  This makes it a problem when you transport the message out of the original context.

:::tip[Key Takeaway]

Avoid the words "you", "that", "this", "it", "now" and "here".  Instead include specific information that can be understood later in a different context.

:::

## Understanding Indexicals

Consider this sentence:

```
I give this to you now.
```

The word `I` refers to the person who is speaking.  If Taylor Swift says this sentence, it means one thing.  If Bob Dylan says it, it means something else.  The word `you` similarly means whomever this sentence is spoken to.   The word `this` is a reference to something notable in the context.  If the speaker is holding a book at the time, one might conclude the meaning to be the book.   Depending on the previous conversation, it might be something else.  The word `now` is another indexical that refers to the time that the sentence is uttered.  If spoken on Tuesday, it refers to Tuesday.

Spoken and written language would be very tedious if you had to explicitely specify all these things in every sentence.  As part of a conversation, the speaker can assume that there are aspects of the conversation that are already part of the discussion, and can be referred to using an indexical shortcut.

## Error Messages are Not Conversational

It can be very tempting to write an error message with a conversational tone for the user.  Indexicals allow the message to be succinct about the problem that just occurred.

The problem is that error messages need to be transferrable while retaining their meaning.  An error message is delivered to the immediate user, but it is also recorded in the log file.  The user may need to share the error message with their colleagues or a support engineer.  It might be submitted as part of a trouble ticket.  When taken out of the immediate context, indexicals will not be understandable.

## Stand on Their Own

Error messages should be written in a way that they stand on their own, and are understandable when they are removed from the context from which they occurred.  When reviewing a particular error message, imagine that you encounter that error message ina log file without knowing any other context.  Is the error message complete?  Does it clarify all the parts it is trying to communicate?

* **you** - this is the big one and commonly abused.  The error message should speak about the current user in the third person.  Ideally, mention the user id of the user involved, because what matters is not who's hands are on the keyboard, but instead what user account is actively logged in.  Sometimes users are mistaken about the account they are using, and it is useful for an error message to clarify that.  More important is that everyone else who sees the message will have the user Id clearly spcified and recorded for all time.
* **I** - error messages almost never use this pronoun directly, however it is important for the error message to specify where the message is coming from in a way that can be understood any time in the future.  The user is away of using a screen and mouse, but very rarely have an understanding of where the processing goes and what parts are handling the request.  Programmers all too often assume that the user already knows that a particular module is being used.  The programmer should assume that the entire system is a black box, and should include the detail of the problem source into the error message when appropriate.
* **this/that** - You might be surprised how many times a programmer will say something like "that is not allowed" assuming that the reader of the error message already knows what it is that it is speaking about. When an error message is delivered out of context, that is not a valid assumption.  You need to be specific.  What exactly was it that is not allowed?  Use an object id when appropriate.  Include the literal value if that is an issue.  For example: "'1A112' is not a valid zip code"
* **now** - if the error depends in any way on the time, then include the specific time value.
* **here** - if location is relevant, then include the specifics of the location, and don't assume that the receiver of the error message knows it.

## Examples

| Avoid | Use instead |
|-------|-------------|
| You can't do that | User 789 is not allowed to access document XYZ |
| Invalid value | '1A112' is not a valid zip code |
| Null pointer exception | A value for account id must be supplied |
| Unable to read file | Unable to read file 'docs/logs/contrans2024-05-05' |
| Illegal update | User 123 is not allwed to update account 456 |
