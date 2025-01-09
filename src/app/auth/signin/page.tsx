import { redirect } from "next/navigation";
// {auth} too from the docs, idk what's that for
import { signIn } from "@/app/auth";
import { AuthError } from "next-auth";

/* props: {
  searchParams: { callbackUrl: string | undefined };
} */

export default async function SignInPage() {
  // temporary

  const handleSignIn = () => {
    signIn("credentials");
  };

  return (
    <div>
      <form action="">
        tes
        <input type="text" id="input1" />
        <button></button>
      </form>
    </div>
  );
}
