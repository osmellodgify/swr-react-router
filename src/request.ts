export async function request(...args: Parameters<typeof fetch>) {
  return fetch(...args).then(res => res.json());
}
