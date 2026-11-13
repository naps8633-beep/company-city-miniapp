
import React, { useState } from "react";

const tabs = ["Accueil", "Boutique", "Promotions", "Panier", "Compte"];

export default function App() {
  const [active, setActive] = useState("Accueil");
  const [category, setCategory] = useState("FLEURS");
  const [cartCount] = useState(0);

  return (
    <main className="app-shell">
      {active === "Accueil" ? (
        <section className="welcome-screen" aria-label="Accueil Company City">
          <img
            className="welcome-art"
            src="/accueil-company-city.jpg"
            alt="Company City — bienvenue dans la boutique, Toulouse et ses alentours"
          />
          <div className="image-hotspots" aria-label="Navigation de la boutique">
            <button className="hotspot shop" onClick={() => setActive("Boutique")} aria-label="Ouvrir la boutique" />
            <button className="hotspot promo" onClick={() => setActive("Promotions")} aria-label="Voir les promotions" />
            <button className="hotspot cart" onClick={() => setActive("Panier")} aria-label="Ouvrir le panier" />
            <button className="hotspot account" onClick={() => setActive("Compte")} aria-label="Ouvrir le compte" />
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
                <button
                  className={category === "FLEURS" ? "category-button selected" : "category-button"}
                  onClick={() => setCategory("FLEURS")}
                >
                  FLEURS
                </button>
                <button
                  className={category === "RÉSINES" ? "category-button selected" : "category-button"}
                  onClick={() => setCategory("RÉSINES")}
                >
                  RÉSINES
                </button>
              </div>
              <div className="empty-products">
                <div className="product-placeholder">＋</div>
                <h2>{category}</h2>
                <p>Les photos et les informations des produits seront ajoutées ici prochainement.</p>
              </div>
            </>
          )}

          {active === "Promotions" && (
            <div className="promo-panel">
              <div className="promo-symbol">◇</div>
              <h1>PROMOTIONS</h1>
              <p>AUCUNE PROMOTION EN COURS</p>
            </div>
          )}

          {active === "Panier" && (
            <>
              <h1>PANIER</h1>
              <p>Ton panier est actuellement vide ({cartCount} article).</p>
            </>
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
            <span className="nav-icon">{["⌂", "▢", "◇", "🛒", "♙"][i]}</span>
            <span>{tab}</span>
            {tab === "Panier" && <small>{cartCount}</small>}
          </button>
        ))}
      </nav>
    </main>
  );
}
