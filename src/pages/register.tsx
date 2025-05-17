// src/pages/Register.tsx

/**
 * Register Page Component
 *
 * Provides a form for new users to create an account.
 *
 * Validation Rules
 * ─────────────────────────────────────────────────────────────────────────────
 * • Email is required and must contain “@” and “.”
 * • Password must be ≥ 6 characters
 * • Password and Confirm Password must match
 * • Email must not already exist in localStorage “users” array
 *
 * Workflow
 * ─────────────────────────────────────────────────────────────────────────────
 * • On successful validation:
 *   1. Adds the new user to localStorage under key “users”.
 *   2. Shows a success alert.
 *   3. Redirects to `/login` after 1.5 s.
 *
 * • On validation failure:
 *   – Displays an alert with the corresponding error message.
 *
 * @component
 * @returns JSX.Element
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleRegister = () => {
    // Validate fields
    if (!email) {
      setAlert({ type: "danger", message: "Email is required" });
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setAlert({ type: "danger", message: "Invalid email format" });
      return;
    }
    if (password.length < 6) {
      setAlert({
        type: "danger",
        message: "Password must be at least 6 characters long",
      });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Passwords do not match" });
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) {
      setAlert({ type: "danger", message: "Email already registered" });
      return;
    }

    const newUser: User = { firstName, lastName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setAlert({
      type: "success",
      message: "Registration successful! You can now login.",
    });

    // Redirect to login after delay
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div
        className="w-100 w-md-50 border p-4 rounded"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4">Sign Up</h2>
        {alert && (
          <div className={`alert alert-${alert.type}`}>{alert.message}</div>
        )}
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="first-name" className="form-label">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="last-name" className="form-label">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="register-email" className="form-label">
            Email address
          </label>
          <input
            id="register-email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="register-password" className="form-label">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="btn w-100 grad-color text-white"
          onClick={handleRegister}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Register;
