import React, { useContext, useEffect, useState } from "react"
import axios from "axios";
import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate, Link } from "react-router-dom"
import { validationInput } from "../../utils/validation/validateInput";
import { getUserData } from "../../utils/auth/Auth";
import { toast } from "react-toastify";
import { tableContext } from "../../contexts/Context"

const Login = () => {
    const { setIsAdmin } = useContext(tableContext);
    const initValue = {
        email: "",
        password: "",
    }
    const [userInfo, setUserInfo] = useState(initValue)
    const [validateFrom, setValidateForm] = useState(initValue)

    const navigate = useNavigate()

    //handling form
    const handleInput = (e) => {
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
        setValidateForm({ ...validateFrom, [name]: "" })
    }

    //login user
    const loginForm = async (e) => {
        e.preventDefault()
        const formData = { ...userInfo }
        const errorMsg = { ...validateFrom }
        validationInput(formData, errorMsg)
        const { email, password } = errorMsg
        if (email || password) {
            setValidateForm(errorMsg)
            return
        }

        try {
            let payload = { ...userInfo }
            const data = await axios.post("http://localhost:5000/auth/login",payload)
            console.log(data,"resp")
            
            if(data){
                setIsAdmin(data.data.isAdmin)
                toast.success(data.data.msg);
                localStorage.setItem("login", data.data.login)
                localStorage.setItem("accessToken", data.data.accessToken)
                navigate('/dashboard')
            }

        } catch (error) {
            toast.error(error.response.data)
            console.log(error.response.data, "in catch");
            console.log(error)
        }
    }

    //checking if user already logged in
    useEffect(() => {
        if (getUserData()) {
            navigate('/dashboard')
        }
    }, [])

    return (

        <main className="display-row">
            <div className="display-col container">
                <h1>Login</h1>
                <form onSubmit={loginForm} style={{ width: "80%" }}>
                    <Input
                        type="email"
                        label="Email"
                        onChange={(e) => handleInput(e)}
                        name="email"
                        errMsg={validateFrom.email}
                        required={true}
                    />
                    <Input
                        type="password"
                        label="Password"
                        onChange={(e) => handleInput(e)}
                        name="password"
                        errMsg={validateFrom.password}
                        required={true}
                    />
                    <Button type="submit">Login</Button>
                </form>
                <span>Don't have account <Link to="/register">Register</Link></span>
            </div>
        </main>
    )
}

export default Login