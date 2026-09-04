"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import WorkspaceExperience from "./WorkspaceExperience";
import { useWorkspace } from "./useWorkspace";

export default function DemoPage() {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();
  const workspace = useWorkspace(user?.id);

  const viewer = user
    ? {
        firstName: user.firstName,
        username: user.username,
        fullName: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
      }
    : null;

  return (
    <WorkspaceExperience
      workspace={workspace}
      viewer={viewer}
      ready={isLoaded}
      mode="authenticated"
      onSignOut={() => signOut({ redirectUrl: "/" })}
    />
  );
}
