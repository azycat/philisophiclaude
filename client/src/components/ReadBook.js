import { useParams } from "react-router-dom";
import { NotFound } from './pages/NotFound';
import Chat from './Chat'
import Header from './Header';
import Reader from './Reader';

function ReadBook(props) {
    const { id } = useParams();

    const { books } = props;
    const book = books.find(b => b.id === Number(id));

    if (book === undefined) return (<NotFound/>);

    return (
        <div className="read-book">
            <Header />
            <h3> you are reading book {id}, title: {book.title} </h3>
            <div className="read-book-content">
                    <Reader/>
                    <Chat/>
            </div>
        </div>

       
    )
}

export default ReadBook;