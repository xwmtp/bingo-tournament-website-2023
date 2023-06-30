import React from "react";
import { ImageBlock } from "./ImageBlock";
import styled from "styled-components";

export const PreviousYears: React.FC = () => {
  return (
    <Container>
      <ImageBlock
        text={"2022"}
        url={"https://xwmtp.github.io/bingo2022/"}
        image={
          "https://raw.githubusercontent.com/xwmtp/bingo-tournament-website-2023/assets/images/previousYears/2022/background_480p.png"
        }
      />
      <ImageBlock
        text={"2021"}
        url={"https://xwmtp.github.io/bingo2021/"}
        image={
          "https://raw.githubusercontent.com/xwmtp/bingo-tournament-website-2023/assets/images/previousYears/2021/background_480p.png"
        }
      />
      <ImageBlock
        text={"2020"}
        url={"https://xwmtp.github.io/bingo2020/"}
        image={
          "https://raw.githubusercontent.com/xwmtp/bingo-tournament-website-2023/assets/images/previousYears/2020/background_480p.png"
        }
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
