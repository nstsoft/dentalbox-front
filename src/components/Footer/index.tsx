import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import "./styles.scss";

export const Footer = () => {
  return (
    <Box className="footer">
      <Box className="info">
        <Typography component="h1">Let's Talk</Typography>
        <p>
          Every project starts with a chat. Joven leads our client conversations
          and will be happy to discuss your project. He will also pull in the
          right people from the team when needed.
        </p>
      </Box>
      <Box className="contacts" sx={{ width: "20%" }}>
        <Box className="contact">
          <Typography>Email</Typography>
          <Link href="mailto:7J9dM@example.com">7J9dM@example.com</Link>
        </Box>
        <Box className="contact">
          <Typography>Phone</Typography>
          <Link href="tel:+380975555555">+38 (097) 555-5555</Link>
        </Box>
        <Box className="contact">
          <Typography>Address</Typography>
          <Link>Lviv, Ukraine, 79000, 1st Street, 1A</Link>
        </Box>
        <Box className="contact-icons">
          <Link href="https://twitter.com/">
            <TwitterIcon className="icon" />
          </Link>
          <Link href="https://www.facebook.com/">
            <FacebookIcon className="icon" />
          </Link>
          <Link href="https://www.instagram.com/">
            <InstagramIcon className="icon" />
          </Link>
          <Link href="https://www.linkedin.com/">
            <LinkedInIcon className="icon" />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
