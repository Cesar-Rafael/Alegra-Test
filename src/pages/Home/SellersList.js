import { Fragment } from "react";
import {
  Box,
  ListItemAvatar,
  ListItemText,
  Divider,
  List,
  Card,
  Typography,
  Avatar,
  styled,
  ListItem,
  useTheme,
} from "@mui/material";

import Scrollbar from "../../components/Scrollbar";
import Text from "../../components/Text";

const DotActiveLegend = styled("span")(
  ({ theme }) => `
      border-radius: 22px;
      width: 10px;
      height: 10px;
      display: inline-block;
      margin-right: ${theme.spacing(0.5)};
  `
);

const DotInactiveLegend = styled("span")(
  ({ theme }) => `
      border-radius: 22px;
      width: 10px;
      height: 10px;
      display: inline-block;
      margin-right: ${theme.spacing(0.5)};
  `
);

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root:last-of-type + .MuiDivider-root {
          display: none;
      }
  `
);

const statusText = {
  active: "Activo",
  inactive: "Inactivo",
};

const SellersList = ({ sellers }) => {
  const theme = useTheme();

  return (
    <Card>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={4.5}
        py={1}
      >
        <Box>
          <Typography variant="h4" px={0}>
            Vendedores
          </Typography>
          <Typography
            sx={{
              fontSize: `${theme.typography.pxToRem(12)}`,
            }}
          >
            (Solo participan vendedores activos)
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          height: 251,
        }}
      >
        <Scrollbar>
          <ListWrapper disablePadding>
            {sellers.map((seller) => (
              <Fragment key={seller.id}>
                <ListItem
                  sx={{
                    "&:hover": {
                      background: `${theme.colors.alpha.black[5]}`,
                    },
                    pl: 4,
                  }}
                >
                  <ListItemAvatar
                    sx={{
                      mr: 1,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                      }}
                      alt={seller.name}
                      src=""
                    />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{
                      flexGrow: 0,
                      maxWidth: "50%",
                      flexBasis: "50%",
                    }}
                    disableTypography
                    primary={
                      <Typography
                        sx={{
                          pb: 0.6,
                        }}
                        color="text.primary"
                        variant="h5"
                      >
                        {seller.name}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Box display="flex" alignItems="flex-start">
                          {seller.status === "active" ? (
                            <DotActiveLegend
                              style={{
                                background: `${theme.colors.success.main}`,
                              }}
                            />
                          ) : (
                            <DotInactiveLegend
                              style={{
                                background: `${theme.colors.error.main}`,
                              }}
                            />
                          )}
                          <Typography
                            sx={{
                              fontSize: `${theme.typography.pxToRem(11)}`,
                              lineHeight: 1,
                            }}
                            variant="body1"
                          >
                            <Text color="success">
                              {statusText[seller.status]}
                            </Text>
                          </Typography>
                        </Box>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </ListWrapper>
        </Scrollbar>
      </Box>
    </Card>
  );
};

export default SellersList;
