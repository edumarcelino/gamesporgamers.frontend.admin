import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./page/Login/Login";
import Index from "./page/Index/Index";
import AddPost from "./page/Post/AddPost";
import ListPost from "./page/Post/ListPost";
import AuthService from "./services/AuthService";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Redireciona a rota raiz para a página de login por padrão */}
        <Route path="/login" element={<Login />} />
        <Route path="/index" element={<PrivateRoute component={Index} />} />
        <Route path="/listpost" element={<PrivateRoute component={ListPost} />} />
        <Route path="/addpost" element={<PrivateRoute component={AddPost} />} />
        {/* Use PrivateRoute como um elemento filho de Route */}
      </Routes>
    </Router>
  );
};
const PrivateRoute = ({ component: Component }) => {
  return AuthService.isAuthenticated() ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
