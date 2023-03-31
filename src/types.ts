export type HabiticaTask = {
  id: string;
  text: string;
  date: string | null;
  tags: string[];
  type: "todo";
};
