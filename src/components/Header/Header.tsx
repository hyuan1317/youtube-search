import React, { FC } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const Wrapper = styled.header`
  display: flex;
  justify-content: center;

  padding: 10px 0;
  background-color: #ff4b4b;
`;

const Header: FC = () => {
  return (
    <Wrapper>
      <SearchBar/>
    </Wrapper>
  );
};

export default Header;
