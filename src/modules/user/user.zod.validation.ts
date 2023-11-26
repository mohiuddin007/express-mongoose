import { z } from "zod";

const userSchemaZod = z.object({
    password: z.string({
        invalid_type_error: 'password must be string'
    }).max(20, {message: 'Password can not be more than 20 characters!'}).optional(),
})

export {userSchemaZod};