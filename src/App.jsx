import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./context/CartContext";
import { FavouritesProvider } from "./context/FavouritesContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <CartProvider>
          <Navbar />
          <AppRouter />
          <Footer />
        </CartProvider>
      </FavouritesProvider>
    </AuthProvider>
  );
}

export default App;
