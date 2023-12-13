import React from "react";

import { IconLoader2 } from "@tabler/icons-react";

type TabLoaderProps = {
  loading?: boolean;
};

const TabLoader: React.FC<TabLoaderProps> = ({ loading = false }) => {
  return loading ? <IconLoader2 size={14} className="animate-spin" /> : null;
};

export default TabLoader;
