import React,{Component} from 'react';
import BookShelf from './BookShelf';

export class Home extends Component {
    
    // write what needs to be rendered
    render() {
        return(
            <div className="books-home">
                <div className="row bg-dark">
                    <div className="col-10 App-header">
                        <h1>Philaude</h1>
                    </div>
                </div>
            </div>
        )
    }
}