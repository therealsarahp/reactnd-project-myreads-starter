import React, {Component} from "react";
import {Link} from "react-router-dom";
import * as BooksAPI from './BooksAPI.js';
import Book from "./Book";
// import Shelf from "./Shelf";


class SearchBooks extends Component{
    state={
        query: '',
        books: [],
    }

    updateQuery=(event)=> {
        event.preventDefault();
        this.setState({
            query: event.target.value
        })
        if (event.target.value !== '') {
        BooksAPI.search(event.target.value)
            .then((books) => {
                let sameBooks = [];
                if (books && books.length > 0) {
                    books.forEach((searchBook) => {
                        this.props.books.forEach((homeBook) => {
                            if (searchBook.id === homeBook.id) {
                                sameBooks.push(homeBook);
                                books.splice(books.indexOf(searchBook), 1)
                            }
                        })
                    })
                    this.setState(() => ({
                        books: books.concat(sameBooks)
                    }))
                }
            })
    }
    else{
        BooksAPI.search('')
            .then((books)=>{
                this.setState({books})
            })
        }
    }

    clearQuery = () => {
        this.updateQuery('')
    }


    render() {
        const {query, books} = this.state

        return(
        <div className="search-books">
            <div className="search-books-bar">

                <Link to='/' >
                <button className="close-search">Close</button>
                </Link>

                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={query}
                        onChange={this.updateQuery}

                    />
                </div>
                {/*//results only return if books array is defined and has a length greater than 1, displays a phrase otherwise */}
            </div>
            <div className="search-books-results">
                { books && books.length > 0 ? (
                <ol className="books-grid">
                    {books.map((book)=>(
                        <Book key={book.id} book={book} shelf={book.shelf === undefined ? 'none' : book.shelf} onUpdateBook={this.props.onUpdateBook}/>))
                    }
                </ol>) : (
                    <p><em>No Books To Show...</em></p>)}
            </div>
        </div>
        )
    }

        }




export default SearchBooks;