import { useState } from "react";
import {
  Stack,
  Divider,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Table,
  TableCell,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";

import ScoreSeller from "./ScoreSeller";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";

const TopSellers = ({ sellers, finalScore }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack
        spacing={0}
        direction="row"
        justifyContent="space-evenly"
        divider={<Divider orientation="vertical" flexItem />}
      >
        {sellers.slice(0, 3).map((seller, idx) => (
          <ScoreSeller
            key={seller.id}
            seller={seller}
            finalScore={finalScore}
            order={idx}
          />
        ))}

        <Box
          sx={{
            textAlign: "center",
          }}
          py={3.5}
          px={0}
          mx={0}
        >
          <Button
            size="small"
            color="primary"
            variant="contained"
            endIcon={<FormatListNumberedIcon />}
            onClick={() => setOpen(true)}
          >
            Ver
          </Button>
        </Box>
      </Stack>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
      >
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
              Puntajes de vendedores
            </Typography>
            <MilitaryTechIcon pl={1} />
          </Box>
        </DialogTitle>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Puesto</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Puntos</TableCell>
                <TableCell>Faltantes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sellers.map((seller, idx) => (
                <TableRow key={seller.id}>
                  <TableCell>{idx + 1} °</TableCell>
                  <TableCell>{seller.name}</TableCell>
                  <TableCell>{seller.score}</TableCell>
                  <TableCell>{finalScore - seller.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </>
  );
};
export default TopSellers;
