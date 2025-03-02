import { callApi } from "./util";

const QUESTION_ROUTE = "/question";

export async function getQuestion() {
  const data = await callApi(QUESTION_ROUTE, "GET");

  if (data?.error) throw new Error(data.error);

  return data.question;
}

export async function answerQuestion(questionId, val) {
  const body = { option: val, question_id: questionId };
  const data = await callApi(QUESTION_ROUTE + "/answer", "POST", body);

  if (data?.error) throw new Error(data.error);

  return data.data;
}

export async function getHint(questionId) {
  const data = await callApi(QUESTION_ROUTE + "/hint", "POST", { question_id: questionId });

  if (data?.error) throw new Error(data.error);

  return data.clue;
}