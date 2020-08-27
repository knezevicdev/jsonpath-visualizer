import styled, { css } from 'styled-components';
import colors from './colors';
import { matchedStyle } from './helpers';

export const Wrapper = styled.div`
  padding: 3px 0;
  margin-left: 20px;
`;

interface FieldNameProps {
  isNumber?: boolean;
}

export const FieldName = styled.span<FieldNameProps>`
  display: inline-block;
  color: ${colors.white};
  letter-spacing: 0.5px;
  font-style: none;
  vertical-align: top;
  opacity: 0.8;

  ${({ isNumber }) =>
    isNumber &&
    css`
      color: ${colors.aqua};
    `}

  [data-matched='true'] & {
    ${matchedStyle}
  }

  &:hover {
    opacity: 1;
  }
`;

export interface FieldValueProps {
  textColor: keyof typeof colors;
  hasBackground?: boolean;
}

export const FieldValue = styled.span<FieldValueProps>`
  display: inline-block;
  color: ${({ textColor }) => colors[textColor]};

  [data-matched='true'] &,
  &[data-matched='true'] {
    ${matchedStyle}
  }

  ${({ hasBackground }) =>
    hasBackground &&
    css`
      background-color: ${colors.gray};
      padding: 1px 2px;
      font-size: 11px;
      font-weight: bold;
      padding: 1px 2px;
      border-radius: 3px;
    `}
`;
