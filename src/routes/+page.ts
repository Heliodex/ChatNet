import client from "$lib/trpc"

export async function load() {
	return {
		id: client.hello.query("omg"),
	}
}
