import React from 'react';

// To start using the loop we’ll need to set the first unit of work,
// and then write a performUnitOfWork function that not only performs the work but also returns the next unit of work.
let nextUnitOfWork = null

// 处理基础数据类型
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: [],
        },
    }
}

function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child =>
                typeof child === "object"
                    ? child
                    : createTextElement(child)
            ),
        }
    }
}

// fiber就类似一个vnode
function createDom(fiber) {
    const dom =
        element.type == "TEXT_ELEMENT"
            ? document.createTextNode("")
            : document.createElement(fiber.type)

    const isProperty = key => key !== "children"
    Object.keys(fiber.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = fiber.props[name]
        })

    return dom
}

// In the render function we set nextUnitOfWork to the root of the fiber tree.
// 起点吧，这样requestIdleCallback(workLoop)就开始工作了
function render(element, container) {
    nextUnitOfWork = {
        dom: container,
        props: {
            children: [element],
        },
    }
}

// break the work into small units
function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(
            nextUnitOfWork
        )
        shouldYield = deadline.timeRemaining() < 1
    }
    requestIdleCallback(workLoop)
}

// workloop一直保持运行
requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
    // TODO add dom node
    if (!fiber.dom) {
        // 创建dom
        fiber.dom = createDom(fiber)
    }

    if (fiber.parent) {
        // append to parent
        fiber.parent.dom.appendChild(fiber.dom)
    }

    // TODO create new fibers
    const elements = fiber.props.children
    let index = 0
    let prevSibling = null

    while (index < elements.length) {
        const element = elements[index]

        const newFiber = {
            type: element.type,
            props: element.props,
            parent: fiber,
            dom: null,
        }

        if (index === 0) {
            fiber.child = newFiber
        } else {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }

    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.parent
    }
    // TODO return next unit of work
}

const Didact = {
    createElement,
    render
}

// const element = Didact.createElement(
//     "div",
//     { id: "foo" },
//     Didact.createElement("a", null, "bar"),
//     Didact.createElement("b")
// )

/** @jsx Didact.createElement */
const element = (
    <div id="foo">
        <a>bar</a>
        <br />
        <div>uu</div>
    </div>
)


console.log(element);

const container = document.getElementById("root")
Didact.render(element, container)
