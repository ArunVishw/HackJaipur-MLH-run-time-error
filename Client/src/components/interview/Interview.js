import React, { Component } from 'react';
import Notepad from './Notepad';
import Drawpad from './Drawpad';
import Scoring from './Scoring';

class Interview extends Component {
    render() {
        return (
            <div>
                <Notepad />
                <Drawpad />
                <Scoring />
            </div>
        );
    }
}

export default Interview
