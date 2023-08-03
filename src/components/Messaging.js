import styled from "styled-components";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
import { Search, SearchIcon } from "./Header";
import { useState } from "react";
function Messaging () {
    const [openChat, setOpenChat] = useState(true);
     const [chatOpen, setChatOpen] = useState('close');
    const handleClick = () => {
        switch (openChat) {
            case true:
                setOpenChat(false)
                break;
                case false:
                setOpenChat(true)
                break;
        
            default:
                setOpenChat(true)
                break;
        }
    }
    return (
        <>
        {
             (

        <Container openChat={openChat}>
            <Header onClick={() => handleClick(false)}>
                <Logo>
                    <div>   
                        <img src="/images/user.svg" alt="" />
                        <span></span>
                    </div>
                    <h3>Messaging <span>{chatOpen}</span></h3>
                </Logo>
                <Icons> 
                    <div>   
                        <MoreHorizIcon />
                    </div>
                    <div>   
                        <CreateIcon />
                    </div>
                    <div>   
                        <ExpandMoreIcon />
                    </div>
                </Icons>
            </Header>
            <SearchBar>
                <div>
                    <input type="text" placeholder="search" />
                </div>
                <SearchIcon>
                    <img src="/images/search-icon.svg" alt="" />
                </SearchIcon>
                <Achive>
                    <img src="/images/search-icon.svg" alt="" />
                </Achive>
            </SearchBar>
            <DisplayMessage>
              <a onClick={() => setChatOpen('open')}>
                <UserDetails> 
                    <UserImg>
                        <img src="/images/user.svg" alt="" />
                    </UserImg>
                    <div>
                    <h2>Cyril Peter</h2>
                        <span>username</span>
                        <p>Send you a message ...</p>
                        {/* Thanks for being a valued member – we’re so glad you’re here. We’d like to offer you a 1-month free trial of LinkedIn Premium to help you uncover new opportunities. */}
                    </div>
                </UserDetails>
                <div>
                    date
                </div>
              </a>
              <a >
                <UserDetails> 
                    <UserImg>
                        <img src="/images/user.svg" alt="" />
                    </UserImg>
                    <div>
                    <h2>James Enoch</h2>
                        <span>username</span>
                        <p>Send you a message ...</p>

                    </div>
                </UserDetails>
                <div>
                    date
                </div>
              </a>
            </DisplayMessage>
        </Container> 
        )
    }
        </>
    )
}


export const Container = styled.div`
    position: fixed;
    bottom: ${ props => props.openChat ? '-63%' : 0};
    right: 0;
    background-color: #fff;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    max-width: 320px;
    width: 320px;
    padding: 10px;
    border-radius: 6px;
`
export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0, .15);
    padding-bottom: 20px;
    margin-bottom: 10px; 
    cursor: pointer;
`
export const Logo = styled.a`
    display: flex;
    align-items: center;
    div{
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 4px;
        position: relative;

        img{
            width: 100%;
            border-radius: 100%;
        }
        
        span{
            position: absolute;
            right: -4px;
            bottom: 2px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: 2px solid #fff;
            background-color: green;

        }
    }
`

export const Icons = styled.div`
    display: flex;
    aligh-items: center;
    justify-content: space-between;
    div{
        padding: 10px;
        // background-color: red;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-item: center;
        
        &:hover{
            background-color: rgba(0,0,0,.08);
        }
    }
`
const SearchBar = styled(Search)`
    div{
        flex: 1;
        padding: 0 4px;
        margin-bottom: 6px;
        input{
            width: 84%;
            padding: 0 40px 0 40px;
            position: relative;
            tansition: all .3s ease;
            &:hover{
                outline: auto;
            }
        }
    }
`
const Achive = styled.div`
    position: absolute;
    right: 10px;
    bottom: 7px;
`
const DisplayMessage = styled.div`
    width: 100%;
    height: 420px;

    a{
        display: flex;
        justify-content: space-between;
        &:hover{
            background-color: rgba(0,0,0,.08);
        }
    }

`
const UserImg = styled.div`
    width: 50px;
    // height: 400px;
    border-radius: 50%;
    position: relative;
    margin-right: 5px;
    img{
        width: 100%;
        border-radius: 50%;
        margin-right: 8px;
    }
`
const UserDetails = styled.div`
    display: flex;
    align-items: start;
    padding: 5px 0;
    span{
        font-size: 14px;
        display: block;
    }
    p{
        font-size: 12px;
    }
`
export default Messaging;