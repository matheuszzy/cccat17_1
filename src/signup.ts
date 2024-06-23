import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";

const ACCOUNT_ALREADY_EXISTS = -4;
const INVALID_NAME = -3;
const INVALID_EMAIL = -2;
const INVALID_CPF = -1;
const INVALID_CAR_PLATE = -5;

export async function signup(input: any): Promise<any> {
  const connection = pgp()(
    "postgres://postgres:password@localhost:5432/postgres"
  );
  try {
    const id = crypto.randomUUID();
    const [accountExists] = await connection.query(
      "select * from cccat17.account where email = $1",
      [input.email]
    );
    if (accountExists) return ACCOUNT_ALREADY_EXISTS;
    if (!isValidName(input.name)) return INVALID_NAME;
    if (!isValidEmail(input.email)) return INVALID_EMAIL;
    if (!validateCpf(input.cpf)) return INVALID_CPF;
    if (input.isDriver && !isValidCarPlate(input.carPlate)) return INVALID_CAR_PLATE;
    await connection.query(
      "insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)",
      [
        id,
        input.name,
        input.email,
        input.cpf,
        input.carPlate,
        !!input.isPassenger,
        !!input.isDriver,
      ]
    );
    return id;
  } finally {
    await connection.$pool.end();
  }
}

function isValidName(name: string) {
  return name.match(/[a-zA-Z] [a-zA-Z]+/);
}

function isValidEmail(email: string) {
  return email.match(/^(.+)@(.+)$/);
}

function isValidCarPlate(carPlate: string) {
  return carPlate.match(/[A-Z]{3}[0-9]{4}/);
}
