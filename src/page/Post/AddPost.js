import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../../components/global/Header/Header";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import MySidebar from "../../components/global/MySidebar/MySidebar";
import { Send } from "@mui/icons-material";

import axios from "axios";

import AuthService from "../../services/AuthService";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [badges, setBadges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategorySelect = (badge) => {
    // Verifica se a categoria já está selecionada
    const isSelected = selectedCategories.some(
      (selectedBadge) => selectedBadge.id === badge.id
    );
    // Atualiza as categorias selecionadas
    if (isSelected) {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedBadge) => selectedBadge.id !== badge.id
        )
      );
    } else {
      setSelectedCategories([...selectedCategories, badge]);
    }
  };

  const cadastrar = async () => {
    try {
      // Recuperar o token de acesso do localStorage
      const accessToken = AuthService.getCurrentUser();

      // Verificar se o token de acesso existe
      if (!accessToken) {
        console.error("Token de acesso não encontrado.");
        return;
      }

      // Configurar o cabeçalho da solicitação HTTP com o token de acesso
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // Defina o tipo de conteúdo como JSON
      };

      const response = await axios.post(
        "http://localhost:8080/api/v1/restrict/posts",
        {
          title: title,
          description: description,
          postTextHTML: text,
          datePost: new Date(),
          highlighted: checked,
          urlMainImage: text,
          badges: selectedCategories,
        },
        { headers: headers } // Passar o cabeçalho na configuração da solicitação
      );
      console.log("Post cadastrado com sucesso:", response.data);
      // Limpar os campos após o cadastro
      setTitle("");
      setDescription("");
      setText("");
      setChecked(false);
      setSelectedCategories([]);
    } catch (error) {
      console.error("Erro ao cadastrar post:", error);
    }
  };

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/badges");
        setBadges(response.data);
      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };

    fetchBadges();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <MySidebar />
      <Box
        m="20px"
        height="100%"
        flexGrow={1} // Permite que o Box ocupe o espaço restante
        display="flex" // Usa flexbox
        flexDirection="column" // Empilha os itens verticalmente
      >
        <Header
          title="Criar uma Postagem"
          subtitle="Criar uma nova postagem no Portal"
        />
        <Box mt={2}>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name="destaque"
                  sx={{ mb: 0 }}
                />
              }
              label="Artigo em Destaque"
              labelPlacement="end"
              style={{ marginLeft: "2px" }}
            />
          </FormGroup>

          <Typography
            variant="subtitle1"
            component="subtitle1"
            sx={{ display: "block", mb: 1 }}
          >
            Categoria
          </Typography>
          {badges.map((badge) => (
            <Button
              key={badge.id}
              variant={
                selectedCategories.some(
                  (selectedBadge) => selectedBadge.id === badge.id
                )
                  ? "contained"
                  : "outlined"
              }
              sx={{
                mr: 2,
                mb: 2,
                color: selectedCategories.some(
                  (selectedBadge) => selectedBadge.id === badge.id
                )
                  ? "white"
                  : "grey",
              }}
              onClick={() => handleCategorySelect(badge)}
            >
              {badge.name}
            </Button>
          ))}

          <TextField
            fullWidth
            id="outlined-controlled"
            label="Título"
            name="title"
            value={title} // Vincula o valor do campo de entrada ao estado 'title'
            onChange={handleTitleChange} // Atualiza o estado 'title' quando o campo de entrada muda
            sx={{ width: "100%", mb: 2 }} // Largura total e margem inferior
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Descrição"
            name="description"
            value={description} // Vincula o valor do campo de entrada ao estado 'description'
            onChange={handleDescriptionChange} // Atualiza o estado 'description' quando o campo de entrada muda
            sx={{ width: "100%", mb: 2 }} // Largura total e margem inferior
          />
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            component="subtitle1"
            sx={{ display: "block", mb: 1 }}
          >
            Texto do Artigo
          </Typography>
          <ReactQuill
            value={text}
            onChange={handleTextChange}
            placeholder="Digite o texto do artigo"
            style={{ width: "100%", height: "400px", mb: 2 }} // Ocupa todo o espaço disponível
          />
        </Box>
        <Box style={{ mt: 5 }}>
          <Button
            variant="contained"
            endIcon={<Send />}
            onClick={cadastrar}
            sx={{ mt: 8 }}
          >
            Cadastrar
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddPost;
