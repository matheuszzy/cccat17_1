import { signup } from "../src/signup";

test("deve registrar um usuário", async function ()  {
  const input = {
    name: "Matheus",
    email: "joe.doe@gmail.com",
    cpf: "97456321558",
    carPlate: "ABC-1234",
    isPassenger: true,
    isDriver: true,
  };

  const result = await signup(input);

  expect(result.accountId).toBeDefined();
});
