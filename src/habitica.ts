import axios from "npm:axios";
import { getConfig } from "./config.ts";
import { sortByDate } from "./date.ts";
import { HabiticaTask } from "./types.ts";

// yuichkun's habitica's ID
const AUTHOR_ID = "f9b0f250-35a4-498c-ae5b-3aa48bf167e7";
const { HABITICA_USER_ID, HABITICA_API_KEY } = getConfig();

const habiticaClient = axios.create({
  baseURL: "https://habitica.com",
  headers: {
    Accept: "application/json",
    "x-api-user": HABITICA_USER_ID,
    "x-api-key": HABITICA_API_KEY,
    "x-client": AUTHOR_ID + "-raycast",
  },
});

export async function retrieveTasks() {
  const res = await habiticaClient.get<{
    data: HabiticaTask[];
  }>("/api/v3/tasks/user?type=todos");
  return res.data.data;
}


function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

type SortTasksResponse = {
  success: boolean;
};
export async function sortTasks(tasks: HabiticaTask[]) {
  const withDueDate = (task: HabiticaTask) => {
    return Boolean(task.date);
  };
  const sortedTasks = tasks.filter(withDueDate).sort(sortByDate);
  console.log("Sort Target length", sortedTasks.length);
  let idx = 0;
  for (const task of sortedTasks) {
    idx++;
    console.log("[sort start] Task id:", idx);
    try {
      const res = await habiticaClient.post<SortTasksResponse>(`/api/v3/tasks/${task.id}/move/to/${idx}`);
      console.log("[sort end] Task id:", idx);
      if (res.status === 200 && res.data.success) {
        continue;
      } else {
        throw new Error(
          `something unexpected happened while processing ${task.id}. Response status: ${res.status}, data: ${res.data}`
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      await sleep(5_000);
    }
  }
}