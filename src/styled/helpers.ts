import { css } from 'styled-components';
import colors from './colors';
import { FieldValueProps } from './components';

export const fieldValueProps = (textColor: keyof typeof colors, hasBackground = false): FieldValueProps => {
  return {
    textColor,
    hasBackground,
  };
};

export const matchedStyle = css`
  color: red;
`;
