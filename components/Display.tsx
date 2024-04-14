import * as React from 'react';
import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import space from './space';
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
    padding: 0 1rem;
    ${(props) =>
      props.isLarger &&
      css`
        text-shadow: 0 0 50px #ffff00aa;
      `}
  `
  export const H1Text = styled("h1", {
    shouldForwardProp: prop => isPropValid(prop) && prop !== 'isLarger',
  })<TextProps>`
  
    color: var(--text-color);
    margin: 0;
  
  ${({ isLarger }) =>
  isLarger
  ? css`
    font-size: 30px;
    font-weight: 600;
    text-shadow: 0 0 50px #ffff00aa;
  `
  : css`
    font-size: 20px;
    font-weight: 400;
  `}
     `


  const HamburgerInner = styled("div", {
    shouldForwardProp: prop => isPropValid(prop) && prop !== 'isOpen',
  })<{ isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  
    ${({ isOpen }) =>
      isOpen
        ? css`
            transform: translate(-50%, -50%) rotate(225deg);
            transition-delay: 0.12s;
            transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          `
        : css`
            transition-duration: 0.22s;
            transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          `}
          `