import React, { Component } from 'react';

const style = {
    height: "50vh",
    width: "45vw",
    position: "absolute",
    top: "5vh",
    right: "2vw",
    border: "2px solid green",
    'border-radius': ".25rem",
    transition: "border - color .15s ease -in -out, box - shadow .15s ease -in -out"
}

class Drawpad extends Component {
    render() {
        return (
            <div style={style} className="container">
                <h1>Drawpad</h1>
            </div>
        )
    }
}

export default Drawpad
