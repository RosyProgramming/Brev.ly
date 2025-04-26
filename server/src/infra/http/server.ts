import { fastify } from "fastify"
import { fastifyCors } from "@fastify/cors"
import { transformSwaggerSchema } from './transform-swagger-schema'

import {
            serializerCompiler, 
            validatorCompiler, 
            hasZodFastifySchemaValidationErrors, 
            jsonSchemaTransform
        } from 'fastify-type-provider-zod'

import { createLinks } from './routes/create-links'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { generateReport } from './routes/generate-report'
import { listLinks } from './routes/list-links'
import { deleteLinks } from './routes/delete-links'
import { originalUrls } from "./routes/get-original-urls"

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
    if(hasZodFastifySchemaValidationErrors(error)){
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.validation,
        })
    }
    return reply.status(500).send({  message: "Internal server error" })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifyMultipart)
server.register(fastifySwagger , {
    openapi: {
        info: {
            title: 'Brev-ly',
            version: '1.0.0'
        },
    },
    transform: transformSwaggerSchema,
})

server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

server.register(createLinks)
server.register(listLinks)
server.register(deleteLinks)
server.register(originalUrls)
server.register(generateReport)

server.listen({ port:3333, host: '0.0.0.0' }).then(() => {
    console.log('HTTP server running')
})