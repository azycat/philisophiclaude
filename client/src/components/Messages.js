import React,{Component} from 'react';

class Messages extends Component {
    renderMessage(message) {
        const {role, content} = message;
        const userMessage = role === "user";
        const { userName } = this.props; // aka currentMember
        const displayName = userMessage ?
            userName : "Philaude";
        const className = userMessage ?
            "Messages-message userName" : "Messages-message";
        
        return (
            <li className={className}>
                <span
                    className="avatar"
                    style={{backgroundColor: 'blue'}}
                />
                <div className="Message-content">
                    <div className="displayName">
                        {displayName}
                    </div>
                    <div className="text-content">
                    {content}
                    </div>
                </div>
            </li>
        )
    }

    render() {
        const { messages } = this.props;
        return(
          <ul className="Messages-list">
            {messages.map(m => this.renderMessage(m))}
          </ul> 
        );
    }
}

export default Messages;