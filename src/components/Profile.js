import { connect } from "react-redux";
import styled from "styled-components";
import RightProfile from "./RightProfile";
import UserProfile from "./UserProfile";
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

const Profile = ({user}) => {
    return ( 
        <Container>
            { !user && <Redirect to='/' />}
            <Layout>
                <UserProfile />
                <RightProfile />
            </Layout>
        </Container>
     );
}
const Container = styled.section`
    position: relative;
    padding-top: 70px;
`
const Layout = styled.div`
    display: grid;
    grid-template-areas:  'mainSide rightprofile';
    grid-template-columns: minmax(0, 9fr) minmax(0, 3fr);
    column-gap: 20px;
    padding: 0px 80px;
    @media (max-width: 768px){
        display: flex;
        flex-direction: column;
    }
`
const mapStateToProps = (state) => ({
    user: state.userState.user
})
export default connect(mapStateToProps)(Profile);