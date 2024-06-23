import pgp from "pg-promise";

export async function getAccount(input: any): Promise<any> {
  const connection = pgp()(
    "postgres://postgres:password@localhost:5432/postgres"
  );
  try {
    const [account] = await connection.query(
      "select * from cccat17.account where account_id = $1",
      [input.accountId]
    );
    return account;
  } finally {
    await connection.$pool.end();
  }
}
