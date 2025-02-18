import { useState } from 'react';
import Header from '../Header/Header';
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
      <Header
      text="Conversations"
      showSearchBar={false}
      />
      <div className='conversation-list__add'>
        <FontAwesomeIcon icon={faPlus}/>
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

