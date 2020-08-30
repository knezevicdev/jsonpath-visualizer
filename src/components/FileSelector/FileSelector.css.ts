import styled from 'styled-components';

export const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const Label = styled.label`
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 20px;

  ${Input}:focus + &,
  &:hover {
    background-color: red;
  }

  ${Input}:focus + & {
    outline: 1px dotted #000;
    outline: -webkit-focus-ring-color auto 5px;
  }

  & * {
    pointer-events: none;
  }

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;
