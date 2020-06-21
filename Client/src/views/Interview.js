import React, { Component } from 'react';
import Notepad from '../components/interview/Notepad';
import Drawpad from '../components/interview/Drawpad';
import Scoring from '../components/interview/Scoring';

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
