---
  title: All-or-Nothing
---
#  All-or-Nothing is a poor planning technique

I work with a large development group.  Every 6 to 9 months we go through a planning phase.  What follow is a curious ritual that I will recount in detail, that end up in a project that is deemed excellently planned by the engineers and managers, even though the resulting software product is summarily disliked by the customers.  It is all based on the theory that perfect software requires a perfect plan.

## The Rules of the Game

Consider me to be an anthropologist studying the behaviors of a foreign culture.  I can observe the behaviors, and from those make some guesses as to the rules that participants are playing to.  I can’t be sure what the rules really are, but this is what it looks like:

*   First, a schedule will be set, in this case about 6 months.
*   Second, a list of requirements will be assembled from communications with customer from the previous year or so.
*   Then, an estimate in person-days will be estimated for each feature.
*   Next comes this winnowing, where given the time and the manpower available, features will be selected to fit in the box available.  The selected features with time estimates form the plan.
*   The project progresses, all selected features must be 100% implemented, and must be of highest quality.
*   Towards the end of the release, the release date is invariably shifted, in order to get all the features completed.
*   All late occurring customer requests are rejected, except if that request is an emergency.  Any accommodation of customer emergency requirements are used as an excuse to slip the schedule.
*   Then the release becomes available with “restrictions” which is a list of functions, configurations, or capability that the customer is not supposed to use with this release.
*   Finally, a month or so later a version is released without any restrictions, but still on limited platform support.  Focus for the next couple months will be on supporting platforms which did not exist when the project started.

The key in all this is the estimate, but there are many funny considerations.  The estimate must simultaneously meet all these conditions:

*   The estimate must be large enough to cover all activities around the feature with no consideration of what other features might be implemented.  In theory all the features are completely independent from each other.  The estimated time must be true whether or not another feature is implemented, because the winnowing phase may remove all other features, leaving that to stand on its own.
*   The estimate must include all phases of development, and it represents a commitment to be 100% finished with that feature in that time span, or there are severe penalties for failing to get the work completed on time, and particular penalties if there are any bugs discovered.  There is every incentive to pad the schedule, and almost no downside to doing so.
*   Many of the features are done by an outside consultant who is paid by the hour, and in effect the estimate turns this into a fixed bid for the feature.  Since completeness is a requirement, the contractor investigates and lists every possible task that might have to be done.
*   As mentioned, the feature are quite large scaled, requiring 100 to 500 person days to complete.  However, the estimate must be for the complete feature, and there is no flexibility to implement part or on a sliding scale according to need.  Thus a feature to make a small change to the UI will be multiplied by all screens and implemented in the same way on each screen, whether each screen needs it or not.
*   Because the feature was described as a unit, any area of the product that does not get same treatment will be considered a bug, a failure to complete the feature.  It is a kind of blind conformance to doing the change for every opportunity, and there is no ability to focus on the hotspots;  areas that are lightly traveled get the same attention as area of heavy traffic.

Because completeness is a requirement, and because the estimate becomes the contract for a large feature, the estimate tend to be very large and elaborately justified, even though we know that software is hard to predict.  Since each feature has a very large estimate, the result is that many features are kicked out in their entirety.

## Complete Lack of Agility

We end up with a small number of features, that are implemented 100% complete.  Each feature is “all-or-nothing” based on estimates made before the project starts. 

The project runs for 6 months, and there is zero opportunity to consider embellishments that occur along the way.  Since the development team is locked into the original estimates, they have serious disincentives to consider anything other than the original requirement.  

The team is completely professional (in an inward looking way):  the original requirement is met letter for letter, and it is completely implemented in every conceivable part of the product whether it needs it or not.  The quality of the product is high from the point of view that the product does exactly what the requirement asked for.

> We end up getting a few things, that are 100% implemented

However, things like **_usability_** suffer. Usability often has to do with how everything fits together.  Different teams design different screens, and they look and act differently.  There is no room in the schedule for the “fit and finish” that most customers require. 

In some cases new technology appears in the middle of the project, and there is no possibility to shift the course to adopt that.  

After the project starts, and parts get implemented, there is usually discoveries of better ways to do things.  These are viewed by the team as “shortcuts” which were not in the original plan, and therefor might be considered to be lower quality.  The development team feels “honor bound” to implement exactly the way the feature was planned, even if there is evidence that the customer would like it a little different. 

