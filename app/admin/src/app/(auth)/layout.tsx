import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
}

export default function AdminLayout(props: AdminLayoutProps) {
  return (
    <Container>{props.children}</Container>
  )
}
