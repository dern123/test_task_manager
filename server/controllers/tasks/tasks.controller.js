const pool = require("../../db/pool");


module.exports = {
    get: async(req,res) => {
        try{
            await pool.query('SELECT * FROM test_tasks ' +
            'JOIN company ON test_tasks.status_id = statuses.status_id ' +
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
            const {status_id, name, description} = req.body;
            await pool.query(
                'INSERT INTO test_tasks (status_id, name, description) VALUES ($1, $2, $3) RETURNING *', 
                [status_id, name, description], (error, results) => {
                if (error) {
                  throw error
                }
                res.status(201).send(`Test added with ID: ${results.rows[0].status_id}`)
            })
        } catch (e) {
            console.log(e);
            res.status(500);
        }
    },

    getById: async(req,res) => {
        const test_id = parseInt(req.params.id)
      
        await pool.query('SELECT * FROM test_tasks WHERE test_id = $1', [test_id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json({status: true, data: results.rows});
        })
    },
      
    update: async(request, response) => {
        const test_id = parseInt(request.params.id)
        const {status_id, name, description } = request.body
      
        await pool.query(
            'UPDATE test_tasks SET status_id = $1, name = $2, description = $3 WHERE test_id = $4',
            [status_id, name, description, test_id],
            (error, results) => {
                if (error) {
                throw error
                }
                response.status(200).send(`Test modified with ID: ${test_id}`)
            }
        )
    },
      
    delete: async(request, response) => {
        const test_id = parseInt(request.params.id)
      
        await pool.query('DELETE FROM test_tasks WHERE test_id = $1', [test_id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Test deleted with ID: ${test_id}`)
        })
    }
}  