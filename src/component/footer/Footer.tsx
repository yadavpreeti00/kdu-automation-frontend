import { Box, Typography } from "@mui/material";
import "./Footer.scss";
import { useMediaQuery } from "@mui/material";

const Footer = () => {
  const isSmScreen = useMediaQuery("(max-width:600px)");
  return (
      <Box
        display="flex"
        flexDirection={isSmScreen ? "column" : "row"}
        justifyContent="space-between"
        alignItems={isSmScreen ? "flex-start" : "center"}
        sx={{ bgcolor: "#130739", color: "#fff", px: isSmScreen ? "4%" : "5%" }}
      >
        <img src="https://images.squarespace-cdn.com/content/v1/587fc3e546c3c40b37363b71/fccaf3f6-d35e-44bb-ae56-3ce69809588c/kickdrum-logo-white?format=750w" alt="Footer" className="imgStyles" />
        <Box
          display="flex"
          flexDirection="column"
          alignItems={isSmScreen ? "flex-start" : "flex-end"}
        >
          <Typography variant="body1" gutterBottom sx={{ paddingTop: "8px" }}>
            &copy; Kickdrum Technology Group LLC.
          </Typography>
          <Typography variant="body1" sx={{ paddingBottom: "8px" }}>
            All rights reserved.
          </Typography>
        </Box>
      </Box>
  );
};

export default Footer;