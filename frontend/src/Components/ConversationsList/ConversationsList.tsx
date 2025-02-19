import { useState } from 'react';
import Header from '../Header/Header';
import SearchBar from '../SearchBar/SearchBar.tsx';
import ConversationOverview from '../ConversationOverview/ConversationOverview.tsx'
import { IConversationOverviewProps } from '../../Interfaces/IConversationOverview.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './ConversationsList.scss';


function ConversationList(){
  const [conversationsList, setConversationsList ]= useState<IConversationOverviewProps[]>([
    {
      username: "Alice",
      message: "Salut, comment ça va ?",
      date: new Date(2025, 1, 17, 10, 30), // 17 février 2025 à 10h30
    },
    {
      username: "Bob",
      message: "Je suis dispo pour la réunion.",
      date: new Date(2025, 1, 16, 14, 15), // 16 février 2025 à 14h15
    },
    {
      username: "Charlie",
      message: "Merci pour ton aide !",
      date: new Date(2025, 1, 15, 9, 0), // 15 février 2025 à 9h00
    },
  ])

  return (
    <div className='conversation-list'>
      <title>Conversations | Cipher Messenger</title>
      <meta name="description" content="Bienvenue sur Cipher Messenger, et envoyez vos messages secrets." />
      <Header
      text="Conversations"
      />
      <div style={{position: "relative"}} className='conversation-list__search'>
        <SearchBar/>
        <FontAwesomeIcon className='conversation-list__icon' icon={faPlus}/>
      </div>
      <div className='conversation-list__list'>
        {conversationsList.map(conversation => (
          <ConversationOverview
          key={conversation.message}
          username={conversation.username}
          message={conversation.message}
          date={conversation.date}/>))}
      </div>
    </div>
  )
}

export default ConversationList;

