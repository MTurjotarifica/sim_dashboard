import { isAuthenticated } from "@/Auth/auth";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = dynamic(() => import("@/components/pages/Account/index"));

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <>
      <Head>Digital Demand</Head>
      <Login />
    </>
  );
}
