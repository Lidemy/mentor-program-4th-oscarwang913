/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const PageButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  margin-right: 8px;
`;

const Pagination = ({ postsPerPage, totoalPageCount, handlePageClick }) => {
  const pageNumbers = [];
  const length = Math.ceil(totoalPageCount / postsPerPage);
  for (let i = 1; i <= length; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map((pageNumber) => (
        <PageButton
          key={pageNumber}
          onClick={() => {
            handlePageClick(pageNumber);
          }}
        >
          {pageNumber}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
