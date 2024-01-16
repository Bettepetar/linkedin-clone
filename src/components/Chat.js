import styled from "styled-components";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { connect } from "react-redux";
import { useState } from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MmsIcon from '@mui/icons-material/Mms';
import GifIcon from '@mui/icons-material/Gif';
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { getAllMsgs, getIncomingMsgAPI, getOutgoingMsgAPI, sendMsgAPI } from "../actions";
import { useEffect } from "react";
import { doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import db from "../firebaseApp";
function Chat (props) {
    const [msgText, setMsgText] = useState('')
    const [minmax, setMinmax] = useState('max')
    const [openChatMsg, setChatMsgOpen] = useState('close')
    const [chatUser, setChatUser] = useState(null);
    const [senderID,  setSenderrID] = useState('') //the logged in userID
    
    useEffect(() => {
        if(props.userID){
            const docRef = doc(db, 'users', props.userID)
            onSnapshot(docRef, (doc) => setChatUser(doc.data()))
            props.getMsg(senderID)
            props.getIncominChat(senderID)
            props.getOutgoingChat(senderID)
            console.log( props.userID)
        }
        if(props.chatUsers){
            const _senderID = props.chatUsers.filter(user => user.uid === props.user.uid)
            setSenderrID(_senderID[0].id)
            // getting the logged usrID from DB NOT UID
        }
    }, [props.userID])
    
    const toggleChat = () => {
        switch (openChatMsg) {
            case 'open':
                setChatMsgOpen('close')
                break;
            case 'close':
                setChatMsgOpen('open')
                break
            default:
                setChatMsgOpen('close')
                break;
        }
    }
    
    
    const minimax = () => {
        switch (minmax) {
            case 'max':
                setMinmax('min')
                break;
            case 'min':
                setMinmax('max')
                break
            default:
                setMinmax('max')
                break;
        }
    }

    const sendChat = () => {
        const payload = {
            text: msgText,
            recieverID: props.userID,
            senderID: senderID, //preferably get the user id
            timeStamp: serverTimestamp()

        }
        props.sendChat(payload)
        reset()
        // props.getMsg(senderID)
    }
    const reset =() => {
        setMsgText('')
    }
    return (
        <>
        {
            chatUser && (
        <ChatContainer minmax={minmax} second={props.second} chat={openChatMsg} small={props.small} large={props.large}>
            
            <ChatHeader 
                
            >
                <ChatLogo

                    onClick={props.small && toggleChat}
                >
                    {
                        !props.large && (
                            <div>   
                                <img src={chatUser.photoURL} alt="" />
                            </div>
                        )
                    }
                    <a> {chatUser ? chatUser.displayName  : 'user Name'}</a>
                </ChatLogo>
                <ChatIcons> 
                    {
                        (!props.large) ? (
                            <>
                                {openChatMsg === 'open' && (
                                    <>
                                        <div>   
                                            <MoreHorizIcon />
                                        </div>
                                        <div>   
                                            <CloseFullscreenIcon 
                                                
                                                onClick={props.small && minimax}
                                            />
                                        </div>
                                    </>
                                )}
                                <div>   
                                    <CloseIcon />
                                </div>
                            </>

                            )
                            : (
                                <>
                                    <div>   
                                        <MoreHorizIcon />
                                    </div>
                                    <div>   
                                        <StarBorderIcon />
                                    </div>
                                </>
                                
                            )
                    }
                </ChatIcons>
            </ChatHeader>
            <ReceiverDetails> 
                <div>
                    <img src={chatUser.photoURL} alt="" />
                    <a> <h3>{chatUser.displayName}</h3></a> 
                    <div>
                        Founder, Tech-lead | Software-Engineer | Full Stack 
                    </div>
                </div>
                <ChatSection>
                    {
                        props?.messages?.map((message) => (
                            message.recieverID === props.userID ? (
                                <OutgoingChat key={message.id}> 
                                    <div>
                                    {/* <img src={message.photoURL} alt="" />                         */}
                                    <img src={props.user.photoURL} alt="" />
                                    <a> <h3>{props.user && props.user.displayName ? props.user.displayName: 'User Name'}</h3></a>
                                    
                                    </div>
                                                <Message>
                                                    {/* <div>{message.text}</div> */}
                                                    <div>{message.text}</div>
                                                </Message>
                                </OutgoingChat>

                            )
                                :
                                message.senderID === props.userID && (
                                <IncomingChat key={message.id}> 
                                    <div>
                                        <img src={chatUser.photoURL} alt="" />
                                        <a> <h3>{chatUser.displayName}</h3></a>
                                    </div>
                                    <Message>
                                        {/* <div>{message.text}</div> */}
                                        <div>{message?.text}</div>
                                    </Message>
                                </IncomingChat>

                            )

                        ) )

                    }
                </ChatSection>
            </ReceiverDetails>
            <TextArea>
                <TextSection>
                    <textarea 
                    value={msgText}
                    placeholder="write a message..."
                    onChange={(e) => setMsgText(e.target.value)}></textarea>
                    <ButtonGroups>
                        <div>
                            <AttachFileIcon />
                            <MmsIcon />
                            <SentimentDissatisfiedIcon />
                            <GifIcon />
                        </div>
                        <div>
                            <SendBtn disabled={msgText ==='' ? true : false} onClick={() => sendChat()}>Send</SendBtn>
                            <MoreHorizIcon />
                        </div>
                    </ButtonGroups>
                </TextSection>
            </TextArea>
        </ChatContainer> 

            )
        }
        </>
    )
}
const ChatContainer = styled.div`
    background-color: #fff;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
        border-radius: 6px;
        transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    ${ props => props.small && `
        // position: fixed;
        // right: 340px;
        z-index: 999999;
    `}
    ${ props => (props.small && props.chat && props.minmax) && `
        margin-bottom: ${ props.chat === 'open' ? '0' : '-550px'};
        width: ${ props.chat === 'close' ? '280px' : '400px'};
        ${ (props.chat === 'open' && props.minmax === 'max') && `
            width: 600px;
        `}
    `}

    ${ props => props.large && `
        position: initial;
        min-width: 600px !important;
        border-radius: 0 6px 6px 0;
    `}
    ${ props => (props.second && props.chat) && `
        // right: ${ props.chat === 'close' ? 'calc(320px + 340px + 2px)' : 'calc(602px + 340px)'};
    `}

`
const ChatHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0, .15);
    padding: 10px 10px 20px;
    margin-bottom: 2px; 
    cursor: pointer;
