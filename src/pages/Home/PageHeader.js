import {
  Typography,
  Box,
  styled,
  CardActionArea,
  Avatar,
  lighten,
  alpha,
  Stack,
  useTheme,
  Card,
} from "@mui/material";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === "dark"
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === "dark"
          ? `0 1px 0 ${alpha(
              lighten(theme.colors.primary.main, 0.8),
              0.2
            )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)`
          : `0px 2px 4px -3px ${alpha(
              theme.colors.alpha.black[100],
              0.4
            )}, 0px 5px 16px -4px ${alpha(theme.colors.alpha.black[100], 0.2)}`
      };
`
);

const CardActionAreaWrapper = styled(CardActionArea)(
  ({ theme }) => `
    padding: ${theme.spacing(2.5)};
    display: flex;
    align-items: center;
    justify-content: space-between;

    .MuiTouchRipple-root {
        opacity: .15;
    }

    &:hover {
        .MuiCardActionArea-focusHighlight {
            opacity: .02;
        }
    }
  `
);

function PageHeader() {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems={{ xs: "stretch", md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      sx={{
        m: 2,
      }}
    >
      <Box display="flex" alignItems="center">
        <AvatarPageTitle variant="rounded">
          <MilitaryTechIcon fontSize="large" />
        </AvatarPageTitle>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom mb={0}>
            Vendedores ¡a correr!
          </Typography>
          <Typography variant="subtitle2">¿En qué consiste?</Typography>
        </Box>
      </Box>

      <Box>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={1}
        >
          <Card>
            <CardActionAreaWrapper sx={{ p: 1 }}>
              <Box textAlign="center">
                <Typography
                  variant="subtitle3"
                  sx={{
                    fontSize: `${theme.typography.pxToRem(12)}`,
                  }}
                >
                  Ingresa una palabra
                </Typography>
              </Box>
              <Typography
                component="span"
                color="primary.main"
                sx={{
                  opacity: 0.7,
                  display: "flex",
                }}
              >
                <ArrowForwardTwoToneIcon />
              </Typography>
            </CardActionAreaWrapper>
          </Card>
          <Card>
            <CardActionAreaWrapper sx={{ p: 1 }}>
              <Box textAlign="center">
                <Typography
                  variant="subtitle3"
                  sx={{
                    fontSize: `${theme.typography.pxToRem(12)}`,
                  }}
                >
                  Elige la imagen que más te guste
                </Typography>
              </Box>
              <Typography
                component="span"
                color="primary.main"
                sx={{
                  opacity: 0.7,
                  display: "flex",
                }}
              >
                <ArrowForwardTwoToneIcon />
              </Typography>
            </CardActionAreaWrapper>
          </Card>
          <Card>
            <CardActionAreaWrapper sx={{ p: 1 }}>
              <Box textAlign="center">
                <Typography
                  variant="subtitle3"
                  sx={{
                    fontSize: `${theme.typography.pxToRem(12)}`,
                  }}
                >
                  El vendedor con 20 puntos gana
                </Typography>
              </Box>
              <Typography
                component="span"
                color="primary.main"
                sx={{
                  opacity: 0.7,
                  display: "flex",
                }}
                pl={0.5}
              >
                <TaskAltIcon />
              </Typography>
            </CardActionAreaWrapper>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

export default PageHeader;
