import { Button, Header, Menu, Text, Title } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import { useRouter } from "next/router";

const Topbar = () => {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/");
  };
  return (
    <Header
      height={{ base: 50, md: 70 }}
      p="md"
      className="flex select-none items-center justify-between mb-3"
    >
      <div className="flex h-full items-center justify-between w-full">
        <a
          href="#"
          rel="noreferrer"
          className="mr-12 flex items-center gap-x-2 no-underline transition-all hover:saturate-150"
        >
          <img src="/logo.png" alt="Logo" className="h-8" />
          <Title order={3} color="cyan">
            Digital Dashboard
          </Title>
        </a>
        <div>
          <Menu shadow="md" trigger="hover" position="bottom-start">
            <Menu.Target>
              <Button className="cursor-pointer" variant="subtle" color="dark">
                <IconUserCircle />
              </Button>
            </Menu.Target>
            <Menu.Dropdown miw={200}>
              <div className="grid gap-1 p-2 hover:bg-slate-100 cursor-pointer">
                <Text onClick={logout}>Logout</Text>
              </div>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </Header>
  );
};

export default Topbar;
