#  Growing Software like a Plant

Maybe it is helpful to view the development of a software in using an Agile approach as being like way that a small tree grows.  In contrast, development of software using waterfall is like that of a factory.  The difference between a tree and a factory tells us a lot about the difference of these two styles of software management.

## How Plants Grow

The plant spreads the first two leaves, it starts to gather energy from the sun.  It starts to collect minerals and water from the soil.  It grows by adding to itself incrementally.  At every point in time, the leaves have to function.  At every point in time, the roots need to function.  And still, new leaves are added, new branches form, the parts get bigger.  As each leaf is added, it begins to function quickly after formation.  As the branches get bigger, they a filled in to support the rest of the plant.  They don’t immediately start out thick and stiff. 

With a growing plant, it is always in a steady state of functionality.  If the weather is dry, it simply slows down growth a bit, but there is no dramatic change that has to be accommodated.  There is no real need to accurately anticipate the future, because the plant is in a steady state of functioning.  As the weather grows wet, the plant can grow faster, and there is no disruption.  

Plants can take advantage of opportunities.  If the light is stronger on the west side of the plant, it can grow more in that direction, and capture more available light, and grow less in the shadier parts.  It does not need to be planned, it simply grows that way.

## How Plants Are Not Assembled

If you were to form a tree as is done with waterfall, one person would go away and design the leaves.  Another would design the branches; another the roots.  They would then create the leaves, the branches, the trunk, the roots separately.  They would then put them together as a finished tree, and expect that all the parts would work. 

Of course, for this to work, the various experts have to have a pretty good understanding of how roots connect the trunks, and how leaves connect to branches.  The flows of materials will have to worked out in detail.  The leaves and branches will have to pre-filled with the right amount of vital fluids so that when achieve stasis quickly — otherwise the branch would have to be designed to fill the leaf when it is attached — something that is not needed later.  

What I hope is clear is exactly how fragile and error-prone this approach to building a plant would be. You have to go from a non-operating state, to an operating state, and everything depends upon anticipating that change correctly.  If you fail to anticipate the weather on the day of assembly, you might have prepared everything wrong, and have to re-work the details.  If it is dryer than anticipated, you might have to pre-fill the leaves with more fluids than normal.  The error-proneness comes from the gap between how you anticipate the future, and how the future turns out.

## How Plant Growth relates to Software Development

A growing plant is always functioning as a plant. The analogy for software is that the codebase can always be built and run the tests.  When code is checked in, it has a test, the test runs, and all the previously existing tests run.  

Instead of adding leaves, a software codebase adds functionality.  Each function is added in such a way that it builds on the rest of the functionality, and it is buildable and testable right away.  Just like there is no need to stop the plant from functioning to add a leaf, there is no need to break the codebase to add a function.

You don’t add a large chunk of functionality at one time, just like a tree does not add a thick branch at once.  Instead, the Agile developer add a small part of the functional, along with tests, and assures that no tests are broken.  The function is incorporated into the functioning code base, and you know that everything is working at all times.  Therefor, you have a solid basis to build more functions on.

The weather?  Development can either pickup or back off as as development resources are available.  Customers come and go, competitors come and go, and more important the technology is constantly changing.  As factors change in the market place, an Agile approach is better suited to take advantage of it.  If the iPhone OS is becoming less popular, and Android OS more popular, then like the project can shift resources and do more on Android.  There is no need to anticipate today exactly how the market will be 12 months from today.

## Isn’t a Factory More Efficient?

This is what makes people think that waterfall is a better approach: it might seem to be more effective to have a “leaf expert” design and build all the leaves.  And a “root expert” design and build all the roots. 

This is reductionist logic: problems are solved by breaking them down into component pieces.  You then solve the separate smaller problems, and piece the results together.  This works for complicated things, like houses, cars, and manufactured goods.  But it does not work for _complex_ things like software. 

Having a person focus on the leaf alone would seem to allow them to design the perfect the leaf.  There is nothing wrong with a leaf expert, the problem is believing that the leaf functions independent of the rest of the plant.  In reality, the leaf depends on the whole organism.  Constructing a leaf in a non-functioning state, and then transitioning into a functioning state, is problematic.  This is fine for car-parts, but not for leaves, and not for parts of software.

## Growing Seems Hard

If you were to build a car, you would not grow it like a plant.  You would not start with a one-cylinder engine, and while it is running, add a second cylinder.  Then, while those two are chugging away, add a third and forth cylinder.  Clearly, growing a car this way is nonsense.  It would never work.  

A car is a physically manufactured thing.  Physical things take effort to form into the right shape, and once formed take extra effort to change.  Software is simply not like car parts.  Given a 1 million line program, if I want to change the name of a method, and search for and modify every call site, it can be done _trivially_.  There are many other design changes that can be done without breaking the code base.  Software is malleable in a way that is simply not possible with car parts.  Software parts can be copied an infinite number of times with zero cost.  All of the effort with software is not the typing the source, but in the thinking that goes into figuring out how parts might fit together.  It is as if you imagine a 12 cylinder engine, and as soon as it is imagined the completed engine comes into existence.  Later, if you decide you want a 3600 cylinder engine, the existing engine can be instantly transformed into that.  And it can be done without stopping the engine.  Software simply does not obey the laws that physical things do.  

Because software is far more complex than physical manufactured goods, it is better to treat the software like a growing plant.  By forcing the software to always be functional, you prevent the biggest problems.  By keeping all the programmers in sync,  you avoid the big problems of getting it all to work together.   Because it is kept in a functional state, there is far less need to anticipate the exact conditions of the future, and you are better able to take advantage of things that come along.

## Experts Only

Having read this far, you may be interested in the philosophical underpinnings of this.  Varela and Maturana coined the term “[autopoesis](http://en.wikipedia.org/wiki/Autopoiesis)” to describe the way that plants and ecosystems grow.  Autopoesis is the self-similar way that biological systems grow.  There are certain properties to this, and at the same time such systems are extremely robust, meaning that they are resilient against external changes, and they are also adaptive in being able to take advantage of opportunities.