import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import styled from "styled-components";
import { signInAPI } from "../actions";

function Login(props){
    const [show, setShow] = useState('hide');
    const handleShow = () => {
        switch (show){
            case 'hide': 
                setShow('show')
                break
            case 'show': 
                setShow('hide')
                break
        default:
            setShow('hide')
        }
    }
    return(
        <Container>
            {
                props.user && <Redirect to="/home" />
            }
            <Nav>
                <a href="/">
                    <img src="images/login-logo.svg" alt="" />
                </a>
                <NavWrapper>
                    <NavlistWrap>   
                        <Navlist>
                            <a >
                                <img src="/images/nav-network.svg" alt="" />
                                <span>Article</span>
                            </a>
                        </Navlist> 
                        <Navlist>
                            <a >
                                <img src="/images/nav-network.svg" alt="" />
                                <span>People</span>
                            </a>
                        </Navlist> 
                        <Navlist>
                            <a >
                                <img src="/images/nav-network.svg" alt="" />
                                <span>Learning</span>
                            </a>
                        </Navlist> 
                        <Navlist>
                            <a >
                                <img src="/images/nav-network.svg" alt="" />
                                <span>Jobs</span>
                            </a>
                        </Navlist>
                    </NavlistWrap>
                    <div>
                        <Join >Join now</Join>
                        <Signin>Sign in</Signin>
                    </div>
                </NavWrapper>
            </Nav>
            <Section>
                <Hero>
                    <h1>Find jobs through your community</h1>
                    <img src="/images/Login-banner-new.svg" alt="" />
                </Hero>
                <Form>
                    <SignInForm>
                        <label>Email or phone </label>
                        <input type="text" />
                        <label>Email or phone </label>
                        <Show>
                            <input type={show === 'hide' ? "password" : "text"} />
                            <ShowIcon onClick={handleShow}>{show === 'hide' ? "Show" : "Hide"}</ShowIcon>
                        </Show>
                        <SigninBtn>Sign in</SigninBtn>
                    </SignInForm>
                    <Line>
                        <hr />
                    </Line>
                    <Google onClick={() => props.signIn()}>
                        <img src="/images/google.svg" alt="" />
                        Sign in with google
                    </Google>
                </Form>
            </Section>
        </Container>
    )
}

const Container = styled.div`
    padding: 0px;
`
const Nav = styled.nav`
    max-width: 1528px;
    margin: auto;
    padding: 12px 0 16px;
    position: relative;
    display: flex;
    align-item: center;
    justify-content: space-between;
    flex-wrap: no-wrap;
    &> a{
        width: 135px;
        height: 34px;
        @media(max-width: 768px){
            padding: 0 5px ;
        }
    }

`
const NavWrapper = styled.div`
    display: flex;    
    align-items: center;
    gap: 20px;
`
const NavlistWrap = styled.ul`
    display: flex;
    align-Items: center;
    flex-wrap: no-wrap;
    padding-right: 5px;
    border-right: 1px solid rgba(0,0,0, .34);

    @media (max-width: 768px){
        display: none;
    }

`
const Navlist = styled.li`
    display: flex;
    align-items: center;
    // padding: 0 10px;
    opacity: 0.6 ;
    teansition: all .3s ease;
a{
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-tems: center;
    font-size: 16px; 
    font-weight: 400;
    line-height: 1.5;
    min-height: 42px;
    min-width: 80px;
    position: relative;
    text-decoration: none;
}  
&:hover{
    opacity: 1;
}
`
const Join = styled.a`
    padding: 10px 12px;
    text-decoration: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    font-weight: 600;
    color: rgba(0,0,0, .6);
    margin-right: 12px;
    tansition: all .3s ease;
    &:hover{
        background: rgba(0,0,0, .08);
        color: rgba(0,0,0, .8);
        text-decoration: none;
    }
`
const Signin = styled.a`
    box-shadow: inset 0 0 0 1px #0a66c2;
    padding: 10px 24px;
    transition-duration: 168ms;
    cursor: pointer;
    border-radius: 24px; 
    color: #0a66c2;
    font-size: 16px;
    font-weight: 600;
    line-height: 40px;
    text-align: center;
    background-color: rgba(0,0,0,0);
    &:hover {
        background-color: rgba(112, 181, 249, 0.15);
        color: #0a66c2;
        text-decoration: none;
    }
`
const Section =styled.section`
    display: flex; 
    align-content: start;
    min-height: 700px;
    padding: bottom: 138px;
    padding-top: 40px;
    padding: 60px 0;
    position: relative;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1528px;
    align-items: center;
    margin: auto;
`
const Hero = styled.div`
    width: 100%;

    h1{
        color: #8f5849;
        width: 55%;
        padding-bottom: 0;
        font-size: 56px;
        font-weight: 200;
        line-height: 70px;
        letter-spacing: 1.5px;
        @media (max-width: 768px){
            text-align: center;
            font-size: 20px;
            line-height: 2;
            width: 100%;
        }
    }
    
    img {
        // z-index: -1;
        width: 800px;
        height: 670px;
        position: absolute; 
        bottom: -2px;
        right: -80px;
        @media (max-width: 768px){
            top: 130px;
            width: 100%;
            position: initial;
            height: initial;
        }
    }
`
const Form = styled.div`
    margin-top: 20px;
    width: 448px;
    @media (max-width: 768px){
        margin-top: 20px;
        margin: auto;
    }

`
const Line = styled.div`
    position: relative;
&:before{
    content: 'or';
    position: absolute;
    width: 20px;
    padding: 5px 20px;
    height: 20px;
    background-color: #f5f5f5;
    top: 50;
    left: 50%;
    transform: translate(-50%, -50%);
}
`
const SignInForm = styled.div`
& label{
    font-size: 18px;
}
input{
    width: 100%;
    height: 65px;
    margin: 10px 0;
    padding: 20px 8px;
    border-radius: 4px;
    outline: none;
    font-size: 20px;
    }
}
`
const Show = styled.div`
    position: relative;
    background: red;
    margin: 10px 0;
    input{
        margin: 0!important;
    }
`
const ShowIcon = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    right: 0;
    border-radius: 0 4px 4px 0;
    outline: none;
    border: none;
    background: transparent;
    padding: 0 12px;
    color: #0a66c2;
    font-size: 20px;
    font-weight: 600;
`
const SigninBtn = styled.button`
    width: 100%;
    height: 56px;
    outline: none;
    border-radius: 28px;
    font-size: 20px;
    margin-bottom: 20px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
        inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
    vertical-align: middle;
    cursor: pointer;
    background-color: #0a66c2;
    color: #fff;
    letter-spacing: .7px;
`
const Google = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    background-color: #f2f2f2;
    width: 100%;
    height: 56px;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),
        inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0);
    vertical-align: middle;
    transition-duration: 168ms;
    font-size: 20px;
    color: rgba(0,0,0, .6);
    &:hover{
        background-color: rgba(207, 207, 207, 0.25);
        color: rgba(0,0,0, 0.25);
    }
    @media (max-width: 768px){
        
    }
`
const mapStateToProps = (state) =>  ({
    user: state.userState.user,
});
const mapDispatchToProps = (dispatch) => ({
    signIn: () => dispatch(signInAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);