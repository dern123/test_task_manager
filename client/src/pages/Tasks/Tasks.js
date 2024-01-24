import { useEffect, useCallback, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useHttp } from '../../hooks/http.hook';
import './Tasks.scss';
import {  useNavigate } from 'react-router-dom';
import moment from 'moment';

const Tasks = () => {
  const { loading, request, error } = useHttp();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const getTasks = useCallback(async () => {
    try {
        const data = await request('/api/tasks/get', 'GET', null, {});
        if(data.status){
            setTasks(data.data);
        }
    } catch (e) {
      console.error(e);
    }
  }, [request]);
  const delTask = async (id) => {
    try {
        const data = await request(`/api/tasks/delete/${id}`, 'DELETE', null, {});
        if(data.status){
            getTasks();
        }
    } catch (e) {
      console.error(e);
    }
  };
  const handleClick = (url, method, task_id) => {
    const data = {
      method: method,
      task_id: task_id,
    };

    navigate(
       url, { state: { method: method, task_id: task_id},
    });
  };

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!tasks) {
    return <div>No tasks available</div>;
  }
  return (
    <>
        <div className='container__page--main'>
            <h1>Tasks</h1>
            <button className='main__btn' onClick={() => handleClick(`/create`, 'create')}>Create task</button>
            <div className='container__cards'>
                {tasks.map((card, index) => (
                    <Card key={card.task_id} style={{ width: '18rem' }} className='card__wrapper'>
                        <Card.Body>
                            <Card.Title>{card.task_name}</Card.Title>
                            <div className='action'>
                                <p className='link__item' onClick={() => handleClick(`/task/${card.task_id}`, 'edit', card.task_id)}>
                                    Edit
                                </p>
                                <p className='link__item' onClick={() => delTask(card.task_id)}>Delete</p>
                            </div>
                            <Card.Text>
                                <p>{card.description}</p>
                            </Card.Text>
                            <div className='d-flex flex-wrap justify-content-between'>
                                <Card.Text>
                                    <p>Deadline:</p>
                                    {moment(card.deadline_date).month(1).format("YYYY-MM-DD")}
                                </Card.Text>
                                <button className={card.status_id == 1 ? 'greenbg' : 'redbg'}
                                onClick={() => handleClick(`/task/${card.task_id}`, 'edit', card.task_id)}>{card.status_name}</button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    </>
  );
};

export default Tasks;