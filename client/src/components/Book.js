import React,{Component} from 'react';
import { useNavigate } from 'react-router-dom'

function Book(props) {
    const { book } = props;
    const navigate = useNavigate();

    return(
        <li>
            <div className="book">
                <div classname="book-top">
                <div className="book-cover" style={{ width: 128, height: 193,
                    backgroundImage: `url(${
                        book.image
                            ? book.image
                            : 'img/Placeholder_book.svg'
                    })`
                    }}
                    onClick={() => navigate(`book/${book.id}`)}
                />
            </div>
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author ? book.author : 'Unknown Author'}</div>
            </div>
        </li> 
    )
}

export default Book;