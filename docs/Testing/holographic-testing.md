#  Holographic Testing Technique

I write a lot of code, and I want there to be solid tests on that code.  Creating tests can be tedious, and that prevents many good tests from being written.  Also, because tests can be fragile, maintaining those tests can be a lot of work.  The holographic testing technique is a way to create a lot of tests, and to maintain those tests without tedium. 

## TL;DR

Holographic testing means simply that you write a converter that creates a fingerprint of the result data.  A fingerprint is a text output which depends on the data in such a way that if the data changed, the fingerprint would change.  You then compare this fingerprint with a known expected fingerprint.  If they are the same, the test passes, and you know that everything in the complex data structure is correct.  If different, it fails.  You then need to compare the new fingerprint to the expected fingerprint.  If all the differences are explained by the recent change to the code, you adopt the new fingerprint as the standard.

Advantages

*   Easy to test large complex results
*   Easy to maintain the test when the code under test changes
*   Aids in visual understanding of what the code is actually producing
*   Trivial to expand to new test cases for increased coverage

Concern

*   When updating the fingerprint, a sloppy programmer could miss a problem.
*   Automation of the update of fingerprint file would entirely defeat the test.

## Context and Goals of Testing

The purpose of code is to take particular inputs, and return specific output.  The test then is an expression of known inputs, and an expected output.  We write tests to assure that the code produces the correct results for a given set of known inputs.  We automate those tests so that this can be assured on every build.  If anything is accidentally changed in the code, the test will alert the programmer, and can be fixed quickly before causing a problem.

All of the examples used in tutorials and training are of simple functions that take 2 or 3 inputs and produce a scalar output.  e.g. multiply:  design a test that sends a 5 and a 7, and verify that a 35 comes out.  The idea is that for each method you write two or three such tests.  But when the operation of that class depends on many other classes, or does complex operations depending upon the input data, these examples are far too trivial.

Consider, for example, testing a word processor.  You want to take a block of text and test that the search and replace function works on it.  Or consider testing a spreadsheet that is generating a pivot table from a set of data.  Or consider testing a business process diagram to assure that a specific event occurring transforms the state of the diagram into a new, complicated state.  In all of these cases, there can be bug that only appear when the complexity of the input is above a threshold, and verifying the correctness of the result can be a job quite a bit greater than the writing of the original code.

The problem is that is the result is large or complicated, involving dozens or hundreds of individual primitive values, you have to write dozens or hundreds of lines of test to get a single test case completed.  A new feature in the code can change the result, and now you have dozens or hundreds (or even thousands) of lines of code to update.  It is not just that this work is tedious, but that it can actually take a lot of programming time and be very costly. If it is too costly, or takes too much time, then the tests will simply not be implemented.  Typically what really happens is that trivial tests are done (e.g. check if the result is null) which don’t really tell you if someone broke the code.

There is a value to a test, but if the cost exceeds that value then the test would be a waste. If we can reduce the cost of developing and maintaining tests, then good tests become economically feasible.  If we can make good tests quick and easy, you will have more tests, and those tests will be of higher quality, which in turn will help make the code under test a higher quality as well.

![](holographic-testing-img1.png)

## Holographic Approach

The holographic technique is a way to test everything about a given result, and then to assure that it always produces the same thing.  Rather than writing a line of code to test each individual primitive value in the result, you instead transform the result into a large block of text called a fingerprint.  This fingerprint contains all of the relevant values of the resulting data.

You then can automate the testing that all those values remain the same, by comparing to an expected fingerprint.  The expected fingerprint is just a text file checked in with the tests which is used to test the generated fingerprint character by character.

If the test fails, you then have two fingerprints.  It is easy to view a side-by-side diff comparison of the expected and new fingerprint, and visually identify the changes to the output.  An algorithmic change (in the code being tested) might cause dozens of changes in the output, but it is quite easy to review those dozens of changes and verify that they are expected.  Once you have verified that all the changes are correct, and that the code under test is actually working properly, you simply save the new fingerprint file to make it the new expected value.  This quick change corrects dozens or hundreds of individual value tests with a single action.

The fingerprint leaves out values that are not relevant of that can not be controlled.  For example a lot of records will contain a ‘creation’ timestamp that will be different every time you run the test.  It is important to leave such timestamps out of the fingerprint because they will be different every time, and that difference is not a bug.

The fingerprint has to include things in a well defined order.  Hash tables are known to produce lists of keys in inconsistent orders, so care must be taken to sort the keys so that they fingerprint always contains them in the same order.

## Advantages

JUnit testing can be tedious to create.  Generally you can compare simple scalar values to known simple scalar values.  It takes a line of code to check if a value is null.  It takes a line of code to check that a number is a specific value.  It takes a line of code for every specific string value, such as first name, last name, address, city, state, etc.  to compare to the correct value.   To test that a result that contains, say, 10 customer records, and that those records are all represented correctly, can take hundreds of lines of uniquely written code.

Then, when the underlying algorithm changes for a new feature, a programmer needs to go through those hundreds of lines of code, and make all the right changes.  Maybe adding lines in all the right places, or altering the test values in dozens or hundreds of places.  This can be a lot of work.

The holographic approach eliminates the need to write a line of JUnit test for every primitive value.  By combining all the primitive values into a text file, you can test all of them with a single compare.  That compare is no better or worse than the individual JUnit lines.  But, when it comes to updating the test, there is a tremendous benefit.  The fingerprint represents dozens or hundreds of individual tests, but you can change all of those just by a single update of the fingerprint file.  It is that ability to update the complicated test, that the holographic approach really shows an advantage.

