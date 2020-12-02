import '../css/style.css';
import * as React from "react";
import {Header} from "../_Common/Header.js"
import {Footer} from "../_Common/Footer.js"
// import {Link} from "react-router-dom"

export default class OrderComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            "first-name": "",
            "last-name": "",
            "email": "",
            "telephone": "",
            "credit-card": "",
            "credit-card-expiry": "",
            "orderID": 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const fieldName = event.target.name;

        this.setState({
            [fieldName]: event.target.value
        });

        console.log("handleInputChange: " + this.state["first-name"])
    }

    handleSubmit(event) {
        this.setState({ "orderID": this.state.orderID+1});
        const infos = {
            "name": this.state["first-name"] + this.state["last-name"],
            "orderID": this.state.orderID
        }
    }
    
    render() {
        const content = (
            <article>
                <h1>Commande</h1>
                <form id="order-form" action="/order" method="post">
                    <section>
                        <h2>Contact</h2>
                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label htmlFor="first-name">Prénom</label>
                                    <input class="form-control" type="text" id="first-name" name="first-name" placeholder="Prénom" onChange={this.handleInputChange} minLength="2" required></input>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label htmlFor="last-name">Nom</label>
                                    <input class="form-control" type="text" id="last-name" name="last-name" placeholder="Nom" onChange={this.handleInputChange} minLength="2" required></input>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                            <div class="form-group">
                                <label htmlFor="email">Adresse courriel</label>
                                <input class="form-control" type="email" id="email" name="email" placeholder="Adresse courriel" onChange={this.handleInputChange} required/>
                            </div>
                            </div>
                            <div class="col">
                            <div class="form-group">
                                <label htmlFor="phone">Téléphone</label>
                                <input class="form-control" type="tel" id="phone" name="phone" placeholder="###-###-####" onChange={this.handleInputChange} required/>
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
                                    <input class="form-control" type="text" id="credit-card" name="credit-card" placeholder="•••• •••• •••• ••••" onChange={this.handleInputChange} required/>
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label htmlFor="credit-card-expiry">Expiration (mm/aa)</label>
                                    <input class="form-control" type="text" id="credit-card-expiry" name="credit-card-expiry" placeholder="mm/aa" onChange={this.handleInputChange} required/>
                                </div>
                            </div>
                        </div>
                    </section>
                    <button class="btn pull-right" type="submit">Payer <i class="fa fa-angle-double-right"></i></button>
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
}