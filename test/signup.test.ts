import crypto from "crypto";
import { signup } from "../src/signup";
import { getAccount } from "../src/getAccount";

test("deve registrar um usuário", async function () {
  const randomInt = crypto.randomInt(100000);
  const input = {
    name: "Matheus Machado",
    email: `${randomInt}@gmail.com`,
    cpf: "97456321558",
    carPlate: "XYZ9876",
    isPassenger: true,
    isDriver: true,
  };
  const idCreated = await signup(input);
  const account = await getAccount({ accountId: idCreated });
  expect(idCreated).toBeDefined();
  expect(account.email).toBe(input.email);
  expect(account.name).toBe(input.name);
  expect(account.cpf).toBe(input.cpf);
  expect(account.car_plate).toBe(input.carPlate);
  expect(account.is_passenger).toBe(input.isPassenger);
  expect(account.is_driver).toBe(input.isDriver);
});
