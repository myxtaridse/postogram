import React from "react";
import Modal from "react-modal";
import styles from "./AddNewPost.module.scss";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AddNewPost = ({ isOpenNewPost, setIsOpenNewPost, statePosts }) => {
  const closeModal = () => {
    setIsOpenNewPost(false);
  };

  const [isImagePost, setIsImagePost] = React.useState();

  const userAddPost = {
    id: `${statePosts.posts?.length + 1}`,
    imgUrl: `${isImagePost}`,
    likes: [],
    comments: [],
    author: {
      id: statePosts.id,
      nickname: statePosts.nickname,
      avatarUrl: statePosts.avatarUrl,
    },
  };

  const userEdit = {
    id: statePosts.id,
    avatarUrl: statePosts.avatarUrl,
    description: statePosts.description,
    firstName: statePosts.firstName,
    lastName: statePosts.lastName,
    nickname: statePosts.nickname,
    url: statePosts.url,
    subscribed: statePosts.subscribed,
    subscribers: statePosts.subscribers,
  };

  React.useEffect(() => {
    if (userAddPost.imgUrl !== undefined && isImagePost !== undefined) {
      statePosts.posts?.push(userAddPost);
    }
  }, [isImagePost]);

  const userEditInfo = {
    ...userEdit,
    posts: statePosts.posts,
  };

  const submitChange = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/postsByUser/${statePosts.id}`,
        userEditInfo,
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

  return (
    statePosts.id && (
      <Modal
        className="popupModal"
        isOpen={isOpenNewPost}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className={styles.edit}>
          <img
            width={100}
            src={isImagePost ? isImagePost : statePosts.avatarUrl}
          />
          <input
            placeholder="Вставьте ссылку на фото"
            onChange={(e) => setIsImagePost(e.target.value)}
          />

          <button onClick={submitChange}>Редактировать</button>
        </div>
      </Modal>
    )
  );
};

export default AddNewPost;
