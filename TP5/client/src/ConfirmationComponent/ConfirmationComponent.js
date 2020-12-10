import '../css/App.css';
import {Header} from "../_Common/Header.js"
import {Footer} from "../_Common/Footer.js"
import { useLocation } from 'react-router-dom';

export function ConfirmationComponent() {
  document.title="OnlineShop - Commande"
  // const name = "Félix Brunet";
  // const confirmNum = 1;
  const location = useLocation();
  const name = location.state.name;
  const confirmNum = location.state.confirmNum;

  return (
    <div>
      <Header/>
      <main>
        <article>
          <h1>Votre commande est confirmée <span id="name">{name}</span>!</h1>
          <p>Votre numéro de confirmation est le <strong id="confirmation-number">{confirmNum}</strong>.</p>
        </article>
      </main>
      <Footer/>
    </div>
  );
}
