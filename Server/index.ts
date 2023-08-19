import { Elysia, t, ws } from "elysia"
import { cors } from "@elysiajs/cors"
import { g } from "./memgraph"
import cql from "./cyphertag"
import { nanoid } from "nanoid"

const websockets: any[] = []

const app = new Elysia()
	.use(cors())
	.use(ws())
	.ws("/message/send", {
		body: t.Object({
			text: t.String(),
		}),
		open(ws) {
			websockets.push(ws)
			console.log("new ws", websockets.length)
		},
		message(ws, { text }) {
			ws.send({
				text,
				time: Date.now(),
			})
		},
		close(ws) {
			websockets.splice(websockets.indexOf(ws), 1)
			console.log("ws gone", websockets.length)
		},
	})
	.post(
		"/message/send",
		async d => {
			console.log(d.body)
			const time = Date.now()
			const id = `${time}-${nanoid(9)}`

			await g.run(
				cql`CREATE (n:Message {
					text: $text,
					time: $time, 
					id: $id
				})`,
				{
					text: d.body.text,
					time,
					id
				},
			)

			for (const ws of websockets) {
				console.log("sending to ws")
				ws.send({
					text: d.body.text,
					time,
					id,
				})
			}
		},
		{
			body: t.Object({
				text: t.String(),
			}),
		},
	)
	.get("/messages", async () => {
		const res = await g.run(cql`MATCH (n:Message) RETURN n`)
		return res.records.map(r => r.toObject().n.properties)
	})
	.listen(8080)

export type App = typeof app

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
