import React from "react";
import styled from "styled-components";
import { Colors } from "../GlobalStyle";

interface Props {
  heading: string;
  text: string;
}

export const Tooltip: React.FC<Props> = ({ text, heading }) => {
  return (
    <TooltipDiv>
      <strong>?</strong>
      <TextSpan className="tooltip-text">
        <p>
          <strong>{heading}</strong>
        </p>
        <p>{text}</p>
      </TextSpan>
    </TooltipDiv>
  );
};

const TooltipDiv = styled.div`
  position: relative;
  display: inline-block;
  user-select: none;
  text-align: center;
  padding-top: 0.25rem;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 20rem;
  font-size: 0.9rem;
  background: ${Colors.darkGrey};

  &:hover {
    & .tooltip-text {
      visibility: visible !important;
    }
  }
`;

const TextSpan = styled.span`
  visibility: hidden;
  width: 12rem;
  background-color: ${Colors.brightGrey};
  font-size: 0.8rem;
  text-align: center;
  border-radius: 0.4rem;
  padding: 0.1rem;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: -100px;
`;
