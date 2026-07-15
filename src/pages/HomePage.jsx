import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">Beauty essentials for everyday rituals</p>

          <h1>
            Discover skincare, makeup and body care selected for your glow.
          </h1>

          <p className="home-hero-text">
            Explore a curated beauty collection created for simple routines,
            soft textures and products that fit naturally into your daily care.
          </p>

          <div className="home-hero-actions">
            <Link to="/products" className="home-primary-button">
              Shop products
            </Link>

            <Link to="/favourites" className="home-secondary-button">
              ♡ View favourites
            </Link>
          </div>

          <div className="home-hero-stats">
            <div>
              <strong>3</strong>
              <span>Beauty categories</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Online shopping</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Responsive experience</span>
            </div>
          </div>
        </div>

        <div className="home-hero-visual">
          <img src="/images/cream.jpg" alt="Hydrating face cream" />

          <div className="home-hero-card">
            <span>New ritual</span>
            <strong>Hydrating care for soft, healthy-looking skin.</strong>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <p className="home-eyebrow">Shop by category</p>
          <h2>Build your beauty routine</h2>
          <p>
            Choose from skincare, makeup and body care products designed for
            everyday use.
          </p>
        </div>

        <div className="home-categories">
          <article className="home-category-card">
            <img src="/images/serum.jpg" alt="Skincare products" />
            <div>
              <span>Skincare</span>
              <h3>Hydrate, brighten and care for your skin.</h3>
              <Link to="/products?category=Skincare">Browse skincare</Link>
            </div>
          </article>

          <article className="home-category-card">
            <img src="/images/lipstick.jpg" alt="Makeup products" />
            <div>
              <span>Makeup</span>
              <h3>Add colour, definition and confidence.</h3>
              <Link to="/products?category=Makeup">Browse makeup</Link>
            </div>
          </article>

          <article className="home-category-card">
            <img src="/images/balsam.jpg" alt="Body care products" />
            <div>
              <span>Body care</span>
              <h3>Soft textures for your daily body ritual.</h3>
              <Link to="/products?category=Body Care">Browse body care</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="home-benefits">
        <article>
          <span>01</span>
          <h3>Curated products</h3>
          <p>
            A focused selection of beauty essentials instead of an overwhelming
            catalogue.
          </p>
        </article>

        <article>
          <span>02</span>
          <h3>Simple shopping flow</h3>
          <p>
            Browse products, save favourites, add items to cart and complete
            your order in a clear checkout.
          </p>
        </article>

        <article>
          <span>03</span>
          <h3>Personal beauty space</h3>
          <p>
            Save your favourite products, return to them anytime and create a
            beauty selection that fits your routine.
          </p>
        </article>
      </section>

      <section className="home-promo">
        <div>
          <p className="home-eyebrow">Ready to explore?</p>
          <h2>Find your next beauty favourite.</h2>
          <p>
            Browse the full collection and create your personal list of products
            to come back to later.
          </p>
        </div>

        <Link to="/products" className="home-primary-button">
          Go to products
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
