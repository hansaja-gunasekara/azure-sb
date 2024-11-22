import React from 'react';
import { Box, Typography, Container, Grid, Button, Link, SvgIcon } from '@mui/material';
import { styled } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// Custom Behance Icon
const BehanceIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
  </SvgIcon>
);

const StyledFooter = styled(Box)({
  background: '#001529',
  color: '#fff',
  padding: '80px 0 40px',
  position: 'relative',
  overflow: 'hidden',
});

const FeatureCard = styled(Box)({
  marginBottom: '40px',
  '& .icon': {
    color: '#fff',
    fontSize: '40px',
    marginBottom: '20px',
  },
  '& .description': {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '16px',
    lineHeight: '1.6',
  },
});

const CTASection = styled(Box)({
  background: '#FFB800',
  borderRadius: '16px',
  padding: '40px',
  margin: '60px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '20px',
    textAlign: 'center',
  },
});

const NewFooter = () => {
  return (
    <StyledFooter>
      <Container maxWidth="lg">
        {/* Why work with us section */}
        <Typography
          variant="h2"
          sx={{
            mb: 6,
            fontWeight: "bold",
            fontSize: { xs: "32px", md: "48px" },
          }}
        >
          Why Book with Us?
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard>
              <AccessTimeIcon className="icon" />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "500" }}>
                Seamless Booking Experience
              </Typography>
              <Typography className="description">
                Our platform ensures an easy and hassle-free booking process,
                allowing you to quickly find and reserve your spot at the best
                events with just a few clicks.
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard>
              <EmojiEventsIcon className="icon" />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "500" }}>
                Curated Events
              </Typography>
              <Typography className="description">
                We bring you a handpicked selection of top-rated events across
                various genres, ensuring you never miss out on the most exciting
                and exclusive experiences.
              </Typography>
            </FeatureCard>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard>
              <TrackChangesIcon className="icon" />
              <Typography variant="h5" sx={{ mb: 2, fontWeight: "500" }}>
                Secure Payments{" "}
              </Typography>
              <Typography className="description">
                Your transactions are safe with us. We prioritize security by
                providing encrypted and reliable payment options for a
                worry-free booking experience.
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>

        {/* CTA Section */}
        <CTASection>
          <Typography
            variant="h3"
            sx={{
              color: "#000",
              fontWeight: "bold",
              fontSize: { xs: "24px", md: "32px" },
            }}
          >
            Ready to Experience the Best Events?
          </Typography>
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "12px 24px",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Let’s get started on your next adventure.
          </Button>
        </CTASection>

        {/* Footer Links */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              ReserveNow
            </Typography>
            <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              © 2024
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "500" }}>
              Services
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <li>
                <Link
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    lineHeight: 2,
                    "&:hover": { color: "#FFB800" },
                  }}
                >
                  Event Ticket Booking
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    lineHeight: 2,
                    "&:hover": { color: "#FFB800" },
                  }}
                >
                  VIP & Group Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    lineHeight: 2,
                    "&:hover": { color: "#FFB800" },
                  }}
                >
                  Venue Information
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    lineHeight: 2,
                    "&:hover": { color: "#FFB800" },
                  }}
                >
                  Event Promotions & Discounts
                </Link>
              </li>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "500" }}>
              Company
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <li>
                <Link
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    lineHeight: 2,
                    "&:hover": { color: "#FFB800" },
                  }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    lineHeight: 2,
                    "&:hover": { color: "#FFB800" },
                  }}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    textDecoration: "none",
                    lineHeight: 2,
                    "&:hover": { color: "#FFB800" },
                  }}
                >
                  Contact Us
                </Link>
              </li>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "500" }}>
              Connect with Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link
                href="#"
                sx={{ color: "#FFB800", "&:hover": { color: "#fff" } }}
              >
                <BehanceIcon sx={{ fontSize: 24 }} />
              </Link>
              <Link
                href="#"
                sx={{ color: "#FFB800", "&:hover": { color: "#fff" } }}
              >
                <InstagramIcon sx={{ fontSize: 24 }} />
              </Link>
              <Link
                href="#"
                sx={{ color: "#FFB800", "&:hover": { color: "#fff" } }}
              >
                <LinkedInIcon sx={{ fontSize: 24 }} />
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Terms and Certification */}
        <Box
          sx={{
            mt: 6,
            pt: 4,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Link
              href="#"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                textDecoration: "none",
                mr: 3,
                "&:hover": { color: "#FFB800" },
              }}
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                textDecoration: "none",
                "&:hover": { color: "#FFB800" },
              }}
            >
              Privacy Policy
            </Link>
          </Box>
          <Box
            component="img"
            src="../src/assets/mainlogo.png"
            alt="B Corporation"
            sx={{ height: 40 }}
          />
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default NewFooter;