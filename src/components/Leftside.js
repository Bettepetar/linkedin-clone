import { connect } from "react-redux"
import styled from "styled-components"

 function Leftside(props){

    return(
        <Container>
            <Artcard>
                <UserInfo>
                    <CardBackground coverPhoto={props.coverPhoto} /> 
                    <a >
                        <Photo />
                        <Link>Welcome, {props.user && props.user.displayName ? props.user.displayName : 'there!'}</Link>
                    </a>
                    <a >
                        <AddPhotoText>Add a photo{props.userPhoto}</AddPhotoText>
                    </a>
                </UserInfo>
                <Widget>
                    <a>
                        <div>
                            <span>Connection</span>
                            <span>Grow your network</span>
                        </div>
                        <img src="/images/widget-icon.svg" alt="" />
                    </a>
                </Widget>
                <Item>
                    <span>
                        <img src="/images/item-icon.svg" alt="" />
                        My items
                    </span>
                </Item>
            </Artcard>

            <CommunityCard>
                <a>
                    <span>Group</span>
                </a>
                <a>
                    <span>Events 
                        <img src="/images/plus-icon.svg" alt="" />
                    </span>
                </a>
                <a>
                    <span>Followed Hashtags</span>
                </a>
                <a>
                    <span>Discover More</span>
                </a>
            </CommunityCard>
        </Container>
    )
}

const Container = styled.div`
    grid-area: leftside;
    

`
const Artcard = styled.div`
    background-color: #fff; 
    broder: none;
    margin-bottom: 8px;
    border-radius: 5px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);


`
const UserInfo = styled.div`
    border-bottom: 1px solid rgba(0,0,0, .15);
    padding: 12px 12px 16px;
    word-wrap: break-word;
    word-break: break-work;
`
const CardBackground = styled.div`
    background-image: ${ props => props.coverPhoto ? `url(${URL.createObjectURL(props.coverPhoto)})`: "url('/images/card-bg.svg')"};
    background-size: 462px;
    background-position: center;
    margin: -12px -12px 0;
    height: 54px;
`
const Photo = styled.div`
    box-shadow: none;
    background-image: url('/images/photo.svg');
    width: 72px;
    height: 72px;
    background-repeat: no-repeat;
    background-position: center;
    margin: -40px auto 12px; 
    box-sizing: border-box;
    background-clip: content-box;
    background-size: 60%;
    background-color: white;
    border: 2px solid white;
    border-radius: 50%;
`

const Link = styled.div`
    font-size: 16px;
    line-height: 1.5;
    font-weight: 600;
    color: rgba(0,0,0, .9);
`
const AddPhotoText = styled.div`
    color: #0a66c2;
    margin-top: 4px;
    font-size: 12px;
    line-height: 1.33;
    font-weight: 400;
    cursor: pointer;
`
const Widget = styled.div`
    border-bottom: 1px solid rgba(0,0,0, 0.15);
    padding-top: 12px;
    padding-bottom: 12px;
    & > a{
        display: flex;
        align-item: center;
        justify-content: space-between;
        text-decoration: none;
        padding: 4px 12px;
        &:hover{
            background-color: rgba(0,0,0,.08);
        }
    }
    div{
        display: flex;
        flex-direction: column;
        align-items: left;
        text-align: left;
        span{
            font-size: 12px;
            line-height: 1.33;
            &:first-child{
                color: rgba(0,0,0,.8);
            }
            &:nth-child(2){
                color: rgba(0,0,0,1);
            }
        }
    }
    svg{
        color: rgba(0,0,0,1);
    }
`
const Item = styled.a`
    text-align: left;
    display: block;
    padding: 12px;
    font-size: 12px;
    border-color: rgba(0,0,0,8);
    span{
        display: flex;
        align-itmes: center;
        color: rgba(0,0,0,1);
        svg{
            color: rgba(0,0,0,.6);
        }
    }
    &:hover{
        background-color: rgba(0,0,0,.08);
    }
    
`
const CommunityCard = styled(Artcard)`
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 8px 0 0 ;
    @media (min-width: 768px){
        position: sticky;
        top: 60px;
    }
    a{
        text-decoration: none;
        padding: 4px 12px;
        color: #0a66c2;
        cursor: pointer;
        font-size: 14px;
        &:hover{
            background-color: rgba(0,0,0,.08);
        }
        &:last-child{
            color: rgba(0,0,0,.6);
            padding: 12px;
            border-top: 1px solid #d6cec2;
        }
    }
    
    span{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

const mapStateToProps = (state) => ({
    user: state.userState.user,
    coverPhoto: state.userState.coverPhoto,
    myLike: state.userState.like,
})
const mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps,mapDispatchToProps)(Leftside)