import React, { useState } from "react";
import ReactDOM from 'react-dom';

import './styles/main.css';
import './styles/app.css';

import Example from "./components/example/Example";
import States from "./components/states/States";

function App() {
    const [activeCom, switchCom] = useState(1);
    return (
        <div className="app">
            <button
                id="app-button"
                onClick={() => {switchCom(!activeCom);}}
            >
                Switch to {activeCom ? "States" : "Example"}
            </button>
            {activeCom ? <Example/> : <States/>}
        </div>
    );
}

ReactDOM.render (
    <App/>,
    document.getElementById('reactapp'),
)