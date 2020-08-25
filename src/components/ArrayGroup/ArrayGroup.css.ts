import styled, { css } from 'styled-components';

interface WrapperProps {
  collapsed: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  margin-left: 20px;

  ${({ collapsed }) =>
    !collapsed &&
    css`
      display: flex;
    `}
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

export const IconWrapper = styled.span`
  cursor: pointer;
`;