
##references:
https://github.com/pomber/didact
https://pomb.us/build-your-own-react/



Starting from scratch, these are all the things we’ll add to our version of React one by one:

Step I: The createElement Function
Step II: The render Function
Step III: Concurrent Mode
Step IV: Fibers
Step V: Render and Commit Phases
Step VI: Reconciliation
Step VII: Function Components
Step VIII: Hooks



createElement: vdom

render: vdom to dom

Concurrent Mode:
break the work into small units so that you can stop and continue.
use requestIdleCallback to keep looping.
To start using the loop we’ll need to set the first unit of work, and then write a performUnitOfWork function that not only performs the work but also returns the next unit of work.


Fibers:
To organize the units of work we’ll need a data structure: a fiber tree.
We’ll have one fiber for each element and each fiber will be a unit of work.

One of the goals of this data structure is to make it easy to find the next unit of work. That’s why each fiber has a link to its first child, its next sibling and its parent.


