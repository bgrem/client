import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Flex, Button, Center, Grid, Input, Text, Heading, Icon } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "./constants";

function Login() {

    const [isLogin, setIsLogin] = useState<boolean>(true)
    const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)
    const passwordRef = useRef<HTMLInputElement | null>(null)
    const navigator = useNavigate()
    const [errMsg, setErrMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    async function login() {
        if (!emailRef.current || !passwordRef.current) return
        try {

            setIsLoading(true)
            const response = await axios.post(baseUrl + "/auth/login", {
                user_email: emailRef.current.value,
                password: passwordRef.current.value,
            })
            console.log("Loging in")
            const jwtToken = response.data.data.jwt_token
            localStorage.setItem("jwtToken", jwtToken)
            navigator("/")
            setErrMsg("")
            setIsLoading(false)
        } catch {
            setIsLoading(false)
            setErrMsg("Login Failed retry")
        }
    }

    async function register() {
        if (!emailRef.current || !passwordRef.current || !nameRef.current) return
        console.log("Registering")
        try {
            setIsLoading(true)
            const response = await axios.post(baseUrl + "/auth/register", {
                user_name: nameRef.current.value,
                user_email: emailRef.current.value,
                password: passwordRef.current.value,
            })
            console.log(response)
            const jwtToken = response.data.data.jwt_token
            localStorage.setItem("jwtToken", jwtToken)
            navigator("/")
            setErrMsg("")
            setIsLoading(false)
        } catch {
            setIsLoading(false)
            setErrMsg("Register Failed retry")
        }
    }

    return (<>
        <Center h={"100vh"}>

            {isLogin ?
                <Grid gap={"1rem"}>
                    <Heading textAlign={"center"}>Login</Heading>
                    <Center gap={"1rem"}>
                        <Text>Email:</Text>
                        <Input ref={emailRef} type={"email"} />
                    </Center>
                    <Center gap={"1rem"}>
                        <Text>Password:</Text>
                        <Input ref={passwordRef} type={visible ? "text" : "password"} />
                        {visible ?
                            <ViewIcon onClick={() => { setVisible(false) }}></ViewIcon> :
                            <ViewOffIcon onClick={() => { setVisible(true) }}></ViewOffIcon>
                        }
                    </Center>
                    <Button onClick={login} isDisabled={isLoading}>{isLoading ? "Loading..." : "Login"}</Button>
                    <Button onClick={() => {
                        setIsLogin(false);
                        setErrMsg("")
                    }}>Register?</Button>

                    <Text style={{ color: "red" }}>{errMsg}</Text>
                </Grid>
                : <Grid gap={"1rem"}>
                    <Heading textAlign={"center"}>Register:</Heading>
                    <Center gap={"1rem"}>
                        <Text>Username:</Text>
                        <Input ref={nameRef} type={"text"} />
                    </Center>
                    <Center gap={"1rem"}>
                        <Text>Email:</Text>
                        <Input ref={emailRef} type={"email"} />
                    </Center>
                    <Center gap={"1rem"}>
                        <Text>Password:</Text>
                        <Input ref={passwordRef} type={visible ? "text" : "password"} />
                        {visible ?
                            <ViewIcon onClick={() => { setVisible(false) }}></ViewIcon> :
                            <ViewOffIcon onClick={() => { setVisible(true) }}></ViewOffIcon>
                        }
                    </Center>
                    <Button onClick={register} isDisabled={isLoading}>{isLoading ? "Loading..." : "Register"}</Button>
                    <Button onClick={() => {
                        setIsLogin(true);
                        setErrMsg("")
                    }}>Login?</Button>

                    <Text style={{ color: "red" }}>{errMsg}</Text>
                </Grid>
            }
        </Center>
    </>
    );
}

export default Login;
