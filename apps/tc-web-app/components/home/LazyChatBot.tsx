"use client";

import dynamic from "next/dynamic";

const FloatingChatBot = dynamic(
  () =>
    import("@/components/home/FloatingChatBot").then(
      (module) => module.FloatingChatBot,
    ),
  {
    ssr: false,
  },
);

export function LazyChatBot() {
  return <FloatingChatBot />;
}
