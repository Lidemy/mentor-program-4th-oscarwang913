/* eslint-disable quotes */
import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { postArticle } from "../../WebAPI";
// 用hash的話表示他是換頁後，他只是首頁下面的某個子部分，而不是新的一頁，所以還是載入首頁

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
  const [content, setContent] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();

  const handlePostSubmit = () => {
    // eslint-disable-next-line consistent-return
    postArticle(title, content).then((res) => {
      if (res.ok === 0) {
        return setErrorMessage(res.message);
      }
      history.push("/");
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
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
          value={content}
          placeholder="write your post content here..."
          rows="10"
        />
        <SubmitBtn>Submit</SubmitBtn>
      </PostForm>
    </PostFormContainer>
  );
}
