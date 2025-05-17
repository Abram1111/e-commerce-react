/**
 * Login Page Component
 *
 * Renders the login form for registered users.
 * Authenticates the user by checking credentials against stored user data
 * in `localStorage`, and then redirects to the products page upon success.
 *
 * Features:
 * ─────────────────────────────────────────────────────────────────────────────
 * • Controlled input fields for email and password
 * • Form validation for matching stored user credentials
 * • Displays alert message for invalid login attempts
 * • Redirects logged-in user to `/products`
 *
 * Notes:
 * ─────────────────────────────────────────────────────────────────────────────
 * • Uses `window.location.href` for navigation instead of React Router's `navigate`
 *   to ensure a full reload and immediate user context update
 * • User info is stored in `localStorage` under the `user` key
 */

import React, { useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  /**
   * Handles user login validation.
   * Checks if email and password match a user from localStorage.
   * On success, stores the logged-in user in localStorage and redirects.
   */
  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/products";
    } else {
      setAlertVisible(true);
    }
  };

  return (
    <div
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="w-100 w-md-50 border p-4 rounded mb-4"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        {alertVisible && (
          <div className="alert alert-danger" role="alert">
            Invalid email or password
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="login-email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="login-email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setAlertVisible(false);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="login-password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setAlertVisible(false);
            }}
          />
        </div>
        <button
          className="btn w-100 grad-color text-white"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>

      <div
        className="w-100 w-md-50 border p-4 rounded text-center"
        style={{ maxWidth: "500px" }}
      >
        <p className="mb-2">Don't have an account?</p>
        <a href="/register" className="btn grad-color w-100 text-white">
          Register
        </a>
      </div>
    </div>
  );
};

export default Login;
