import React,{Component, useEffect, useRef, useState} from 'react';
import Claude from "../services/claude"
import Messages from "./Messages";

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {message: "", chats: [],  isTyping: false};
    }

     sendMessage = async (e, message) => {
        e.preventDefault();
        let summary = `In this dialogue between Socrates and Euthyphro, they discuss the nature of piety and its relation to morality. The conversation is set during Socrates' trial for impiety. Euthyphro, a self-proclaimed expert in religious matters, claims that the pious is what is dear to the gods. However, Socrates points out some problems with this definition. He argues that the gods disagree about what is good and evil, so the same action could be both pious and impious at the same time - thus contradicting Euthyphro's definition. Socrates proposes that piety must be a part of justice, and asks Euthyphro what part of justice it is. Euthyphro replies that piety is that part of justice which "attends to" the gods, by rituals of sacrifice and prayer. However, Socrates argues that these rituals cannot benefit the gods. The dialogue ends in aporia, with Euthyphro hurrying off and Socrates lamenting that he could not get a clear definition of piety.`;


        if (!message) return;
        // scrollTo(0, 1e10);

        // fetch("http://localhost:5000/", {
        // method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify({
        //     chats,
        // }),
        // })
        Claude.sendMessageToClaudeBook({
            book: this.props.book.Title, 
            history: this.props.history, 
            currentLine: this.props.currentLine,
            summary: this.props.book.Summary,
            user: localStorage.getItem("username")? localStorage.getItem("username"): "User",
            message: message,
            msgHistory: this.state.chats
        })
        .then((response) => {
            msgs.push({ role: "assistant", content: response });
            this.setState({
                chats: msgs,
                isTyping: false
            },
            () => this.scrollToMyRef())
            // scrollTo(0, 1e10);
        })
        .catch((error) => {
            console.log(error);
        });

        let msgs = this.state.chats;
        msgs.push({ role: "user", content: message });
        this.setState({
            message: "",
            chats: msgs,
            isTyping: true
        },
        () => this.scrollToMyRef()
        );
    };

    componentDidMount = () => {
        // Initialize Claude
        let initialMsg = `Hello, ${localStorage.getItem("username")? localStorage.getItem("username"): "User"}! My name is Philaude, I'm here to accompany you as a reading companion for ${this.props.book.Title} by ${this.props.book.Author}. Let's start on the first page together. :)\n\nPress the "Send Next Page" button any time you want me to update me on your current reading progress.` ;
        let welcomeBackMsg = `Hello, ${localStorage.getItem("username")? localStorage.getItem("username"): "User"}! Welcome back to ${this.props.book.Title}. Shall we pick up where we left off?`;
        let msgs = this.state.chats; 

        const { book }= this.props;
        const isNewBook = book.shelf === "unread";
        const displayMsg = isNewBook ?
            initialMsg : welcomeBackMsg;
        

        msgs.push({ role:"assistant", content: displayMsg});
        this.setState({
            chats: msgs,
            isTyping:false
        })
    };

    sendNextPage = (e) => {
        e.preventDefault();
        this.sendMessage(e, "*sends next page*");
    };

    // UI Stuff
    chatContainer = React.createRef();

    scrollToMyRef = () => {
        const scroll =
          this.chatContainer.current.scrollHeight -
          this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
      };

    render () {
        let chats = this.state.chats;
        const userName = localStorage.getItem("username")? localStorage.getItem("username"): "User";

        return (
            //  Header Component
            <div className="chat-panel">
            <h1>Symposium</h1>
            <div className="chat-panel-content">

                {/* Messages list component */}
                <div ref={this.chatContainer} className="chat-panel-messages">
                    <Messages
                        // key={index} i dont really know what index is for sorry
                        messages={chats}
                        userName={userName}
                    />

                    {/* {chats && chats.length
                    ? chats.map((chat, index) => (
                        <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                            <span>
                            <b>{chat.role.toUpperCase()}</b>
                            </span>
                            <span>:</span>
                            <span>{chat.content}</span>
                        </p>
                        ))
                    : ""} */}
                </div>
            
                <div className={this.state.isTyping ? "" : "hide"}>
                    <p>
                    <i>{this.state.isTyping ? "Typing..." : ""}</i>
                    </p>
                </div>
                
                {/* Message input component */}
                <form className="chat-panel-input-form" action="" onSubmit={(e) => this.sendMessage(e, this.state.message)}>
                    <input
                    type="text"
                    name="message"
                    value={this.state.message}
                    placeholder="Type a message here and hit Enter..."
                    onChange={(e) => this.setState({message: e.target.value})}
                    />
                    <button
                    type="button"
                    onClick={(e) => this.sendNextPage(e)}
                    >Send Next Page</button>
                </form>

            </div>
            </div>
        );
    }
}

export default Chat;