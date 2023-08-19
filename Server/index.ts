import { publicProcedure, router } from "./trpc"
import { createHTTPServer } from "@trpc/server/adapters/standalone"
import { z } from "zod"
import cors from "cors"

const appRouter = router({
	hello: publicProcedure
		.input(z.string())
		.query(({ input }) => `hello ${input}`),
})

createHTTPServer({
	middleware: cors(),
	router: appRouter,
}).listen(3000)

export type AppRouter = typeof appRouter
