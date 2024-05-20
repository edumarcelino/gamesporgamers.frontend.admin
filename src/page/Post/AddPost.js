import React, { useState, useEffect, useRef } from "react";
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
  Snackbar,
} from "@mui/material";
import MySidebar from "../../components/global/MySidebar/MySidebar";
import { Send } from "@mui/icons-material";
import axios from "axios";
import AuthService from "../../services/AuthService";
import { useDropzone } from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [checked, setChecked] = useState(true);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [badges, setBadges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const cropperRef = useRef(null);

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
    const isSelected = selectedCategories.some(
      (selectedBadge) => selectedBadge.id === badge.id
    );
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

  const onDrop = (acceptedFiles) => {
    setImage(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const getCroppedImage = () => {
    const cropper = cropperRef.current.cropper;
    const base64Image = cropper.getCroppedCanvas().toDataURL();

    // Função para converter Base64 para Blob
    const base64ToBlob = (base64, mimeType) => {
      const byteString = atob(base64.split(",")[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeType });
    };

    const mimeType = base64Image.split(",")[0].split(":")[1].split(";")[0]; // Ex: "image/png"
    const blob = base64ToBlob(base64Image, mimeType);

    console.log("Blob criado:", blob); // Log do Blob criado

    return blob; // Retorna o Blob diretamente
  };

  const uploadImage = async () => {
    try {
      const accessToken = AuthService.getCurrentUser();
      if (!accessToken) {
        console.error("Token de acesso não encontrado.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      };

      const blob = getCroppedImage();

      if (!blob) {
        console.error("Blob não foi criado corretamente.");
        return;
      }

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("fileName", "croppedImage.png");

      const response = await axios.post(
        "http://localhost:8080/api/v1/restrict/upload",
        formData,
        { headers }
      );

      return response.data; // Retorne diretamente a resposta completa
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      throw error;
    }
  };

  const cadastrar = async () => {
    try {
      const accessToken = AuthService.getCurrentUser();
      if (!accessToken) {
        console.error("Token de acesso não encontrado.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      };

      const imageUrlData = await uploadImage(); // Recebe a resposta completa do upload


      if (!imageUrlData || !imageUrlData.url) {
        console.error("URL da imagem não recebida.");
        return;
      }

      const imageUrl = imageUrlData.url;
      const response = await axios.post(
        "http://localhost:8080/api/v1/restrict/posts",
        {
          title: title,
          description: description,
          postTextHTML: text,
          datePost: new Date(),
          highlighted: checked,
          urlMainImage: imageUrl,
          badges: selectedCategories,
        },
        { headers }
      );

      setSnackbarMessage("Post cadastrado com sucesso!");
      setSnackbarOpen(true);
      setTitle("");
      setDescription("");
      setText("");
      setChecked(false);
      setSelectedCategories([]);
      setImage(null);
    } catch (error) {
      console.error("Erro ao cadastrar post:", error);
      setSnackbarMessage("Erro ao cadastrar post.");
      setSnackbarOpen(true);
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <MySidebar />
      <Box
        m="20px"
        height="100%"
        flexGrow={1}
        display="flex"
        flexDirection="column"
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
            value={title}
            onChange={handleTitleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            id="outlined-controlled"
            label="Descrição"
            value={description}
            onChange={handleDescriptionChange}
            sx={{ mb: 2 }}
          />

          <ReactQuill
            theme="snow"
            value={text}
            onChange={handleTextChange}
            style={{ height: "300px", marginBottom: "50px" }}
          />

          <div
            {...getRootProps()}
            style={{
              border: "2px dashed gray",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <input {...getInputProps()} />
            <p>
              Arraste e solte uma imagem ou clique para selecionar uma imagem
            </p>
          </div>

          {image && (
            <Cropper
              src={image}
              style={{ height: 400, width: "100%" }}
              // Cropper.js options
              initialAspectRatio={16 / 9}
              guides={false}
              ref={cropperRef}
            />
          )}

          <Button
            variant="contained"
            color="primary"
            startIcon={<Send />}
            onClick={() => {
              getCroppedImage();
              cadastrar();
            }}
            sx={{ mt: 2 }}
          >
            Cadastrar
          </Button>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
        </Box>
      </Box>
    </div>
  );
};

export default AddPost;
