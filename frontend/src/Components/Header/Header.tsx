import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';



function Header({ text }: { text: string; }) {
    
  return(
      <div className="header">
        <div className="header__default">
          <FontAwesomeIcon className="header__default__icon" icon={faChevronLeft} />
          <div className="header__default__text">
            {text}
          </div>
        </div>
      
      </div>
  )
}

export default Header;