import { isAuthenticated } from "@/Auth/auth";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const IndexPage = dynamic(() => import("@/components/pages/IndexPage/index"));

interface DashboardProps {
  user: string;
}
const index = ({ user }: DashboardProps) => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/");
    }
  }, []);
  return <IndexPage user={user} />;
};

export default index;
