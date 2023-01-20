import { useState } from "react";
import axios from "../../utils/alegraAxios";
import {
  Button,
  TextField,
  Grid,
  Card,
  Box,
  Typography,
  Divider,
  useTheme,
  Zoom,
} from "@mui/material";
import { useSnackbar } from "notistack";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const RegisterSeller = ({ getSellers }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [identification, setIdentification] = useState("");
  const [observations, setObservations] = useState("");

  const handleCreateSellerSuccess = () => {
    enqueueSnackbar("El vendedor se ha registrado satisfactoriamente", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    });
  };

  const handleCreateSellerError = () => {
    enqueueSnackbar("Ocurrió un error al registrar el vendedor", {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      TransitionComponent: Zoom,
    });
  };

  const registerSeller = async () => {
    const seller = { name, identification, observations, status: "active" };
    const response = await axios.post("/sellers", seller);
    if (response.status === 201) {
      setName("");
      setIdentification("");
      setObservations("");
      getSellers();
      handleCreateSellerSuccess();
    } else {
      handleCreateSellerError();
    }
  };

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={2}
      >
        <Typography variant="h4">Registrar Vendedor</Typography>
      </Box>
      <Divider />
      <Grid
        sx={{
          px: 4,
          py: 2,
        }}
        container
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item xs={12}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Identificación"
            variant="outlined"
            fullWidth
            size="small"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Observaciones"
            variant="outlined"
            fullWidth
            size="small"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
        </Grid>
      </Grid>
      <Divider />
      <Box
        sx={{
          background: `${theme.colors.alpha.black[5]}`,
          textAlign: "center",
        }}
        p={2}
      >
        <Button
          size="small"
          color="primary"
          variant="contained"
          endIcon={<PersonAddAlt1Icon />}
          onClick={() => registerSeller()}
        >
          Registrar
        </Button>
      </Box>
    </Card>
  );
};

export default RegisterSeller;
