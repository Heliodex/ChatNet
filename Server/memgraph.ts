import client from "neo4j-driver"

export const g = client.driver("bolt://localhost:7687").session()

export type Message = {
	text: string
	id: string
}

