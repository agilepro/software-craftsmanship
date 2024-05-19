---
  title: Commented-Out Code
---
#  Never leave 'Commented Code' in the Source

Comments in code are good. But not when they consist of old code that has been commented out of the live code. Get rid of that waste.

## Situation

When developing there are blocks of code which get ‘commented out’. This means that the block that would otherwise be executable code, gets surrounded by tags which mark it as a comment, and the compiler ignores them.  
There are several reasons that this happens:

*   a programmer sees a block of code that looks like it is not needed any more. For example, it is designed to handle a condition which is handled elsewhere and no longer possible to reach this point in the code. But the programmer is not completely sure, so the code is commented out, so that later if discovers that it is needed, it might be re-instituted.
*   a programmer writes some code that is useful in debugging. Sometimes this can take considerable time. The code is now running, and the debug logic is not needed, but the programmer wants to save it in case it is needed later.
*   a programmer is trying to get something to work. There may be a block of code that is not working correctly, but the programmer is not 100% certain of the logic. The programmer makes a commented copy of the original, so that in case they make a change that makes everything worse, they can always get back to what was there before.

## Observations

All of these situations are _debugging_ situations. The programmer is trying to get something to work, and wants a backup copy of the code. The copy is because they are not certain what is right, and wants multiple copies around.  
It is clear that the commented code is not needed for the final product. It is ignored by the compiler. They make no difference in the running code. Those code fragments are not cost free; they increase the cost of maintaining the code:

*   They increase the size which always increases code cost. If a 50-line routine has 20 lines of commented code, the total is 70 lines you have to scan. Those extra lines are clutter. Being able to scan code quickly is an important part of maintaining the code.
*   Commented out code is not like regular comment. First, they aren’t designed to be helpful. More to the point, they look like code and confuse the reader. Most editors color the comments differently, but the editor is not the only place where code fragments are seen.
*   searching through the code base will find things in the comments as much as live code. If you are looking for a piece of code that is doing something wrong, if a commented out piece of code has it, you will be distracted from finding the real piece of code. Full featured IDEs like Eclipse offer ways for searching for _some things_ (like variable references, etc) that search only the non-comment body of the source, however many basic search methods (in source management systems, web sites, etc) do now perform a syntax-relevant search.

In my experience, those old blocks of code are NEVER reused later. If something is needed later, it normally needs to be modified. Modifying a commented block of code, is not much easier than writing from scratch. The old commented code uses all the old classes, is written with the old assumptions on how things work. It is highly unlikely that code written to the object model from two years ago would work anyway. Always keep in mind that writing code is easy, while maintaining code is a lot of work. 

It is easy to write those one line debug statements. The chance of reuse is low. So go ahead and clean up the code. Delete all the commented out code. If you ever need them again, they are easy to write. If you do need the code again, you will probably write it better, using the latest techniques anyway.

## Coding Guidelines by Fiat

It is worth emphasizing that the costs do not fall on the programmer who is doing the commenting. That programmer will never be bothered by the extra garbage because that programmer already knows the logic. When you know the logic of a method, you never actually have to read it. That programmer who is commenting out code does not care how readable it is, but cares only in saving effort for changes in the future if they happen to be needed again sometime. Readability is important only to _new_ people reading the code for the first time. The programmer that has to keep the code clean, does not benefit, and the programmer that benefits is not the one that does the work to keep it clean. 

The programmer simply needs to learn that writing clean code is a team goal.  
Commenting code is a technique used while debugging. If a bug exists, it is reasonable to say that it is a number of days to find and address the bug, and to assure that the fix propagates through the system, through all the builds, to the testing platforms, etc. During that few days, leaving some commented code for ‘just in case’ while you are actively working on the bug fix makes sense. but once you are convinced that the coding is finished, one should go through and get rid of all the commented out code. Ideally you should not check commented code into the official source, but it is OK to do so for a short duration — for a couple of days it is OK. 

A more practical way to implement this is: when reviewing code, if you see a block of commented code that has apparently been there for more than a few weeks, delete it. You don’t have to think about it, just delete it.

:::tip[Key Takeaway]

The cost of that commented code always outweighs the benefit.

:::

If you are assigned to work on a piece of code, and while reviewing it, you find that someone left commented out code then delete it without hesitation. Have confidence that old commented code is a waste. You will never need it, and it will probably not work without modification if you did need it.


:::tip[Key Takeaway]

Deleting commented code is an easy and effective way to improve the code base, without any risk of negative consequences.

:::

This entry was posted in [Coding](https://agiletribe.purplehillsbooks.com/category/coding/) and tagged [development](https://agiletribe.purplehillsbooks.com/tag/development/), [maintenance](https://agiletribe.purplehillsbooks.com/tag/maintenance/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2015/12/26/never-leave-commented-code-in-the-source/ "Permalink to Never leave 'commented code' in the source").