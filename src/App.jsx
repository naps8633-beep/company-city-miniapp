
import React, { useState } from "react";

const tabs = ["Accueil", "Boutique", "Promotions", "Panier", "Compte"];

const products = [
  {
    id: 1,
    name: "Article de démonstration",
    category: "FLEURS",
    price: null,
    image: "",
  },
  {
    id: 2,
    name: "Article de démonstration",
    category: "RÉSINE",
    price: null,
    image: "",
  },
];

export default function App() {
  const [active, setActive] = useState("Accueil");
  const [category, setCategory] = useState("FLEURS");
  const [cart, setCart] = useState([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    setActive("Panier");
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + (typeof item.price === "number" ? item.price * item.quantity : 0),
    0
  );

  const hasUnknownPrice = cart.some(
    (item) => typeof item.price !== "number"
  );

  return (
    <main className="app-shell">
      {active === "Accueil" ? (
        <section className="welcome-screen" aria-label="Accueil Company City">
          <img
            className="welcome-art"
            src="/accueil-company-city.jpg"
            alt="Company City — bienvenue"
          />

          <div className="image-hotspots">
            <button className="hotspot shop" onClick={() => setActive("Boutique")} aria-label="Boutique" />
            <button className="hotspot promo" onClick={() => setActive("Promotions")} aria-label="Promotions" />
            <button className="hotspot cart" onClick={() => setActive("Panier")} aria-label="Panier" />
            <button className="hotspot account" onClick={() => setActive("Compte")} aria-label="Compte" />
          </div>
        </section>
      ) : (
        <section className="placeholder-page">
          <div className="brand">COMPANY CITY</div>
          <p className="location">TOULOUSE & SES ALENTOURS</p>

          {active === "Boutique" && (
            <>
              <h1>VOICI NOS PRODUITS !</h1>
              <p className="quality">QUALITY COFFEE</p>

              <div className="category-tabs">
                {["FLEURS", "RÉSINE"].map((item) => (
                  <button
                    key={item}
                    className={
                      category === item
                        ? "category-button selected"
                        : "category-button"
                    }
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="product-grid">
                {products
                  .filter((product) => product.category === category)
                  .map((product) => (
                    <article className="product-card" key={product.id}>
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="product-placeholder">✦</div>
                      )}

                      <h2>{product.name}</h2>
                      <p>
                        {typeof product.price === "number"
                          ? `${product.price.toFixed(2)} €`
                          : "Prix à renseigner"}
                      </p>

                      <button
                        className="add-button"
                        onClick={() => addToCart(product)}
                      >
                        + Ajouter au panier
                      </button>
                    </article>
                  ))}
              </div>
            </>
          )}

          {active === "Panier" && (
            <div className="cart-panel">
              <img
                className="cart-art"
                src="/panier-company-city.png"
                alt="Panier Company City"
              />

              <h1>MON PANIER</h1>

              {cart.length === 0 ? (
                <div className="empty-cart">
                  <div className="product-placeholder">🛒</div>
                  <h2>TON PANIER EST VIDE</h2>
                  <p>Retrouve les articles de la boutique ici.</p>
                  <button
                    className="add-button"
                    onClick={() => setActive("Boutique")}
                  >
                    Voir la boutique
                  </button>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-info">
                        <h2>{item.name}</h2>
                        <p>
                          {typeof item.price === "number"
                            ? `${item.price.toFixed(2)} €`
                            : "Prix à renseigner"}
                        </p>
                      </div>

                      <div className="quantity-controls">
                        <button onClick={() => changeQuantity(item.id, -1)}>
                          −
                        </button>
                        <strong>{item.quantity}</strong>
                        <button onClick={() => changeQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}

                  <div className="cart-total">
                    <span>TOTAL</span>
                    <strong>
                      {hasUnknownPrice ? "À renseigner" : `${total.toFixed(2)} €`}
                    </strong>
                  </div>

                  <button
                    className="clear-cart"
                    onClick={() => setCart([])}
                  >
                    Vider le panier
                  </button>
                </>
              )}
            </div>
          )}

          {active === "Promotions" && (
            <div className="promo-panel">
              <div className="promo-symbol">◇</div>
              <h1>PROMOTIONS</h1>
              <p>AUCUNE PROMOTION EN COURS</p>
            </div>
          )}

          {active === "Compte" && (
            <>
              <h1>COMPTE</h1>
              <p>Connecte-toi via Telegram pour retrouver tes informations et commandes.</p>
            </>
          )}

          <button className="back" onClick={() => setActive("Accueil")}>
            Retour à l’accueil
          </button>
        </section>
      )}

      <nav className="bottom-nav" aria-label="Navigation principale">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={active === tab ? "nav-item active" : "nav-item"}
            onClick={() => setActive(tab)}
          >
            <span className="nav-icon">
              {["⌂", "▢", "◇", "🛒", "♙"][i]}
            </span>
            <span>{tab}</span>
            {tab === "Panier" && <small>{cartCount}</small>}
          </button>
        ))}
      </nav>
    </main>
  );
}
