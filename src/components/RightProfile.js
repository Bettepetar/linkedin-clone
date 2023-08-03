import styled from "styled-components";
import { CommonCard } from "./Main";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { connect } from "react-redux";
const RightProfile = ({coverPhoto}) => {
    return ( 
        <Container>
            <ContentBox>
                <Edit>
                    <div>
                        <h2>Profile Language</h2>
                        <p>English {`${coverPhoto}cover`}</p>
                    </div>
                    <ModeEditOutlinedIcon />
                </Edit>
                <Edit>
                    <div>
                        <h2>Profile Language</h2>
                        <p>www.linkedin.com/in/peter-bette-757315249</p>
                    </div>
                    <ModeEditOutlinedIcon />
                </Edit>
            </ContentBox>
            <AdImg>
                <img
                    src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
                    alt=""
                />
            </AdImg>
        </Container>
     );
}
 
const Container = styled.div`
    grid-area: 'rightprofile';
`
const ContentBox = styled(CommonCard)`

`
const Edit = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 20px;
    margin: 0 10px;
    &:first-child{
        border-bottom: 1px solid rgba(0,0,0,.09);
    }
    div{
        text-align: left;
        h2{
            font-size: 22px;
            font-weight: 500;
            padding-bottom: 10px;
        }
    }

`
const AdImg = styled(CommonCard)`
    img{
        width: 100%;
        height: 100%;
    }
`

const mapStateToProps = (state) => ({
    coverPhoto: state.userState.coverPhoto,
})
export default connect(mapStateToProps)(RightProfile);