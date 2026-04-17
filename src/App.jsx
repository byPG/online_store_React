import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <AppRouter />
      <Footer />
    </CartProvider>
  );
}

export default App;
