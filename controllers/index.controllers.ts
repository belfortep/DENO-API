import { Response, Request } from "https://deno.land/x/oak/mod.ts";

import { v4 } from "https://deno.land/std@0.133.0/uuid/mod.ts";



interface User {
    id: string
    name: string
}

let users: User[] = [{
    id: "1",
    name: "John Johnson"
}]

export const getUsers = ({ response }: { response: Response }) => {
    response.body = {
        message: 'success',
        users
    }
}

export const getUser = ({ params, response }: { response: Response, params: { id: string } }) => {


    const userFound = users.find(user => user.id === params.id)
    if (userFound) {
        response.status = 200
        response.body = {
            message: 'Got a user',
            userFound
        }
    } else {
        response.status = 404
        response.body = {
            message: 'User not found'
        }
    }


}

export const createUser = async ({ request, response }: { request: Request, response: Response }) => {
    const myUUID = crypto.randomUUID();

    const body = await request.body().value;
    console.log(body)

    users.push({
        name: body.name,
        id: myUUID
    })

    response.body = {
        message: 'New user created'
    }

}

export const deleteUser = ({ params, response }: { params: { id: string }, response: Response }) => {

    users = users.filter(user => user.id !== params.id)
    response.status = 200
    response.body = {
        message: 'User deleted',
        users: users
    }

}

export const updateUser = async ({ request, response, params }: { request: Request, response: Response, params: { id: string } }) => {

    const userFound = users.find(user => user.id === params.id)

    if (!userFound) {
        response.status = 404
        response.body = {
            message: 'User not found'
        }
    } else {
        const body = await request.body()

        const updatedUser = body.value

        users = users.map(user => user.id === params.id ? { ...user, ...updatedUser } : user)

        response.status = 200

        response.body = {
            users
        }
    }

}

