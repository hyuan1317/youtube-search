import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers';
import { updatePage } from '../../actions/search';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageButton = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  border-radius: 50%;
  background-color: #ff4b4b;
  color: #fff;
  cursor: ${(props) => props.disabled ? 'initial' : 'pointer'};
  opacity: ${(props) => props.disabled ? 0.5 : 1};
  pointer-events: ${(props) => props.disabled ? 'none' : 'auto'};

  & + & {
    margin-left: 8px;
  }
`;

const Pagination: FC = () => {
  const { page, items } = useSelector(
    (store: RootState) => store.search,
  );
  const dispatch = useDispatch();

  function handleOnClick(page: number) {
    dispatch(updatePage(page));
  }
  function generatePageButton() {
    const totalPage = Math.ceil(items.length/10);
    const result = [];
    for (let i = 0; i < totalPage; i += 1) {
      const pageNumber = i + 1;
      result.push(
        <PageButton 
          key={i}
          disabled={pageNumber=== page}
          onClick={() => handleOnClick(pageNumber)}
        >
          {pageNumber}
        </PageButton>
      )
    }

    return result;
  }

  return (
    <Wrapper>
      {generatePageButton()}
    </Wrapper>
  );
}

export default Pagination;
