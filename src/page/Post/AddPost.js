import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../../components/global/Header/Header";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import MySidebar from "../../components/global/MySidebar/MySidebar";
import { CheckBox, Send } from "@mui/icons-material";

import axios from "axios";

const AddPost = () => {
  const [text, setText] = useState("");
  const [destaque, setDestaque] = useState(false); // Estado para controlar o destaque
  const [badges, setBadges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleDestaqueChange = (event) => {
    setDestaque(event.target.checked);
  };

  const handleCategorySelect = (badgeName) => {
    // Verifica se a categoria já está selecionada
    const isSelected = selectedCategories.includes(badgeName);
    // Atualiza as categorias selecionadas
    if (isSelected) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== badgeName)
      );
    } else {
      setSelectedCategories([...selectedCategories, badgeName]);
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
          <FormGroup>
            <FormControlLabel
              control={
                <CheckBox
                  checked={destaque}
                  onChange={handleDestaqueChange}
                  name="destaque"
                  sx={{ mb: 2 }}
                />
              }
              label="Artigo em Destaque"
              style={{ alignItems: "flex-start", marginLeft: "2px" }} // Adiciona margem à esquerda
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
                selectedCategories.includes(badge.name)
                  ? "contained"
                  : "outlined"
              }
              sx={{
                mr: 2,
                mb: 2,
                color: selectedCategories.includes(badge.name)
                  ? "white"
                  : "grey",
              }}
              onClick={() => handleCategorySelect(badge.name)}
            >
              {badge.name}
            </Button>
          ))}

          <TextField
            fullWidth
            id="outlined-controlled"
            label="Título"
            name="title"
            sx={{ width: "100%", mb: 2 }} // Largura total e margem inferior
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="Descrição"
            name="description"
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
          <Button variant="contained" endIcon={<Send />} sx={{ mt: 8 }}>
            Cadastrar
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddPost;
