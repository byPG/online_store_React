import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordRules = [
    {
      text: "At least 8 characters",
      isValid: formData.password.length >= 8,
    },
    {
      text: "At least one uppercase letter",
      isValid: /[A-Z]/.test(formData.password),
    },
    {
      text: "At least one number",
      isValid: /\d/.test(formData.password),
    },
    {
      text: "At least one special character",
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    },
  ];

  const isPasswordValid = passwordRules.every((rule) => rule.isValid);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function validateForm() {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!formData.email.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (!isPasswordValid) {
      errors.password = "Password does not meet all requirements.";
    }

    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setAuthError("");
    setIsSubmitting(true);

    try {
      await register(formData.email, formData.password);
      navigate("/products");
    } catch (firebaseError) {
      console.error("Register error:", firebaseError);

      if (firebaseError.code === "auth/email-already-in-use") {
        setAuthError("This email is already registered.");
      } else {
        setAuthError("Could not create an account. Please try again.");
      }
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
          {formErrors.email && (
            <p className="form-field-error">{formErrors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <ul className="password-requirements">
            {passwordRules.map((rule) => (
              <li
                className={rule.isValid ? "password-rule-valid" : ""}
                key={rule.text}
              >
                {rule.isValid ? "✓" : "•"} {rule.text}
              </li>
            ))}
          </ul>

          {formErrors.password && (
            <p className="form-field-error">{formErrors.password}</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formErrors.confirmPassword && (
            <p className="form-field-error">{formErrors.confirmPassword}</p>
          )}

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
