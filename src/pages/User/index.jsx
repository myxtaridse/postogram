import React from "react";
import styles from "./User.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CardUser from "../../components/CardUser";
import { useParams } from "react-router-dom";

import HeaderAccount from "../../components/HeaderAccount";
import OpenPost from "../../components/OpenPost";
import Loading from "../../components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import EditMyPage from "../../components/EditMyPage";
import AddNewPost from "../../components/AddNewPost";
import axios from "axios";

const User = ({ setIsIdRequest }) => {
  const clickRef = React.useRef();
  const [isOpenPost, setIsOpenPost] = React.useState(false);
  const [isPutValue, setIsPutValue] = React.useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [statePosts, setStatePosts] = React.useState();
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isOpenNewPost, setIsOpenNewPost] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [postsView, setPostsView] = React.useState([]);

  const myId = JSON.parse(localStorage.getItem("data"));
  const { id } = useParams();
  const postsAll = statePosts?.posts;

  React.useEffect(() => {
    const funRes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/postsByUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStatePosts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    funRes();
  }, []);

  React.useEffect(() => {
    if (postsAll?.length > 0) {
      const newPostsAll = [...postsAll];
      setPostsView(newPostsAll.splice(0, 9));
    }
  }, [postsAll]);

  const nextHandler = () => {
    if (postsAll?.length > 0) {
      const newPostsAll = [...postsAll];
      const offset = 9 * (page + 1);
      setPostsView([...postsView, ...newPostsAll?.splice(offset, offset + 9)]);
      setPage(page + 1);
    }
  };

  const putValues = (id) => {
    setIsOpenPost(true);
    setIsPutValue(id - 1);
  };

  return (
    <div className={styles.user}>
      <HeaderAccount
        id={statePosts?.id}
        avatarUrl={statePosts?.avatarUrl}
        nickname={statePosts?.nickname}
        postsLength={statePosts?.posts ? statePosts?.posts.length : 0}
        url={statePosts?.url}
        subscribers={
          statePosts?.subscribers ? statePosts?.subscribers.length : 0
        }
        subscribed={statePosts?.subscribed ? statePosts?.subscribed.length : 0}
        lastName={statePosts?.lastName}
        firstName={statePosts?.firstName}
        isMyPage={id == myId?.id}
        isMySubscription={statePosts?.subscribers?.includes(myId?.id)}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        isOpenNewPost={isOpenNewPost}
        setIsOpenNewPost={setIsOpenNewPost}
        setIsIdRequest={setIsIdRequest}
        statePosts={statePosts}
        myId={myId}
      />

      {postsView?.length > 0 ? (
        <InfiniteScroll
          dataLength={postsView.length}
          next={nextHandler}
          hasMore={postsView.length < postsAll.length}
          loader={<Loading />}

          // endMessage={<p style={{ textAlign: "center" }}>Пора за работу!</p>}
        >
          <div className={styles.user__body}>
            {postsView.map((post) => (
              <div
                className={styles.user__body__item}
                onClick={() => {
                  putValues(post.id);
                  setIsOpen(true);
                }}
              >
                <CardUser {...post} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className={styles.user__notPosts}>Постов нет</div>
      )}

      {/* <div
          className={styles.user__bg}
          ref={clickRef}
          onClick={onChangeBg}
        ></div> */}
      {isOpenPost && (
        <div className={styles.user__popup}>
          <OpenPost
            post={statePosts?.posts[isPutValue]}
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
      {isOpenModal && (
        <div className={styles.user__popup}>
          <EditMyPage
            statePosts={statePosts}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />
        </div>
      )}
      {isOpenNewPost && (
        <div className={styles.user__popup}>
          <AddNewPost
            statePosts={statePosts}
            myId={myId}
            isOpenNewPost={isOpenNewPost}
            setIsOpenNewPost={setIsOpenNewPost}
          />
        </div>
      )}
    </div>
  );
};

export default User;
