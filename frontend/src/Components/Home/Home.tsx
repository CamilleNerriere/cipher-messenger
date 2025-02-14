import { useState } from "react";
import './Home.scss';
import bill from '/assets/img/bill.svg'
import cipher from '/assets/img/cipher.svg'

function Home() {
    const [state, setState] = useState<string>("home"); 

  return (
    
    <div className={state ==="home" ? "home" : "connect"}>
      <h1 className="home__h1">Bienvenue sur Cipher Messenger</h1>
      {state === "home" ? (
        <>
          <img className="home__bill" src={bill} alt="Bill Cipher" />
          <div className="home__buttons">
            <button type="button" onClick={() => setState("connect")}>Se connecter</button>
            <button type="button">S'inscrire</button>
          </div>
        </>
      ) : 
      <>
      <div className="connect__container">
      <img className="connect__bill" src={cipher} alt=""/>
      <form>
        <input className="connect__input--user" placeholder="Nom d'utilisateur"></input>
        <input className="connect__input--password" placeholder="Mot de passe"></input>
      </form>
      </div>
      <div className="connect__button">
      <button type="button" onClick={() => setState("home")}>Se connecter</button>
      </div>
      </>}
    </div>
  );
}

export default Home;

