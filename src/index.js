import { render, createElement, useState } from './lib/Didact'














// const element = Didact.createElement(
//     "div",
//     { id: "foo" },
//     Didact.createElement("a", null, "bar"),
//     Didact.createElement("b")
// )

/** @jsx createElement */
function App(props) {
    return <h1>Hi {props.name}</h1>
}
function Counter() {
    const [state, setState] = useState(1)
    return (
        <h1 onClick={() => setState(c => c + 1)}>
            Count: {state}
        </h1>
    )
}

const element = <Counter />;
const container = document.getElementById("root");
render(element, container);
