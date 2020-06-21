import React, { Component } from 'react';
import Notepad from '../components/interview/Notepad';
import Drawpad from '../components/interview/Drawpad';
import queryString from 'query-string';

class Interview extends Component {
    
    componentDidMount() {
        const values = queryString.parse(this.props.location.search);
        console.log(values.room);
    }

    render() {
        return (
            <div>
                <Notepad />
                <Drawpad />
            </div>
        );
    }
}

export default Interview
