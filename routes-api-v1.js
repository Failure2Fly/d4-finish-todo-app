// Define a Node module that handles routing
module.exports.setup = (router, uploads, knex) => {

    // 1. Load libraries
    let moment = require('moment')
    
    // 2. Define routes

    // Get all todos
    router.get('/todos', function(request, response) {

        knex.select('*').table('todos').orderBy('category', 'asc').then(function(data) {
            response.json(data)
        })


    })

    // Post a new todo
    router.post('/todos', function(request, response) {

        let now = moment().format('YYYY-MM-DD HH:mm:ss')

        let todo = {
            todo: request.body.todo.trim(),
            completed: request.body.completed ? 'yes' : 'no',
            due_date: moment(request.body.due_date.trim()).format('YYYY-MM-DD'),
            category: request.body.category,
            created_at: now,
            updated_at: now,
        }

        knex.insert(todo).table('todos').returning('*').then(function(data) {
            response.json(data[0])
        })

    })

    router.get('/todos/todoId/complete', function(request, response) {
        // Your code goes here...
        let update = {
                completed: 'yes'
            }
        knex.update(todo).table('todos').where('id', '=', request.params.todoId).then(function(data) {
            response.json(true)
        })
    })

    router.get('/todos/todoId/incomplete', function(request, response) {
        // Your code goes here...
        let update = {
                completed: 'no'
            }
        knex.update(todo).table('todos').where('id', '=', request.params.todoId).then(function(data) {
            response.json(false)
        })
    })

    // Return the router, with new routes attached back to the Express web server that's loading these
    return router
}