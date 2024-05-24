import React from "react";
import DetailedCard from "../../components/DetailedCard";
import Loading from "../../components/Loading";

import styles from "./Main.module.scss";

import { getPhotos, toggleLike } from "../../redux/actions/photos";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getMainPostsAll } from "../../redux/actions/posts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { getAuthorizedUser } from "../../redux/actions/user";

const Main = () => {
  const navigate = useNavigate();

  const [statePosts, setStatePosts] = React.useState();

  React.useEffect(() => {
    const funRes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/postsByUser", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setStatePosts(response.data);
      } catch (err) {
        console.log(err);
        navigate("/auth");
        localStorage.clear();
      }
    };
    funRes();
  }, []);

  const postsAllMain = statePosts?.filter((post) => post.posts?.length > 0);

  const postsMaped = postsAllMain?.map((post) =>
    post.posts.filter((post) => post.likes.length > 2)
  );

  return (
    <div className={styles.main}>
      {!postsMaped ? (
        <Loading />
      ) : (
        postsMaped?.map((post) =>
          post?.map(({ author, imgUrl, likes, comments, id }) => (
            <DetailedCard
              key={id}
              id={id}
              userName={author?.nickname}
              userId={author?.id}
              imgUrl={imgUrl}
              likes={likes?.length}
              comments={comments}
              avatarUrl={author?.avatarUrl}
            />
          ))
        )
      )}
    </div>
  );
};

export default Main;

{
  /*
<InfiniteScroll
  style={{ overflow: "unset" }}
  dataLength={photos.length}
  next={() => setPage(page + 1)}
  // подгружать еще или нет
  // если длина массива с постами меньше чем общее число постов, то подгружать еще
  hasMore={photos.length < totalPhotos}
  loader={<Loading />}
  endMessage={<p style={{ textAlign: "center" }}>Пора за работу!</p>}
> */
}
{
  /* </InfiniteScroll>
      )} */
}
