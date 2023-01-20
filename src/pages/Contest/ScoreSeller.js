import { Typography, Box, Avatar, Tooltip, useTheme } from "@mui/material";

const scoreImages = [
  "/static/gold-medal.png",
  "/static/silver-medal.png",
  "/static/bronze-medal.png",
];

const ScoreSeller = ({ seller, finalScore, order }) => {
  const theme = useTheme();
  const fullName = seller.name.split(" ");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Tooltip placement="top" title="View profile" arrow>
        <Avatar
          component="a"
          sx={{
            my: 1,
            width: 30,
            height: 30,
          }}
          src={scoreImages[order]}
        />
      </Tooltip>
      <Typography variant="h5" sx={{ my: 0, py: 0 }}>
        {fullName[0]}
      </Typography>
      <Typography
        variant="h4"
        textAlign="center"
        noWrap
        sx={{
          fontSize: `${theme.typography.pxToRem(12)}`,
        }}
        color="success.dark"
      >
        Puntos: {seller.score}
      </Typography>
      <Typography
        variant="h4"
        textAlign="center"
        noWrap
        sx={{
          fontSize: `${theme.typography.pxToRem(12)}`,
          marginBottom: 1,
        }}
        color="warning.dark"
      >
        Faltantes: {finalScore - seller.score}
      </Typography>
    </Box>
  );
};

export default ScoreSeller;
