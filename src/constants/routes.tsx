import Route from "../entities/Route";
import { HomeOutlined } from "@material-ui/icons";

const routes = {
  home: new Route({
    name: "Início",
    path: "/inicio",
    showInHeader: true,
    icon: <HomeOutlined />,
  }),
  login: new Route({ name: "Entrar", path: "/entrar" }),
  register: new Route({ name: "Cadastro", path: "/cadastro" }),
  profile: new Route({ name: "Perfil", path: "/perfil" }),
};

export default routes;
