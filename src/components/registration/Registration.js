import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import Input from "../common/Input";
import Button from "../common/Button";
import { validationInput } from "../../utils/validation/validateInput";
// import { register } from "../../services/api";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getUserData } from "../../utils/auth/Auth";

const Registration = () => {
    const initValue = {
        name: "",
        email: "",
        password: "",
        confirm_password: ""
    }
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(initValue)
    const [validateFrom, setValidateForm] = useState(initValue)

    const handleInput = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
        setValidateForm({ ...validateFrom, [name]: "" })
    }

    const registerUser = async (e) => {
        e.preventDefault()
        const formData = { ...userInfo }
        const errorMsg = { ...validateFrom }
        validationInput(formData, errorMsg)
        const { email, name, confirm_password, password } = errorMsg
        if (email || name || password || confirm_password) {
            setValidateForm(errorMsg)
            return
        }

        try {
            let payload = { ...userInfo }
            const data = await axios.post("http://localhost:5000/auth/register",payload)
            console.log(data,"resp")
            
            if(data){
                toast.success('Registraion sucessful, Please login!');
                navigate('/')
            }

        } catch (error) {
            toast.error(error.response.data)
            console.log(error.response.data, "in catch");
            console.log(error)
        }

    }
    useEffect(() => {
        if (getUserData()) {
            navigate('/dashboard')
        }
    }, [])
    return (
        <main className="display-row">
            <div className="display-col container">
                <h1>Registration</h1>
                <form onSubmit={registerUser} style={{ width: "80%" }}>
                    <Input
                        type="text"
                        label="Full Name"
                        value={userInfo.name}
                        onChange={(e) => handleInput(e)}
                        name="name"
                        errMsg={validateFrom.name}
                    />

                    <Input
                        type="email"
                        label="Email"
                        value={userInfo.email}
                        onChange={(e) => handleInput(e)}
                        name="email"
                        errMsg={validateFrom.email}
                    />
                    <Input
                        type="password"
                        label="Password"
                        value={userInfo.password}
                        onChange={(e) => handleInput(e)}
                        name="password"
                        errMsg={validateFrom.password}
                    />
                    <Input
                        type="password"
                        label="Confirm Password"
                        value={userInfo.confirm_password}
                        onChange={(e) => handleInput(e)}
                        name="confirm_password"
                        errMsg={validateFrom.confirm_password}
                    />

                    <Button type="submit">Register</Button>
                </form>
                <span>Already Have account <Link to="/">Login</Link></span>
            </div>
        </main>
    )
}

export default Registration