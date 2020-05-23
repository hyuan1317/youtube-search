import React, { FC } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import YoutubeCard from './YoutubeCard';
import Pagination from './Pagination';

const Wrapper = styled.div`
  display: grid;
  width: auto; 
  padding: 10px;
  grid-template-columns: repeat(3, 320px);
  column-gap: 20px;
  row-gap: 20px;

  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(2, 320px);
  }

  @media screen and (max-width: 730px) {
    grid-template-columns: repeat(1, 320px);
  }
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Icon = styled.div`
  display: inline-block;
  font-size: 50px;
  animation: spin 0.5s infinite linear;

  @keyframes spin {
    0% {
      transform:rotate(0deg);
    }
    100% {
      transform:rotate(359deg);
    }
  }
`;

const Content: FC = () => {
  const { isFetching, items, page, errorMessage } = useSelector(
    (store: RootState) => store.search,
  );

  const displayItems = items.slice((page-1) * 10, page * 10) 

  if (errorMessage) {
    return (
      <Center>
        <p>{errorMessage}</p>
      </Center>
    )
  }
  if (isFetching) {
    return (
      <Center>
        <Icon className="fa fa-refresh" />
      </Center>
    );
  }
  if (items.length === 0) {
    return (
      <Center>
        <p>No data</p>
      </Center>
    );
  }


  return (
    <>
      <Center>
        <Wrapper>
          {
            displayItems.map(item => <YoutubeCard key={item.etag} item={item} />)
          }
        </Wrapper>
      </Center>
      <Pagination />
    </>
  );
}

export default Content;
