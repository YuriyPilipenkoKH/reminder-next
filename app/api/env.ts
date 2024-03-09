import {z} from 'zod'
import "dotenv/config"

const environmentSchema = z.object({
    NEXT_PUBLIC_API_PORT: z.string().optional()
})

const {NEXT_PUBLIC_API_PORT} = process.env
const parseResults = environmentSchema.safeParse({
    NEXT_PUBLIC_API_PORT
})

if(!parseResults.success) {
    console.log(parseResults.error)
    throw new Error("Environment dont match the schema")
}
export const environmentVariables = parseResults.data

