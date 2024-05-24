import React from "react";
import styles from "./HeaderAccount.module.scss";
import Popup from "../Popup";
import axios from "axios";

const HeaderAccount = ({
  avatarUrl,
  nickname,
  postsLength,
  url,
  firstName,
  lastName,
  subscribed,
  subscribers,
  isMyPage,
  isMySubscription,
  isOpenModal,
  setIsOpenModal,
  setIsOpenNewPost,
  setIsIdRequest,
  statePosts,
  myId,
  id,
}) => {
  const [isPopup, setIsPopup] = React.useState(false);
  const clickRef = React.useRef();

  const subscribMy = async () => {
    try {
      if (isMySubscription) {
        statePosts.subscribers = statePosts.subscribers?.filter(
          (subs) => subs !== myId?.id
        );
      } else {
        statePosts.subscribers?.push(myId?.id);
      }
      console.log(statePosts);
      const res = await axios.put(
        `http://localhost:3000/postsByUser/${id}`,
        statePosts,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        clickRef.current &&
        !event.composedPath().includes(clickRef.current)
      ) {
        setIsPopup(false);
        //console.log("закрыто");
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={clickRef} className={styles.header}>
      <img src={avatarUrl} alt="avatar" />
      <div className={styles.header__detailes}>
        <div className={styles.header__detailes__setting}>
          <h1>{nickname}</h1>
          {isMyPage ? (
            <Popup
              setIsIdRequest={setIsIdRequest}
              isPopup={isPopup}
              setIsPopup={setIsPopup}
              isOpenModal={isOpenModal}
              setIsOpenModal={setIsOpenModal}
              setIsOpenNewPost={setIsOpenNewPost}
            />
          ) : isMySubscription ? (
            <button
              onClick={subscribMy}
              className={styles.header__detailes__setting__unsubscribe}
            >
              Отписаться
            </button>
          ) : (
            <button
              onClick={subscribMy}
              className={styles.header__detailes__setting__subscribe}
            >
              Подписаться
            </button>
          )}
        </div>
        <div className={styles.header__detailes__static}>
          <div>
            <h3>{postsLength}</h3>
            <p>публикаций</p>
          </div>
          <div>
            <h3>{subscribers}</h3>
            <p>подписчиков</p>
          </div>
          <div>
            <h3>{subscribed}</h3>
            <p>подписки</p>
          </div>
        </div>
        <div className={styles.header__detailes__about}>
          <p>{`${firstName} ${lastName}`}</p>
          <a href={url} target="_blank">
            <div width={200}>{url}</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeaderAccount;
