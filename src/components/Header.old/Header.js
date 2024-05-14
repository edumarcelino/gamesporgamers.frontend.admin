import React, { Component } from 'react'
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import "./Header.css";
import axios from 'axios'

export class Header extends Component {

  constructor(props) {
    super(props)

    this.state = {
      categories: [],
      subcategories: []
    }
  }

  getDataCategories() {

    axios.get('http://localhost:8080/api/categories').then(res => {

      var dataCategories = res.data
      this.setState({ categories: dataCategories })

    })
  }

  getSubCategories() {

    axios.get('http://localhost:8080/api/subcategories').then(res => {

      var dataSubCategories = res.data
      this.setState({ subcategories: dataSubCategories })

    })
  }

  async componentDidMount() {
    //this.getDataCategories();
    //this.getSubCategories();
  }

  render() {

    //const categories = this.state.categories;

    //const subCategories = this.state.subcategories;

    return (
      <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" className="navbar">

        <Navbar.Brand href="#" className='text-center'
          style={{ paddingLeft: '10px' }}
        >
          <img
            src={process.env.PUBLIC_URL + "/images/logo.png"}
            
            className="d-inline-block align-top"
            alt="Games por Gamers logo"
          />
          <h6
            style={{
              fontSize: '10px'
            }}
          >Administração</h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Usuarios" id="navbarScrollingDropdown">
              <NavDropdown.Item href="action">Lista</NavDropdown.Item>
              <NavDropdown.Item href="action">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="action">Excluir</NavDropdown.Item>
              <NavDropdown.Item href="action">Alterar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Postagem" id="navbarScrollingDropdown">
              <NavDropdown.Item href="action">Lista</NavDropdown.Item>
              <NavDropdown.Item href="action">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="action">Excluir</NavDropdown.Item>
              <NavDropdown.Item href="action">Alterar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Comentários" id="navbarScrollingDropdown">
              <NavDropdown.Item href="action">Lista</NavDropdown.Item>
              <NavDropdown.Item href="action">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="action">Excluir</NavDropdown.Item>
              <NavDropdown.Item href="action">Alterar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Categorias" id="navbarScrollingDropdown">
              <NavDropdown.Item href="action">Lista</NavDropdown.Item>
              <NavDropdown.Item href="action">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="action">Excluir</NavDropdown.Item>
              <NavDropdown.Item href="action">Alterar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Sub-Categorias" id="navbarScrollingDropdown">
              <NavDropdown.Item href="action">Lista</NavDropdown.Item>
              <NavDropdown.Item href="action">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="action">Excluir</NavDropdown.Item>
              <NavDropdown.Item href="action">Alterar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Vídeos" id="navbarScrollingDropdown">
              <NavDropdown.Item href="action">Lista</NavDropdown.Item>
              <NavDropdown.Item href="action">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="action">Excluir</NavDropdown.Item>
              <NavDropdown.Item href="action">Alterar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Imagens" id="navbarScrollingDropdown">
              <NavDropdown.Item href="action">Lista</NavDropdown.Item>
              <NavDropdown.Item href="action">Cadastrar</NavDropdown.Item>
              <NavDropdown.Item href="action">Excluir</NavDropdown.Item>
              <NavDropdown.Item href="action">Alterar</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav.Link href="#action1">edu - Logout</Nav.Link>

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;