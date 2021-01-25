/* eslint-disable import/no-unresolved */
/* eslint-disable prefer-template */
/* eslint-disable quotes */
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { postNewPost } from "../../redux/reducers/singlePostReducer";

const PostFormContainer = styled.div`
  width: 100%;
  max-width: 850px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 25px;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PostForm = styled.form`
  width: 100%;
  text-align: center;
`;
const TitleInput = styled.input`
  padding: 12px 10px;
  font-size: 32px;
  line-height: 20px;
  width: 100%;
  margin-top: 16px;
  border: 0;
`;
const ContentInput = styled.textarea`
  padding: 12px 10px;
  font-size: 16px;
  width: 100%;
  margin-top: 20px;
  border: 0;
`;
const SubmitBtn = styled.button`
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  margin-top: 20px;
  font-weight: 600;
  font-size: 16px;
  width: 50%;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const handlePostSubmit = () => {
    dispatch(postNewPost({ title, body })).then((res) => {
      if (res && res.id) {
        history.push("/posts/" + res.id);
      }
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <PostFormContainer>
      <PostForm onSubmit={handlePostSubmit}>
        <TitleInput
          type="text"
          onChange={handleTitleChange}
          value={title}
          placeholder="New post title here..."
        />
        <ContentInput
          onChange={handleContentChange}
          value={body}
          placeholder="write your post content here..."
          rows="10"
        />
        <SubmitBtn>Submit</SubmitBtn>
      </PostForm>
    </PostFormContainer>
  );
}
