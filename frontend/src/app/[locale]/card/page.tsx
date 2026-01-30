import { Metadata } from "next";
import { ReactElement } from "react";
import CardContent from "./CardContent";
import PageTransition from "../PageTransition";
import Container from "@/components/ui/Container";
import { getMetadata } from "@/config/metadata";

export const metadata: Metadata = getMetadata({
  title: "Connect",
  description:
    "Connect with Elomar - LinkedIn, agency website, portfolio, and resume.",
});

const CardPage = (): ReactElement => {
  return (
    <PageTransition>
      <Container className="min-h-[80vh] py-16 lg:py-32 flex flex-col items-center justify-center">
        <CardContent />
      </Container>
    </PageTransition>
  );
};

export default CardPage;
