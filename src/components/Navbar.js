import React, { useState, useEffect, useRef } from "react";

export default function Navbar({ setActivePage, setShowRegistration, darkMode, setDarkMode }) {
  const [active, setActive] = useState("admin");
  const navRefs = useRef({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const navItems = [
    { key: "admin", label: "Admin Dashboard" },
    { key: "register", label: "Patient Registration" },
    { key: "queue", label: "View Queue" },
    { key: "doctor", label: "Doctor Portal" },
    { key: "status", label: "System Status" },
  ];

  useEffect(() => {
    if (navRefs.current[active]) {
      const { offsetLeft, offsetWidth } = navRefs.current[active];
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [active]);

  const handleNavClick = (key) => {
    setActive(key);
    if (key === "register") {
      setShowRegistration(true);
    } else {
      setActivePage(key);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: 60,
        background: darkMode ? "#121625" : "#fff",
        borderBottom: darkMode ? "1px solid #283143" : "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontWeight: 600,
        zIndex: 1000,
        padding: "0 1.5rem",
        boxShadow: darkMode ? "0 2px 10px rgba(0,0,0,0.5)" : "0 2px 8px rgba(0,0,0,0.1)",
        color: darkMode ? "#eee" : "#333",
        userSelect: "none",
        flexWrap: "wrap",
      }}
    >
      {/* Left side navigation items */}
      <div style={{ position: "relative", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        {navItems.map(({ key, label }) => (
          <span
            key={key}
            ref={(el) => (navRefs.current[key] = el)}
            onClick={() => handleNavClick(key)}
            style={{
              cursor: "pointer",
              paddingBottom: 6,
              color: darkMode ? "#eee" : "#333",
              fontSize: 16,
              userSelect: "none",
              transition: "color 0.3s",
              fontWeight: active === key ? "700" : "600",
              position: "relative",
            }}
          >
            {label}
          </span>
        ))}

        {/* Animated Underline */}
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: underlineStyle.left,
            width: underlineStyle.width,
            height: 3,
            borderRadius: 3,
            background: darkMode
              ? "linear-gradient(90deg, #90caf9, #64b5f6, #42a5f5)"
              : "linear-gradient(90deg, #1976d2, #2196f3, #64b5f6)",
            boxShadow: darkMode ? "0 0 10px 3px #90caf9" : "0 0 8px 3px #2196f3",
            transition: "left 0.3s ease, width 0.3s ease",
            pointerEvents: "none",
            zIndex: 999,
          }}
        />
      </div>

      {/* Dark Mode Toggle Button with label */}
      <div
        onClick={toggleDarkMode}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") toggleDarkMode();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          userSelect: "none",
          gap: 4, // spacing between switch & label
        }}
        aria-label="Toggle dark mode"
      >
        {/* Toggle switch */}
        <span
          style={{
            position: "relative",
            width: 45,
            height: 24,
            background: darkMode ? "#64b5f6" : "#bbb",
            borderRadius: 20,
            transition: "background 0.3s",
            display: "flex",
            alignItems: "center",
            padding: "2px",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: darkMode ? "calc(100% - 22px)" : 2,
              top: 2,
              width: 20,
              height: 20,
              background: "#fff",
              borderRadius: "50%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              transition: "left 0.3s",
            }}
          />
        </span>

        {/* Label under toggle */}
        <span
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: darkMode ? "#64b5f6" : "#444",
            userSelect: "none",
            textAlign: "center",
            marginTop: 2,
          }}
        >
          {darkMode ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
    </nav>
  );
}
