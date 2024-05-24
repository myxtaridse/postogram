import React from "react";
import Modal from "react-modal";
import styles from "./EditMyPage.module.scss";
import axios from "axios";

const EditMyPage = ({ isOpenModal, setIsOpenModal, statePosts }) => {
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const [openEye, setOpenEye] = React.useState(false);
  const [isChangeAvatar, setChangeAvatar] = React.useState();
  const [isChangeNickname, setChangeNickname] = React.useState();
  const [isChangeFirstName, setChangeFirstName] = React.useState();
  const [isChangeLastName, setChangeLastName] = React.useState();
  const [isChangeAboutMe, setChangeAboutMe] = React.useState();
  const [isChangeUrl, setChangeUrl] = React.useState();
  const [isChangePassword, setChangePassword] = React.useState();
  const [isChangeEmail, setChangeEmail] = React.useState();

  const userEdit = {
    id: statePosts.id,
    avatarUrl: isChangeAvatar?.valueOf ? isChangeAvatar : statePosts.avatarUrl,

    description: isChangeAboutMe?.valueOf
      ? isChangeAboutMe
      : statePosts.description,

    firstName: isChangeFirstName?.valueOf
      ? isChangeFirstName
      : statePosts.firstName,

    lastName: isChangeLastName?.valueOf
      ? isChangeLastName
      : statePosts.lastName,

    nickname: isChangeNickname?.valueOf
      ? isChangeNickname
      : statePosts.nickname,

    url: isChangeUrl?.valueOf ? isChangeUrl : statePosts.url,

    subscribed: statePosts.subscribed,
    subscribers: statePosts.subscribers,
    email: isChangeEmail,
    password: isChangePassword,
  };

  const userEditInfo = {
    id: statePosts.id,
    avatarUrl: isChangeAvatar?.valueOf ? isChangeAvatar : statePosts.avatarUrl,

    description: isChangeAboutMe?.valueOf
      ? isChangeAboutMe
      : statePosts.description,

    firstName: isChangeFirstName?.valueOf
      ? isChangeFirstName
      : statePosts.firstName,

    lastName: isChangeLastName?.valueOf
      ? isChangeLastName
      : statePosts.lastName,

    nickname: isChangeNickname?.valueOf
      ? isChangeNickname
      : statePosts.nickname,

    url: isChangeUrl?.valueOf ? isChangeUrl : statePosts.url,

    subscribed: statePosts.subscribed,
    subscribers: statePosts.subscribers,
    posts: statePosts.posts,
  };

  const submitChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/users/${statePosts.id}`,
        userEdit,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const res = await axios.put(
        `http://localhost:3000/postsByUser/${statePosts.id}`,
        userEditInfo,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data, res.data);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    statePosts.id && (
      <Modal
        className="popupModal"
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className={styles.edit}>
          <div className={styles.edit__about}>
            <div className={styles.edit__about__avatar}>
              <img
                width={100}
                src={isChangeAvatar ? isChangeAvatar : statePosts.avatarUrl}
              />
              <input
                placeholder="Вставьте ссылку на фото"
                onChange={(e) => setChangeAvatar(e.target.value)}
              />
            </div>
            <div className={styles.edit__about__input}>
              <div>
                <p>Никнейм:</p>
                <input
                  onChange={(e) => setChangeNickname(e.target.value)}
                  placeholder={statePosts.nickname}
                />
              </div>
              <div>
                <p>Имя:</p>
                <input
                  onChange={(e) => setChangeFirstName(e.target.value)}
                  placeholder={statePosts.firstName}
                />
              </div>
              <div>
                <p>Фамилия:</p>
                <input
                  onChange={(e) => setChangeLastName(e.target.value)}
                  placeholder={statePosts.lastName}
                />
              </div>
              <div>
                <p>Описание вашей страницы:</p>
                <input
                  onChange={(e) => setChangeAboutMe(e.target.value)}
                  placeholder={statePosts.description}
                />
              </div>
              <div>
                <p>Ссылки на другие веб-страницы:</p>
                <input
                  onChange={(e) => setChangeUrl(e.target.value)}
                  placeholder={statePosts.url}
                />
              </div>
              <div>
                <p>Для изменений обязательно введите логин:</p>
                <input
                  placeholder="Введите E-mail"
                  onChange={(e) => setChangeEmail(e.target.value)}
                />
              </div>
              <div>
                <p>Для изменений обязательно введите пароль:</p>
                <div className={styles.edit__about__input__password}>
                  <input
                    placeholder="Введите Пароль"
                    type={openEye ? "type" : "password"}
                    required
                    onChange={(e) => setChangePassword(e.target.value)}
                  />
                  {openEye ? (
                    <div
                      onClick={() => {
                        setOpenEye(false);
                        //console.log("закрыт пароль");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="rgba(92,92,232,1)"
                      >
                        <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 11.4872 7.07719 10.9925 7.22057 10.5268C7.61175 11.3954 8.48527 12 9.5 12C10.8807 12 12 10.8807 12 9.5C12 8.48527 11.3954 7.61175 10.5269 7.21995C10.9925 7.07719 11.4872 7 12 7Z"></path>
                      </svg>
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setOpenEye(true);
                        //console.log("открыт пароль");
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="rgba(92,92,232,1)"
                      >
                        <path d="M9.34268 18.7819L7.41083 18.2642L8.1983 15.3254C7.00919 14.8874 5.91661 14.2498 4.96116 13.4534L2.80783 15.6067L1.39362 14.1925L3.54695 12.0392C2.35581 10.6103 1.52014 8.87466 1.17578 6.96818L3.14386 6.61035C3.90289 10.8126 7.57931 14.0001 12.0002 14.0001C16.4211 14.0001 20.0976 10.8126 20.8566 6.61035L22.8247 6.96818C22.4803 8.87466 21.6446 10.6103 20.4535 12.0392L22.6068 14.1925L21.1926 15.6067L19.0393 13.4534C18.0838 14.2498 16.9912 14.8874 15.8021 15.3254L16.5896 18.2642L14.6578 18.7819L13.87 15.8418C13.2623 15.9459 12.6376 16.0001 12.0002 16.0001C11.3629 16.0001 10.7381 15.9459 10.1305 15.8418L9.34268 18.7819Z"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button onClick={submitChange}>Редактировать</button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default EditMyPage;
