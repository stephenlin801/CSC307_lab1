import mut from "./module.js";

test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test("Testing sum with one negative -- success", () => {
  const expected = -6;
  const got = mut.sum(12, -18);
  expect(got).toBe(expected);
});

test("Testing sum with both negative -- success", () => {
  const expected = -30;
  const got = mut.sum(-12, -18);
  expect(got).toBe(expected);
});

test("Testing div -- success", () => {
  const expected = 5;
  const got = mut.div(30, 6);
  expect(got).toBe(expected);
});

test("Testing div with one negative -- success", () => {
  const expected = -5;
  const got = mut.div(30, -6);
  expect(got).toBe(expected);
});

test("Testing div with both negative -- success", () => {
  const expected = 5;
  const got = mut.div(-30, -6);
  expect(got).toBe(expected);
});

test("Testing div with divide by 0 -- success", () => {
  const expected = Infinity;
  const got = mut.div(30, 0);
  expect(got).toBe(expected);
});

test("Testing div with divide by 0 again -- success", () => {
  const expected = -Infinity;
  const got = mut.div(-30, 0);
  expect(got).toBe(expected);
});

test("Testing containsNumbers 1 -- success", () => {
  const got = mut.containsNumbers("lookat1 e");
  expect(got).toBeTruthy();
});

test("Testing containsNumbers 2 -- success", () => {
  const got = mut.containsNumbers("look");
  expect(got).toBeFalsy();
});

test("Testing containsNumbers 3 -- success", () => {
  const got = mut.containsNumbers("l00k");
  expect(got).toBeTruthy();
});

test("Testing containsNumbers 4 -- success", () => {
  // the problem is that for some reason space trips it to be true
  const got = mut.containsNumbers("one oh one");
  expect(got).toBeFalsy();
});

test("Testing containsNumbers 5 -- success", () => {
  const got = mut.containsNumbers("oneohone");
  expect(got).toBeFalsy();
});

test("Testing containsNumbers 6 -- success", () => {
  // space makes the thing true even though there is no number
  const got = mut.containsNumbers(" ");
  expect(got).toBeFalsy();
});

test("Testing containsNumbers 7 -- success", () => {
  const got = mut.containsNumbers("");
  expect(got).toBeFalsy();
});
