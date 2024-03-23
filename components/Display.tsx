import * as React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import space from './space';
import type { HTMLProps } from 'react';
import { css } from '@emotion/react';


const MContainer = styled('div')<{orientInline?: boolean}>`
  display: grid;
  grid-gap: ${p => space(p.orientInline ? 3 : 1)};
  grid-auto-flow: ${p => (p.orientInline ? 'column' : 'row')};
  grid-auto-rows: max-content;
  grid-auto-columns: max-content;
`;


interface TextProps {
    isLarger?: boolean
  }
  
  export const SText = styled("p", {
    shouldForwardProp: (propName: string) => isPropValid(propName),
  })<TextProps>`
    font-size: ${(props) => (props.isLarger ? 18 : 14)}px;
    font-weight: ${(props) => (props.isLarger ? 600 : 400)};
    color: var(--text-color);
    margin: 0;
    ${(props) =>
      props.isLarger &&
      css`
        text-shadow: 0 0 50px #ffff00aa;
      `}
  `
  export const H1Text = styled("h1", {
    shouldForwardProp: (propName: string) => isPropValid(propName),
  })<TextProps>`
    font-size: ${(props) => (props.isLarger ? 30 : 20)}px;
    font-weight: ${(props) => (props.isLarger ? 600 : 400)};
    color: var(--text-color);
    margin: 0;
    ${(props) =>
      props.isLarger &&
      css`
        text-shadow: 0 0 50px #ffff00aa;
      `}
  `