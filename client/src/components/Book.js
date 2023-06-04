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
                        book.Cover_Image_Link
                            ? book.Cover_Image_Link
                            : 'img/Placeholder_book.svg'
                    })`
                    }}
                    onClick={() => navigate(`book/${book.Title_Author}`)}
                />
            </div>
                <div className="book-title">{book.Title}</div>
                <div className="book-author">{book.Author ? book.Author : 'Unknown Author'}</div>
            </div>
        </li> 
    )
}

export default Book;