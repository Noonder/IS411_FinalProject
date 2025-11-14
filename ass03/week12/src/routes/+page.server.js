import * as db from '$lib/server/database.js'
import { fail } from '@sveltejs/kit'

export function load({cookies}) {
    let id = cookies.get('userid')

    if(!id) {
        id = crypto.randomUUID()
        cookies.set('userid',id,{path:'/'})
    }

    return {
        todos: db.getTodos(id)
    }
}


export const actions = {
    // @ts-ignore
    create: async ({cookies,request}) => {
        const data = await request.formData();

        try{
            db.createTodos(cookies.get('userid'),data.get('description'))
        } catch(error){
            return fail(422,{
                description: data.get('description'),
                // @ts-ignore
                error:error.message,
            })
        }
        
    },
    // @ts-ignore
    delete: async ({cookies, request }) =>{
        const data = await request.formData()
        db.deleteTodos(cookies.get('userid'),data.get('id'))
    }
}