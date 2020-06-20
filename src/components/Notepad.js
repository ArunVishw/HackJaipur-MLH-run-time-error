import React, { Component } from 'react'
import io, { Socket } from 'socket.io-client'

class Notepad extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            client: ""
        }
        this.textAreaRef = React.createRef();
    }

    componentWillMount(){
        const socketUrl = "http://192.168.43.253:5000";
        const socket = io(socketUrl);
        socket.on('connect', () => {
            console.log("Connected");
        });

        socket.emit('join', "XYZ", function (response) {
            console.log(response);
        });

        socket.on('changeNotepad', (content) => {
            this.setState({
                text: content
            });
        });

        this.setState({
            client: socket
        });
    }

    changeText = () => {
        let data = {
            text: this.textAreaRef.current.value,
            room: "XYZ"
        }
        this.setState({
            text: data.text
        });
        this.state.client.emit('updateNotepad',data);
    }

    giveTab = (e) => {
        let textArea = this.textAreaRef.current;
        if (e.keyCode === 9 || e.which === 9) {
            e.preventDefault();
            var s = textArea.selectionStart;
            textArea.value = textArea.value.substring(0, textArea.selectionStart) + "\t" + textArea.value.substring(textArea.selectionEnd);
            textArea.selectionEnd = s + 1;
        }
    }
    
    render() {
        return (
            <div className="container">
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                    <textarea className="form-control" id="notepad" rows="10" value={this.state.text} onChange={this.changeText} ref={this.textAreaRef} onKeyDown={this.giveTab}></textarea>
                </div> 
            </div>
        )
    }
}

export default Notepad
