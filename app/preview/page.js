"use client";

import WorkspaceExperience from "../demo/WorkspaceExperience";
import { usePreviewWorkspace } from "../demo/usePreviewWorkspace";

export default function PreviewPage() {
  const workspace = usePreviewWorkspace();

  return <WorkspaceExperience workspace={workspace} mode="preview" ready />;
}
