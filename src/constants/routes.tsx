import Route from "../entities/Route";
import { HomeOutlined, PersonOutlined } from "@material-ui/icons";

const routes = {
  home: new Route({
    name: "Início",
    path: "/inicio",
    showInHeader: true,
    icon: <HomeOutlined />,
  }),
  login: new Route({ name: "Entrar", path: "/entrar" }),
  register: new Route({ name: "Cadastro", path: "/cadastro" }),
  profile: new Route({
    name: "Perfil",
    path: "/perfil",
    showInHeader: true,
    icon: <PersonOutlined />,
  }),
};

export default routes;
