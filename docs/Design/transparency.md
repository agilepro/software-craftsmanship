#  Transparency Advantage

This is an example of some open source software that I had difficulty using and how to improve it.  A common principle is that of transparency: when something goes wrong, don’t hide it.  Don’t cover it up.  Don’t attempt to continue as if nothing happened.  Report it properly and immediately.  A simple explanation of the situation will help a lot.  

I am trying to talk to an NNTP server.  I would rather not write the entire protocol myself, so I make use of the Apache library for talking to NNTP. I start using it, and a few things work, but I got stuck in a situation where fetching a number of news articles would work the first time, but never the second time.  Clearly I have thing essentially correct, because otherwise it would not be working the first fetch, but something is wrong causing the second (and all subsequent fetches to fail. 

The retrieveArticle method of class org.apache.commons.net.nntp.NNTPClient is defined to return a Reader: a null return means that something went wrong.  It was returning null, but not clear at all what was going wrong!  It worked the first time, so it is not an initialization problem.  Was it a problem cleaning up from the first call? 

The problem was that there was a dependency between calls.  Certain calls had to be made in certain orders, and the code was written with this mind.  In fact, the code “knew” what was wrong.  That is: there was a specific problem with the sequence of calls, and the code detected this correctly.  Only it **didn’t communicate this to the programmer!**  

Here is the code as written:

```java
private Reader __retrieve(int command,
           int articleNumber, ArticlePointer pointer)
throws IOException
{
   Reader reader;
   if (!NNTPReply.isPositiveCompletion(sendCommand(command,
                  Integer.toString(articleNumber))))
      return null;
   if (pointer != null)
      __parseArticlePointer(getReplyString(), pointer);
   reader = new DotTerminatedMessageReader(_reader_);
   return reader;
}
```


The “sendCommand” does the work of making the request, and it returns a result, which is then interpreted by the isPositiveCompletion method, which returns a boolean, and if false, results in a null being returned.  
After a few hours of tyring to find the information of what was going wrong, and scouring the internet for example (all of which made a single request and then exited back to the OS) I downloads the entire source and set it up to do my own builds.  I changed this one routine to this form:

```java
private BufferedReader __retrieve(int command,
      long an, ArticleInfo pointer)
      throws IOException
{
   int res = sendCommand(command,Long.toString(an));
   if (!NNTPReply.isPositiveCompletion(res)) {
     throw new IOException("isPositiveCompletion returned "
       +"false for command '"+command+"' and article '"
       +articleNumber+"' and result '"+res+"'");
   }
   if (pointer != null) {
      __parseArticlePointer(getReplyString(), pointer);
   }
   return new DotTerminatedMessageReader(_reader_);
}
```


All I did was to add a simple exception throw, that reported some of the particulars about what was going on.  There might be some clues here as to why it was failing.  The exception message showed that the earlier command had returned a 412 error code.  A quick search [of the web](http://www.networksorcery.com/enp/protocol/nntp.htm) showed that this means “No newsgroup has been selected.”  

How obvious my problem would have been if this had been returned to me.  But instead, the error code 412 was buried inside another function that returned a true/false boolean, that ultimately caused a null to be returned.  What is the benefit in hiding this result?  

This pattern of returning null should be used when there is a legitimate reason for null to have a meaning.  For example, looking for a message that does not exist might warrant a null return to say “there is no answer”.  But this is a case of a programming error: the protocol required that the newsgroup be selected first, and the fact that it was not selected was a programming error.  The code “knew” what the problem was, but instead of communicating the problem, it communicated a “null” value, which in turn forces the programmer to go to a lot of trouble to find out WHY it returned a null.  What a waste!  

The proper construction of the code is like this:

```java
private BufferedReader __retrieve(int command,
        long an, ArticleInfo pointer)
        throws IOException
{
  int res = sendCommand(command,Long.toString(an));
  if (res==412) {
     throw new IOException("The server responded with "
      + "412 meaning no newsgroup has been selected.");
  }
  if (!NNTPReply.isPositiveCompletion(res)) {
    throw new IOException("isPositiveCompletion returned "
    + "false for command '"+command+"' and article '"
    + articleNumber + "' and result '"+res+"'");
  }
  if (pointer != null) {
    __parseArticlePointer(getReplyString(), pointer);
  }
  return new DotTerminatedMessageReader(_reader_);
}
```


It may appear to be overkill to include a specific test for a specific case, and report it, but this _might_ be a common problem.  What is the harm in testing the return code for a specific value, and throwing a specific exception?  .  The code block is only run when the test case (error) is true, and like always, performance of handling an error is not important.  The integer test is very fast which is the only performance consideration.  The advantage of a proper error message far outweighs the cost.  

Having such a test in the code would have saved me hours of time. This particular situation required a call to be made before this one.  The requirement is reasonable, but finding that this was missing is quite challenging.  There was no indication of the problem.  

Some will consider this to be not enough: why is code 412 special?  Why not do a thorough job and test all possible errors and result. This one trips up a lot of development projects.  You want error messages that respond to real errors someone might actually make.  I have proof that one can easily hit this error, so it is quite conceivable this could happen again, for another person.  There are many error codes, and not all can be hit at this point.  Adding a single message for a single condition may seem inconsistent.  however, it is a real response to a proven need.  Consistency is not important, but utility is.  

The most important thing is to design around reporting programming errors.  Returning null without explaining why is unforgivable.  It is far better to throw an exception.  When you see a possible error situation — a way to call that is improper and the code is not designed to handle, just throw an exception explaining what is wrong.  Maybe no programmer will ever call things in that combination fo way necessary to see that exception.  But, if a programmer does make that mistake, they will not be in that situation for more than a few minutes.  This is the true savings of writing code that informs you properly when it encounters a situation it can not handle, and explains why it can not handle that situation.