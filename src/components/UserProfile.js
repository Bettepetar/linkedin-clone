import styled from "styled-components";
import { CommonCard } from "./Main";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import ChangePhotoModal from "./ChangePhotoModal";
import { useState } from "react";
import { connect } from "react-redux";
const UserProfile = ({coverPhoto}) => {
    const [showPhotoModal, setPhotoModal] = useState('close');
    const [imgOpt, setImgOpt] = useState('')

    const handleClick = () => {
        switch (showPhotoModal) {
            case 'close':
                setPhotoModal('open')
                break;
            case 'open':
                setPhotoModal('close')
                break;
            default:
                setPhotoModal('close')
                break;
        }
    }
    const handleImgChange = (imgOption) => {
        if(imgOption === 'Add photo'){
            setImgOpt('Add photo')
        }else if(imgOption === 'Add background photo'){
            setImgOpt('Add background photo')
        }
        handleClick()
    }
    
    return ( 
        <Container>
            {showPhotoModal === 'open' && <ChangePhotoModal showPhotoModal={showPhotoModal} imgOpt={imgOpt} handleClick={handleClick}/> }
            <InfoBox>
                <ImgInfo>
                    <BgImage coverPhoto={coverPhoto}>
                        {/* <img src={}alt="" /> */}
                        {/* <img src="/images/coverPhoto.jpg" alt="" /> */}
    
                    </BgImage>
                    <Photo onClick={() => handleImgChange('Add photo')}>
                        <img src="/images/photo.svg" alt="" />
                    </Photo>
                    <CoverImg onClick={() => handleImgChange('Add background photo')}>
                        <img src="/images/photo.svg" alt="" />
                    </CoverImg>
                </ImgInfo>
                <TextInfo>
                    <UserText>
                        <h1>User name</h1>
                        <Edit />
                    </UserText>
                    <UserDesc>
                        <p>Port Harcourt, Rivers State, Nigeria <a>Contact info</a> </p>
                        <a>1 connection</a>
                    </UserDesc>
                    <ButtonGroup>
                        <button>Open to</button>
                        <button>Add profile section</button>
                        <button>More</button>
                    </ButtonGroup>
                </TextInfo>
            </InfoBox>
            <Suggested>
                <h1>Suggested for you</h1>
                <p><VisibilityIcon />Private to see</p>
                <h1>Beginer</h1>
                <Level />
                <div>
                    <SuggestedBox>
                        <div>
                            <img src="" alt="" />
                            <h2>Where do you currently work? </h2>
                        </div>
                        <p>Members who include at least one position receive up to 3.5 times as many profile views.</p>
                        <button>Add position</button>
                    </SuggestedBox>
                    <SuggestedBox>
                        <div>
                            <img src="" alt="" />
                            <h2>Which industry do you work in? </h2>
                        </div>
                        <p>Members who add an industry receive up to 2.5 times as many profile views.</p>
                        <button>Add industry</button>
                    </SuggestedBox>
                </div>
            </Suggested>
            <Analytics>
                <h1>Analytics</h1>
                <p><VisibilityIcon />Private to see</p>
                <Report>
                    <StackedBarChartIcon />
                    <div>
                        <h2><a>2 profile Views</a></h2>
                        <p>Discover who viewed your profile</p>
                    </div>
                </Report>
            </Analytics>
            <Resource>
                <h1>Resources</h1>
                <p><VisibilityIcon />Private to see</p>
                <Report>
                    <StackedBarChartIcon />
                    <div>
                        <h2><a>Create mode</a></h2>
                        <p>Discover who viewed your profile</p>
                    </div>
                </Report>
                <Report>
                    <StackedBarChartIcon />
                    <div>
                        <h2><a>My network</a></h2>
                        <p>Discover who viewed your profile</p>
                    </div>
                </Report>

            </Resource>
            <Activity>
                <h1>Activity</h1>
                <a>11 folowers</a>

            </Activity>
        </Container>
     );
}

const Container = styled.div`
    grid-area: 'mainSide';
    overflow: hidden;
`
const InfoBox = styled(CommonCard)`

`
const ImgInfo = styled.div`
    position: relative;
`
const BgImage = styled.div` 
    background-image: ${ props => props.coverPhoto ? `url(${URL.createObjectURL(props.coverPhoto)})`: "url('/images/card-bg.svg')"};
    background-position: center;
    background-size: cover;
    height: 240px;
    img{
        width: 100%;
        object-fit: cover;
        height: 240px;
    }

`
const Photo = styled.div`
    width: 60px;
    height: 60px;
    background-color: #f9f9f9;
    border: 2px solid white;
    margin: -90px auto 10px 32px;
    padding: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CoverImg = styled.div`
position: absolute;
right: 30px;
top: 30px;
padding: 10px;
border-radius: 50%;
background: white;
img{
    width: 22px;
    height: 20px;
}
`
const TextInfo = styled.div`
    padding: 0 30px;
`
const UserText = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1{
        font-size: 32px;
        font-weight: 500;
        color: rgba(0,0,0,.97);
    }
`
const UserDesc = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 5px 0;
    a{
        color: #0a66c2;
        font-size: 18px;
        font-size: 500;
        cursor: pointer;
    }
`
const Edit = styled(ModeEditIcon)`
margin-top: -60px;
`
const ButtonGroup = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 10px 0 20px;
    button{
        display: block;
        padding: 8px 16px;
        margin-right: 5px;
        text-align: center;
        font-size: 18px;
        color: #0a66c2;
        border: 2px solid rgb(10, 102, 194);
        border-radius: 20px;
        &:first-child{
            background: rgb(10, 102, 194);
            color: #fff;
        }
        &:nth-child(3){
            border: 2px solid rgba(0,0,0, .58);
            color: rgba(0,0,0, .58)
        }
    }
`
const Level = styled.div`
    width: 100%;
    height: 10px;
    border-radius: 8px;
    background: rgba(0,0,0,.08);
    position: relative;
    &:before{
        content: '';
        position: absolute;
        width: 25%;
        height: 100%;
        background: rgba(0,0,0,.48);
        border-radius: 8px;
    }
`
const Suggested = styled(CommonCard)`
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 20px 40px 20px 30px;
    h1{
        font-size: 24px;
        font-weight: 500;
        padding: 8px 0;
    }
    p{
        display: flex;
        align-items: center;
        gap: 4px;
        color: rgba(0,0,0,0.68);
    }
    & > div{
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
`
const SuggestedBox = styled.div`
    width: 420px;
    border-radius: 6px;
    padding: 15px 40px 20px 15px;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: -5px 3px -7px 10px rgba(0,0,0,0.75);
    
    div{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        h2{
            font-size: 20px;
            font-weight: 550;
            color: rgba(0,0,0,0.67);
        }
    }
    p{
        text-align: start;
        padding: 10px 0;
    }
    button{
        border: 2px solid rgba(0,0,0, .58);
        color: rgba(0,0,0, .58);
        padding: 8px 16px;
        margin-right: 5px;
        text-align: center;
        font-size: 18px;
        border-radius: 20px;
    }
`
const Analytics = styled(Suggested)`
`
const Report = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    & > div{
        text-align: left;
        cursor: pointer;
    }
    h2 a{
        font-size: 18px;
        color: rgba(0,0,0, .78);
        &:hover{
            color: #0a66c2;
            text-align: left;
            text-decoration: underline;
        }
    }

`
const Resource = styled(Analytics)`

`
const Activity = styled(Analytics)`
    a{
        color: #0a66c2;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
`

const mapStateToProps = (state) => ({
    coverPhoto: state.userState.coverPhoto,
})
export default connect(mapStateToProps)(UserProfile);