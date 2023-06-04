import React,{Component} from 'react';
import Button from 'react-bootstrap/Button'

export class NotFound extends Component {
   
    // write what needs to be rendered
    render() {
        return(
            // write html content that needs to be rendered when this component is called
            <div className="mt-5-d-flex justify-content-left">
                <h3>Error: Not Found 
                </h3>
                <Button variant="primary">the meep button</Button>
            </div>
     )
    }
}