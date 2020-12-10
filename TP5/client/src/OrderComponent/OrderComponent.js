import '../css/style.css';
import * as React from "react";
import { useHistory } from 'react-router'
import {Header} from "../_Common/Header.js"
import {Footer} from "../_Common/Footer.js"

import { useState } from 'react';

export default function OrderComponent() {
    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    let history = useHistory();

    const sendOrder = async (event) => {
        event.preventDefault();
        try {
            setId(id + 1);

            const order = { 
                "id": id, 
                "firstName": firstName, 
                "lastName": lastName, 
                "email": email, 
                "phone": phone,
                "products": [{"id": 11, "quantity": 4}]
            };

            const req = {
                credentials: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            };

            await fetch(`http://localhost:4000/api/orders`, req);
            history.push("/confirmation", [firstName, lastName, id]);
        } catch(e) {
            console.error(e);
        }
    }

    let content = (
        <article>
            <h1>Commande</h1>
            <form id="order-form">
                <section>
                    <h2>Contact</h2>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label htmlFor="first-name">Prénom</label>
                                <input class="form-control" type="text" id="first-name" name="first-name" placeholder="Prénom" onChange={e => setFirstName(e.target.value)} minLength="2" required></input>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label htmlFor="last-name">Nom</label>
                                <input class="form-control" type="text" id="last-name" name="last-name" placeholder="Nom" onChange={e => setLastName(e.target.value)} minLength="2" required></input>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                        <div class="form-group">
                            <label htmlFor="email">Adresse courriel</label>
                            <input class="form-control" type="email" id="email" name="email" placeholder="Adresse courriel" onChange={e => setEmail(e.target.value)} required/>
                        </div>
                        </div>
                        <div class="col">
                        <div class="form-group">
                            <label htmlFor="phone">Téléphone</label>
                            <input class="form-control" type="tel" id="phone" name="phone" placeholder="###-###-####" onChange={e => setPhone(e.target.value)} required/>
                        </div>
                        </div>
                    </div>
                </section>
                <section>
                  <h2>Paiement</h2>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label htmlFor="credit-card">Numéro de carte de crédit</label>
                                <input class="form-control" type="text" id="credit-card" name="credit-card" placeholder="•••• •••• •••• ••••" required/>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label htmlFor="credit-card-expiry">Expiration (mm/aa)</label>
                                <input class="form-control" type="text" id="credit-card-expiry" name="credit-card-expiry" placeholder="mm/aa" required/>
                            </div>
                        </div>
                    </div>
                </section>
                <button class="btn pull-right" type="submit" onClick={sendOrder}>Payer <i class="fa fa-angle-double-right"></i></button>
            </form>
        </article>
    );

    return (
        <div>
            <Header/>
            <main>{content}</main>
            <Footer/>
        </div>
    );
}
