import React,{Component} from 'react';
import sample_book from './sample_book.png';

class Book extends Component {
    constructor(props) {
        super(props);
        // this.props.books; call this to ask for books from props
    }

    render() {
        const { book } = this.props;
        let boo = true;
        let answer = boo ? "asdfsadk" : 87489;
        return(
            <li>
                <div className="book">
                    <div classname="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193,
                        backgroundImage: `url(${
                            book.image
                                ? book.image
                                : './Placeholder_book.svg'
                        })`
                    }}
                    />
                </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-author">{book.author}</div>										
                </div>
            </li> 
        )
    }
}

export default Book;