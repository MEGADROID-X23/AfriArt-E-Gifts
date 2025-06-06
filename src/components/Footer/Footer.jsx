import React from "react";
import "./Footer.css";
import { SiLinkedin } from "react-icons/si";
import { BsTwitter, BsWhatsapp, BsInstagram, BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Footer = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <div className="footer">
      <small> &copy; {copyrightYear} AfriArt. All Rights Reserved | Made By the</small>{" "}
            <a
              href="https://lasop.net/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "orange", textDecoration: "none" }}
            >
              LASOP Team
            </a>{" "}
      <div className="social-links">
        <Link to="https://wa.me/+2347025713326" target="_blank">
          <BsWhatsapp />
        </Link>
        <Link to="https://linkedin.com/company/lasopdotnet" target="_blank">
          <SiLinkedin />
        </Link>
        <Link to="https://twitter.com/Lasopdotnet" target="_blank">
          <BsTwitter />
        </Link>
        <Link to="https://www.instagram.com/lasopdotnet" target="_blank">
          <BsInstagram />
        </Link>
        <Link to="https://www.facebook.com/lasopdotnet" target="_blank">
          <BsFacebook />
        </Link>
      </div>
    </div>
  );
};
