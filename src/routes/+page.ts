import client from "$lib/eden"

export async function load() {
	const { data: id, error } = await client.id["test"].get()

	console.log(id)
	console.log(error)

	return {
		id: ""
	}
}
