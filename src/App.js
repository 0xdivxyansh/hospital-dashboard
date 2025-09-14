import React, { useState } from "react";
import Navbar from "./components/Navbar";
import SystemStatus from "./components/SystemStatus";
import PatientRegistration from "./components/PatientRegistration";
import QueueView from "./components/QueueView";
import DoctorPortal from "./components/DoctorPortal";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [activePage, setActivePage] = useState("admin");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Smith", available: true },
    { id: 2, name: "Dr. Lee", available: true },
    { id: 3, name: "Dr. Patel", available: true },
    { id: 4, name: "Dr. Rao", available: true },
    { id: 5, name: "Dr. Kim", available: true },
    { id: 6, name: "Dr. Ahmed", available: true },
  ]);
  const [consultations, setConsultations] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const priorityMap = { Emergency: 1, High: 2, Middle: 3, Low: 4 };

  const registerPatient = (data) => {
    let assignedDoctor = null;
    let availableDoctors = doctors.filter((d) => d.available);
    if (availableDoctors.length > 0) {
      assignedDoctor = availableDoctors[0];
      setDoctors((prev) =>
        prev.map((doc) =>
          doc.id === assignedDoctor.id ? { ...doc, available: false } : doc
        )
      );
    }
    setPatients((prev) => [
      ...prev,
      { ...data, id: Date.now(), status: "queue", doctor: assignedDoctor?.name || null },
    ]);
    setShowRegistration(false);
  };

  const startConsultation = (patientId) => {
    let patient = patients.find((p) => p.id === patientId);
    if (!patient) return;
    setConsultations((prev) => [...prev, { ...patient }]);
    setPatients((prev) => prev.filter((p) => p.id !== patientId));
  };

  const completeConsultation = (patientId) => {
    let patient = consultations.find((p) => p.id === patientId);
    if (!patient) return;
    setCompleted((prev) => [...prev, { ...patient, time: new Date() }]);
    setConsultations((prev) => prev.filter((p) => p.id !== patientId));
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.name === patient.doctor ? { ...doc, available: true } : doc
      )
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(135deg, #1c1f2a, #282c3a)"
          : "#f0f4fc",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: darkMode ? "#e2e2e2" : "#222",
      }}
    >
      <Navbar setActivePage={setActivePage}
    setShowRegistration={setShowRegistration}
    darkMode={darkMode}
    setDarkMode={setDarkMode} />
      {showRegistration && (
        <PatientRegistration onClose={() => setShowRegistration(false)} onRegister={registerPatient} />
      )}
      <main
        style={{
          maxWidth: 1200,
          margin: "80px auto 40px",
          padding: "0 2rem",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        {activePage === "admin" && (
          <AdminDashboard
            patients={patients}
            consultations={consultations}
            completed={completed}
            doctors={doctors}
            priorityMap={priorityMap}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}
        {activePage === "queue" && (
          <QueueView patients={patients} priorityMap={priorityMap} startConsultation={startConsultation} />
        )}
        {activePage === "doctor" && (
          <DoctorPortal
            consultations={consultations}
            completed={completed}
            doctors={doctors}
            completeConsultation={completeConsultation}
          />
        )}
        {activePage === "status" && (
          <SystemStatus patients={patients} consultations={consultations} doctors={doctors} />
        )}
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "1rem 0",
          borderTop: "1px solid",
          borderColor: darkMode ? "#444" : "#ddd",
          color: darkMode ? "#aaa" : "#555",
          fontSize: 14,
        }}
      >
        © 2025 Hospital Admin Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
