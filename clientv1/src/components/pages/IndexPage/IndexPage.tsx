import Topbar from "@/components/share/header/TopBar";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import DashboardLayout from "@/components/share/Dashboard/DashboardLayout";
import { useRouter } from "next/router";

interface IndexPageProps {
  user: string;
}

const IndexPage = ({ user }: IndexPageProps) => {
  const router = useRouter();

  return (
    <div className="p-6">
      <Head>
        <title>Digital Demand </title>
      </Head>
      <Topbar />
      <DashboardLayout />
    </div>
  );
};

export default IndexPage;
