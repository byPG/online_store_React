import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./context/CartContext";
import { FavouritesProvider } from "./context/FavouritesContext";

function App() {
  return (
    <FavouritesProvider>
      <CartProvider>
        <Navbar />
        <AppRouter />
        <Footer />
      </CartProvider>
    </FavouritesProvider>
  );
}

export default App;
