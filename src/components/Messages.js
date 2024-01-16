import { connect } from "react-redux";
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import styled from "styled-components";
import Messaging from "./Messaging";

function Messages(props){
    return ( 
        <Container>
             { !props.user && <Redirect to='/' />}
            <Content>
                <Layout>
                    <Wrap>
                        <Messaging large userID={'DW4i4FxyJJTK2vtFuKG0'}/>
                    </Wrap>
                    <RightAD>
                        <img
                            src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
                            alt=""
                        />
                    </RightAD>
                </Layout>
            </Content>
                <Messaging small/>
        </Container>
     );
}
 

const Container = styled.section`
    position: relative;
    padding-top: 70px;
`
const Layout = styled.div`
    display: grid;
    grid-template-areas: 'message ad';
    grid-template-columns: minmax(0, 9fr) minmax(0, 3fr);
    column-gap: 20px;
    padding: 0px 80px;
`
const Content = styled.div`

`
const Wrap = styled.section`
    grid-area: message;
    position: relative;
`
const RightAD = styled.div`
    grid-area: ad;
    img{
        width: 100%;
        padding: 2px 10px;
        background: white;
    }
`

const mapStateToProps = (state) => ({
    user: state.userState.user,
})
export default connect(mapStateToProps)(Messages);