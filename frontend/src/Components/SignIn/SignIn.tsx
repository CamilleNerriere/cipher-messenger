import './SignIn.scss';
import Header from '../Header/Header.tsx';

function SignIn() {

  return(
    <div className="sign-in">
    <title>S'inscrire | Cipher Messenger</title>
    <meta name="description" content="Bienvenue sur Cipher Messenger, et envoyez vos messages secrets." />
    <Header
      text="S'inscrire"
      showSearchBar={false}/>
      <form className="sign-in__form">
        <div className="sign-in__form__inputs">
          <input type="text" placeholder="Nom d'utilisateur"/>
          <input type="email" placeholder="Email"/>
          <input type="email" placeholder="Mot de passe" />
          <input type="email" placeholder="Confirmation mot de passe" />
        </div>
        <button className="sign-in__form__button" type="submit">S'inscrire</button>
      </form>
    </div>
  )
}

export default SignIn;