There is no pragmatic voice toward optimizing the work.  No compromises can be made.  Often a huge savings in time can be gained by a insignificant reduction in functionality.  For example, eliminating a mode that is highly unlikely to ever be used, might free up 50% of the effort on a feature, yielding all the same same benefit to real customers, but simply not matching the exact wording of the original requirement.  There can be no consideration for compromise, because the original requirement must be treated as 100% accurate and complete.  However, in real life, requirements are only a most limited view on what is required.  The actual functionality of a software product is far richer than any requirement can express, and it seem rather silly that the team can not recognize that the details will get elaborated over time.

## Overbuilding

The approach leads the team to “design by committee” (DBC).   DBC is a pattern that leads teams to over engineer specific capabilities.  What will happen is that when the design is going through review, someone will say something like: “What if the person has a 18GB video, and they want to upload it from their cell phone, while they a traveling across the arctic, and they lose connectivity, and their battery dies before they complete the upload, but they need to have someone else review the fraction of the video they uploaded before they get back online.”   Extremely unlikely error scenarios are considered, and nobody really can say how common a particular scenario is likely to be.    So the design tends to take in all possible failure conditions, and all possible extreme examples.  

YAGNI;  Arguing that “You Aren’t Gonna Need It” sounds like you want to decrease quality.  This team is dedicated to high quality, and any work about not handling extreme situation is an argument for “low quality” in their eyes.  

What is really needed is the real voice of the customer, and this is best seen by asking customers to actually use the product in alpha and beta stages.  If they never run into the situation at all, then there is a good chance they don’t need it.  Furthermore, if you are in a situation to respond quickly, you can address the REAL situations they encounter, and not the imaginary situations dreamed up by the engineering design team.

## A Better Way

Anyone experience with agile development should immediately see a number of key problems:

*   The size of the blocks being fit into the time box are too big.  The units of work should be much much smaller. This would allow one to make a better selection of features to implement.  Instead of all-or-nothing, it might be half and half.
*   Commitments should not be fixed at the beginning of the project.  Some work units can of course be selected as “must have” but there should also be collections of units at the “should have” and “might have” level.  Depending on how things go, one can implement more or less of the optional features.
*   Estimates should NOT be completed and committed at the beginning of the project.  The work units should be sorted in a priority order, but the estimation for each unit created as the project goes along.  This way the estimation can have the benefit of know how all the other units have gone, and can take into account specifics of what has been implemented.  Multiple features might have common dependencies changing the estimates and maybe even the approach taken.
*   Over the course of the project, as opportunities arise, either due to new technology emergence, or as requests from customers, they can be accommodated by trading for other units of work.

## Specific Examples

One capability that has been desired is support for the FireFox browser.  Because the product is large, the estimate for supporting Mozilla is large, because every screen in the product would have to be checked.  Even just a couple days on every screen mode ends up being more than the entire development team.  Because this one capability is so large, it always gets thrown out.  After many year of requesting, we still are without FireFox support. A better approach would be to incrementally adopt it: add FireFox to the 5% of UI that is used 90% of the time.  Then, as usage extends into other parts, address limitations as they are found by real customers.  

We had a function in the to upload an application to the server.  The server might be in two modes: running or paused.  If paused, the upload worked.  If running, the upload would fail.  Every customer viewed this as a problem because you can you go use a completely different tool to pause and start the server.  They wanted the server to be automatically paused for the upload. The function would be “pause, upload, and resume” the server.  That is what the user wanted.  

We requested a feature to implement “pause, upload, and resume” however DBC got involved, and engineers started to worry that there were customers that “wanted” the error.  The question was: “What if a person _accidentally_ starts an application upload and they wanted the error message to prevent such an accident.”  “What if a server administrator wanted to _prevent_ application upload.”  Experience has shown that every customer views this error as a bug, however the engineering team designed a special mechanism so that the server had two configurable modes: one that preserved the error message, and the other that allows the pause, upload, and resume behavior.   It is extremely unlikely that any customer is going to want to preserve the old behavior.  It is protecting against an accident, but in fact there are many other accidents that can happen.  Because the old mechanism requires more manual interaction, one can argue that there are more ways that a person might make an accident in the old approach, and automating exactly what the user normally wants is the best way to avoid accidents.  This is an example of overengineering that is unnecessary.