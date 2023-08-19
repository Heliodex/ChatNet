<script lang="ts">
	import { api } from "$lib/eden.js"
	import type { Message } from "../../Server/memgraph"

	export let data

	api.message.send.subscribe().subscribe((message: any) => {
		console.log(message.data)

		// find if message is in data.messages
		// if not, add it
		for (const { id } of data.messages) if (id == message.data.id) return

		data.messages.push(message.data as Message)
		data.messages = data.messages
	})

	let message = ""
</script>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a>
	to read the documentation
</p>

<ul>
	{#each data.messages as { text }}
		<li>{text}</li>
	{/each}
</ul>

<form
	on:submit={() => {
		api.message.send.post({ text: message })
		message = ""
	}}>
	<input bind:value={message} placeholder="type message" />
	<button>
		send {message}
	</button>
</form>
