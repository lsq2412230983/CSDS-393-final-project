import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
var config = require('../config');

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password: '',
            isNavOpen: false,
            isModalSignUpOpen: false,
            isModalLoginOpen: false,
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModalSignUp = this.toggleModalSignUp.bind(this);
        this.toggleModalLogin = this.toggleModalLogin.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handeLogout = this.handeLogout.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModalSignUp(){
        this.setState({
            isModalSignUpOpen: !this.state.isModalSignUpOpen,
        });
    }

    toggleModalLogin(){
        this.setState({
            isModalLoginOpen: !this.state.isModalLoginOpen,
        });
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSignup(event){
        event.preventDefault();
        //alert("Sign up");
        let databody = {
            "username": this.state.username,
            "password": this.state.password
        }
        fetch(config.serverUrl+'/account/register', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.error_message) alert(data.error_message);
            else{
                alert("Please Login with your username and password.");
                this.toggleModalLogin();
                this.toggleModalSignUp();
            }
        })
    }

    handleLogin(event){
        event.preventDefault();
        //alert("Login");
        let databody = {
            "username": this.state.username,
            "password": this.state.password
        }
        fetch(config.serverUrl+'/account/login', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.error_message) alert(data.error_message);
            else{
                this.props.onUsernameChange(this.state.username, data.token);
                alert(data.response);
                this.toggleModalLogin();
            }
        })
    }

    handeLogout(event){
        event.preventDefault();
        // if(this.props.authenticated){
        //     let databody = {
        //         "username": this.props.username
        //     }
        //     fetch(config.serverUrl+'/users/logout', {
        //         method: 'PUT',
        //         body: JSON.stringify(databody),
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         if(data.success === false) alert(data.msg);
        //         else{
        //             this.props.onUsernameChange(this.state.username, '');
        //             this.props.history.push('/home');
        //         }
        //     })
        // }
        // else
        if(this.props.authenticated){
            this.props.onUsernameChange(this.state.username, '');
            this.props.history.push('/home');
            alert("Successfully logout!");
        }
        else{
            alert("You have not logged in!");
        }
    }

    render(){
        return(
            <>
                <Navbar dark className="custom-header" expand="lg">
                    <NavbarBrand href="/home">Logo</NavbarBrand>
                    <NavbarToggler id="nav" onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to="/home"><span className="fa fa-home fa-lg"></span> Home</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/myBlogs"><span className="fa fa-user-circle-o fa-lg"></span> MyBlogs</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/favorite"><span className="fa fa-heart fa-lg"></span> Fav List</Link>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button id="signup" className="button-mr" outline onClick={this.toggleModalSignUp}>
                                <span className="fa fa-user-plus fa-lg"></span> Sign up
                            </Button>
                        </NavItem>
                        <NavItem>
                            <Button id="login" className="button-mr" outline onClick={this.toggleModalLogin}>
                                <span className="fa fa-sign-in fa-lg"></span> Login
                            </Button>
                        </NavItem>
                        <NavItem>
                            <Button className="button-mr" outline onClick={this.handeLogout}>
                                <span className="fa fa-sign-out fa-lg"></span> Logout
                            </Button>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Navbar>

                <Modal isOpen={this.state.isModalSignUpOpen} toggle={this.toggleModalSignUp}>
                    <ModalHeader toggle={this.toggleModalSignUp}>Sign Up</ModalHeader>
                    <ModalBody>
                        <Form id="signupForm" onSubmit={this.handleSignup}>
                            <Row>
                                <Col xs={12} sm={{size: 8, offset:2}}>
                                    <FormGroup>
                                        <Label htmlFor="username">Username</Label>
                                        <Input type="text" id="username1" name="username" value={this.state.username} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={{size: 8, offset:2}}>
                                    <FormGroup>
                                        <Label htmlFor="password">Password</Label>
                                        <Input type="password" id="password1" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "10px"}}>
                                <Col xs={12} md={{size: 4, offset:2}}>
                                    <FormGroup>
                                        <Button type="submit" value="submit" color="primary" style={{width: "100%"}}>Sign up</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isModalLoginOpen} toggle={this.toggleModalLogin}>
                    <ModalHeader toggle={this.toggleModalLogin}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <Row>
                                <Col xs={12} sm={{size: 8, offset:2}}>
                                    <FormGroup>
                                        <Label htmlFor="username">Username</Label>
                                        <Input type="text" id="username" name="username" value={this.state.username} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={{size: 8, offset:2}}>
                                    <FormGroup>
                                        <Label htmlFor="password">Password</Label>
                                        <Input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row style={{marginTop: "10px"}}>
                                <Col xs={12} md={{size: 4, offset:2}}>
                                    <FormGroup>
                                        <Button type="submit" value="submit" color="primary" style={{width: "100%"}}>Login</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default Header;