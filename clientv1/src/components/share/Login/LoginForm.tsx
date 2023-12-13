import React, { useEffect, useState } from "react";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { loginApi } from "@/api/loginApi";

interface LoginFormProps {
  switchAccount: (value: any) => void;
}

const LoginForm = ({ switchAccount }: LoginFormProps) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const toastHandler = () => {
    toast.error(`${toastMessage}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    if (toastMessage) {
      toastHandler();
    }
  }, [toastMessage]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginApi(username, password, setToastMessage, router);
  };

  return (
    <form onSubmit={onSubmit} className="pt-4">
      <TextInput
        label="Username"
        required
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <PasswordInput
        mt="md"
        label="Password"
        required
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Text
        className="text-right text-xs text-blue-400 mt-2 cursor-pointer hover:text-blue-500"
        onClick={switchAccount}
      >
        Create an Account
      </Text>
      <Button type="submit" variant="outline" className="mt-8 w-full">
        Login
      </Button>
      {/* {login.isError && (
                <Alert
                  title="Login failed"
                  color="red"
                  variant="outline"
                  mt="md"
                  icon={<IconAlertCircle size="1rem" />}
                >
                  {login.error.message}
                </Alert>
              )} */}
    </form>
  );
};

export default LoginForm;
