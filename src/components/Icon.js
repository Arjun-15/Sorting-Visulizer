import React from 'react';
import styled from 'styled-components';

// // Styled SVG for the Reset Icon (Rotating Left Arrow with Dotted Ends)
// const ResetIconSvg = styled.svg`
//   width: 50px;
//   height: 50px;
//   fill: none;
//   stroke: black;
//   stroke-width: 3;
//   stroke-linecap: round;
// `;

// const DottedEnd = styled.circle`
//   stroke-dasharray: 2, 6;
//   stroke-width: 2;
//   fill: black;
// `;

// // The rotating leftward arrow with dotted ends
// export const ResetIcon = () => (
//   <ResetIconSvg viewBox="0 0 100 100">
//     {/* Arrowhead */}
//     <path d="M 50 50 L 30 60 L 50 40" />
//     {/* Leftward circular arrow */}
//     <path d="M 50 20 C 20 20, 20 80, 50 80 C 80 80, 80 50, 50 50" />

//     {/* Dotted end circles */}
//     <DottedEnd cx="50" cy="20" r="3" />
//     <DottedEnd cx="30" cy="60" r="3" />
//   </ResetIconSvg>
// );


const PlayIconSvg = styled.svg`
  width: 50px;
  height: 50px;
  fill: black;
  stroke: none;
`;

export const PlayIcon = () => (
  <PlayIconSvg viewBox="0 0 100 100">
    {/* Rightward Triangle */}
    <polygon points="30,20 70,50 30,80" />
  </PlayIconSvg>
);

const PauseIconSvg = styled.svg`
  width: 50px;
  height: 50px;
  fill: black;
  stroke: none;
`;

export const PauseIcon = () => (
  <PauseIconSvg viewBox="0 0 100 100">
    {/* Two Vertical Bars */}
    <rect x="30" y="20" width="10" height="60" />
    <rect x="60" y="20" width="10" height="60" />
  </PauseIconSvg>
);


const PreviousIconSvg = styled.svg`
  width: 50px;
  height: 50px;
  fill: none;
  stroke: black;
  stroke-width: 5;
  stroke-linecap: round;
`;

export const PreviousIcon = () => (
  <PreviousIconSvg viewBox="0 0 100 100">
    {/* Leftward Arrow */}
    <path d="M 60 20 L 30 50 L 60 80" />
  </PreviousIconSvg>
);
const NextIconSvg = styled.svg`
  width: 50px;
  height: 50px;
  fill: none;
  stroke: black;
  stroke-width: 5;
  stroke-linecap: round;
`;

export const NextIcon = () => (
  <NextIconSvg viewBox="0 0 100 100">
    {/* Rightward Arrow */}
    <path d="M 40 20 L 70 50 L 40 80" />
  </NextIconSvg>
);





const IconContainer = styled.svg`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Circle = styled.circle`
  fill: none;
  stroke: #000;
  stroke-width: 2;
`;

const DottedLine = styled.line`
  stroke: #000;
  stroke-width: 2;
  stroke-dasharray: 2, 2;
`;

const Arrow = styled.path`
  fill: #000;
`;

export const ResetIcon  = () => {
  return (
    <IconContainer viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" />
      <DottedLine x1="12" y1="2" x2="12" y2="8" />
      <Arrow d="M10 7 L12 5 L14 7 Z" />
      <DottedLine x1="12" y1="8" x2="12" y2="12" />
    </IconContainer>
  );
};



export const StyledInput = styled.input`
    text-align: left;
    font-size: large;
    width: ${props => props.width || '98%'};
    padding: 5px;
    margin-left:${props => props.marginLeft || 'auto'};
    margin-top:${props => props.marginTop || 'auto'};
`
