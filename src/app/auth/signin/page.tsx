"use client";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null); // Specify the type explicitly

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // No more TypeScript error
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      emailOrUsername: formData.get("emailOrUsername"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      console.log("Error signing in:", res.error);
      if (res.error === "CredentialsSignin") {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("Oops :x.. something went wrong");
      }
    } else if (res?.ok) {
      window.location.href = "/";
    }

    setIsLoading((prev) => !prev);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex justify-center items-center">
      {/* form */}
      <div className="border border-neutral-400 shadow-inherit dark:border-neutral-600 w-80 py-8 mx-7 px-6  rounded-lg">
        <form onSubmit={handleSignIn}>
          <div>
            <h1 className="text-center font-semibold text-2xl">Welcome 🐱</h1>

            {/* Credentials */}
            <div className="my-5 flex flex-col gap-3">
              <div className="grid gap-1">
                <label htmlFor="email/username" className="text-sm">
                  Email{" "}
                  <span className="text-sm text-neutral-700 dark:text-neutral-400 text-ne">/</span>{" "}
                  Username
                </label>
                <Input
                  ref={inputRef}
                  id="email/username"
                  name="emailOrUsername"
                  placeholder="Kai Cenat"
                  required
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <Input id="password" name="password" type="password" placeholder="*****" required />
              </div>
              {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
            </div>

            <div className="w-full flex flex-col justify-center  gap-3">
              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="border w-full dark:bg-lime-800 dark:disabled:bg-lime-800/70 bg-lime-500 disabled:bg-lime-600 "
                >
                  {isLoading ? "Loading..." : "Sign In"}
                </Button>
              </div>
              <div className="my-2 w-full flex flex-col gap-1.5">
                <hr className="h-[1px]  bg-neutral-400 border-0 dark:bg-neutral-600" />
                <p className="text-center  w-full text-sm italic text-neutral-700 dark:text-neutral-400">
                  Or
                </p>
              </div>

              {/* Providers */}
              <div className="flex gap-2">
                {/* Google Provider */}
                <Button
                  type="button"
                  onClick={() => signIn("google", { redirectTo: "/" })}
                  className="border w-full flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                </Button>

                {/* Facebook Provider */}
                <Button
                  disabled
                  className="cursor-not-allowed border w-full flex justify-center items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="21"
                    height="21"
                    viewBox="0 0 48 48"
                  >
                    <linearGradient
                      id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                      x1="9.993"
                      x2="40.615"
                      y1="9.993"
                      y2="40.615"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#2aa4f4"></stop>
                      <stop offset="1" stopColor="#007ad9"></stop>
                    </linearGradient>
                    <path
                      fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                      d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                    ></path>
                  </svg>
                </Button>

                {/* Github Provider */}
                <Button
                  onClick={() => signIn("github", { redirectTo: "/" })}
                  type="button"
                  className="border w-full flex justify-center items-center"
                >
                  <svg
                    className="dark:fill-neutral-200"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="26"
                    height="26"
                    viewBox="0 0 64 64"
                  >
                    <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z"></path>
                  </svg>
                </Button>
              </div>

              <div className="text-center font-mono text-sm cursor-default">
                New here?{" "}
                <Link href="/auth/signup" className="hover:underline">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
