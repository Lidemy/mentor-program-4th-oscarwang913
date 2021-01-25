/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-parens */
/* eslint-disable arrow-body-style */
/* eslint-disable quotes */
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getSinglePost,
  reset,
} from "../../redux/reducers/singlePostReducer";
import { timeConverter } from "../../utils";

const PostPageContainer = styled.div`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostContent = styled.p`
  line-height: 1.5;
  white-space: pre-line;
  word-break: break-word;
`;

const SinglePostTitle = styled.h1`
  font-size: 48px;
  font-weight: 600;
  word-break: break-word;
`;

export default function PostPage() {
  const { id } = useParams();
  const singlePost = useSelector((store) => store.singlePost.singlePost);
  const { body, title, createdAt } = singlePost;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id, dispatch]);

  // when the page unmount, the redux state is cleared
  useEffect(() => {
    return () => dispatch(reset());
  }, [dispatch]);

  const handleDeletePost = () => {
    dispatch(deletePost(id)).then(() => history.push("/"));
  };

  const handleEditPost = () => {
    history.push(`/editPost/${id}`);
  };

  return (
    <PostPageContainer>
      {title && <SinglePostTitle>{title}</SinglePostTitle>}
      <h4>{createdAt && timeConverter(createdAt)}</h4>
      {body && <PostContent>{body}</PostContent>}
      {singlePost && (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            ○○○
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              style={{ fontSize: "12px" }}
              onClick={handleEditPost}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              style={{ fontSize: "12px" }}
              onClick={handleDeletePost}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </PostPageContainer>
  );
}
