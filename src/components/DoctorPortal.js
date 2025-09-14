import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { green, red } from "@mui/material/colors";

export default function DoctorPortal({
  consultations,
  completed,
  doctors,
  completeConsultation,
}) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleClose = () => {
    setSelectedDoctor(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Title */}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#0d47a1", mb: 3 }}
      >
        Doctor Portal
      </Typography>

      {/* Doctor Availability */}
      <Paper
        elevation={5}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, color: "#1565c0" }}
        >
          Doctor Availability
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Grid of doctors */}
        <Grid container spacing={3}>
          {doctors.map((doc) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={doc.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                  borderTop: `6px solid ${
                    doc.available ? green[600] : red[600]
                  }`,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <Avatar
                  src={doc.photo}
                  sx={{
                    width: 70,
                    height: 70,
                    mb: 2,
                    bgcolor: doc.available ? green[600] : red[600],
                    fontSize: 24,
                    alignSelf: "center",
                  }}
                >
                  {doc.name.charAt(0)}
                </Avatar>

                <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {doc.name}
                  </Typography>
                  <Chip
                    label={doc.available ? "Available" : "Busy"}
                    sx={{
                      mt: 1,
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: doc.available ? green[600] : red[600],
                    }}
                  />
                </CardContent>

                <Box sx={{ textAlign: "center", pb: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpen(doc)}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Doctor Details Popup */}
      <Dialog open={!!selectedDoctor} onClose={handleClose} maxWidth="sm" fullWidth>
        {selectedDoctor && (
          <>
            <DialogTitle
              sx={{ fontWeight: "bold", textAlign: "center", color: "#1976d2" }}
            >
              Doctor Details
            </DialogTitle>
            <DialogContent sx={{ textAlign: "center" }}>
              <Avatar
                src={selectedDoctor.photo}
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 2,
                  bgcolor: green[500],
                  fontSize: 32,
                }}
              >
                {selectedDoctor.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {selectedDoctor.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {selectedDoctor.email || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Phone:</strong> {selectedDoctor.phone || "N/A"}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Address:</strong> {selectedDoctor.address || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Specialization:</strong>{" "}
                {selectedDoctor.specialization || "N/A"}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button onClick={handleClose} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Current Consultations */}
      <Paper elevation={6} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, color: "#2e7d32" }}
        >
          Current Consultations
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {consultations.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#388e3c" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Patient Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Doctor
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="center"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultations.map((p) => (
                <TableRow
                  key={p.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f1f8e9",
                      transition: "0.3s",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{p.name}</TableCell>
                  <TableCell>{p.doctor}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => completeConsultation(p.id)}
                      sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    >
                      Complete Checkup
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography
            variant="body1"
            sx={{ color: "#777", fontStyle: "italic", mt: 2 }}
          >
            No active consultations at the moment.
          </Typography>
        )}
      </Paper>

      {/* Completed Consultations */}
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 600, color: "#ad1457" }}
        >
          Completed Consultations
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {completed.length > 0 ? (
          <List>
            {completed.map((p) => (
              <ListItem
                key={p.id}
                sx={{
                  borderBottom: "1px solid #eee",
                  "&:hover": { backgroundColor: "#fce4ec66" },
                }}
              >
                <ListItemText
                  primary={
                    <Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>
                  }
                  secondary={`Doctor: ${p.doctor} | Completed at: ${
                    p.time ? new Date(p.time).toLocaleString() : "N/A"
                  }`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography
            variant="body1"
            sx={{ color: "#777", fontStyle: "italic", mt: 2 }}
          >
            No completed consultations yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
