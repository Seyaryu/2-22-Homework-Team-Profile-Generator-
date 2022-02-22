const Engineer = require("../people/Engineer");

test("Can set GitHUb account via constructor", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("Kevin", 1, "test@test.com", testValue);
  expect(e.github).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "GitHubUser";
  const e = new Engineer("Kevin", 1, "test@test.com", testValue);
  expect(e.getGithub()).toBe(testValue);
});