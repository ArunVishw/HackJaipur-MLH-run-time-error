import React, { Component } from 'react'

const style = {
    height: "38vh",
    width: "45vw",
    position: "absolute",
    bottom: "5vh",
    right: "2vw",
    border: "2px solid black",
    'border-radius': ".25rem",
    transition: "border - color .15s ease -in -out, box - shadow .15s ease -in -out"
}

class Scoring extends Component {
    render() {
        return (
            <div style={style} className="container">
                <h1>SCORING</h1>
            </div>
        )
    }
}

export default Scoring
