import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-container">
          <div className="footer-icons">
            <FontAwesomeIcon icon={faSquareFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faYoutube} />
          </div>
          <div className="footer-links">
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy & Policy</a>
            <a href="#">Press Room</a>
          </div>
          <div className="footer-bottom">© 2023 Movies by Octet</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
