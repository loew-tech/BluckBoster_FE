import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

export const RegisterUserPage = () => {

    console.log('rendering register user page')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')

    const navigate = useNavigate()

    const register = async () => {
        console.log(`login called with username=${username}, password=${password}`)
        const respsonse = await fetch('http://127.0.0.1:5000/api/member/register', {
            method: 'POST',
            body: JSON.stringify({username: username, password: password})

        })
        if(respsonse.ok){
            const data = await respsonse.json()
            localStorage.setItem("user", data.member_id);
            navigate('/movies/')
        }
    }

    return(
        <div style={{ backgroundColor: 'gold', height: '150px' }}>
            <div>
                Hello World
            </div>
            <Form>
                <Form.Group widths='equal'>
                <Form.Input
                    fluid
                    id='username'
                    label='Username'
                    placeholder='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Input
                    fluid
                    id='password'
                    label='Password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                 <Form.Input
                    fluid
                    id='confirm-password'
                    label='ConfirmPassword'
                    placeholder='confirm password'
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                />               
                </Form.Group>
                <Button type='submit' onClick={() => register()}>Submit</Button>
            </Form>
        </div>
    )
}