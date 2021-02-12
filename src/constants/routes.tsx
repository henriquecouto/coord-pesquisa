import Route from "../entities/Route";
import {
  AssignmentIndOutlined,
  HomeOutlined,
  PersonOutlined,
  QuestionAnswerOutlined,
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
  recoverPassword: new Route({
    name: "Recuperar Senha",
    path: "/recuperar-senha",
  }),
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
  questionaries: new Route({
    name: "Questionários",
    path: "/questionarios",
    showInHeader: true,
    icon: <QuestionAnswerOutlined />,
  }),
  questionary: new Route({
    name: "Questionário",
    path: "/questionarios/:questionaryId",
  }),
};

export default routes;
