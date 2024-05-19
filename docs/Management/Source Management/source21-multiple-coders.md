---
  id: avoiding-multiple-coder-bugs
  title: Multiple Programmers
---
#  Avoiding Bugs Caused By Multiple Programmers

Teams of programmers can avoid unexpected logical problems in the code by working together on one version of the code, and by avoiding working in solitude.  The longer that individuals work separately, the greater the chance of such logical problems developing.  **Continuous integration** is a practice that avoids this risk simply by refreshing and merging often, usually at least once a day.  

Some logical problems can be found by the tests, so running them is important, but there do exist classes of logical problem that can not be caught by automated testing. Such logical problems can only be found by running, testing, and observing the final product.  

An example of a logical problem: on programmer writes code to sort the order of a particular data set, and another programmer writes code that assumes that the data is NOT sorted.  

The chance for logical problems is increased the longer that programmers work in seclusion. If these two programmers work for a month on separate code bases, they will never notice the problem. Each programmer will have a functioning workspace, and they will continue to build more functionality, making the problem bigger. When they finally come to merge their code, there will be no compile problems to alert them to the problem. After the merge, there is a serious problem in the product, but how long will it take until they notice? If the merge happen just before a release, this could cause a crisis. The change to the code could be extensive, depending upon how much work was done in each branch.  

The only way to avoid such logical problems is to continuously merge all changes. When programmer one writes the code to sort the data, it is merged into the single trunk version. Programmer 2 will immediately see the problem and fix it. Since both programmers are running and testing the combined code on a regular basis, there will be no surprises at the end.  

This is why working in separate branches will never work. The longer that programmers work in seclusion, the more “**technical debt**” they build up. That debt builds, and because it is discovered only at the last minute, can cause releases to be delayed or missed in attempts to pay down that debt at the last minute. It is a “pay me now or pay me later” situation.  Continuous integration avoids building the debt in the first place. Everyone sees the true state of the entire project at every moment.

### Resources

Here are some pointers to additional information about continuous integration:

*   [Martin Fowler on Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html)
*   [Wikipedia on Continuous Integration](http://en.wikipedia.org/wiki/Continuous_integration)
*   [Rules from Extreme Programming](http://www.extremeprogramming.org/rules/integrateoften.html)
*   [Atlassian talks about it](http://www.atlassian.com/agile/practices/continuous-integration.jsp)

This entry was posted in [practice](https://agiletribe.purplehillsbooks.com/category/practice/) and tagged [banches](https://agiletribe.purplehillsbooks.com/tag/banches/), [continuous integration](https://agiletribe.purplehillsbooks.com/tag/continuous-integration/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2011/10/03/5-avoiding-bugs-caused-by-multiple-programmers/ "Permalink to #5 Avoiding Bugs Caused By Multiple Programmers").