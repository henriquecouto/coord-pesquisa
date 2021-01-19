import React, { useState } from "react";
import {
  AppBar,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import BaseScreen from "../BaseScreen";
import routes from "../../constants/routes";

const drawerWidth = 250;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    height: 60,
    objectFit: "contain",
    margin: theme.spacing(1, 2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  toolbar: theme.mixins.toolbar,
  title: {
    textDecoration: "none",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  titleText: {
    textDecoration: "none",
  },
}));

interface HeaderProps {
  position: string;
}

const Header: React.FC<HeaderProps> = ({ children, position }) => {
  const classes = useStyles();

  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer((v) => !v);
  };

  const MenuList = () => (
    <List>
      {Object.values(routes)
        .filter((route) => route.showInHeader)
        .map((route) => {
          return (
            <ListItem
              button
              key={route.path}
              component={Link}
              to={route.path}
              onClick={toggleDrawer}
              selected={position === route.path}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          );
        })}
    </List>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center">
                <Hidden lgUp>
                  <Grid item>
                    <IconButton
                      className={classes.menuButton}
                      onClick={toggleDrawer}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                </Hidden>
                <Grid
                  item
                  container
                  alignItems="center"
                  xs
                  className={classes.title}
                >
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    component={Link}
                    to={routes.home.path}
                    className={classes.titleText}
                  >
                    NOME
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Hidden lgUp>
        <SwipeableDrawer
          open={drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <MenuList />
        </SwipeableDrawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <MenuList />
          </div>
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <BaseScreen withHeader>{children}</BaseScreen>
      </main>
    </div>
  );
};

export default Header;
