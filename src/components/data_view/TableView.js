import React, { useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import Button from "../common/Button";
import { tableContext } from "../../contexts/Context";

const TableView = ({ data, openEditForm, fetchData }) => {
    const { isAdmin } = useContext(tableContext);
    const authToken = localStorage.getItem("accessToken")
    let headings
    if (data.length > 0) {
        headings = Object.keys(data[0])
    }
    const formateDate = (dateString) => {
        const date = new Date(dateString);

        const formattedDate = date.toISOString().split('T')[0];
        console.log(formattedDate);
        return formattedDate
    }
    // const editTask = (id)=>{
    //     openEditForm(id)
    // }
    const deleteTask = async (taskId) => {
        try {
            console.log("del task")
            console.log(authToken, "   ..........req del")
            const response = await axios.delete(`http://localhost:5000/task/taskdelete/${taskId}`
                , {
                    headers: {
                        'X-Auth-Token': authToken,
                    },
                });

            if (response) {
                fetchData()

                toast.success('Task Deleted Successfully');
            }
            

        } catch (error) {
            toast.error(error.response.data)
            console.log(error, "in catch");
            console.log(error)
        }
    }
    return (
        <>
            {data.length > 0 && <table>
                <thead>
                    <tr>
                        <th>title</th>
                        <th>description</th>
                        <th>dueDate</th>
                        <th>status</th>
                        {isAdmin && <th>userName</th>}

                        <th>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.title + index}>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{formateDate(item.dueDate)}</td>
                            <td>{item.status}</td>
                            {isAdmin && <td>{item.userName}</td>}

                            <td>
                                <Button onClick={() => openEditForm(item._id)}>Edit</Button>
                                <Button onClick={() => deleteTask(item._id)}>Delete</Button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>}

        </>
    )
}

export default TableView