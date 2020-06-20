import React, { Component } from 'react';
import Notepad from './Notepad';
import Drawpad from './Drawpad';
import Scoring from './Scoring';
import VideoCall from './VideoCall';

class Interview extends Component {
    render() {
        return (
            <div>
                <VideoCall />
                {/* <Notepad />
                <Drawpad />
                <Scoring /> */}
            </div>
        );
    }
}

export default Interview
