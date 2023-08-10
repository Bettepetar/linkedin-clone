import { connect } from "react-redux";
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import styled from "styled-components";
import Chat from "./Chat";
import Messaging from "./Messaging";

function Messages(props){
    return ( 
        <Wrapper>
             { !props.user && <Redirect to='/' />}
            <Content>
                <Messaging />
                {/* <Chat /> */}
            </Content>
        </Wrapper>
     );
}
 

const Wrapper = styled.div`
    padding-top: 90px;
    height: 98vh;
    box-sizing: border-box;
`
const Content = styled.div`

`

const mapStateToProps = (state) => ({
    user: state.userState.user,
})
export default connect(mapStateToProps)(Messages);