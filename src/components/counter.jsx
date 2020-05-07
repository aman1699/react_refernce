import React, { Component } from 'react';
class Counter extends Component {
    state = {
        count: 0,
        tags:['tag1','tag2','tag3']
        
    };
    handleIncreament=()=> {
        this.setState({ count: this.state.count + 1 });
    }
    render()
    { 
        let classes="badge m-2 badge-";
        if (this.state.count === 0)
            classes = classes + "warning";
        else
            classes = classes + "primary";
        return (
            <div>
                <span>{this.state.count}</span>
                <button onClick={this.handleIncreament} className={classes}>Increament</button>
                <ul>{this.state.tags.map(tag => <li>{tag}</li>)}</ul>
        </div>
        );
    }
    }
     
export default Counter ;