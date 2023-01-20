import { useRef, useState, useEffect } from "react";
import axios from "../../utils/alegraAxios";
import { useNavigate } from "react-router-dom";
import Invoice from "./Invoice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Dialog,
  DialogTitle,
  Box,
  Typography,
  DialogContent,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";

const CustomerInvoce = ({ finished, seller, quantity }) => {
  const theme = useTheme();
  const invoice = useRef();
  const [pdfInvoice, setPdfInvoice] = useState(false);
  const navigate = useNavigate();

  const saveFile = () => {
    saveAs(pdfInvoice, `Factura de ${seller.name}`);
  };

  const viewInvoice = async () => {
    const response = await axios.post("/invoices/preview", invoice.current);
    if (response.status === 200) {
      const { pdfUrl } = response.data;
      setPdfInvoice(pdfUrl);
    }
  };

  const createInvoice = async () => {
    const response = await axios.post("/invoices", invoice.current);
    if (response.status === 201) {
      await viewInvoice();
    }
  };

  useEffect(() => {
    if (finished) {
      invoice.current = new Invoice(quantity);
      createInvoice();
    }
    return () => {
      setPdfInvoice(false);
    };
    // eslint-disable-next-line
  }, [finished]);

  return (
    <Dialog fullWidth maxWidth="xs" open={true} onClose={() => navigate("/")}>
      <DialogTitle
        sx={{
          p: 2,
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Concurso finalizado
          </Typography>
          <CheckCircleIcon pl={1} color="success" />
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            px: 1,
            pt: 0,
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              color: `${theme.colors.alpha.black[100]}`,
            }}
            color="text.primary"
            variant="h3"
          >
            Ganador: {seller.name}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              pb: 0,
            }}
          >
            Puntaje personal: {seller.score}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              pb: 1,
            }}
          >
            Puntaje acumulado: {quantity}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item xs>
              <Button
                endIcon={<DownloadIcon />}
                variant="outlined"
                sx={{
                  borderWidth: "2px",
                  "&:hover": {
                    borderWidth: "2px",
                  },
                }}
                onClick={() => saveFile()}
              >
                Ver Factura
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                color="secondary"
                endIcon={<CheckCircleIcon />}
                variant="outlined"
                sx={{
                  borderWidth: "2px",
                  "&:hover": {
                    borderWidth: "2px",
                  },
                }}
                onClick={() => navigate("/")}
              >
                Terminar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerInvoce;
