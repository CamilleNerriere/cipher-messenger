import { IConversationOverviewProps } from '../../Interfaces/IConversationOverview';
import './ConversationOverview.scss';

function ConversationOverview ({username, message, date} : IConversationOverviewProps){
  const formattedDate = date.toLocaleDateString('fr-FR', {
    month: 'short',
    day: 'numeric',
  });
  return (
    <div className='conversation-overview'>
      <div className='conversation-overview__username'>{username}</div>
      <div className='conversation-overview__message'>{message}</div>
      <div className='conversation-overview__date'>{formattedDate}</div>
    </div>
  )
}

export default ConversationOverview;