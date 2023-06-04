import React,{Component} from 'react';
import Header from './Header';
import BookShelf from './BookShelf';
import { Chat } from './Chat';

export class Home extends Component {    
    // write what needs to be rendered
    componentDidMount = () => {
        this.props.books.map((book) => {
            if(localStorage.getItem(book.Title_Author)){
                book.shelf = 'reading';
            } else{
                book.shelf = 'unread';
            }
        })
    }

    render() {
        const { bookshelves, books } = this.props;
        return(
            <div className="books-home">
               {<Header />}

                <div className="books-home-content">
                   <div>
                        {bookshelves.map(shelf => ( //map is a very fancy for each
                            <BookShelf
                                shelf={shelf}
                                books={books}
                        />
                        ))}
                        
                    </div> 
                </div>
            </div>
        )
    }
}