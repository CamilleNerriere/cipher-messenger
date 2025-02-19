import Header from '../Header/Header';
import './Conversation.scss';

function Conversation () {
  return (
    <div className='conversation'>
      <title>Alice | Cipher Messenger</title> 
      {/* change dynamically the name */}
      <meta name="description" content="Bienvenue sur Cipher Messenger, et envoyez vos messages secrets." />
      <Header
        text="Alice"
      />
    </div>
  )
}

export default Conversation ; 