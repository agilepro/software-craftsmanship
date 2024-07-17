---
id: usability-is-flavor
title: Usability is Like Flavor
tags:
- design
- usability
- user interface
- flavor
---

#  Usability is like the Flavor of a Meal

People talk about usability of software as if it was something separate from the software itself.  Usability expert skills are distinct from those of programmers.  And yet, usability is affected by many deep aspects of the software.  It is essential that all programmers on a project be aware of the usability goals of the entire project. 

:::tip[Key Takeaway]

Usability is like the flavor of a meal: it depends strongly on the ingredients for that kind of meal.  You can not apply any flavor to any meal, and yet the challenge remains to find a pleasing flavor for that particular set of ingredients.

:::

## Food vs. Code

I was searching for a proper analogy to explain this in terms we all can relate to, and I hit upon this idea that **Usability is like the Flavor of a Meal — it depends strongly on the ingredients**.  

A chef will exercise great skill to bring a meal that is healthy, looks and tastes great.  Flavor is paramount.  If the flavor is bad, nobody eats it.  There are different flavors that people are used to, so there is no single “perfect” flavor, but everyone agrees that a good flavor is essential to good food.  

Flavor is not something to be added later.  Flavor must be considered at every point while preparing.  It starts from kicking ingredients with key flavors.  Preparing them carefully, tasting all the time to make sure no step has unusual flavor.  It would be a big mistake to think that all the cooking before that was done without consideration of the final flavor.

It is the same with designing software: usability must be a consideration from the very beginning and every step of the development must be aware of the usability goals.  You might think that the back-end server is isolated from this but in fact information must be provided in a way that support the mode of interaction of the users.  

## Example

I was using a software recently that worked fine as long as you typed in the exact name of something correctly.  For 3-4 things that was not a problem, but when it got to hundreds of things, it was impossible to simply remember the names.  What the users desired was a way to type a few letters, and browse the matches, but the back-end server was not prepared to supply this information to the UI to enable browsing.  

Another example was a system that allowed editing of a particular standard data structure represented with an XML file.  One important aspect of this was of course to assure that the data structure was ‘correct’.  However, users don’t always start and end work in a single session.  They want to start work, save a few times while it is incomplete, possibly stopping work, and restarting on a later date, only then to finish up with a complete, valid document.  The problem was that the engine designers would not allow an incomplete document to be saved!  Attempt to save incomplete work produced an error message, and saved nothing. Without the ability to save a partially complete document it is not possible to offer a usable editor. 

## Function and Usability are Integrated

The capabilities of the entire program need to be designed to support the usability requirements.  System design can not be done separately from user interface or usability design.

*   No cook can create a good meal, without thinking at the beginning about the flavor that they intend to produce in the final meal
*   No software architect can create a good software product without thinking at the beginning about the usability they intend to product in the final product
*   The quality of the ingredients is a major factor in the flavor of the meal
*   The quality of the parts is a major facotr in the usability of the final product
*   The cook can not expect to add the flavor to a meal at the end, just before it goes to the diner.
*   The software architect can not expect to add usability to a product at the end, just before shipping the product.
*   The cook can not expect someone else to be responsible for the flavor of a meal.
*   The software architect can not expect anyone else to be responsible for the usability of the final product.

Just as flavor is not an “option” in a good meal, usability is not an option in a piece of software.  If it is not usable, it is as worthless as a meal that tastes bad.

## Recommendations

1.  Start a project with the design and requirements for the usability
2.  Keep the usability in consideration at every step of planning, implementing, and testing
3.  Train you programmers to understand what good usability is
4.  Don’t talk yourself into thinking that after we get it working, we can work out the usability
5.  Don’t think that anyone else can be responsible for the usability
6.  If a programmer claims that they can not learn the rules of usability, find a different programmer.

No cook would be foolish enough to think that they can cook a meal without any consideration of the flavor they are producing.

