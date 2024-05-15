import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "typeface-roboto";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import "./MySidebar.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {
  ArticleRounded,
  CategoryRounded,
  CategoryTwoTone,
  ExitToApp,
  Person,
  RateReviewRounded,
  ReviewsRounded,
} from "@mui/icons-material";

const MySidebar = (props) => {
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [selected, setSelected] = useState("");

  const handleLogout = async () => {
    // Chama o método de logout do AuthService
    AuthService.logout();

    // Redireciona para a página de login após o logout
    navigate("/login");
  };

  const handlePageAddPost = async () => {
    // Redireciona para a página de Adicionar Post
    navigate("/listpost");
  };

  const handlePageIndex = async () => {
    // Redireciona para a página de adicao de Post
    navigate("/index");
  };

  return (
    <Box
      className="container-sidebar"
      sx={{
        height: "100vh",
        display: "flex",
        background: "white",
        minHeight: "400px",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)} // Adicione esta linha para alternar o estado de isCollapsed
        sidebarClassName="my-sidebar"
        backgroundColor="black"
        transitionDuration={1000}
        collapseIcon={<MenuOutlinedIcon />} // Adicione o ícone para expandir/recorrer o menu
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: "white",
                  backgroundColor: active ? "white" : "black",
                };
            },
          }}
          iconShape="square"
        >
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="5px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="5px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="124px"
                  height="73px"
                  src={process.env.PUBLIC_URL + "/images/logo-admin.png"}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10%",
                    marginTop: "20px",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h6"
                  color="white"
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          {/* Home - INICIO */}
          <MenuItem
            to="/"
            icon={<HomeOutlinedIcon />}
            selected={selected}
            onClick={handlePageIndex}
            style={{ backgroundColor: "black", borderBottom: "1" }}
          >
            Home
          </MenuItem>
          {/* Home - FIM */}

          <MenuItem
            to="/"
            icon={<ArticleRounded />}
            selected={selected}
            onClick={handlePageAddPost}
            style={{ backgroundColor: "black" }}
          >
            Artigos
          </MenuItem>

          <MenuItem
            to="/"
            icon={<RateReviewRounded />}
            selected={selected}
            style={{ backgroundColor: "black" }}
          >
            Comentários
          </MenuItem>

          <MenuItem
            to="/"
            icon={<ReviewsRounded />}
            selected={selected}
            style={{ backgroundColor: "black" }}
          >
            Análises
          </MenuItem>

          <MenuItem
            to="/"
            icon={<CategoryRounded />}
            selected={selected}
            style={{ backgroundColor: "black" }}
          >
            Categorias
          </MenuItem>

          <MenuItem
            to="/"
            icon={<CategoryTwoTone />}
            selected={selected}
            style={{ backgroundColor: "black" }}
          >
            Sub-Categorias
          </MenuItem>

          <MenuItem
            to="/"
            icon={<Person />}
            selected={selected}
            style={{ backgroundColor: "black" }}
          >
            Usuários
          </MenuItem>
          <MenuItem
            to="/"
            icon={<ExitToApp />}
            selected={selected}
            style={{ backgroundColor: "black" }}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default MySidebar;
