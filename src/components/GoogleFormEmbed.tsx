import React from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const FormDescription = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: #666;
`;

const IframeWrapper = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 100%; /* Adjust this value based on your form's aspect ratio */

  @media (min-width: 768px) {
    padding-top: 75%; /* Shorter height on larger screens */
  }

  @media (min-width: 1024px) {
    padding-top: 56.25%; /* 16:9 aspect ratio on very large screens */
  }
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

interface GoogleFormEmbedProps {
  formUrl: string;
  title?: string;
  description?: string;
  height?: string;
}

const GoogleFormEmbed: React.FC<GoogleFormEmbedProps> = ({
  formUrl,
  title,
  description,
  height,
}) => {
  return (
    <div>
      {(title || description) && (
        <>
          {title && <FormTitle>{title}</FormTitle>}
          {description && <FormDescription>{description}</FormDescription>}
        </>
      )}

      <FormContainer>
        <IframeWrapper style={height ? { paddingTop: 0, height } : undefined}>
          <StyledIframe
            src={formUrl}
            title="Google Form"
            frameBorder={0}
            marginHeight={0}
          >
            Loading form...
          </StyledIframe>
        </IframeWrapper>
      </FormContainer>
    </div>
  );
};

export default GoogleFormEmbed;
