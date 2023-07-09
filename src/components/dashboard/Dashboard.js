import React, { useEffect, useState, useContext } from "react"
import { getUserData } from "../../utils/auth/Auth"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Input from "../common/Input";
import Button from "../common/Button";
import TableView from "../data_view/TableView";

import { shortIt } from "../../utils/short";
import { searchIt } from "../../utils/search";
import { tableContext } from "../../contexts/Context";
import TaskForm from "../modals/TaskForm";
// import Chart from "../data_view/Chart";


const Dashboard = () => {
    const authToken = localStorage.getItem("accessToken")
    const { setTaskId } = useContext(tableContext);
    const [searchInput, setSearchInput] = useState("")
    const [allData, setAllData] = useState([])
    const [user, setUser] = useState([])
    const [dataForm, setDataForm] = useState(false)
    const [editForm, setEditForm] = useState(false)

    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            console.log(authToken, "token")
            const response = await axios.get("http://localhost:5000/task/gettask", {
                headers: {
                    'X-Auth-Token': authToken,
                },
            })
            console.log(response.data.data)
            setAllData(response.data.data)
            setUser(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const searchData = (e) => {
        setSearchInput(e.target.value)
        setUser(searchIt(allData, e.target.value))
    }

    const openEditForm = (id)=>{
        setTaskId(id)
        setEditForm(true)
        setDataForm(true)
    }

    useEffect(() => {
        if (!getUserData()) {
            navigate('/')
        }
        fetchData()
    }, [])
    return (
        <>
            <main className="dashboard-page">
                {/* {user.length >0 && <div className="chartd3">
                    <Chart data={allData} />
                </div>} */}
                <div className="display-col dashboard">

                    <div className="filter-tools">
                        <div className="display-row filter-btns">
                            <div>Short By :</div>
                            <Button onClick={() => setUser(shortIt(user, "dueDate"))}>Due Date</Button>
                        </div>
                        <div>
                            <Button onClick={() => setDataForm(true)} > Add Task</Button>
                        </div>
                        <div>
                            <Input
                                type="text"
                                onChange={(e) => searchData(e)}
                                name="search"
                                value={searchInput}
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className="banner-container display-row">
                        {
                            searchInput.length > 0 && <><div className="banner">
                                {user.length > 0 ? "You are viewing filtered results!" : "No record Found"}
                            </div></>
                        }
                    </div>
                    <div className="display-row view-data">
                        {user.length > 0 ? <TableView data={user} openEditForm={openEditForm} fetchData={fetchData}/> : <span>No Data Found</span>}
                    </div>
                </div>
                {dataForm && <TaskForm setDataForm={setDataForm} editForm={editForm} setEditForm={setEditForm} fetchData={fetchData} />}
            </main>
        </>
    )
}

export default Dashboard