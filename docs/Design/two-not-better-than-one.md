#  Two is Not Better Than One

In software design you often must choose between two competing approaches.  Which is better?  It is tempting at times to say “Let's do both, and let the user choose.”   That might be good, but there are many cases where that is a serious mistake.

## A Scenario

It started as a fairly standard technical feature discussion. Some software engineers had looked into how to produce a particular type of graphical diagram as the result of some analysis, and they found that the lines could be generated two different ways: either as straight lines from point to point, or as rectilinear lines that always had 90 degree corners.  They coded it both ways, and they had examples of the output in both cases.  Because the diagram was automatically generated, neither option looked very aesthetically pleasing — both looked a bit like a jumble.  But a decision had to be made.  Most people preferred the rectilinear. 

Then the product manager said: “Why don't we support both options, and offer a administrator configuration parameter to choose between them.”  

On the surface this sounds like a good idea: it is more flexibility, it is more powerful, user can have either straight or rectilinear lines, and the most important reason: we don't have to make a decision and there is no chance we will make the wrong decision.  

Here is the real problem: we are talking about a detailed capability that the user does not really want to get involved in.  They have their own lives, and they just want the product to work.  They are not interested in spending a lot of time to configure the product to get it just the way they want — not an an insignificant feature like the style of lines connecting boxes in a diagram.  I am not saying that people won't have an opinion, and won't have a preference.  I am saying that these users want to achieve tasks, and they want the software to do the work, so they don't have to make these kinds of choices. 

Imagine you had a car that offered two different shapes of rear-view mirrors.  One with rounded corners, and another option of squarer corners.   Depending on you personal style, you might prefer the rounded or the square, but it is just too much trouble to have to specify this level of detail.  You want the car to look good, and you want the mirrors to work well, but you expect the manufacturer to make this choice for you.  There are thousands of parts on the car, and if you had to make a choice on each one, it would be a nightmare.  Let me choose from 5 colors, and wheel style, but leave the details up to someone else. 

In this case, it is hard to explain exactly what is different between the straight lines and the rectilinear lines.  It is a challenge in this post to be clear.  If we were to offer two choices to the user, we would have to explain the difference between the choices.  This would have to be documented, while if we offer only one choice there is no need to document it.  

This specific suggestion was to make it an administrator setting in the config file.  Thus the install documentation would have to explain the setting, and the different lines.  It is not clear that the administrator has a real opinion, since in this kind of system the administrator is rarely also a user of the system.  The administrator might set it incorrectly, and then users would be worse off.  Regardless of how it is set, some users are likely to prefer the other.  When users switch between different systems configured different ways, they get unexpected differences in the output, which simply raises questions, and potentially support issues. 

If you are going to give a choice, you are probably going to have to offer this to every user at the time they generate the chart, which means significant work in providing a check box, capturing that value, and of course including the code that generates it both ways.  

Development can be significantly impacted, not by the work to generate the diagram both ways, but by having to consider both options in all future features and modifications. The QA group will have to run twice as many tests to make sure that it works in all cases.  This becomes a precedent going forward: some users will get used to straight arrows, and other rectilinear, so you will have to support both options forever.  Even though, like the mirror, any user could make use with with either option, once you get used to it one way you don't want to see a change.  

Ultimately, the type of line, like the shape of the mirror, is not a fundamental value provided.  If there was data that supported the idea that there are types of users, and one type of user had a reason to prefer one kind of line, and another type of user preferred another, that would be an entirely different case.  In this case, the programmer had simply identified two ways to implement, and wanted an opinion of which was  better.  We had no information that two such styles were actually needed.

## Make a Decision

In software design, it often **better to make a decision**, and offer what you can determine to be a single best approach, than it is to allow the user to tweak the settings and get their own best approach.  You should make a decision, and choose one approach, when the difference of approach is not a important difference to the user.

Obviously you have to distinguish when it is a feature to have options.  The user choosing between a line chart and a bar chart is a feature.  But if the difference is not a qualitative difference in accomplishing the goals of the user, it is far better to pick one and stick with it.

This flies in the face of “flexibility” which is usually held up as an important feature.  Flexibility is a two edged sword.  Flexibility when it is important for a user goal is good.  But flexibility just to have a difference that is unimportant is a bother that makes software complex and harder to use.  IT is the software designer's job to understand the needs of the user and to distinguish between these cases.

## Configuration Nightmare

Many programmers avoid decisions and relegate the decision to the user in teh form of a configuration parameter.  Once the system has such a configuration parameter, it is hard, or impossible to remove them.  If you eliminate it, and some user had been using it, then that user will view this as a regression when upgrading.  In every upgrade there is change in behavior.  If it used to have square corners and now has rounded corners this is a change in behavior which the user might or might not like.  But when there was a configuration parameter that specified square corners, then they view this as a loss of functionality which would not be the case if there had not been any choice before.  

This can become a maintenance nightmare.  Unless you actually test all the configuration parameters in all the settings, you can't be sure they all work.  With a large number of parameters, it become impossible to test all of them.  Many parameters are set to default values and never tested with other values, which means you have no guarantee that they actually work.  The code might have a hard-coded value that matches the default, so the default value works, but no other works.  

Configuration parameter should be created when needed, but you should think very long and very hard before introducing one, to be sure you absolutely need one, and that there is a good reason for having one.