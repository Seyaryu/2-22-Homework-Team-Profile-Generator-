const Intern = require("../people/Intern");

test("Can set school via constructor", () => {
  const testValue = "UCSD";
  const e = new Intern("Kevin", 1, "test@test.com", testValue);
  expect(e.school).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  const testValue = "UCSD";
  const e = new Intern("Kevin", 1, "test@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});