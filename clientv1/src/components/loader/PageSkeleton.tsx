import Head from "next/head";

import { Loader, Text } from "@mantine/core";

const PageSkeleton = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex items-center gap-x-2">
          <Loader />
          <Text fz="xl" c="blue" fw={500}>
            Loading...
          </Text>
        </div>
      </div>
    </>
  );
};

export default PageSkeleton;
