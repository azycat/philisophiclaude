import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { NotFound } from './NotFound';
import Chat from './Chat'
import Header from './Header';
import Reader from './Reader';

function ReadBook(props) {
    const { id } = useParams();

    const { books, user} = props;
    const [currentLine, setCurrentLine] = useState("")
    const [history, setHistory] = useState("")
    const book = books.find(b => b.Title_Author === id);

    if (book === undefined) return (<NotFound/>);

    const updateHistory = (newHistory) => {
        if(newHistory.length > history.length) {
            setHistory(newHistory);
        }
    }

    return (
        <div className="read-book">
            <Header />
            <h2>{book.Title} by {book.Author}</h2>
            <div className="read-book-content">
                    <Reader book={book} link={book.Epub_Link} setCurrentLine={setCurrentLine} updateHistory={updateHistory}/>
                    <Chat book={book} currentLine={currentLine} history={history}/>
            </div>
        </div>

       
    )
}

export default ReadBook;