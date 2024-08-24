import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";
import { AuthPage } from "@refinedev/chakra-ui";

export default async function Register() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <AuthPage type="register" />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
