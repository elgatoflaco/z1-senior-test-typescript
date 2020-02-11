import React from "react";
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonContainer,
  SkeletonContainerBars,
  SkeletonBar1,
  SkeletonBar2,
  SkeletonBar3,
  SkeletonBar4,
  SkeletonBar5,
  Container,
  RetakePicture
} from "./styles";

export const SkeletonIdCard = () => {
  return (
    <Container>
      <Skeleton>
        <SkeletonContainer>
          <SkeletonAvatar />
          <SkeletonContainerBars>
            <SkeletonBar1 />
            <SkeletonBar2 />
            <SkeletonBar2 />
            <SkeletonBar3 />
          </SkeletonContainerBars>
        </SkeletonContainer>
        <SkeletonContainer>
          <SkeletonBar4 />
          <SkeletonBar5 />
        </SkeletonContainer>
      </Skeleton>
      <RetakePicture to="/cam">Take Picture</RetakePicture>
    </Container>
  );
};

export default SkeletonIdCard;
