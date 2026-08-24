import { useEffect,useState } from "react";
import Nav from './nav';
import Task from './table';

function Dash() {
    const [search, setSearch] = useState("");
    const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

        return savedTasks
            ? JSON.parse(savedTasks)
            : [{
                id: 1,
                title: "Login Page",
                description: "Create login UI",
                dueDate: "2026-08-18",
                priority: "High",
                status: "Completed"
            },
            {
                id: 2,
                title: "Navigation",
                description: "Create navigation between login and dashboard",
                dueDate: "2026-08-19",
                priority: "Medium",
                status: "Completed"
            },
            {
                id: 3,
                title: "Dashboard",
                description: "Show all details of task",
                dueDate: "2026-08-20",
                priority: "High",
                status: "Completed"
            },
            {
                id: 4,
                title: "Tasklist",
                description: "Create table and add,create,edit,delete the task",
                dueDate: "2026-08-20",
                priority: "High",
                status: "Pending"
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const totalTasks = tasks.length;
    const completed = tasks.filter(
        task => task.status === "Completed"
    ).length;

    const pending = tasks.filter(
        task => task.status === "Pending"
    ).length;

    const highPriority = tasks.filter(
        task => task.priority === "High"
    ).length;

    return (
        <>
        <div className='overall'>
            <Nav search={search} setSearch={setSearch} />
            <div className="work">
                <div>
                    <h2>Total Task</h2>
                    <h2>{totalTasks}</h2>
                </div>
                <div>
                    <h2>Completed Task</h2>
                    <h2>{completed}</h2>
                </div>
                <div>
                    <h2>Pending Task</h2>
                    <h2>{pending}</h2>
                </div>
                <div>
                    <h2>High Priority Task</h2>
                    <h2>{highPriority}</h2>
                </div>
            </div>
            <Task tasks={tasks} setTasks={setTasks} search={search}/>

        </div>
        </>
    )
}

export default Dash;