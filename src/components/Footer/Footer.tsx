import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import "./Footer.css";

const SocialMediaIcons = () => (
  <div className="footer-icons">
    <FontAwesomeIcon icon={faSquareFacebook} aria-label="Facebook" />
    <FontAwesomeIcon icon={faInstagram} aria-label="Instagram" />
    <FontAwesomeIcon icon={faTwitter} aria-label="Twitter" />
    <FontAwesomeIcon icon={faYoutube} aria-label="YouTube" />
  </div>
);

const FooterLinks = () => (
  <div className="footer-links">
    <a href="#" target="_blank" rel="noopener noreferrer">
      Conditions of Use
    </a>
    <a href="#" target="_blank" rel="noopener noreferrer">
      Privacy & Policy
    </a>
    <a href="#" target="_blank" rel="noopener noreferrer">
      Press Room
    </a>
  </div>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <SocialMediaIcons />
        <FooterLinks />
        <div className="footer-bottom">© 2023 Movies by Octet</div>
      </div>
    </footer>
  );
};

export default Footer;
