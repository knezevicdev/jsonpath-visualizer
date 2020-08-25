import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-left: 20px;
`;

export const Name = styled.span`
  display: inline-block;
  color: green;
  letter-spacing: 0.5px;
  font-style: none;
  vertical-align: top;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

export const ValueWrapper = styled.span`
  display: inline-block;
  padding-right: 6px;
  position: relative;
`;
