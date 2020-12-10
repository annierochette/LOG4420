import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.svg";
export function Header(prop) {
  
    const [cartCount, setCartCount] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const spReq = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            };
            const itemsAns = await fetch("http://localhost:4000/api/shopping-cart", spReq);
            const items = await itemsAns.json();
            
            if (items.length !== 0) {
                const reducer = (acc, qty) => acc + qty;
                let total = items.map(item => {return item.quantity;}).reduce(reducer);
                setCartCount(total);
            } else {
                setCartCount(0);
            }

        }
        fetchData()
    });

    const currentActive = prop.currentActive;
    if (cartCount === 0) {
        console.log("IS MEPKTkeolrNJKGNDFJKNKJDNKJ")
        return (
            <header>
                <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <img alt="logo" src={logo} title="Accueil"/>
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li className={currentActive==="home" ? "active" : ""}><Link to="/">Accueil</Link></li>
                        <li className={currentActive==="product" ? "active" : ""}><Link to="/products">Produits</Link></li>
                        <li className={currentActive==="contact" ? "active" : ""}><Link to="/contact">Contact</Link></li>
                        <li>
                            <Link className="shopping-cart" to="/shopping-cart" title="Panier">
                                <span className="fa-stack fa-lg">
                                    <i className="fa fa-circle fa-stack-2x fa-inverse"></i>
                                    <i className="fa fa-shopping-cart fa-stack-1x"></i>
                                </span>
                                <span className="count" display="none">{cartCount}</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
                </div>
            </header>
        )
    }

    return (
        <header>
            <div className="header-container">
            <div className="logo">
                <Link to="/">
                    <img alt="logo" src={logo} title="Accueil"/>
                </Link>
            </div>
            <nav>
                <ul>
                    <li className={currentActive==="home" ? "active" : ""}><Link to="/">Accueil</Link></li>
                    <li className={currentActive==="product" ? "active" : ""}><Link to="/products">Produits</Link></li>
                    <li className={currentActive==="contact" ? "active" : ""}><Link to="/contact">Contact</Link></li>
                    <li>
                        <Link className="shopping-cart" to="/shopping-cart" title="Panier">
                            <span className="fa-stack fa-lg">
                                <i className="fa fa-circle fa-stack-2x fa-inverse"></i>
                                <i className="fa fa-shopping-cart fa-stack-1x"></i>
                            </span>
                            <span className="count" display="inline">{cartCount}</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            </div>
        </header>
    );
}
