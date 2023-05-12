import { styled } from 'styled-components';

export const Item = styled.li`
  padding: 8px;
  max-width: 100%;
  width: 260px;
  height: 100%;

  img {
    display: block;
    min-height: 100%;
    height: 420px;
    width: 100%;

    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    transition: transform 250ms linear;
    transform: scale(1);

    object-fit: cover;
    object-position: center;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const MovieTitle = styled.h2`
  padding: 8px;
  max-width: 100%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  text-align: center;
  font-size: 14px;
  font-weight: 700;
`;