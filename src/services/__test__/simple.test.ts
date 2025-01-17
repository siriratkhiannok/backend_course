import { SimpleServiceImp } from "../simple";

test("SimpleServiceImp ok", () => {
  let service = new SimpleServiceImp();
  expect(service.ok()).toBe("OK");
});
