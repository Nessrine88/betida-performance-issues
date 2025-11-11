"use client";

import dynamic from "next/dynamic";

const ServerSiteComponents = dynamic(
  () => import("./components/modals/server-site-components/server-site-components"),
  { ssr: false }
);

export default ServerSiteComponents;