`
const ChatIcons = styled.div`
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
const ChatLogo = styled.a`
display: flex;
align-items: center;
flex-grow: 1;
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

const ReceiverDetails = styled.div`
        height: 330px;
        overflow: auto;
        padding-left: 10px;
    & > div {
        padding:0 0 5px;
        border-bottom: 1px solid rgba(0,0,0, .15);
        a{
            cursor: pointer;
            h3{
                font-size: 23px;
                font-weight: 500;
                padding: 5px 0;
            }
            &:hover {
                text-decoration: underline;

            }
        }
    }
    img{
        border-radius: 50%;
        display: block;
        width: 100px;
        margin-bottom: 5px;
    }
`
const ChatSection = styled.section`
    padding: 10px;
`
const OutgoingChat = styled.div`
    position: relative;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    & > div{
        display: flex;
    }
    img{
        width: 50px;
        position: absolute;
        left: 3px;
        top: 10px;
        margin-right: 5px;
    }
    a{
        padding: 0  0 10px 60px;
        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
        
`
const IncomingChat = styled(OutgoingChat)`
    // margin-right: auto;
    // background: red;
`
const Message = styled.div`
    flex-grow: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    gap: 5px;
    &:hover{
        background-color: rgba(0,0,0,.06);
    }
    div{
        padding: 0 0 10px 60px;
    }

`
const TextArea = styled.section`
    border-top: 1px solid rgba(0,0,0, .15);
    padding: 10px;
    border: 1px solid 
    width: 100%;
    position: relative;
`
const TextSection = styled.div`
    textarea{
        width: 100%;
        height: 120px;
        padding: 20px 40px;
        border: none;
        outline: none;
        background: tansparent;
        background-color: rgba(0,0,0,.05);
        resize: none;
        border-radius: 6px;
    }
`
const ButtonGroups = styled.div`
    display: flex;
    padding: 5px;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(0,0,0, .15);
    div{
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 0 0;

    }

`
const SendBtn = styled.button`
    opacity: ${props => props.disabled ? .6: 1};
    padding: 4px 14px;
    border: none;
    outline: none;
    border-radius: 20px;
    letter-spacing: 1.1px;
    font-size: 16px;
    transition: color background .3s ease;
    color: ${props => props.disabled ? '#333' : '#fff'};
    cursor: ${props => props.disabled? 'none' : 'pointer'};
    background: ${props => props.disabled? 'rgba(0,0,0,.07)': '#0a66c2'};

`
const mapStateToProps = (state) => ({
    user: state.userState.user,
    incomingMsg: state.chatState.incomingMsg,
    outgoingMsg: state.chatState.outgoingMsg,
    chatUsers: state.chatState.users,
    chatLoading: state.chatState.chatLoading,
    messages: state.chatState.messages,
}) 
const mapDispatchToProps = (dispatch) => ({
    getIncominChat: (senderID) => dispatch(getIncomingMsgAPI(senderID)),
    getOutgoingChat: (senderID) => dispatch(getOutgoingMsgAPI(senderID)),
    sendChat: (payload) => dispatch(sendMsgAPI(payload)),
    getMsg: (user) => dispatch(getAllMsgs(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(Chat)