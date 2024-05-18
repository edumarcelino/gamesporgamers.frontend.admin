import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import Header from "../../components/global/Header/Header";
import { Box, Button } from "@mui/material";
import MySidebar from "../../components/global/MySidebar/MySidebar";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import ptBRGrid from "../../components/locales/ptBRGrid";
import { Add, DeleteRounded, Edit } from "@mui/icons-material";

const ListPost = () => {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  const handlePageAddPost = async () => {
    // Redireciona para a página de login após o logout
    navigate("/addpost");
  };

  const handleEdit = (id) => {
    // Lógica para editar o post com o ID fornecido
    console.log(`Editar post com ID ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para excluir o post com o ID fornecido
    console.log(`Excluir post com ID ${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Título", flex: 1, editable: false },
    { field: "description", headerName: "Descrição", flex: 1, editable: false },
    { field: "postText", headerName: "Texto", flex: 1, editable: false },
    {
      field: "urlMainImage",
      headerName: "Imagem Principal",
      description: "This column has a value getter and is not sortable.",
      width: 150,
      renderCell: (params) => (
        <img src={params.value} alt="Imagem Principal" style={{ width: 80 }} />
      ),
    },
    {
      field: "highlighted",
      headerName: "Destacado",
      type: "boolean",
      width: 90,
      description: "This column has a value getter and is not sortable.",
      getCellClassName: (params) => {
        if (params.value === false) {
          return "error";
        } else if (params.value === true) {
          return "primary";
        }
        return ""; // Se o valor não for booleano, não aplique nenhuma classe
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 250,
      sortable: false,
      filtering: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: 2 }}
            onClick={() => handleEdit(params.row.id)}
            endIcon={<Edit />}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            endIcon={<DeleteRounded />}
            onClick={() => handleDelete(params.row.id)}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/open/posts/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts(); // Chama a função fetchPosts quando o componente for montado
  }, []);

  const rows = posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    postText: post.postText,
    urlMainImage: post.urlMainImage,
    highlighted: post.highlighted,
  }));

  return (
    <div style={{ display: "flex", height: "98vh" }}>
      <MySidebar />

      <Box
        m="20px"
        height="100%"
        width="100vh"
        flexGrow={1} // Permite que o Box ocupe o espaço restante
        display="flex" // Usa flexbox
        flexDirection="column" // Empilha os itens verticalmente
      >
        <Header
          title="Listagem das Postagens"
          subtitle="Visualiza as postagens realizadas na pagina"
        />
        <Box sx={{ marginLeft: "auto", width: 320 }}>
          <Button
            variant="contained"
            endIcon={<Add />}
            sx={{ mt: 0, mb: 2, width: "100%" }}
            onClick={handlePageAddPost}
          >
            Cadastrar Nova Postagem
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          localeText={ptBRGrid}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </div>
  );
};

export default ListPost;
