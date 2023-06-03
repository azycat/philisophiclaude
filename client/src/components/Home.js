import React,{Component} from 'react';
import BookShelf from './BookShelf';
import logo from './logo.svg';
import { Chat } from './Chat';
export class Home extends Component {    
    // write what needs to be rendered
    render() {
        const { bookshelves, books } = this.props;
        return(
            <div className="books-home">
                <div className="row bg-dark">
                    <div className="col-10 App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>Philaude</h1>
                    </div>
                </div>

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
                <Chat/>
            </div>
        )
    }
}