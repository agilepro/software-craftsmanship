# What is Architecture?

Everyone agrees that architecture and programming are different levels of abstraction in the development world.  But where is the dividing line?

:::tip[Key Takeaway]

Architecture is concerned only with breaking the overall problem into pieces such that different teams can work on different parts.  To be effective, an architect must worry **only** about the interfaces and protocols between those components.

:::

## Setting

There are many things that architecture is not:

* _Architecture is the design, while coding is the implementation_ - Coding at all levels involves design, in fact programming is nothing but design expressed as code.  
* _Architecture is anything that needs more than 20 minutes of discussion._ - There are many aspects of programming that require careful extended thought.  For example, performance tuning of a particular algorithm might take days of work by a competent engineer, but this is not architecture.  Most of the work will be done by the teams, and not the architect, so every hard problem is not the responsibility of the architect.
* _Architecture is the hard things while programming is relatively easy_ - Higher level abstractions are not harder to deal with, and often easier.
* _Architects are the teachers while programmers are the students._ - it is true that architects are often more experienced and might in fact teach some skills, that is not what distinguishes the work of an architect from the work of a programmer.

The term architect is a little unfortunate when applied to software engineering because in a building, the architect really does make all the critical decisions.  The builders then come and move the physical materials into the places the architect has designated they should go. 

Software is a million times more complex than a building.  Programmers are not comparable to bricklayers who are doing rote tasks over and over.   In software you never create the same thing twice because once written a routine is useful an infinite number of times without cost.  A programmer is always designing and implementing something new that has never been done before to the knowledge of the team.

At the same time, there is no question that it is important to have guidance at the high level.  It is impossible for a single person to truly grasp all the detailed concepts incorporated in any large scale application.  The separation of duties into detail and overview is necessary simply because it is impossible for one person to take it all in.

An architect needs to have a broad and thorough understanding of many different aspects of system development.  It makes sense then that senior more experienced people are needed for this role, but architecture is not just a super senior developer.

## Divide into Modules

The fundamental goal is to break the problem up so that different teams can do different parts so that the department as a whole can do more than what one team can do.  The body of code being developed is too large for a single team to handle. An effective team is 6 to 10 people, and so if you need 30 people, you must break them into 3 to 6 teams.  Each team needs goals separate from the other teams, and so the project must be broken into modules.

This requires some vision for how the modules will work together long before they are implemented.  The architect needs to break out the overall system into modules that "make sense" in terms of being able to run as independently as possible, and still provide a coordinated function.  This means dividing up the functionality "at the joints" as Plato advised when describing natural dividing points.  

Once the problem is broken into modules, the architect is responsible only for the ability for modules to correctly work together.  This often involves setting standards so that agreements between teams are more concrete and comprehendible.  Standards help clarify details and avoid confusion.  Teams work at different paces: what one team implements today might be used by another team next year.  As each team works independently, the rational standard help guide the decision making by both teams to be more consistent and less arbitrary.

## Delegation of Duties

To avoid being the bottleneck to everything, the architect must avoid trying to be everything to everyone, and to focus exclusively on those things that the teams can not individually do.

Things an architect **should** be concerned with:

* protocols that transfer information from one module to another
* APIs in one module that are called by another module
* database schema that are shared between multiple modules

Things an architect **should not** be concerned with:

* flow of data within a module
* internal API used within an module
* data structures that a module uses that are not shared
* file formats used for storage and retrieval with a module
* specific algorithms used within a module

There are some things that an architect **might** be concerned with depending on the size of the team.  These are really coding management issues, and not architecture, and so decisions on this could be relegated to other leaders.  These decisions are more related to managing the programmer skill set than they are to a specific application architecture.  

* code libraries that are used by the department
* coding practices in general used by the department.
* how coding assets are stored and managed
* builds and testing support if not managed by individual teams would be just another module like the rest.

While these are important standards to put into place, they might easily extend across multiple projects with completely different architecture, which is why they don't fall into the bucket of work that an architect must do.

## Avoid Micromanagement

The biggest problem with most architects is getting dragged into micromanagement of the entire system.  Everything becomes an architecture problem, and progress grinds to a halt.

This is the toughest part of being an architect:  you have to trust the programmers to do their part.  Certainly verify that the work is good, but the team needs to be responsible for the output of the team.  

Because the overall application is larger than any one person can do, the architect needs to consciously remove themselves from that level of detail, and trust that the team will manage that according to their skill.  Instead, there are things that need coordination _between teams_ that simply can not be done by the team.  That is the domain that the architect must focus on.