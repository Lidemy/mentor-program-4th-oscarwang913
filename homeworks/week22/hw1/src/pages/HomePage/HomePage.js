/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable quotes */
/* eslint-disable arrow-parens */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Proptypes from "prop-types";
import { Link } from "react-router-dom";
import { getPosts, getLimitPost } from "../../WebAPI";
// 用hash的話表示他是換頁後，他只是首頁下面的某個子部分，而不是新的一頁，所以還是載入首頁
import Pagination from "../../components/Pagination";

const HomePageContainer = styled.div`
  max-width: 80vw;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #cccccc;
`;
const PostTitle = styled(Link)`
  font-weight: 600;
  width: 60%;
  color: #000000;
`;
const PostDate = styled.div``;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: Proptypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [totoalPageCount, setTotoalPageCount] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    getPosts().then((res) => setTotoalPageCount(res.length));
  });

  useEffect(() => {
    getLimitPost(currentPage, postsPerPage).then((data) => setPosts(data));
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <HomePageContainer>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination
        postsPerPage={postsPerPage}
        totoalPageCount={totoalPageCount}
        handlePageClick={handlePageClick}
      />
    </HomePageContainer>
  );
}
