import React from "react";
import styled, { keyframes } from "styled-components";

const LDSRingAnimation = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LDSRingContainer = styled.div`
  margin: 40% 0;
  display: flex;
  justify-content: center;
`;

const LDSRing = styled.div<SpinnerProps>`
  display: inline-block;
  position: relative;

  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          width: 20px;
          height: 20px;
        `;
      default:
        return `
          width: 80px;
          height: 80px;
        `;
    }
  }}

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;

    ${({ size }) => {
      switch (size) {
        case "small":
          return `
            width: 15px;
            height: 15px;
            border: 4px solid #000;
          `;
        default:
          return `
            width: 64px;
            height: 64px;
            border: 8px solid #000;
          `;
      }
    }}

    margin: 8px;
    border-radius: 50%;
    animation: ${LDSRingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

interface SpinnerProps {
  size?: string;
}

export const Spinner = ({ size }: SpinnerProps) => (
  <LDSRingContainer>
    <LDSRing size={size}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LDSRing>
  </LDSRingContainer>
);
