import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

    console.log('rendeing login page')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const login = async () => {
        console.log(`login called with username=${username}, password=${password}`)
        const respsonse = await fetch('http://127.0.0.1:5000/api/member/login', {
            method: 'POST',
            body: JSON.stringify({username: username, password: password})

        })
        if(respsonse.ok){
            const data = await respsonse.json()
            localStorage.setItem("user", data.member_id);
            navigate('/movies/')
        }
    }

    return (
        <div style={{ backgroundColor: 'gold', height: '175px' }}>
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
                </Form.Group>
                <Button type='submit' onClick={() => login()}>Submit</Button>
            </Form>
            <div>New to Bluckboster?</div>
            <Button onClick={() => {navigate('/register/')}}>Sign Up!</Button>
        </div>

    )
}