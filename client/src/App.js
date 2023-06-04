import React,{Component} from 'react';
import './App.css';

import { Home } from './components/Home'
import ReadBook from './components/ReadBook'
import { Meepy } from './components/Meepy';

import {  Route, Routes } from 'react-router-dom'
import Book from './services/book'
import User from './services/user'

const bookshelves = [
    { key: 'unread', name: 'Start Reading'},
    { key: 'reading', name: 'In Progress'}
];

const testBooks = [
    { id: 1, title: 'Meep', author: 'mareeyoop', shelf: 'unread', image: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"},
    { id: 2, title: 'Moop', author: 'quaggy.io', shelf: 'reading'}
];

class App extends Component {
    state = {
        books: [],
        error: false
    };
    componentDidMount = () => {
        let promises = [];
        promises.push(Book.getAllBooks());
        Promise.all(promises).then( ([bookDB]) => {
          bookDB.map((book) => {
            // if(userDB && userDB.CurrentlyReadingBooksKeys && userDB.CurrentlyReadingBooksKeys.includes(book.Title_Author)) {
            //   book.shelf = 'reading';
            // }else {
            //   book.shelf = 'unread'
            // }
            if(localStorage.getItem(book.Title_Author)){
                book.shelf = 'reading';
            } else{
              book.shelf = 'unread';
            }
          })
          if(Array.isArray(bookDB))this.setState({books: bookDB})
        })
        // Book.getAllBooks().then((books) => {if(Array.isArray(books))this.setState({books: books})});
        this.setState({ books: testBooks });
    };

    render() {
        const { books } = this.state;
        return (
            <div className="App">
            <Routes>
                {/* home page */}
                <Route path='/' 
                    element={<Home
                        bookshelves={bookshelves}
                        books={books}
                    />} exact />

                {/* View book by its ID */}
                <Route path='/book'>
                    
                    <Route path=":id"
                    element={<ReadBook 
                            books={books}
                        />} />
                </Route>

            </Routes>
            </div>
        );
    }
}

export default App;
