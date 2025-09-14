import React from "react";

export default function SystemStatus({ patients, consultations, doctors }) {
  return (
    <div>
      <h2>System Status</h2>
      <ul>
        <li>Patients in Queue: {patients.length}</li>
        <li>Patients in Consultation: {consultations.length}</li>
        <li>Doctors Available: {doctors.filter((d) => d.available).length}</li>
      </ul>
    </div>
  );
}
