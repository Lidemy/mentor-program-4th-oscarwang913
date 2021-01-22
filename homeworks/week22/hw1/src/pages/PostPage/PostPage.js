/* eslint-disable arrow-parens */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../WebAPI";
// 用hash的話表示他是換頁後，他只是首頁下面的某個子部分，而不是新的一頁，所以還是載入首頁

const PostPageContainer = styled.div`
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 12px;
`;

const PostContent = styled.p`
  line-height: 1.5;
`;

export default function PostPage() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState("");

  useEffect(() => {
    getSinglePost(id).then((data) => setSinglePost(data[0].body));
  }, [id, singlePost]);

  return (
    <PostPageContainer>
      <PostContent>{singlePost}</PostContent>
    </PostPageContainer>
  );
}
