import styled, { css } from 'styled-components';

import { Wrapper as StyledWrapper } from 'styled/components';
import colors from 'styled/colors';
import { matchedStyle } from 'styled/helpers';

interface CollapseProps {
  opened: boolean;
}

export const Wrapper = styled(StyledWrapper)<CollapseProps>`
  ${({ opened }) =>
    !opened &&
    css`
      display: flex;
    `}
`;

export const Value = styled.span<CollapseProps>`
  ${({ opened }) =>
    !opened &&
    css`
      display: flex;
    `}
`;

export const Content = styled.div<CollapseProps>`
  ${({ opened }) =>
    !opened &&
    css`
      display: none;
    `}
`;

export const Bracket = styled.span`
  font-weight: bold;
  color: ${colors.white};

  [data-matched='true'] & {
    ${matchedStyle}
  }
`;

export const Ellipsis = styled.span`
  display: inline-block;
  color: ${colors.orange};
  font-size: 18px;
  line-height: 10px;
  cursor: pointer;
`;
