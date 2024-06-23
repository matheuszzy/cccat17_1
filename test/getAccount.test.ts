import { getAccount } from "../src/getAccount";

test("Deve retornar uma conta já existente", async () => {
    const input = {
        accountId: "414530fe-6fe7-4e04-9b74-5f817cf3b00c"
    }
    const result = await getAccount(input);
    expect(result.account_id).toBe(input.accountId);
})