import styled from "styled-components";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { Container, Header, Icons, Logo } from "./Messaging";
import { connect } from "react-redux";
import { useState } from "react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MmsIcon from '@mui/icons-material/Mms';
import GifIcon from '@mui/icons-material/Gif';
import CloseIcon from '@mui/icons-material/Close';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
function Chat (props) {
    const [msgText, setMsgText] = useState('')
    return (
        <ChatContainer>
            <ChatHeader>
                <ChatLogo>
                    <div>   
                        <img src="https://media.licdn.com/dms/image/C4D03AQHa7hNZCJT1nA/profile-displayphoto-shrink_200_200/0/1654076850253?e=1695859200&v=beta&t=EkqtndATCHE-JwuUtBFVC5o5FgXQuWxiYDfsXpzEpeI" alt="" />
                    </div>
                    <a> User Name</a>
                </ChatLogo>
                <ChatIcons> 
                    <div>   
                        <MoreHorizIcon />
                    </div>
                    <div>   
                        <CloseFullscreenIcon />
                    </div>
                    <div>   
                        <CloseIcon />
                    </div>
                </ChatIcons>
            </ChatHeader>
            <ReceiverDetails> 
                <div>
                    <img src="https://media.licdn.com/dms/image/C4D03AQHa7hNZCJT1nA/profile-displayphoto-shrink_200_200/0/1654076850253?e=1695859200&v=beta&t=EkqtndATCHE-JwuUtBFVC5o5FgXQuWxiYDfsXpzEpeI" alt="" />
                    <a> <h3>Nwachukwu Tochukwu</h3></a> 
                    <div>
                        Founder, Tech-lead | Software-Engineer | Full Stack
                    </div>
                </div>
                <ChatSection>
                    <OutgoingChat> 
                        <div>
                        <img src="/images/user.svg" alt="" />
                            <a> <h3>{props.user && props.user.displayName ? props.user.displayName: 'User Name'}</h3></a>
                           
                        </div>
                         <Message>
                            <div>Hey man</div>
                            <div>Hey man</div>
                        </Message>
                    </OutgoingChat>
                    <OutgoingChat> 
                        <div>
                        <img src="/images/user.svg" alt="" />
                            <a> <h3>{props.user && props.user.displayName ? props.user.displayName: 'User Name'}</h3></a>
                           
                        </div>
                         <Message>
                            <div>Hey man</div>
                            <div>Hey man</div>
                        </Message>
                    </OutgoingChat>
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
                            <SendBtn disabled={msgText ==='' ? true : false}>Send</SendBtn>
                            <MoreHorizIcon />
                        </div>
                    </ButtonGroups>
                </TextSection>
            </TextArea>
        </ChatContainer> 
    )
}
const ChatContainer = styled(Container)`
    display: none;
    position: fixed;
    bottom: 5px;
    right: 340px;
    min-width: 500px;
    z-index: 999999;

`
const ChatHeader = styled(Header)``
const ChatIcons = styled(Icons)`
`
const ChatLogo = styled(Logo)`

`

const ReceiverDetails = styled.div`
    & > div {
        padding-bottom: 5px;
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
const ChatSection = styled.section``
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
    padding-top: 10px;
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
}) 

export default connect(mapStateToProps)(Chat)