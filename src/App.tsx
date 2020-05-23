import React, { FC } from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';
import Content from './components/Content/Content';

const Wrapper = styled.div`
  padding: 10px;
`;

const App: FC = () => {
  return (
    <Wrapper>
      <Header />
      <Content />
    </Wrapper>
  );
}

export default App;
