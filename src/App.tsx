import React, {useState} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Users from './components/Users/Users';
import {AppBar, Button, IconButton, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Menu} from "@material-ui/icons";
import AddUser from "./components/Users/AddUser/AddUser";
import Posts from "./components/Users/Post/Posts";

function App() {

    const [modal, setModal] = useState(false)

    return (
        <div className="app-wrapper">
            <div className="appbar-wrapper">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit" className="login">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <Navbar setModal={setModal}/>
            <div className="app-wrapper-content">
                <AddUser open={modal} setModal={setModal}/>
                <Route exact path='/users' render={() => <Users/>}/>
                <Route exact path='/posts/:userId' render={() => <Posts/>}/>
            </div>
        </div>
    );
}

export default App;
