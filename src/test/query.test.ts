import { expect, test } from "vitest";
import {
  CONTEXT_URL,
  CONTEXT_URL_BY_ID,
  CONTEXT_URL_CREATE,
  CONTEXT_URL_UPDATE,
  CONTEXT_URL_UPDATE_CLICK,
  CONTEXT_URL_DELETE,
  CONTEXT_URL_SUBSCRPTION,
} from "../api/context-url";

test("query CONTEXT_URL is defined", () => {
  expect(CONTEXT_URL).toBeDefined();
});

test("query CONTEXT_URL_BY_ID is defined", () => {
  expect(CONTEXT_URL_BY_ID).toBeDefined();
});

test("query CONTEXT_URL_CREATE is defined", () => {
  expect(CONTEXT_URL_CREATE).toBeDefined();
});

test("query CONTEXT_URL_UPDATE is defined", () => {
  expect(CONTEXT_URL_UPDATE).toBeDefined();
});

test("query CONTEXT_URL_UPDATE_CLICK is defined", () => {
  expect(CONTEXT_URL_UPDATE_CLICK).toBeDefined();
});

test("query CONTEXT_URL_DELETE is defined", () => {
  expect(CONTEXT_URL_DELETE).toBeDefined();
});

test("query CONTEXT_URL_SUBSCRPTION is defined", () => {
  expect(CONTEXT_URL_SUBSCRPTION).toBeDefined();
});