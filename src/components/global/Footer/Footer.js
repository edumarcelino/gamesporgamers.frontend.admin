import React from 'react';
import { FaFacebook, FaInstagram, FaTwitch, FaTwitter, FaYoutube } from 'react-icons/fa';
import './Footer.css';


const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="text-center">
        <a href="https://www.instagram.com/gamesporgamers/">
          <FaFacebook color="white" size="lg" />
        </a>
        &nbsp;&nbsp;&nbsp;
        <a href="https://www.youtube.com/c/SpeakupTech">
          <FaInstagram color="white" size="lg" />
        </a>
        &nbsp;&nbsp;&nbsp;  
        <a href="https://www.instagram.com/gamesporgamers/">
          <FaYoutube color="white" size="lg" />
        </a>
        &nbsp;&nbsp;&nbsp;
        <a href="https://www.youtube.com/c/SpeakupTech">
          <FaTwitter color="white" size="lg" />
        </a> 
        &nbsp;&nbsp;&nbsp;
        <a href="https://www.youtube.com/c/SpeakupTech">
          <FaTwitch color="white" size="lg" />
        </a> 
      </div>
      <p className="footer_text text-center">{new Date().getFullYear()} - www.gamesporgamers.com.br</p>
    </footer>
  );
}

export default Footer;