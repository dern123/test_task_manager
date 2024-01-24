const pool = require("../../db/pool");


module.exports = {
    get: async(req,res) => {
        try{
            await pool.query('SELECT * FROM test_tasks ' +
            'JOIN statuses ON test_tasks.status_id = statuses.status_id ' +
            'ORDER BY test_tasks.task_id, statuses.status_id ASC',
                (error, results) => {
                if (error) {
                    throw error;    
                }
                res.status(200).json({status: true, data: results.rows});
            });
        } catch (e) {

        }
    },

    create: async(req,res) => {
        try{
            const {status, title, description, deadline_date} = req.body;
            await pool.query(
                'INSERT INTO test_tasks (status_id, task_name, description, deadline_date) VALUES ($1, $2, $3, $4) RETURNING *', 
                [status, title, description, deadline_date], (error, results) => {
                if (error) {
                  throw error
                }
                res.status(201).json({status: true, data: `Test added with ID: ${results.rows[0].status}`})
            })
        } catch (e) {
            console.log(e);
            res.status(500);
        }
    },

    getById: async(req,res) => {
        try{
            const test_id = parseInt(req.params.id);
            await pool.query('SELECT * FROM test_tasks ' +
            'JOIN statuses ON test_tasks.status_id = statuses.status_id ' +
            'WHERE task_id = $1 ' +
            'ORDER BY test_tasks.task_id, statuses.status_id ASC',
            
            [test_id], (error, results) => {
                if (error) {
                    throw error
                }
                res.status(200).json({status: true, data: results.rows});
            })
        }catch(e){
            console.error(e)
        }
    },
      
    update: async(request, response) => {
        try {
            const task_id = parseInt(request.params.id);
            const { title, description, status, deadline_date } = request.body;
    
            const result = await pool.query(
                'UPDATE test_tasks SET status_id = $1, task_name = $2, description = $3, deadline_date = $4 WHERE task_id = $5 RETURNING *',
                [status, title, description, deadline_date, task_id]
            );
            
            if (result.rows.length === 0) {
                return response.status(404).json({ error: 'Task not found' });
            }
            response.status(200).json({status: true, data: `Update: ${task_id}`});
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    },
      
    delete: async(req, res) => {
        const task_id = parseInt(req.params.id);
      
        await pool.query('DELETE FROM test_tasks WHERE task_id = $1', [task_id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json({status: true, data:`Test deleted with ID: ${task_id}`})
        })
    }
}  