import { Elysia, t } from "elysia"
import { cors } from "@elysiajs/cors"

const app = new Elysia()
	.use(cors())
	.get("/", () => "Hi Elysia")
	.get("/id/:id", data => data.params.id)
	.post("/mirror", data => data.body, {
		body: t.Object({
			id: t.Number(),
			name: t.String(),
		}),
	})
	.listen(8080)

export type App = typeof app

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
