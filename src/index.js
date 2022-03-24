import React from 'react';

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

function render(element, container) {
    const dom =
        element.type == "TEXT_ELEMENT"
            ? document.createTextNode("")
            : document.createElement(element.type)

    const isProperty = key => key !== "children"
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })

    element.props.children.forEach(child =>
        render(child, dom)
    )
    container.appendChild(dom)
}

// break the work into small units

// To start using the loop we’ll need to set the first unit of work,
// and then write a performUnitOfWork function that not only performs the work but also returns the next unit of work.
let nextUnitOfWork = null

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

function performUnitOfWork(nextUnitOfWork) {
    // TODO
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
