import React, { Component } from "react";
 
class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
          };
     
        this.addItem = this.addItem.bind(this);
    }
       
    addItem(e) {
     
    }

    render() {
        return (
        <div className="todoListMain">
            <div className="header">
            <form>
                <input ref={(a) => this._inputElement = a} 
                    placeholder="enter task">
                </input>
                <button type="submit">add</button>
            </form>
            </div>
        </div>
        );
    }
}

export default Notes;