import { useEffect, useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHttp } from '../../../hooks/http.hook';
import '../Tasks.scss';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const CreateTask = (props) => {
  const { id } = useParams();
  const task_id = id;
  const { loading, request, error } = useHttp();
  const navigate = useNavigate();
  const [task, setTask] = useState([]);
  const dateNow = moment(new Date()).month(1).format("YYYY-MM-DD");
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "2",
    deadline_date: dateNow
  });
  const getTask = useCallback(async () => {
    try {
        const data = await request(`/api/tasks/get/${task_id}`, 'GET', null, {});
        if(data.status){
            await setTask(data.data[0]);
            await setForm({
                title: data.data[0].task_name,
                description: data.data[0].description,
                status: data.data[0].status_id,
                deadline_date: data.data[0].deadline_date
            })
        }
    } catch (e) {
      console.error(e);
    }
  }, [request]);

  const save = async () => {
    try {
        const f = form;
        let url = 'create';
        if(!!task_id){
            url = `update/${task_id}`;
        }
        const data = await request(`/api/tasks/${url}`, 'POST', {...f}, {});
        navigate('../tasks');
    } catch (e) {
      console.error(e);
    }
  };

  const changeInput = (e) => {
    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [e.target.name]: e.target.value };
      return updatedForm;
    });
  };
  
  useEffect(() => {
  }, [form]);

  useEffect(() => {
    if(task_id){
        getTask();
    }
  }, [getTask]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!task) {
    return <div>No task available</div>;
  }
  return (
    <> 
    <div className='container__page--main'>
        <Form onSubmit={save}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                name='title'
                type="text" 
                placeholder="Title" 
                defaultValue={task ? task.task_name : ""}
                onChange={changeInput}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Discription</Form.Label>
                <Form.Control 
                name='description'
                as="textarea" 
                rows={3}
                placeholder='Description'
                defaultValue={task ? task.description : ""}
                onChange={changeInput}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Select 
                  name='status'
                  aria-label="Default select example"
                  defaultValue={task ? task.status_id : ""}
                  onChange={changeInput}>
                  <option disabled>Status</option>
                  <option value="2">Not done</option>
                  <option value="1">Done</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Deadline</Form.Label>
                <Form.Control 
                name='deadline_date'
                type="date" 
                placeholder="dd-mm-yyyy" 
                defaultValue={task ? moment(task.deadline_date).month(1).format("YYYY-MM-DD") : dateNow}
                onChange={changeInput}/>
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlBtn1">
                <Button type='submit'>Save</Button>
            </Form.Group>
        </Form>
    </div>
    </>
  );
};

export default CreateTask;