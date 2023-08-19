import { api } from "$lib/eden"
import type { Message } from "../../Server/memgraph"

export async function load() {
	const { data: messages, error } = await api.messages.get()

	console.log(messages)
	console.log(error)

	return {
		messages: messages as Message[],
	}
}
