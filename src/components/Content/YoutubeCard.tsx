import React, { FC } from 'react';
import styled from 'styled-components';
import { SearchItem } from '../../actions/search';

const Wrapper = styled.a`
  display: inline-block;
  width: 320px;
  height: auto;
`;
const Img = styled.img`
  max-width: 100%;
  height: auto;
`;
const Title = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;

  font-size: 18px;
  line-height: 1.5;
`;

const YoutubeCard: FC<{ item: SearchItem }> = (props) => {
  const { snippet, id } = props.item;
  const { title, thumbnails } = snippet;

  const link = `https://www.youtube.com/watch?v=${id.videoId}`
  return (
    <Wrapper href={link}>
      <Img src={thumbnails.medium.url} />
      <Title>{title}</Title>
    </Wrapper>
  );
}

export default YoutubeCard;
