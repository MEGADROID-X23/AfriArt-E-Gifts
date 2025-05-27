import React from "react";
import "./Footer.css";
import { ImGithub } from "react-icons/im";
import { SiLinkedin } from "react-icons/si";
import { BsTwitter, BsWhatsapp } from "react-icons/bs";
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
        <Link to="https://wa.me/+2348052950689" target="_blank">
          <BsWhatsapp />
        </Link>
        <Link to="https://github.com/MEGADROID-X23" target="_blank">
          <ImGithub />
        </Link>
        <Link to="https://www.linkedin.com/in/tochukwu-nwadibia-b8b50734a/" target="_blank">
          <SiLinkedin />
        </Link>
      </div>
    </div>
  );
};
