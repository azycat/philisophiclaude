import React,{Component} from 'react';
import Book from './Book';

class BookShelf extends Component {
    constructor(props) {
        super(props);
        // this.props.books; call this to ask for books from props
    }

    render() {
        const {shelf, books } = this.props;
        const bookList = books.filter(book => book.shelf === shelf.key);

        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookList.map(book => (
                            <Book key={book.id} book={book} shelf={shelf.key} />
                        ))}
                    </ol>
                </div>
            </div> 
        )
    }
}

export default BookShelf;