Consider a program that reads and parses a file and represents this internally as a tree structure.  How do you test this tree to assure that it is right?  Manually writing code that walks through the tree, and test each data member of each node with a unique value can be very time consuming, to the point of being a waste.  Yet, it is generally easy to write a routine that recursively travels the tree, and generates a simple text output for each member value.  The resulting fingerprint is a picture of the tree.  Reviewing the fingerprint is generally a convenient way to review what is in that data tree, and assure that it is correct.  It gives you visibility into the data that is returned by the method being tested, and this is useful in debugging phase as well.

A visual difference between the new fingerprint, and the expected fingerprint, will display in a compact form all of the changes that appeared from that test case.  Using the diff, it is easy to focus on just those parts that have changed, ignoring everything that stayed the same.  It is usually easy to confirm that the highlighted changes are exactly as expected.  Once the programmer is sure, you update and correct the entire test simply by replacing the expected fingerprint.  This replaces a long tedious operation of rewriting many many individual lines of JUnit code, with a single file transfer.  The fingerprint is checked in, and all the changes in it are visible in the source system just like the code changes.

When it comes to adding additional test cases, if each test case involves hundreds of lines of code, this become a huge barrier to testing.  The holographic approach makes it far far easier.  Consider a test that submits a query condition to a database.  If you already have a test that takes a query and compares the result to a fingerprint, it become trivial to add more tests.  Just invent the new query, and the new name of a fingerprint.  Then another query and another fingerprint name.  That is easy and effective.

On the first run of a holographic test, there is no fingerprint to compare to.  The programmer needs to review the generated fingerprint carefully.  Given knowledge of the code under test, the visual layout of the fingerprint makes it easy to verify the output which is normally encoded in a data structure that is hard to review.  The fingerprint is easy to review.  Once verified, the new fingerprint is stored in the source management system as the expected values, and from that point on the test runs.  You have assurance that every run of the code after that, on every build, is running exactly the same way as it ran in the past.

## Concerns

There is really only one concern:  that a lazy programmer might replace the expected fingerprint with the new fingerprint without checking that the output is correct.  If that programmer created a bug in the code, the placing of the new fingerprint as the expected value essentially enshrines the bug into the test, defeating the purpose of the test.  Note however that this is true of any kind of testing:  if the programmer blindly finds and changes the line of test so that it does not fail, without thinking about whether the change is correct, would also defeat the test and enshrine the bug.  A devious programmer might even automate the copying of all new fingerprints into the expected values which would completely defeat all benefit of the tests.

These concerns are valid, but are effectively avoided by simply training the programmer to do a careful inspection of the difference of the fingerprint.  Every change should be explainable.  Note that since the fingerprint files are checked into the source system, as you review a check-in, you also review the diffs to the fingerprints.  The changes to the fingerprints are just as much a part of the code review as a change to any test is, yet I would posit that seeing the change in the form of a fingerprint is far easier to review and assure correctness than the changes to the JUnit code.

## Implementation Details

The expected fingerprint files are stored in source management system as resources for the tests.  Each fingerprint has a unique name, and generally that is the name of the test that is being performed.

The test driver still has a test cases that makes calls to the API.  The test cases have test values in them that are unique to the test case.  The test case has two additional things: a way to convert the result data to text, and the name of the fingerprint to compare to.  The final test is just like any other final test, but it compares the entire fingerprint to the expected fingerprint in a single JUnit (or other framework) test.  If this comparison fails, the test fails in the same way as normal.

During the build, there needs to be a temporary folder where the new fingerprint is generated as a few file with the same name as the expected value.  Typically, if you have 25 holographic tests, you will have 25 resources in the repository, and running the tests causes the creation of 25 new files in this temp folder.  These are created as files in order to support the maintenance required when the test fails.

When the tests fail, you can compare the newly generated files with the ones checked in to the repository.  This usually quickly identifies the files with the same names that are different.  Often this folder compare utility will allow you to open the files that are different, and show a side-by-side display of which lines in the file have changed.  Because the new files have the same name, then need only be copied into the repository once the programmer has determined that they are correct.

I use this technique when creating the [Purple Library](https://github.com/agilepro/purple), a set of utilities for parsing XML and JSON which I have used in many projects.  Some of the operations in that library can transform XML to JSON, and then of course the fingerprint is the JSON representation.  Each test has an input XML, and the corresponding expected output JSON.  The new JSON is written out to a file with the same name as the [expected JSON file](https://github.com/agilepro/purple/blob/master/purpleLib/src/test/resources/test-compare/genSchemaTest01.schema.json).  If the generated JSON is different, one can view a diff of the new and old values, and verify that all the changes are expected dues to feature change in the code.

Another example from the Purple Library is code that validates a JSON structure according to a schema.  This method produces a list of ‘problems’ that it has identified in the JSON which was designed for this test case to have problem in it.  By simply listing all the errors reports to a [fingerprint text file](https://github.com/agilepro/purple/blob/master/purpleLib/src/test/resources/test-compare/schemaTest01-2.failureList.txt), it become easy to test that the exact same schema errors are found every time.  If the algorithm is changes to find other kinds of error, or to report them in a different way, it is easy to identify that the differences are exactly those expected by the code changes.  Once verified correct, the new fingerprint file is saved over the old expected value file, and then the test is running again.

## Summary

For more than 20 years I have used this approach in many large-scale programming projects.  It allows me to write tests that are often 100 times better than what was there before.  Not only is the test better, but there is very low overhead for maintaining them.  I called it “holographic testing” because I don’t know of any existing name for this technique.  The name comes from “holistic” testing of the entire data structure in a single compare, but also because holograms are cool.   If you have seen this approach called something else, please let me know.  I am not the only programmer who does this, but it is very hard to find other examples documented.   Strangely, all the documentation for testing frameworks never mention anything like this.  They invariably use simplistic examples, and leave the programmer on their own to implement large scale tests on complex objects.   Hope you find the approach useful.