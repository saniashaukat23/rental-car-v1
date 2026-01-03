"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import styles from "../../../styles/admin/login.module.css";

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        window.location.href = "/admin/dashboard";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      {/* LEFT SIDE: Visual/Branding Section */}
      <div className={styles.visualSection}>
        <div className={styles.cubePattern}></div>

        <div className={styles.sphere}>
          <div className={styles.sphereGradient}></div>
          <div className={styles.brandingText}>
            <h2>Fleet Manager</h2>
            <p>Car Rental Solutions v2.0</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <header className={styles.header}>
            <h1>Admin Portal</h1>
            <p>Welcome back! Please enter your details to manage the fleet.</p>
          </header>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.inputContainer}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="admin@carrental.com"
                />
                <Mail className={styles.inputIcon} size={20} />
              </div>
            </div>

            {/* Password Field */}
            <div
              className={styles.formGroup}
              style={{ marginBottom: "2.5rem" }}
            >
              <div className={styles.labelRow}>
                <label className={styles.label}>Password</label>
                <button type="button" className={styles.forgotBtn}>
                  Forgot Password?
                </button>
              </div>
              <div className={styles.inputContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeButton}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              onClick={handleSubmit}
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
