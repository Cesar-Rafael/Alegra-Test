import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  styled,
  TextField,
  IconButton,
  Avatar,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "../../utils/alegraAxios";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DownloadIcon from "@mui/icons-material/Download";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { saveAs } from "file-saver";

import TopSellers from "./TopSellers";
import getImagesForSellers from "./getImagesForSellers";
import CustomerInvoce from "./CustomerInvoce";
const favoriteStyle = { border: 2, borderColor: "error.main" };

const Contest = () => {
  const scorePerImage = 3;
  const finalScore = 20;
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [word, setWord] = useState("");
  const [sellers, setSellers] = useState([]);
  const [competing, setCompeting] = useState(false);
  const [finished, setFinished] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const [idSellerSelected, setIdSellerSelected] = useState(-1);

  const [winner, setWinner] = useState({});
  const [quantity, setQuantity] = useState(0);

  const saveFile = (fileName, originalName) => {
    saveAs(fileName, originalName);
  };

  const handleSelectFavoriteImageSuccess = () => {
    enqueueSnackbar(
      `El ganador de esta ronda fue ${sellers[idSellerSelected].name}`,
      {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
        TransitionComponent: Zoom,
      }
    );
  };

  const AvatarWrapper = styled(Box)(
    ({ theme }) => `
      .MuiAvatar-root {
        width: ${theme.spacing(30)};
        height: ${theme.spacing(20)};
        transition: ${theme.transitions.create(["opacity"])};

        &:hover {
          opacity: .8;
        }
      }
`
  );

  const IconButtonError = styled(IconButton)(
    ({ theme }) => `
       color: ${theme.colors.error.main};
  
       &:hover {
        background: ${theme.colors.error.lighter};
      }
  `
  );

  const IconButtonWarning = styled(IconButton)(
    ({ theme }) => `
       color: ${theme.colors.warning.main};
  
       &:hover {
        background: ${theme.colors.warning.lighter};
      }
  `
  );

  const getSellers = async () => {
    const response = await axios.get("/sellers");

    if (response.status === 200) {
      setSellers(
        response.data.map((s) => {
          return {
            ...s,
            score: 0,
            image: "",
          };
        })
      );
    }
  };

  const handleSearchImages = async () => {
    const newSellers = await getImagesForSellers(word, sellers);
    setCompeting(true);
    setSellers(newSellers);
    setSelecting(true);
  };

  const handleSelectFavoriteImage = async () => {
    handleSelectFavoriteImageSuccess();
    let isFinished = false;
    setSellers((oldSellers) => {
      oldSellers[idSellerSelected].score += scorePerImage;
      if (oldSellers[idSellerSelected].score >= 20) {
        oldSellers[idSellerSelected].score = 20;
        isFinished = true;
      }
      const newSellers = oldSellers.sort((a, b) => b.score - a.score);
      return newSellers;
    });
    setIdSellerSelected(-1);
    setCompeting(false);
    setWord("");
    setSelecting(false);

    if (isFinished) {
      let totalScore = 0;
      sellers.forEach((seller) => {
        totalScore += seller.score;
      });
      setWinner(sellers[0]);
      setQuantity(totalScore);
      setFinished(isFinished);
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
            spacing={2}
          >
            <Grid item md={6} lg={6} xl={6} xs={12}>
              <Card sx={{ backgroundColor: "gray.light" }}>
                <Box
                  display="flex"
                  alignItems={{ xs: "stretch", md: "center" }}
                  flexDirection={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  sx={{
                    my: 2,
                    mx: 1,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <TextField
                      label="Ingresa una palabra"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={word}
                      onChange={(e) => setWord(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSearchImages();
                        }
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      textAlign: "center",
                    }}
                    pt={{ xs: 1, md: 1.7 }}
                    pb={{ xs: 0, md: 1.7 }}
                  >
                    <Button
                      size="normal"
                      color="primary"
                      variant="contained"
                      sx={{ marginRight: 1, marginLeft: 1 }}
                      endIcon={<SearchIcon />}
                      onClick={() => handleSearchImages()}
                      disabled={finished || selecting}
                    >
                      Consultar
                    </Button>
                    <Button
                      size="normal"
                      color="secondary"
                      variant="contained"
                      sx={{ marginRight: 1, marginLeft: 1 }}
                      endIcon={<ArrowRightIcon />}
                      disabled={!competing || idSellerSelected === -1}
                      onClick={() => handleSelectFavoriteImage()}
                    >
                      Continuar
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item md={6} lg={6} xl={6} xs={12}>
              <Card sx={{ backgroundColor: "gray.light" }}>
                <TopSellers sellers={sellers} finalScore={finalScore} />
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
                  {competing &&
                    sellers.map((seller, idx) => {
                      return (
                        <Grid key={idx} item xs={12} md={6}>
                          <Card
                            sx={idx === idSellerSelected ? favoriteStyle : {}}
                            onClick={() => {
                              setIdSellerSelected(idx);
                            }}
                          >
                            <CardHeader
                              sx={{ py: 1, px: 2 }}
                              action={
                                <>
                                  <IconButtonWarning
                                    size="normal"
                                    onClick={() =>
                                      saveFile(
                                        seller.image,
                                        `Imagen de ${seller.name}`
                                      )
                                    }
                                  >
                                    <DownloadIcon fontSize="normal" />
                                  </IconButtonWarning>
                                  <IconButtonError
                                    size="normal"
                                    onClick={() => setIdSellerSelected(idx)}
                                  >
                                    {idx === idSellerSelected ? (
                                      <FavoriteIcon fontSize="normal" />
                                    ) : (
                                      <FavoriteBorderIcon fontSize="normal" />
                                    )}
                                  </IconButtonError>
                                </>
                              }
                              title={
                                <Box textAlign="center" px={3}>
                                  <Typography
                                    variant="h4"
                                    sx={{
                                      fontSize: `${theme.typography.pxToRem(
                                        16
                                      )}`,
                                    }}
                                  >
                                    Imagen de {seller.name}
                                  </Typography>
                                </Box>
                              }
                            ></CardHeader>
                            <CardContent>
                              {" "}
                              <AvatarWrapper
                                p={0.5}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Avatar src={seller.image} variant="rounded" />
                              </AvatarWrapper>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {finished && (
        <CustomerInvoce
          finished={finished}
          seller={winner}
          quantity={quantity}
        />
      )}
    </Box>
  );
};

export default Contest;
