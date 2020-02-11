import React from "react";
import { Container, Header, Title, Logo, Paragraph } from "./styles";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import SkeletonIdCard from "../../components/SkeletonIdCard";
import ImagePreview from "../../components/ImagePreview";

const IndexPage: React.FC = () => {
  const [idCard, setIdCard] = useLocalStorage("id_card", '');
  const [status, setStatus] = useLocalStorage("status", '');
  return (
    <>
      <Container>
        <Header>
          <Logo>Bank Client</Logo>
        </Header>
        <Title>Scan your ID</Title>

        <Paragraph>
          Take a picture. It may take time to validate
          <br /> your personal information.
        </Paragraph>
        {status === '' ? (
          <SkeletonIdCard />
        ) : (
          <ImagePreview  status={status} imgSrc={idCard} />
        )}
      </Container>
    </>
  );
}

export default IndexPage;
