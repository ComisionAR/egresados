import { nextCsrf } from "next-csrf";

const options = {
    secret: process.env.CSRF_SECRET 
}

export const { csrfToken } = nextCsrf(options);