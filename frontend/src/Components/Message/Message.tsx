import './Message.scss'

interface MessageProps {
    message: string;
    date: string;
    sender: boolean;
  }

const formatter = new Intl.DateTimeFormat("fr-FR", {
    year: "numeric", month: "short", day: "numeric", 
    hour: "2-digit", minute: "2-digit"
  });

function Message({message, date, sender} : MessageProps){
    return(
        <div className={sender ? 'message__sender' : 'message__recipient'}>
            <div className='message__date'>{formatter.format(new Date(date))}</div>
            <div className='message__text'>{message}</div>
        </div>
    )
}

export default Message;