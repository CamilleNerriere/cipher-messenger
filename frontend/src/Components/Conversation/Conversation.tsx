import Header from '../Header/Header';
import Message from '../Message/Message';
import './Conversation.scss';

const messages = [
  { 
    message: "Salut, comment tu vas ?", 
    date: "2025-02-19T08:30:00Z", 
    sender: "alice", 
    recipient: "bob" 
  },
  { 
    message: "Je vais bien, merci ! Et toi ?", 
    date: "2025-02-19T08:31:00Z", 
    sender: "bob", 
    recipient: "alice" 
  },
  { 
    message: "Pas mal, juste un peu fatigué.", 
    date: "2025-02-19T08:32:30Z", 
    sender: "alice", 
    recipient: "bob" 
  },
  { 
    message: "T'as bossé tard hier ?", 
    date: "2025-02-19T08:33:10Z", 
    sender: "bob", 
    recipient: "alice" 
  },
  { 
    message: "Ouais, j'avais un bug à résoudre.", 
    date: "2025-02-19T08:34:45Z", 
    sender: "alice", 
    recipient: "bob" 
  },
  { 
    message: "Je connais ça 😅", 
    date: "2025-02-19T08:35:20Z", 
    sender: "bob", 
    recipient: "alice" 
  },
  { 
    message: "T'as avancé sur ton projet ?", 
    date: "2025-02-19T08:36:50Z", 
    sender: "alice", 
    recipient: "bob" 
  },
  { 
    message: "Ouais, j'ai finalisé l'authentification.", 
    date: "2025-02-19T08:38:00Z", 
    sender: "bob", 
    recipient: "alice" 
  },
  { 
    message: "Bien joué !", 
    date: "2025-02-19T08:39:15Z", 
    sender: "alice", 
    recipient: "bob" 
  },
  { 
    message: "Merci, et toi, quoi de neuf ?", 
    date: "2025-02-19T08:40:30Z", 
    sender: "bob", 
    recipient: "alice" 
  }
];



function Conversation () {
  const members = {sender: 'bob', recipient: 'alice'};

  return (
    <div className='conversation'>
      <title>alice | Cipher Messenger</title> 
      {/* change dynamically the name */}
      <meta name="description" content="Bienvenue sur Cipher Messenger, et envoyez vos messages secrets." />
      <Header
        text="alice"
      />
      <div className='conversation__messages'>
        {messages.map(message => (
          <Message 
            sender={message.sender === members.sender ? true : false}
            key={message.date}
            message={message.message}
            date={message.date}/>
        ))}
      </div>
    </div>
  )
}

export default Conversation ; 