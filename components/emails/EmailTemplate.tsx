import {
  Button,
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Hr,
} from "@react-email/components";
import * as React from "react";

export default function EmailTemplate({
  buttonText,
  content,
}: {
  buttonText?: string;
  content?: {
    title?: string;
    subtitle?: string;
    paragraphs?: string[];
    buttonUrl?: string;
  };
}) {
  // Default content if not provided
  const emailContent = {
    title: content?.title || "The Green Team",
    subtitle: content?.subtitle || "Connecting Youth with Nature",
    paragraphs: content?.paragraphs || [
      "Thank you for your interest in The Green Team! We're dedicated to supporting mental health and environmental conservation by connecting children and young people with the natural world.",
      "Our programs offer immersive experiences that help young people develop a deeper connection with nature while building important life skills.",
    ],
    buttonUrl:
      content?.buttonUrl || "https://boilerplate-nextjs-delta.vercel.app/",
  };

  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: "#f6f9f6",
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Section
            style={{
              backgroundColor: "#2D5A27",
              padding: "20px",
              textAlign: "center" as const,
            }}
          >
            <Text
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "white",
                margin: "0",
              }}
            >
              {emailContent.title}
            </Text>
            <Text
              style={{
                fontSize: "16px",
                color: "white",
                margin: "5px 0 0",
              }}
            >
              {emailContent.subtitle}
            </Text>
          </Section>

          <Section style={{ padding: "30px 20px" }}>
            {emailContent.paragraphs.map((paragraph, index) => (
              <Text key={index} style={{ fontSize: "16px", lineHeight: "1.5" }}>
                {paragraph}
              </Text>
            ))}

            {buttonText && (
              <Section
                style={{ textAlign: "center" as const, margin: "30px 0" }}
              >
                <Button
                  href={emailContent.buttonUrl}
                  style={{
                    backgroundColor: "#4A8F3E",
                    color: "white",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    textDecoration: "none",
                    fontSize: "16px",
                    border: "none",
                  }}
                >
                  {buttonText}
                </Button>
              </Section>
            )}
          </Section>

          <Hr style={{ borderColor: "#e6e6e6", margin: "0" }} />

          <Section
            style={{
              padding: "20px",
              textAlign: "center" as const,
              backgroundColor: "#f9f9f9",
              color: "#666666",
              fontSize: "14px",
            }}
          >
            <Text style={{ margin: "0 0 10px" }}>
              © 2025 The Green Team. All rights reserved.
            </Text>
            <Text style={{ margin: "0" }}>
              If you have any questions, please contact us at
              support@greenteam.org
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
