import React, { Component} from "react";
import * as BooksAPI from './BooksAPI.js';
// import select from 'react-select';

class MoveTo extends Component{

    state={
        value : ""
    }

    handleChange=(event)=>{
        event.preventDefault();
        this.setState({
            value: event.target.value
            })
        BooksAPI.update(this.props.book, this.state.value)
            .then()
        if(this.props.onMove){
            this.props.onMove(this.props.book, this.state.value)
        }
        console.log("value passes as", this.state.value)

    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.state.value !== prevState.value) {
    //         BooksAPI.update(this.props.book, this.state.value)
    //             .then()
    //     }
    // }
    //
    // moveBook=(event)=>{
    //     event.preventDefault();
    //     // BooksAPI.update(this.props.book, this.state.value)
    //     //     .then()
    //
    // }


    render() {
        const { book } = this.props
        const values = [{shelfValue: null, name:"Move To...", id: 0},
            {shelfValue:"currentlyReading", name:"Currently Reading", id:1},
            {shelfValue:"wantToRead", name:"Want To Read", id:2},
            {shelfValue:"read", name:"Read", id:3},
            {shelfValue:"none", name:"None", id:4},
    ]

        return(
            <div className="book-shelf-changer">
                {/*<form*/}
                {/*    onSubmit={this.moveBook}>*/}
                <select
                    value={this.state.value}
                    onChange={this.handleChange}
                    >
                    {values.map((value)=>{
                        return(
                            <option value={value.shelfValue}
                                    key={value.id}
                                    disabled={value.id===0}
                            >{value.name}
                            </option>
                        )
                    })}

                </select>
                {/*</form>*/}
            </div>

        )


    }

}

export default MoveTo;