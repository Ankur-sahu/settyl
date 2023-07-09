import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Input from "../common/Input";
import Button from "../common/Button";
import { toast } from 'react-toastify';
import { tableContext } from "../../contexts/Context";

const TaskForm = ({ setDataForm, editForm, setEditForm, fetchData }) => {
    const authToken = localStorage.getItem("accessToken")
    console.log(authToken)
    // const initValue = {
    //     title: "",
    //     description: "",
    //     dueDate: "",
    //     status: "",
    //     userId: "",
    // }
    const [allUser, setAllUser] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const { isAdmin, taskId, setTaskId } = useContext(tableContext);

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }
    const getAllUsers = async () => {

    }
    const closeModal = () => {
        // setIsOpen(false);
        setTaskId("")
        setDataForm(false)
        setEditForm(false)

    };
    const addTask = async (e) => {
        e.preventDefault()
        const { title, description, dueDate, status } = userInfo

        if (!title || !description || !dueDate || !status) {
            //toast
            toast.error("All fields required")
            return
        }
        let payload = { ...userInfo }

        if (editForm) {
            try {
                console.log(authToken)
                payload.id = taskId
                const response = await axios.post("http://localhost:5000/task/updateTask", payload
                    , {
                        headers: {
                            'X-Auth-Token': authToken,
                        },
                    });

                if (response) {
                    fetchData()
                    closeModal()

                    toast.success('Task updated Successfully');
                }
            } catch (error) {
                toast.error(error.response.data)
                console.log(error.response.data, "in catch");
                console.log(error)
            }
        } else {
            try {
                console.log(authToken)
                const response = await axios.post("http://localhost:5000/task/createtask", payload
                    , {
                        headers: {
                            'X-Auth-Token': authToken,
                        },
                    });

                if (response) {
                    fetchData()
                    setDataForm(false)
                    toast.success('Task added Successfully');
                }
            } catch (error) {
                toast.error(error.response.data)
                console.log(error.response.data, "in catch");
                console.log(error)
            }
        }



    }

    useEffect(() => {
        if (isAdmin && !(allUser.length > 0)) {
            getAllUsers()
        }
    }, [])

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{editForm ? "Edit Task" : "Create Task"}</h2>
                <div className="modal-body">
                    <Input
                        type="text"
                        placeholder="Title"
                        value={userInfo.title}
                        onChange={(e) => handleInput(e)}
                        name="title"
                    />
                    <Input
                        type="date"
                        label="Due Date"
                        value={userInfo.dueDate}
                        onChange={(e) => handleInput(e)}
                        name="dueDate"
                    />
                    <Input
                        type="text"
                        placeholder="Status"
                        value={userInfo.status}
                        onChange={(e) => handleInput(e)}
                        name="status"
                    />
                    <textarea name="description" onChange={(e) => handleInput(e)} placeholder="Description"></textarea>
                    {isAdmin && <input type="text" placeholder="Assigned User" />}
                </div>
                <div className="modal-footer">

                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={addTask}>{editForm ? "Edit Task" : "Add Task"}</Button>
                </div>
            </div>
        </div>
    )
}

export default TaskForm