import '../css/App.css';
import { Header } from "../_Common/Header.js"
import { Footer } from "../_Common/Footer.js"
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import { formatPrice } from "../utils.js"
export function ShoppingCartComponent() {
    document.title="OnlineShop - Panier";

    const [ triggerRender, setTrigger] = useState(false);
    const [ordersItems, setItems] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const req = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                };
                const items = await fetch("http://localhost:4000/api/shopping-cart", req);

                const prod = await fetch("http://localhost:4000/api/products");

                if(prod.ok && items.ok) {
                    const cart = await items.json();
                    const products = await prod.json();

                    setItems(cart.map(o => {
                        const prod = products.find( p => p.id === o.productId);
                        return {
                            product: {
                                name: prod.name,
                                id: prod.id,
                                price: prod.price
                            },
                            quantity: o.quantity,
                            total: Number(o.quantity)*Number(prod.price)
                        }
                    }))
                } else {
                    if(!prod.ok)
                        throw await prod.json();
                    else
                        throw await items.json();
                }

            } catch(e) {
                console.error(e);
            }
        }

        fetchData();

    }, [triggerRender]);

    const removeFromCart = async (event, id) => {
        event.preventDefault();
        
        try {
            const req = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            };
            await fetch(`http://localhost:4000/api/shopping-cart/${id}`, req);
            setTrigger(!triggerRender);
        } catch(e) {
            console.error(e);
        }
    }

    const addQuantity = async (event, id, qty) => {
        event.preventDefault();
        
        try {
            const req = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ quantity: Number(qty)+1 })
            };
            console.log(req);
            await fetch(`http://localhost:4000/api/shopping-cart/${id}`, req);
            setTrigger(!triggerRender);
        } catch(e) {
            console.error(e);
        }
    }

    const removeQuantity = async (event, id, qty) => {
        event.preventDefault();
        
        try {
            const req = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ quantity: Number(qty)-1 })
            };
            console.log(req);
            await fetch(`http://localhost:4000/api/shopping-cart/${id}`, req);
            setTrigger(!triggerRender);
        } catch(e) {
            console.error(e);
        }
    }

    const deleteCart = async (event) => {
        event.preventDefault();

        try {
            const req = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            };
            await fetch(`http://localhost:4000/api/shopping-cart/`, req);
            setTrigger(!triggerRender);
        } catch(e) {
            console.error(e);
        }
    }

    return (

        <div>
            <Header/>
            <main>
            <article>
                <h1>Panier</h1>
                <div id="shopping-cart-container">
                    <table className="table shopping-cart-table">
                        <thead>
                            <tr>
                            <th></th>
                            <th>Produit</th>
                            <th>Prix unitaire</th>
                            <th>Quantité</th>
                            <th>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                        {ordersItems.map(item => 
                            <tr key={item.product.id}>
                                <td><button className="remove-item-button" onClick={e => removeFromCart(e, item.product.id)} title="Supprimer"><i className="fa fa-times"></i></button></td>
                                <td><Link to={`./product/${item.product.id}`}>{item.product.name}</Link></td>
                                <td>{formatPrice(item.product["price"])}</td>
                                <td>
                                    <div className="row">
                                    <div className="col"><button className="remove-quantity-button" onClick={e => removeQuantity(e, item.product.id, item.quantity)} title="Retirer" disabled={item.quantity <= 1 ? "disabled" : ""}>
                                    <i className="fa fa-minus"></i></button></div>
                                    <div className="col quantity">{item.quantity}</div>
                                    <div className="col"><button className="add-quantity-button" onClick={e => addQuantity(e, item.product.id, item.quantity)} title="Ajouter"><i className="fa fa-plus"></i></button></div>
                                    </div>
                                </td>
                                <td className="price">{formatPrice(item.total)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <p className="shopping-cart-total">Total: <strong id="total-amount"></strong></p>
                    <a className="btn pull-right" href="./commande">Commander <i className="fa fa-angle-double-right"></i></a>
                    <button className="btn" id="remove-all-items-button" onClick={deleteCart} ><i className="fa fa-trash-o"></i>&nbsp; Vider le panier</button>
                </div>
            </article>
        </main>
            <Footer/>
        </div>
    );
}
