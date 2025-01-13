import React, { Component } from "react";
import TodoItems from "./TodoItems";
import axios from 'axios';
 
class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
          };
     
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.saveItems = this.saveItems.bind(this);
    }

    // Call code to retrieve tasks from database
    async componentDidMount() {
      try {
            const res = await axios.get("http://localhost:3001/get-list");
            const fetchedItems = res.data.map(task => ({
                text: task.text,
                key: task.text_key,
            }));
            this.setState({ items: fetchedItems });
        } catch (err) {
            console.error("Error loading tasks:", err);
        }
    }

    saveItems = async () => {
        // We want to save our items to the database.
        try {
            const res = await axios.post("http://localhost:3001/save-list", {tasks: this.state.items});
            return res.data;
        } catch (err) {
            console.log("There was a problem finding this user in the database.")
            throw err;
        }
    }
       
    addItem(e) {
        if (this._inputElement.value !== "") {
            var newItem = {
              text: this._inputElement.value,
              key: Date.now()
            };
         
            this.setState((prevState) => {
              return { 
                items: prevState.items.concat(newItem) 
              };
            });
           
            this._inputElement.value = "";
          }
           
          console.log(this.state.items);
             
          e.preventDefault();
    }

    deleteItem(key) {
        var filteredItems = this.state.items.filter(function (item) {
          return (item.key !== key);
        });
       
        this.setState({
          items: filteredItems
        });
      }

    render() {
        return (
        <div className="todoListMain">
            <div className="header">
            <form onSubmit={this.addItem}>
                <input ref={(a) => this._inputElement = a} 
                    placeholder="enter task">
                </input>
                <button type="submit">add</button>
            </form>
            <button onClick={this.saveItems}>Save</button>
            </div>
            <TodoItems entries={this.state.items}
                 delete={this.deleteItem}/>
        </div>
        );
    }
}

export default Notes;