import React, { useEffect, useRef, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, Paper, Avatar } from "@mui/material";

function getCardBgColor(color) {
  switch (color) {
    case "primary":
      return "rgba(41, 98, 255, 0.15)";
    case "secondary":
      return "rgba(233, 30, 99, 0.15)";
    case "success":
      return "rgba(76, 175, 80, 0.15)";
    case "info":
      return "rgba(3, 169, 244, 0.15)";
    default:
      return "#fff";
  }
}

function useScrollFade() {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

export default function AdminDashboard({ patients, consultations, completed, doctors, priorityMap }) {
  const queueSummary = Object.keys(priorityMap).map((level) => ({
    level,
    count: patients.filter((p) => p.priority === level).length,
  }));

  const [testimonialsRef, testimonialsVisible] = useScrollFade();
  const [announcementsRef, announcementsVisible] = useScrollFade();
  const [statsRef, statsVisible] = useScrollFade();
  const [headerRef, headerVisible] = useScrollFade();

  const testimonials = [
    { name: "Dr. Sarah Lee", photo: "https://randomuser.me/api/portraits/women/44.jpg", text: "This system has revolutionized our patient management workflow!" },
    { name: "John Doe", photo: "https://randomuser.me/api/portraits/men/32.jpg", text: "Efficient, intuitive, and reliable. Highly recommended to any clinic." },
    { name: "Nina Patel", photo: "https://randomuser.me/api/portraits/women/65.jpg", text: "The auto-assignment of doctors saves so much time and reduces waiting!" },
    { name: "Dr. Ahmed Khan", photo: "https://randomuser.me/api/portraits/men/22.jpg", text: "Professional, sleek, and truly a time saver for hospitals." },
  ];

  const announcements = [
    { title: "System Upgrade", detail: "Version 2.1 rollout on September 20th" },
    { title: "Maintenance", detail: "Scheduled downtime Oct 5, 10PM-12AM" },
    { title: "New Feature", detail: "Telemedicine portal launching soon" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 40%, #90caf9 100%)", padding: "3rem", transition: "background 0.7s ease" }}>
      
      <Grid container spacing={4} alignItems="center" ref={headerRef} sx={{
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h3" component="h1" sx={{ color: "#1a237e", fontWeight: "bold", transition: "transform 0.6s ease", ...headerVisible && { transform: "scale(1.05)" } }}>
            Admin Dashboard
          </Typography>
        </Grid>

        {[{
          label: "In Queue",
          count: patients.length,
          color: "primary",
        }, {
          label: "In Consultation",
          count: consultations.length,
          color: "secondary",
        }, {
          label: "Completed Today",
          count: completed.length,
          color: "success",
        }, {
          label: "Doctors Available",
          count: doctors.filter(d => d.available).length,
          color: "info",
        }].map(({ label, count, color }, i) => (
          <Grid item xs={12} md={3} key={i} sx={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.8s ease ${0.3 + i * 0.15}s, transform 0.8s ease ${0.3 + i * 0.15}s`,
          }}>
            <Card elevation={12} sx={{
              bgcolor: getCardBgColor(color),
              borderRadius: "15px",
              boxShadow: `0 8px 15px ${getCardBgColor(color)}`,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: `0 12px 25px ${getCardBgColor(color)}`,
              },
              color: "#222",
              py: 4,
              textAlign: "center",
            }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{label}</Typography>
                <Typography variant="h2" sx={{ fontWeight: "bold" }}>{count}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={4} sx={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 1.2s, transform 1s ease 1.2s",
        }}>
          <Card elevation={10} sx={{ bgcolor: "#f0f4c3", color: "#33691e", borderRadius: 3, p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>Queue Summary (by Priority)</Typography>
            <ul style={{ fontSize: 18, paddingLeft: 20 }}>
              {queueSummary.map(({ level, count }) => (<li key={level}><b>{level}</b>: {count}</li>))}
            </ul>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} sx={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 1.4s, transform 1s ease 1.4s",
        }}>
          <Card elevation={10} sx={{ bgcolor: "#e3f2fd", color: "#0d47a1", borderRadius: 3, p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>Other Information</Typography>
            <ul style={{ fontSize: 18, paddingLeft: 20, lineHeight: "1.8" }}>
              <li>All actions update in real-time</li>
              <li>Doctor auto-assignment prioritizes highest-need patients</li>
              <li>System supports popup/modal patient registration</li>
              <li>Doctors' availability is tracked live</li>
              <li>Responsive layout with modern UI</li>
            </ul>
          </Card>
        </Grid>
      </Grid>

      {/* Announcements section */}
      <Box ref={announcementsRef} sx={{
        mt: 8,
        opacity: announcementsVisible ? 1 : 0,
        transform: announcementsVisible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1565c0", fontWeight: 700, mb: 3, textAlign: "center" }}>
          Announcements
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {announcements.map(({ title, detail }, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card elevation={6} sx={{
                p: 3,
                borderRadius: 3,
                cursor: "default",
                transition: "transform 0.3s ease",
                bgcolor: "#bbdefb",
                "&:hover": { transform: "scale(1.05)", boxShadow: "0 10px 30px rgba(33, 150, 243, 0.3)" },
                height: "100%",
              }}>
                <Typography variant="h6" sx={{ fontWeight: "600", mb: 1 }}>{title}</Typography>
                <Typography variant="body1">{detail}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials carousel */}
      <Box ref={testimonialsRef} sx={{
        mt: 10,
        overflow: "hidden",
        position: "relative",
      }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1a237e", fontWeight: 700, mb: 3, textAlign: "center" }}>
          Testimonials
        </Typography>
        <Box sx={{
          display: "flex",
          animation: testimonialsVisible ? "slideLeft 30s linear infinite" : "none",
          "&:hover": { animationPlayState: "paused" },
        }}>
          {[...testimonials, ...testimonials].map(({ name, photo, text }, i) => (
            <Paper key={i} elevation={6} sx={{
              minWidth: 300,
              maxWidth: 350,
              m: 2,
              p: 3,
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              bgcolor: "#e3f2fd",
              flexShrink: 0,
            }}>
              <Avatar src={photo} alt={name} sx={{ width: 64, height: 64, mb: 2 }} />
              <Typography variant="body1" sx={{ fontStyle: "italic", mb: 2 }}>"{text}"</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>- {name}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Statistics Section */}
      <Box ref={statsRef} sx={{
        mt: 10,
        opacity: statsVisible ? 1 : 0,
        transform: statsVisible ? "translateX(0)" : "translateX(-50px)",
        transition: "opacity 1s ease 0.6s, transform 1s ease 0.6s",
      }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#1565c0", fontWeight: 700, mb: 3, textAlign: "center" }}>
          Hospital Statistics
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { value: "15K+", label: "Patients Served", color: "#c5cae9" },
            { value: "250+", label: "Doctors Available", color: "#b3e5fc" },
            { value: "1.2K+", label: "Consultations Today", color: "#ffe082" },
            { value: "99.9%", label: "Satisfaction Rate", color: "#b9f6ca" },
          ].map(({ value, label, color }, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card elevation={8} sx={{
                bgcolor: color,
                borderRadius: 3,
                textAlign: "center",
                p: 3,
                transition: "transform 0.4s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}>
                <Typography variant="h5" sx={{ fontWeight: "700" }}>{value}</Typography>
                <Typography variant="subtitle1">{label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
