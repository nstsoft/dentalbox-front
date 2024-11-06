import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const NoData = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CardMedia
        component="img"
        src="https://files.slack.com/files-tmb/T06PJ3PE2PK-F07UGQN3VK9-d9f08cd86f/nodataimage_360.png"
        sx={{ height: "50px", width: "50px" }}
      />
      <Typography variant="h6">No data</Typography>
    </Box>
  );
};
