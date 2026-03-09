import React, { useState, useEffect } from "react";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";

/* IMPORT COVER IMAGE */
import coverImage from "./assets/1.jpg";

/* IMPORT MENU IMAGES */
import pancakes from "./assets/11.jpg";
import burger from "./assets/2.jpg";
import milkshake from "./assets/3.jpg";
import breakfast from "./assets/4.jpg";
import eggburger from "./assets/5.jpg";

/* MENU DATA */
const menuData = [
  {
    id: 1,
    title: "Buttermilk Pancakes",
    category: "breakfast",
    price: 15.99,
    img: pancakes,
    desc: "Golden fluffy pancakes served with maple syrup."
  },
  {
    id: 2,
    title: "Diner Double Burger",
    category: "lunch",
    price: 13.99,
    img: burger,
    desc: "Juicy double beef burger with crispy fries."
  },
  {
    id: 3,
    title: "Godzilla Milkshake",
    category: "shakes",
    price: 6.99,
    img: milkshake,
    desc: "Mega chocolate milkshake loaded with toppings."
  },
  {
    id: 4,
    title: "Country Delight",
    category: "breakfast",
    price: 20.99,
    img: breakfast,
    desc: "Farm fresh eggs, crispy bacon & buttered toast."
  },
  {
    id: 5,
    title: "Egg Attack Burger",
    category: "lunch",
    price: 22.99,
    img: eggburger,
    desc: "Grilled burger crowned with a sunny-side egg."
  }
];

/* NAVBAR */
function Navbar({ setPage, isLoggedIn, logout }) {
  return (
    <nav className="navbar">
      <h2>🍽️ Foodie Heaven</h2>

      <div className="nav-links">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("menu")}>Menu</button>
        <button onClick={() => setPage("contact")}>Contact</button>

        {!isLoggedIn ? (
          <button onClick={() => setPage("login")}>Login</button>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

/* HOME */
function Home({ setPage }) {
  return (
    <section
      className="home"
      style={{
        backgroundImage: `url(${coverImage})`
      }}
    >
      <div className="hero">
        <h1>Welcome to Foodie Heaven</h1>
        <p>Experience flavors that make you smile 😊</p>

        <button className="hero-btn" onClick={() => setPage("menu")}>
          Explore Our Menu
        </button>
      </div>
    </section>
  );
}

/* MENU */
function Menu({ isLoggedIn, setPage }) {

  const [items, setItems] = useState(menuData);
  const [cartItem, setCartItem] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const categories = ["all", ...new Set(menuData.map(item => item.category))];

  const filterItems = (category) => {
    if (category === "all") setItems(menuData);
    else setItems(menuData.filter(item => item.category === category));
  };

  const buyNow = (item) => {
    setCartItem(item);
    setShowCheckout(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="contact">
        <h2>🔐 Please Login First</h2>
        <button className="hero-btn" onClick={() => setPage("login")}>
          Go To Login
        </button>
      </div>
    );
  }

  return (
    <section className="menu section">

      <div className="title">
        <h2>Our Menu</h2>
        <div className="underline"></div>
      </div>

      <div className="btn-container">
        {categories.map((category, index) => (
          <button
            key={index}
            className="filter-btn"
            onClick={() => filterItems(category)}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="section-center">
        {items.map(({ id, title, price, desc, img }) => (
          <article key={id} className="menu-item">

            <img src={img} alt={title} className="photo" />

            <header>
              <h4>{title}</h4>
              <h4 className="price">${price}</h4>
            </header>

            <p>{desc}</p>

            <button className="buy-btn" onClick={() => buyNow({ title, price })}>
              🛒 Buy Now
            </button>

          </article>
        ))}
      </div>

      {showCheckout && cartItem && (
        <div className="checkout-overlay">

          <div className="checkout-card">

            <h2>💳 Checkout</h2>

            <h3>{cartItem.title}</h3>
            <p>Price: ${cartItem.price}</p>

            <input className="payment-input" placeholder="Card Number" />
            <input className="payment-input" placeholder="Card Holder Name" />

            <button
              className="pay-btn"
              onClick={() => {
                alert("Payment Successful 🎉");
                setShowCheckout(false);
              }}
            >
              Pay Now 💰
            </button>

            <button
              className="close-btn"
              onClick={() => setShowCheckout(false)}
            >
              Close
            </button>

          </div>

        </div>
      )}

    </section>
  );
}

/* CONTACT */
function Contact() {

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="contact-section">

      <h2 className="contact-title">📞 Get In Touch</h2>

      <div className="contact-container">

        <div className="contact-info">

          <div className="contact-card">
            <h3>📧 Email</h3>
            <p>foodie@gmail.com</p>
          </div>

          <div className="contact-card">
            <h3>📞 Phone</h3>
            <p>+94 77 123 4567</p>
          </div>

          <div className="contact-card">
            <h3>📍 Location</h3>
            <p>Colombo, Sri Lanka</p>
          </div>

        </div>

        <div className="contact-form">

          {submitted ? (
            <h3 className="success-msg">✅ Message Sent Successfully!</h3>
          ) : (
            <form onSubmit={handleSubmit}>

              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />

              <textarea placeholder="Your Message" rows="5" required></textarea>

              <button className="contact-btn">
                Send Message 🚀
              </button>

            </form>
          )}

        </div>

      </div>

    </section>
  );
}

/* LOGIN */
function Login({ setPage, setIsLoggedIn }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (email && password) {

      localStorage.setItem("loggedIn", "true");
      setIsLoggedIn(true);

      alert("Login Successful 🎉");

      setPage("home");

    } else {

      alert("Please enter email and password");

    }

  };

  return (

    <section className="login-section">

      <div className="login-container">

        <h2>Welcome Back 👋</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="login-submit-btn">
            Sign In
          </button>

        </form>

        <div style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}>

          <GoogleLogin
            onSuccess={() => {

              localStorage.setItem("loggedIn", "true");
              setIsLoggedIn(true);

              alert("Google Login Successful 🎉");

              setPage("home");

            }}
            onError={() => {
              alert("Google Login Failed");
            }}
          />

        </div>

        <p className="back-link" onClick={() => setPage("home")}>
          ⬅ Back to Home
        </p>

      </div>

    </section>

  );
}

/* MAIN APP */
function App() {

  const [page, setPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const loginStatus = localStorage.getItem("loggedIn");

    if (loginStatus === "true") {

      setIsLoggedIn(true);
      setPage("home");

    }

  }, []);

  const logout = () => {

    localStorage.removeItem("loggedIn");

    setIsLoggedIn(false);

    alert("Logged Out 👋");

    setPage("login");

  };

  return (

    <main>

      <Navbar
        setPage={setPage}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />

      {page === "home" && <Home setPage={setPage} />}

      {page === "menu" && (
        <Menu
          isLoggedIn={isLoggedIn}
          setPage={setPage}
        />
      )}

      {page === "contact" && <Contact />}

      {page === "login" && (
        <Login
          setPage={setPage}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}

    </main>

  );
}

export default App;