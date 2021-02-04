import Route from "../entities/Route";
import {
  AssignmentIndOutlined,
  HomeOutlined,
  PersonOutlined,
} from "@material-ui/icons";

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
  shortBio: new Route({
    name: "Biografia",
    path: "/biografia",
    showInHeader: true,
    icon: <AssignmentIndOutlined />,
  }),
};

export default routes;
