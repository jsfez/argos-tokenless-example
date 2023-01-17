import { existsSync, readFileSync } from "node:fs";

const getEventPayload = async () => {
  const githubEventPath = process?.env?.GITHUB_EVENT_PATH;
  if (githubEventPath && existsSync(githubEventPath)) {
    try {
      return JSON.parse(readFileSync(githubEventPath, "utf-8")) || null;
    } catch {}
  }
  return null;
};

const getSha = async () => {
  const payload = await getEventPayload();
  const shaFromEvent = payload?.pull_request?.head.sha;
  console.log({ shaFromEvent });
  return payload?.pull_request?.head.sha || process?.env?.GITHUB_SHA;
};

getSha();
