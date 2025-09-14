import React, { useState } from "react";

const priorities = ["Emergency", "High", "Middle", "Low"];

export default function PatientRegistration({ onClose, onRegister }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    age: "",
    dob: "",
    priority: "High",
    problem: "",
    mobile: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name) {
      alert("Name is required");
      return;
    }
    onRegister(form);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1500,
        padding: "1rem",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{
          background: "white",
          borderRadius: 12,
          boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
          padding: "1.5rem 2rem",
          maxWidth: 450,
          width: "100%",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem", color: "#333" }}>Patient Registration</h2>

        <input
          name="name"
          placeholder="Full Name*"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            padding: "12px 14px",
            fontSize: 16,
            borderRadius: 8,
            border: "1.5px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          style={{
            padding: "12px 14px",
            fontSize: 16,
            borderRadius: 8,
            border: "1.5px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            name="age"
            type="number"
            placeholder="Age"
            min={0}
            value={form.age}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "12px 14px",
              fontSize: 16,
              borderRadius: 8,
              border: "1.5px solid #ccc",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />

          <input
            name="dob"
            type="date"
            placeholder="Date of Birth"
            value={form.dob}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "12px 14px",
              fontSize: 16,
              borderRadius: 8,
              border: "1.5px solid #ccc",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          style={{
            padding: "12px 14px",
            fontSize: 16,
            borderRadius: 8,
            border: "1.5px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
            cursor: "pointer",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <textarea
          name="problem"
          placeholder="Describe the problem"
          value={form.problem}
          onChange={handleChange}
          rows={3}
          style={{
            padding: "12px 14px",
            fontSize: 16,
            borderRadius: 8,
            border: "1.5px solid #ccc",
            outline: "none",
            resize: "vertical",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          type="tel"
          value={form.mobile}
          onChange={handleChange}
          style={{
            padding: "12px 14px",
            fontSize: 16,
            borderRadius: 8,
            border: "1.5px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <input
          name="email"
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={handleChange}
          style={{
            padding: "12px 14px",
            fontSize: 16,
            borderRadius: 8,
            border: "1.5px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3f51b5")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
          <button
            type="submit"
            style={{
              backgroundColor: "#3f51b5",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(63,81,181,0.3)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#303f9f")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#3f51b5")}
          >
            Register
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(244,67,54,0.3)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#d32f2f")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f44336")}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
