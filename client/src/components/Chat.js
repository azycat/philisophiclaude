import React,{Component} from 'react';
import Claude from "../services/claude"

export class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {message: "", chats: [], isTyping: false};
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
            book: "Euthopro", 
            history: "", 
            currentLine: "",
            summary: summary,
            user: "Wallo",
            message: message,
            msgHistory: this.state.chats
        })
        .then((response) => {
            msgs.push({ role: "ai", content: response });
            this.setState({
                chats: msgs,
                isTyping: false
            })
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
        })
    };

    render () {
        let chats = this.state.chats;
        return (
            <div>
            <h1>FullStack Chat AI Tutorial</h1>
        
            <section>
                {chats && chats.length
                ? chats.map((chat, index) => (
                    <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                        <span>
                        <b>{chat.role.toUpperCase()}</b>
                        </span>
                        <span>:</span>
                        <span>{chat.content}</span>
                    </p>
                    ))
                : ""}
            </section>
        
            <div className={this.state.isTyping ? "" : "hide"}>
                <p>
                <i>{this.state.isTyping ? "Typing" : ""}</i>
                </p>
            </div>
        
            <form action="" onSubmit={(e) => this.sendMessage(e, this.state.message)}>
                <input
                type="text"
                name="message"
                value={this.state.message}
                placeholder="Type a message here and hit Enter..."
                onChange={(e) => this.setState({message: e.target.value})}
                />
            </form>
            </div>
        );
    }
}

export default Chat;