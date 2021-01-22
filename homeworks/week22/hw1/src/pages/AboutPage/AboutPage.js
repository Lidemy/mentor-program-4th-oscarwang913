/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
import React from "react";
import styled from "styled-components";
import background from "../../image/photo-1449247709967-d4461a6a6103.jpg";

const AboutPageContainer = styled.div`
  width: 100%;
  max-width: 550px;
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

const AboutPhoto = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: url(${background}) center bottom;
`;

const AboutTitle = styled.h1`
  margin-top: 16px;
`;

export default function AboutPage() {
  return (
    <AboutPageContainer>
      <AboutPhoto />
      <AboutTitle>Contenido</AboutTitle>
    </AboutPageContainer>
  );
}
