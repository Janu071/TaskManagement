import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function Task({ tasks, setTasks, search }) {

    const [show, setShow] = useState(false);

    const [temp, setTemp] = useState({
        id: null,
        title: "",
        description: "",
        dueDate: "",
        priority: "",
        status: ""
    });
    
    const [sort, setSort] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    let result = tasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    switch (sort) {
        case "title":
            result.sort((a, b) =>
                a.title.localeCompare(b.title)
            );
            break;

        case "dueDate":
            result.sort((a, b) =>
                a.dueDate.localeCompare(b.dueDate)
            );
            break;

        case "priority":
            const order = {
                High: 1,
                Medium: 2,
                Low: 3
            };

            result.sort((a, b) =>
                order[a.priority] - order[b.priority]
            );
            break;

        default:
            break;
    }

    if (status) {
        result = result.filter((task) =>
            task.status === status
        );
    }

    if (priority) {
        result = result.filter((task) =>
            task.priority === priority
        );
    }

    const handleClose = () => setShow(false);

    const handleShow = (data) => {
        setTemp(data);
        setShow(true);
        console.log(temp);

    };

    const addShow = () => {
        setTemp({
            id: null,
            title: "",
            description: "",
            dueDate: "",
            priority: "",
            status: ""
        });
        setShow(true);
    }

    const addTask = () => {

        if (!temp.title.trim()) {
            alert("Please enter task title");
        }

        else if (!temp.description.trim()) {
            alert("Please enter task description");
        }

        else if (!temp.dueDate) {
            alert("Please select due date");
        }

        else if (!temp.priority) {
            alert("Please select priority");
        }

        else if (!temp.status) {
            alert("Please select status");
        }
        else {
            setTasks([...tasks, { ...temp, id: Date.now() }]);
            handleClose();
        }
    };

    const Change = (e) => {
        setTemp({
            ...temp,
            [e.target.name]: e.target.value,
        });
    };

    const updateTask = () => {
        setTasks(
            tasks.map((task) =>
                task.id === temp.id ? temp : task
            )
        );

        handleClose();
    };

    const deleted = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <>
            <h1 className="text-white">Task Details</h1>
            <div className="sort">
                <div>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="dueDate">Due Date</option>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                </select>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                </div>
                <Button variant="success" onClick={() => addShow()}>Add User</Button>
            </div>

            <div className="table-container">
                <Table striped bordered hover variant="dark" className="text-center">
                    <thead>
                        <tr className='fs-4'>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((d, i) => {
                            return (
                                <tr key={i}>
                                    <th>{d.title}</th>
                                    <th>{d.description}</th>
                                    <th>{d.dueDate}</th>
                                    <th>{d.priority}</th>
                                    <th>{d.status}</th>
                                    <td className="btns">
                                        <Button variant="primary" className='me-3' onClick={() => handleShow(d)}>Edit</Button>
                                        <Button variant="danger" className='me-3' onClick={() => deleted(d.id)}>Delete</Button>
                                        <Button>{d.status === "Completed" ? <IoCheckmarkSharp /> : <FaArrowRotateRight />}</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {temp.id ? "Edit Task" : "Add Task"}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>

                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Enter task title"
                                value={temp.title}
                                onChange={Change}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                placeholder="Enter task description"
                                value={temp.description}
                                onChange={Change}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>

                            <Form.Control
                                type="date"
                                name="dueDate"
                                value={temp.dueDate}
                                onChange={Change}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Priority</Form.Label>

                            <Form.Select
                                name="priority"
                                value={temp.priority}
                                onChange={Change}
                            >
                                <option value="">Select Priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>

                            <Form.Select
                                name="status"
                                value={temp.status}
                                onChange={Change}
                            >
                                <option value="">Select Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </Form.Select>
                        </Form.Group>

                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={temp.id ? updateTask : addTask}>
                        {temp.id ? "Save Changes" : "Add Task"}
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
};

export default Task;