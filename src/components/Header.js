import { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom/cjs/react-router-dom.min';
import styled from "styled-components"
import { signOutAPI } from '../actions';

function Header(props){
    const [showDropdown, setShowDropDown] = useState('close');
    const [searchWidth, setSearchWidth] = useState('')
    const handleDropdown = () => {
        switch (showDropdown) {
            case 'close':
                setShowDropDown('open')
                break;
            case 'open':
                setShowDropDown('close')
            break;
        
            default:
                setShowDropDown('close')
                break;
        }
    }
    const expandSearch = () =>{
        switch (searchWidth){
            case '':
                setSearchWidth('full')
                break
            case 'full': 
                setSearchWidth('')
                break
            default:
            setSearchWidth('full')

        }
    }
    return(
        <Container>
            <Content>
                <Logo>
                    <Link to="/home">
                        <img src="/images/home-logo.svg" alt="" />
                    </Link>
                </Logo>
                <Search width={searchWidth}>
                    <div>
                        <input onFocus={expandSearch} type="text" placeholder="search" />
                    </div>
                    <SearchIcon>
                        <img src="/images/search-icon.svg" alt="" />
                    </SearchIcon>
                </Search>
                <Nav>
                    <NavlistWrap>
                        <Navlist>
                            <NavLink to="/home" >
                                <img src="/images/nav-home.svg" alt="" />
                                <span>Home</span>
                            </NavLink>
                        </Navlist>
                        <Navlist>
                            <a >
                                <img src="/images/nav-network.svg" alt="" />
                                <span>My Network</span>
                            </a>
                        </Navlist>
                        <Navlist>
                            <a >
                                <img src="/images/nav-jobs.svg" alt="" />
                                <span>Jobs</span>
                            </a>
                        </Navlist>
                        <Navlist>
                            <a >
                                <img src="/images/nav-messaging.svg" alt="" />
                                <span>messaging</span>
                            </a>
                        </Navlist>
                        <Navlist>
                            <a>
                                <img src="/images/nav-notifications.svg" alt="" />
                                <span>Notifications</span>
                            </a>
                        </Navlist>
                        
                        <User>
                            <a >
                                {
                                 props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" /> 
                                }
                                <span onClick={() => handleDropdown()}>
                                    Me <img src="/images/down-icon.svg" alt="" /> 
                                </span>   
                            </a> 

                            { showDropdown === 'open' && (
                                <DropDown>
                                    <DropHead>
                                        <div>
                                            { props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" />: <img src="/images/user.svg" alt="" />}
                                            { props.user && props.user.displayName ? <h2>{props.user.displayName }</h2> : <h2>User Name</h2>}
                                        </div>
                                        <Link onClick={handleDropdown} to="/profile">View Profile</Link>
                                    </DropHead>
                                    <div>
                                        <h3>Article</h3>
                                        <ul>
                                            <li><a >Setting and privacy</a></li>
                                            <li><a >Help</a></li>
                                            <li><a >Language</a></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3>Manage</h3>
                                        <ul>
                                            <li><a >Post and activity</a></li>
                                            <li><a >Job posting account</a></li>
                                        </ul>
                                    </div>
                                    <Signout onClick={() => props.logOut()}>
                                        <a >Sign out</a>
                                    </Signout>
                                </DropDown>
                            )}
                        </User>
                        <Work>
                            <a >
                                <img src="/images/nav-work.svg" alt="" />
                                <span>
                                    Me <img src="/images/down-icon.svg" alt="" /> 
                                </span>
                                   
                            </a> 
                        </Work>
                    </NavlistWrap>
                </Nav>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    background-color: white;
    border-bottom: 1px solid rgba(0,0,0, .08);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 10px 65px;
    z-index: 999;
`;
const Content = styled.div`
    display: flex;
    align-items: center;
    // justify-content: space-between;
    min-height: 100%;
    margin: 0 auto;
`;
const Logo = styled.div`
    margin-right: 8px;
    font-size: 0px;
`
export const Search = styled.div`
    opacity: 1;
    flex-grow: 1;
    position: relative;
    & > div{
        max-width: 320px;
        input{
            border: none;
            box-shadow: none;
            background-color: #eef3f8;
            width: ${props => props.width ? '100%' : '218px'};
            border-radius: 2px;
            color: rgba(0,0,0, .8);
            padding: 0 8px 0 40px;
            line-height: 1.75;
            font-size: 14px;
            font-weight: 400;
            border-color: #dce6f1;
            height: 34px;
            vertical-align: text-top;
            transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        }
    }
    @media (max-width: 768px){
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: center;
        height: 35px;
        input{
            display: none;
        }
    }
`;
export const SearchIcon = styled.div`
    width: 40px;
    z-index: 1;
    border-radius: 0 2px 2px 0;
    position: absolute;
    top: 10px;
    left: 2px;
    margin: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px){
        position: initial;
        img{  
            width: 70%;
        }
    }

`;
const Nav = styled.nav`
    margin-left: auto;
    display: block;
    // @media(max-width: 768px){
    //     position: fixed;
    //     bottom: 0;
    //     left: 0;
    //     background-color: white;
    //     width: 100%;
    // }
`;
const NavlistWrap = styled.ul`
    list-style-type: none;
    display: flex;
    flex-wrap: no-wrap;

   
`
const Navlist = styled.li`
    display: flex;
    align-items: center;
    a{ 
        display: flex;
        align-items: center;
        background: transparent;
        flex-direction: column;
        justify-content: center;
        font-size: 12px; 
        font-weight: 400;
        line-height: 1.5;
        min-height: 42px;
        min-width: 80px;
        position: relative;
        text-decoration: none;
        transiton: .3s ease;

        &.active{
            span::after{
                content: '';
                transform: scaleX(1);
                border-bottom: 2px solid #fff;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                border-color: rgba(0,0,0,.9); 
            }
        }
        span{
            color: rgba(0,0,0,.6);
            display: flex; 
            align-items: center;
        }
        @media(max-width: 768px){
            min-width: 70px;
        }
        &:hover, &:active{
            span{
                color: rgba(0,0,0,.9);
            }
        }
    }
`
const DropDown = styled.section`
    position: absolute;
    top: 50px;
    left: -160px;
    width: 280px;
    cursor: pointer;
    background: white;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 /15%),  0 0 0 1px rgb(0 0 0 /28%);

    div{
        border-bottom: 1px solid rgba(0,0,0, .08);
        padding: 10px;
        a{
            align-items: left;
            align-items: flex-start;
            font-size: 16px;
            &:hover{
                text-decoration: underline;
            }

        }
    }
`
const DropHead = styled.div`
    padding-bottom: 8px;
    // border-bottom: 1px solid rgba(0,0,0, .08);
    & > div{
        display: flex;
        align-items: flex-start;
        border: none;
        margin-bottom: 5px;
        & > h2{
            padding-top: 6px;
        }
    }
    img{
        width: 70px;
        border-radius: 50%;
        margin-right: 8px;
    }
    a{
        align-items: center!important;
        text-align: center;
        width: 100%;
        border: 2px solid rgb(10, 102, 194);
        color: rgb(10, 102, 194);
        font-size: 16px;
        letter-spacing: .6px;
        border-radius: 30px;
        &:hover{
            background-color: transparent;
            text-decoration: none!important;
        }
    }

`
const Signout = styled.div`
    left: 0;
    width: 100%;
    background: white;
    border-radius: 0 0 5px 5px;
    height: 40px;
    font-size: 16px;
    transition-duration: 167ms;
    a{
        padding: 10px;
        margin: -10px;
        &:hover{
            text-decoration: none !important;
        }
    }
`
const User = styled(Navlist)`
    position: relative;
a > img{
    width: 24px;
    height: 24px;
    border-radius: 50%;
 }
 span{
    display: flex;
    align-items: center;
 }

//  &:hover{
//     ${Signout}{
//         display: block;
//     }
//  }

`
const Work = styled(User)`
 border-left: 1px solid rgba(0,0,0, .08);
`

const mapStateToProps = (state) => ({
    user: state.userState.user
})
const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(signOutAPI())
 })
export default connect(mapStateToProps, mapDispatchToProps)(Header);