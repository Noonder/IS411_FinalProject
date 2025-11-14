const db = new Map()

// @ts-ignore
export function getTodos(userid) {
    if (!db.get(userid)) {
        db.set(userid, [{
            id: crypto.randomUUID(),
            description: 'Learn Svelte Kit',
            done: false
        }])

    }

    return db.get(userid)
}

// @ts-ignore
export function createTodos(userid,description) {
    if (description === '') {
        throw new Error('Todo must have a description')
    }    
    
    const todos = db.get(userid)

    // @ts-ignore
    if (todos.find((todo) => todo.description === description)) {
        throw new Error('todo must be unique')
    }

    todos.push({
        id: crypto.randomUUID(),
        description,
        done: false
    })
}

// @ts-ignore
export function deleteTodos(userid,todoid) {
    const todos = db.get(userid)
    // @ts-ignore
    const index = todos.findIndex((todo) => todo.id === todoid)

    if(index !== -1){
        todos.splice(index,1)
    }
}