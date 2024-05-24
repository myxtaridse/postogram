import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();

  const myPage = () => {
    navigate(`/${dataUser.id}`);
    window.location.reload();
  };
  const dataUser = JSON.parse(localStorage.getItem("data"));

  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.header__left}>
          <img width={50} src={logo} alt="logo" />
          <p>Постограм</p>
        </div>
      </Link>
      {dataUser?.id && (
        <div onClick={myPage} className={styles.header__medium}>
          <img src={dataUser.avatarUrl} alt="avatar" />
          <h3>{dataUser.nickname}</h3>
        </div>
      )}
    </div>
  );
};

export default Header;
