import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setAuthError("");

    if (!formData.email.trim()) {
      setAuthError("Email is required.");
      return;
    }

    if (formData.password.length < 6) {
      setAuthError("Password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register(formData.email, formData.password);
      navigate("/products");
    } catch (firebaseError) {
      console.error("Register error:", firebaseError);
      setAuthError("Could not create an account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="home-eyebrow">Create account</p>

        <h1>Join Beauty Shop</h1>

        <p className="auth-text">
          Create an account to access your beauty space and keep shopping
          smoothly.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {authError && <p className="form-field-error">{authError}</p>}

          <button className="auth-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-helper">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
