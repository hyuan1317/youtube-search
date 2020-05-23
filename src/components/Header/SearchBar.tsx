import React, { FC, useState, ChangeEvent, MouseEvent } from 'react';
import { fetchSearchResult } from '../../actions/search';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  width: 400px;

  border-bottom: 2px solid #fff;

  @media screen and (max-width: 425px) {
    width: 200px;
  }
`;

const SearchInput = styled.input`
  flex: auto;
  border: none;
  color: #fff;
  background-color: transparent;
  outline: none;
  font-size: 18px;
  &::placeholder {
    color: #fff;
  }
`;

const SearchButton = styled.button`
  flex: 0 0 24px;
  border: none;
  outline: none;
  background-color: transparent;
  color: #fff;
`;

const SearchBar: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }
  function handleOnSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(fetchSearchResult(searchValue));
  }

  return (
    <Wrapper>
      <SearchInput
        value={searchValue}
        onChange={handleOnChange}
        placeholder="Search"
      />
      <SearchButton type="submit" onClick={handleOnSubmit}>
        <i className="fa fa-search"/>
      </SearchButton>
    </Wrapper>
  );
}

export default SearchBar;
