import { useState, useEffect } from "react";
import { Button, Box, Grid, Card } from "@mui/material";
import axios from "../../utils/alegraAxios";
import PageHeader from "./PageHeader";
import SellersList from "./SellersList";
import RegisterSeller from "./RegisterSeller";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const [sellers, setSellers] = useState([]);

  const getSellers = async () => {
    const response = await axios.get("/sellers");

    if (response.status === 200) {
      setSellers(response.data);
    }
  };

  useEffect(() => {
    getSellers();
    return () => {
      setSellers([]);
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 5,
        flex: 1,
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box flexGrow={1}>
          <Grid
            sx={{
              px: 0,
            }}
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
            <Grid item xs={12}>
              <Card sx={{ backgroundColor: "gray.light" }}>
                <PageHeader />
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ backgroundColor: "gray.light" }}>
                <Grid
                  sx={{
                    p: 2,
                  }}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={4}
                >
                  <Grid item sm={12} md={6} lg={6}>
                    <SellersList sellers={sellers} />
                  </Grid>
                  <Grid item sm={12} md={6} lg={6}>
                    <RegisterSeller getSellers={getSellers} />
                  </Grid>
                  <Grid item sm={12} md={6} lg={6}>
                    <Box
                      sx={{
                        textAlign: "center",
                      }}
                      p={0}
                    >
                      <Button
                        size="normal"
                        color="primary"
                        variant="contained"
                        endIcon={<PlayCircleFilledWhiteIcon />}
                        onClick={() => navigate("/contest")}
                      >
                        Iniciar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBox;
