/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-parens */
import React, { useEffect } from "react";
import styled from "styled-components";
import Pagination from "../../components/pagination";
import { Link } from "react-router-dom";
import { timeConverter } from "../../utils";

import {
  getPostsCount,
  pagingPosts,
  setCurrentPage,
} from "../../redux/reducers/postsReducer";
// eslint-disable-next-line quotes
import { useDispatch, useSelector } from "react-redux";

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

  &:hover {
    text-decoration: none;
  }
`;
const PostDate = styled.div``;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{timeConverter(post.createdAt)}</PostDate>
    </PostContainer>
  );
}

export default function HomePage() {
  const posts = useSelector((store) => store.posts.posts);
  const totoalPageCount = useSelector((store) => store.posts.totoalPostCount);
  const currentPage = useSelector((store) => store.posts.currentPage);
  const postsPerPage = 5;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsCount());
    dispatch(pagingPosts(currentPage, postsPerPage));
  }, [dispatch, currentPage, postsPerPage]);

  const handlePageClick = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <HomePageContainer>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totoalPageCount={totoalPageCount}
        handlePageClick={handlePageClick}
      />
    </HomePageContainer>
  );
}
