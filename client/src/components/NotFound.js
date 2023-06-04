import React,{Component} from 'react';
import Button from 'react-bootstrap/Button'
import Header from './Header'

export class NotFound extends Component {
   
    // write what needs to be rendered
    render() {
        return(
            <div>
                <Header/>
                <div className="mt-5-d-flex justify-content-center">
                    <h3 padding="20px 0 0">Error: Book Not Found 
                    </h3>
                    {/* <Button variant="primary">the meep button</Button> */}
            </div>
     
            </div>
            // write html content that needs to be rendered when this component is called
        ) 
    }
}