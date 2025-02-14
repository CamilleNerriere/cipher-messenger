import './Header.scss';
import SearchBar from '../SearchBar/SearchBar.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';



function Header({ text, showSearchBar }: { text: string; showSearchBar: boolean }) {
    
  return(
      <div className="header">
        <div className="header__default">
          <FontAwesomeIcon className="header__default__icon" icon={faChevronLeft} />
          <div className="header__default__text">
            {text}
          </div>
        </div>
        <div className="header__search">
          {showSearchBar && <SearchBar/>}
        </div>
      </div>
  )
}

export default Header;