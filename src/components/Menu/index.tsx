"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../app/AuthContext";

import styles from "./index.module.scss";

export function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  function closeMenu() {
    setMenuOpen(false);
    document.body.classList.remove("menu-open");
  }

  function handleLinkClick(path: string) {
    router.push(path);
    closeMenu();
  }

  function toggleMenu() {
    setMenuOpen(function (prevMenuOpen) {
      return !prevMenuOpen;
    });
    document.body.classList.toggle("menu-open", !menuOpen);
  }

  return (
    <>
      <nav className={styles.menu}>
        <img
          className={styles.b1}
          src="/menuIcon.svg"
          alt="menu"
          onClick={toggleMenu}
        />
        <div className={styles.logoCenter}>
          <img className={styles.logo} src="/logoIcon.svg" alt="logo" />
          <h1>OhBless News</h1>
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={() => handleLinkClick("/admin/new/create")}
              className={styles.b2}
            >
              Criar Notícia
            </button>
          ) : (
            <>
              <button
                onClick={() => handleLinkClick("/login")}
                className={styles.b2}
              >
                Login
              </button>
              <button
                onClick={() => handleLinkClick("/register")}
                className={styles.b2}
              >
                Cadastre-se
              </button>
            </>
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.menuLateralOpen}>
          <img
            className={styles.b1}
            src="/closeIcon.svg"
            alt="menu"
            onClick={toggleMenu}
          />
          <ul>
            <li>
              <a
                onClick={function () {
                  handleLinkClick("/");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={function () {
                  handleLinkClick("/news/produto");
                }}
              >
                Produto
              </a>
            </li>
            <li>
              <a
                onClick={function () {
                  handleLinkClick("/news/tecnologia");
                }}
              >
                Tecnologia
              </a>
            </li>
            <li>
              <a
                onClick={function () {
                  handleLinkClick("/news/internacional");
                }}
              >
                Internacional
              </a>
            </li>
            <li>
              <a
                onClick={function () {
                  handleLinkClick("/news/esportes");
                }}
              >
                Esportes
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
