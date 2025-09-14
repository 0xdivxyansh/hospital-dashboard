import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  Chip,
  Box,
  Fade,
} from "@mui/material";

// Priority ranking (lower = higher priority)
const priorityRank = {
  Emergency: 1,
  High: 2,
  Middle: 3,
  Low: 4,
};

const priorityColors = {
  Emergency: { color: "white", bg: "#d32f2f" },
  High: { color: "white", bg: "#f57c00" },
  Middle: { color: "white", bg: "#1976d2" },
  Low: { color: "#333", bg: "#e0e0e0" },
};

// Example doctors list
const initialDoctors = [
  { id: 1, name: "Dr. Sharma", available: true },
  { id: 2, name: "Dr. Patel", available: true },
  { id: 3, name: "Dr. Khan", available: true },
  { id: 4, name: "Dr. Verma", available: true },
  { id: 5, name: "Dr. Gupta", available: true },
  { id: 6, name: "Dr. Singh", available: true },
];

export default function QueueView({ patients, startConsultation }) {
  const [visible, setVisible] = useState(false);
  const [assignedPatients, setAssignedPatients] = useState([]);
  const [doctors, setDoctors] = useState(initialDoctors);

  useEffect(() => setVisible(true), []);

  // Function to assign doctors to patients
  const assignDoctors = (patientsList, doctorsList) => {
    let updatedPatients = [...patientsList].map((p) => ({ ...p, doctor: null }));

    // Sort patients by priority → then FCFS
    updatedPatients.sort(
      (a, b) =>
        priorityRank[a.priority] - priorityRank[b.priority] || a.id - b.id
    );

    const availableDoctors = doctorsList.filter((d) => d.available);
    const doctorAssignments = {};

    let docIndex = 0;

    updatedPatients.forEach((p) => {
      if (docIndex < availableDoctors.length) {
        doctorAssignments[p.id] = availableDoctors[docIndex].name;
        docIndex++;
      }
    });

    updatedPatients = updatedPatients.map((p) => ({
      ...p,
      doctor: doctorAssignments[p.id] || null,
    }));

    return updatedPatients;
  };

  // Assign doctors whenever patients or doctors change
  useEffect(() => {
    const updated = assignDoctors(patients, doctors);
    setAssignedPatients(updated);
  }, [patients, doctors]);

  // Start consultation → doctor becomes unavailable
  const handleStart = (patientId) => {
    const patient = assignedPatients.find((p) => p.id === patientId);
    if (!patient || !patient.doctor) return;

    setDoctors((prev) =>
      prev.map((d) =>
        d.name === patient.doctor ? { ...d, available: false } : d
      )
    );

    if (startConsultation) startConsultation(patientId);
  };

  // Finish consultation → doctor becomes available → reassigned automatically
  const handleFinish = (doctorName) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d.name === doctorName ? { ...d, available: true } : d
      )
    );
  };

  return (
    <Fade in={visible} timeout={800}>
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "#0d47a1",
            fontWeight: "bold",
            mb: 3,
            userSelect: "none",
          }}
        >
          Patient Queue
        </Typography>

        <Paper
          elevation={8}
          sx={{
            maxHeight: 520,
            overflowY: "auto",
            borderRadius: 3,
            background: "#fff",
            "&::-webkit-scrollbar": { width: 8 },
            "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
            "&::-webkit-scrollbar-thumb": { backgroundColor: "#90caf9", borderRadius: 4 },
          }}
        >
          <Table stickyHeader sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                {["Name", "Priority", "Problem", "Doctor", "Action"].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 16,
                      textAlign: header === "Action" ? "center" : "left",
                      py: 2,
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {assignedPatients.map((p, idx) => (
                <TableRow
                  key={p.id}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? "#fafafa" : "#f5faff",
                    "&:hover": { backgroundColor: "#e3f2fd", transition: "0.3s" },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600, fontSize: 15 }}>{p.name}</TableCell>

                  <TableCell>
                    <Chip
                      label={p.priority}
                      sx={{
                        color: priorityColors[p.priority]?.color || "#000",
                        bgcolor: priorityColors[p.priority]?.bg || "#ccc",
                        fontWeight: "bold",
                        minWidth: 90,
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ fontSize: 14, fontStyle: "italic", color: "#444" }}>
                    {p.problem}
                  </TableCell>

                  <TableCell sx={{ fontSize: 15, fontWeight: 500, color: "#222" }}>
                    {p.doctor || "Unassigned"}
                  </TableCell>

                  <TableCell align="center">
                    {p.doctor ? (
                      <>
                        <Button
                          variant="contained"
                          sx={{ mr: 1, textTransform: "none" }}
                          onClick={() => handleStart(p.id)}
                        >
                          Start
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => handleFinish(p.doctor)}
                        >
                          Finish
                        </Button>
                      </>
                    ) : (
                      <Chip label="Waiting" color="warning" />
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {assignedPatients.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                    sx={{ py: 5, fontStyle: "italic", color: "#777", fontSize: 16 }}
                  >
                    No patients in queue
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Fade>
  );
}
