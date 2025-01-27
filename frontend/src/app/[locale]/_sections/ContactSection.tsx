import { ReactElement } from "react";
import ContactWithSpaceInvaders from "@/components/home/ContactWithSpaceInvaders";
import Container from "@/components/ui/Container";

const ContactSection = (): ReactElement => {
  return (
    <Container>
      <ContactWithSpaceInvaders />
    </Container>
  );
};

export default ContactSection;
