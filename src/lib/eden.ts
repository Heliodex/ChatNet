import { edenTreaty } from "@elysiajs/eden"
import type { App } from "../../Server/index"

export const api = edenTreaty<App>("http://localhost:8080/")
