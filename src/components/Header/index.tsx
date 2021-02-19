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
  Menu,
  MenuItem,
  SwipeableDrawer,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  PersonOutlined as PersonOutlinedIcon,
} from "@material-ui/icons";
import { Link, useHistory, useLocation } from "react-router-dom";
import BaseScreen from "../BaseScreen";
import routes from "../../constants/routes";
import { UserActions } from "../../redux/user/user.ducks";
import { useDispatch, useSelector } from "react-redux";
import IGlobalState from "../../redux/definitions/GlobalState";
import Thanks from "../Thanks";

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
  thanks: {
    position: "absolute",
    bottom: 0,
  },
}));

const Header: React.FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const username = useSelector(
    (state: IGlobalState) => state.userReducer.loggedUser?.fullName
  );

  const [drawer, setDrawer] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);

  const toggleDrawer = () => {
    setDrawer((v) => !v);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setMenuAnchor(null);
  };

  const viewProfile = () => {
    handleClose();
    history.push(routes.profile.path);
  };

  const logout = () => {
    handleClose();
    dispatch(UserActions.makeLogout());
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
              selected={location.pathname === route.path}
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
                    Portal do Pesquisador
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  {!!username && <Typography>Olá, {username}</Typography>}
                </Grid>
                <Grid item>
                  <IconButton onClick={handleMenu}>
                    <PersonOutlinedIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={menuAnchor}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={menuOpen}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={viewProfile}>Perfil</MenuItem>
                    <MenuItem onClick={logout}>Sair</MenuItem>
                  </Menu>
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
          <div className={classes.thanks}>
            <Thanks />
          </div>
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
          <div className={classes.thanks}>
            <Thanks />
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
