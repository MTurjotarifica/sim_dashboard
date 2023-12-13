import LoginForm from "@/components/share/Login/LoginForm";
import SignupForm from "@/components/share/Signup/SignupForm";
import { Title } from "@mantine/core";
import Head from "next/head";
import React, { useState } from "react";

const login = () => {
  const [createAccount, setCreateAccount] = useState(false);

  const switchAccount = () => {
    setCreateAccount(!createAccount);
  };
  return (
    <>
      <div className="flex h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-16 w-auto"
                src="/logo.png"
                alt="Digital Demand Dashboard"
              />
              <Title order={2} mt="1rem" fw={700}>
                {createAccount
                  ? "Create an Account"
                  : "Sign in to your account"}
              </Title>
            </div>
            {createAccount ? (
              <SignupForm switchAccount={switchAccount} />
            ) : (
              <LoginForm switchAccount={switchAccount} />
            )}
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover object-right"
            src="/login-background.jpg"
            alt="Background"
          />
        </div>
      </div>
    </>
  );
};

export default login;
