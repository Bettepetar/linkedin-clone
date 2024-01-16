import styled from "styled-components";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CreateIcon from '@mui/icons-material/Create';
// import { Search, SearchIcon } from "./Header";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUsersAPI } from "../actions";
import Chat from "./Chat";
function Messaging (props) {
    const [openChat, setOpenChat] = useState(false); // for this
    const [chatOpen, setChatOpen] = useState('close'); // for Chat area
    const [userID, setUserID] = useState(null);
    const [chatUsers, setChatUsers] = useState([])
    const [second, setSecond] = useState(true)
    
    useEffect(() => {
        props.getChatUsers()
        if(props.chatUsers){
            setChatUsers(props.chatUsers?.filter(user => user.uid !== props.user?.uid))
        }
    }, [userID])
    
const setter = (id) => {
    if(userID !== id){
        setUserID(id)
    }else if (userID === id){
        setUserID(id)
    }else{
        setSecond(true)
    }
}
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
        <Grouper large={props.large}>
        <Container large={props.large} openChat={openChat} small={props.small}>
            <Header onClick={() => handleClick(false)}>
                <Logo>
                    {
                        !props.large && (
                            <div>   
                                <img src="/images/user.svg" alt="" />
                                <span></span>
                            </div>
                        )
                    }
                    <h3>Messaging</h3>
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
                <Input>
                    <input type="text" placeholder="search" />
                </Input>
                <SearchIcon>
                    <img src="/images/search-icon.svg" alt="" />
                </SearchIcon>
                <Achive>
                    <img src="/images/search-icon.svg" alt="" />
                </Achive>
            </SearchBar>
            <DisplayMessage>
                    {
                        chatUsers && chatUsers.map((user) => (
                            <a key={user.id}  onClick={() => setter(user.id)}>
                                <UserDetails> 
                                    <UserImg>
                                        <img src={user.photoURL} alt="" />
                                    </UserImg>
                                    <div>
                                    <h2>{user.displayName}</h2>
                                        <span>{user.username}</span>
                                        <p>Send you a message ...</p>
                                    </div>
                                </UserDetails>
                                <div>
                                    date
                                </div>
                            </a>
                        ))
                    }
            </DisplayMessage>
        </Container> 
            <ChatWrap small={props.small}>
                <Chat
                userID={userID}
                small
                large={props.large}
                //  second={second}
                />
                {
                    !props.large &&
                    second && (
                        <>
                            <Chat
                                userID={userID}
                                second={second}
                                small
                            /> 
                            <Chat
                                userID={userID}
                                second={second}
                                small
                            /> 
                            <Chat
                                userID={userID}
                                second={second}
                                small
                            /> 
                        </>
                    )
                }
            </ChatWrap>
        </Grouper>
    )
}
const ChatWrap = styled.div`
    ${ props => props.small && `
        position: fixed;
        right: 340px;
        bottom: 0;
        display: flex;
        gap: 10px;
        // align-items: baseline;
        align-items: end;
        padding: 4px 0;
        overflow: hidden;
        // background: red;
        // max-height: 70vh;
    `}
`
const Grouper = styled.div`
    ${props => props.large && `
        display: flex;
    `}
`
export const Container = styled.div`
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    ${ props => props.small && `
        position: fixed;
        right: 0;
        max-width: 320px;
        width: 320px;
        border-radius: 6px;
    `}
    ${ props => props.large && `
        margin-right: 2px;
        width: 420px;
        border-radius: 6px 0 0 6px;
    `}
    bottom: ${ props => props.openChat ? '-63%' : 0};
    padding: 10px;
    background-color: #fff;
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
export const SearchBar = styled.div`
    opacity: 1;
    flex-grow: 1;
    position: relative;
`;
const Input = styled.div`
    background: red;
    input{
        border: none;
        box-shadow: none;
        background-color: #eef3f8;
        width: 100%;
        border-radius: 2px;
        color: rgba(0,0,0, .8);
        padding: 0 8px 0 40px;
        line-height: 1.75;
        font-size: 14px;
        font-weight: 400;
        border-color: #dce6f1;
        height: 34px;
        vertical-align: text-top;
    }

`
const CommonSearchIcon = styled.div`
    position: absolute;
    margin: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    // z-index: 1;
    border-radius: 0 2px 2px 0;

`
const SearchIcon = styled(CommonSearchIcon)`
    left: 2px;
    top: 10px;

`;
const Achive = styled(CommonSearchIcon)`
    right: 2px;
    top:  10px;
`
const DisplayMessage = styled.div`
    width: 100%;
    height: 420px;

    a{
        display: flex;
        justify-content: space-between;
        cursor: pointer;
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
const mapStateToProps = (state) => ({
    chatUsers: state.chatState.users,  
    user: state.userState.user,
})
const mapDispatchToProps = (dispatch) => ({
    getChatUsers: () => dispatch(getAllUsersAPI())
})
export default connect(mapStateToProps, mapDispatchToProps)(Messaging)