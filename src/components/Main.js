import { useEffect } from "react";
import { useState } from "react"
import ReactPlayer from "react-player";
import { connect } from "react-redux"
import styled from "styled-components"
import { getArticlesAPI } from "../actions";
import PostModal from "./PostModal"
import CloseIcon from '@mui/icons-material/Close';
function Main(props){
    const [jobBox, setJObBox] = useState('show')
    const [showModal, setShowModal] = useState("close");
    const [idProps, setIdProps] = useState("");
    const [_delete, setDelete] = useState('')
    useEffect(() => {
        props.getArticles()
    }, [])
    const handleUpdate= (e, id, action) => {
        if(e.target !== e.currentTarget){
            return
        }
        if(action === 'delete'){
            setDelete('delete')
        }
        handleClick()
        setIdProps(id)
    }

    const handleClick = (e) => {
        e?.preventDefault();

        switch (showModal) {
            case "Open":
                setShowModal("close")
                break;
            case "close":
                setShowModal("open")
                break;
        
            default:
                setShowModal("close")
                break;
        }
    }
    return(
    <>{
        props.articles.length === 0 ?
        <p>There are no articles</p>
        :
        (<Container>
            {
                jobBox === 'show' && (
                    <JobBox>
                        <img src="/images/job-image.png" alt="" />
                        <h2>Hi <span>{props.user && props.user.displayName ?props.user.displayName: "User" }</span> are you looking for a job right now?</h2>
                        <p>Your response is only visible to you</p>
                        <div>
                            <button>Yes</button>
                            <button>No, but i'm open</button>
                        </div>
                        <CloseButton onClick={() => setJObBox(false)}/>
                    </JobBox>
                )
            }
            <ShareBox>
                <div>
                    {props.user && props.user.photoURL ? <img src={props.user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
                    <button onClick={handleClick} disabled={props.loading ? true : false}>Start a post</button>
                </div>
                <div>
                    <button> 
                        <img src="/images/photo.svg" alt="" />
                        <span>Photo</span> 
                    </button>
                    <button> 
                        <img src="/images/photo.svg" alt="" />
                        {/* <img src="/images/video-icon.svg" alt="" /> */}
                        <span>Video</span> 
                    </button> 
                    <button> 
                        {/* <img src="/images/event-icon.svg" alt="" /> */}
                        <img src="/images/photo.svg" alt="" />
                        <span>Events</span> 
                    </button>
                    <button> 
                        {/* <img src="/images/event-icon.svg" alt="" /> */}
                        <img src="/images/photo.svg" alt="" />
                        <span>Write article</span> 
                    </button>
                </div>
            </ShareBox> 
            <Content>
                { props.loading && <div>loading new post {props.progress}</div> }
                {

                !props.loading && props.articles.length > 0 && props.articles.map((article) => (

                   
                <Article key={article.id}>
                    <SharedActor>
                        <a>
                            {<img src={article.author.image} alt="" />}
                            <div>
                                <span>{article.author?.description}</span>
                                <span>{article.author?.title}</span>
                                <span>{!props.loading && article.author.date?.toDate().toLocaleDateString().toString()}</span>
                            </div>
                        </a>
                        <Ellipsis >
                            <button>...</button>
                            <DropDown>
                                <span onClick={(e) => handleUpdate(e, article.id, 'edit')}>Edit</span>
                                <span onClick={(e) => handleUpdate(e, article.id, 'delete')}>Delete</span>
                            </DropDown>
                        </Ellipsis>
                    </SharedActor>
                    <Description>
                        {article?.description}
                    </Description>
                    <SharedImg>
                        <a >
                            {
                                !article?.shareImg && article?.video ? 
                                <ReactPlayer width={'100%'} url={article?.video}></ReactPlayer>
                                : article.shareImg &&
                               ( <img src={article.shareImg} alt="" />)
                            }
                        </a>
                    </SharedImg>
                    <SocialCount>
                        <li>
                            <button>
                                <img src="/images/like-icon.svg" alt="" />
                                <img src="/images/clap-icon.svg" alt="" />
                                <span>75</span>
                            </button>
                        </li>
                        <li>
                            <a >2 comments</a>
                        </li>
                    </SocialCount>
                    <SocialAction>
                        <button>
                            <img src="/images/like-icon.svg" alt="" />
                            <span>Like</span>
                        </button>
                        <button>
                            <img src="/images/nav-messaging.svg" alt="" />
                            <span>comments</span>
                        </button>
                        <button>
                            <img src="/images/nav-messaging.svg" alt="" />
                            <span>Share</span>
                        </button>
                        <button>
                            <img src="/images/nav-messaging.svg" alt="" />
                            <span>Send</span>
                        </button>
                    </SocialAction>
                </Article> 
                    )) 
                }
            </Content>
            <PostModal showModal={showModal} handleClick={handleClick} id={idProps} _delete={_delete} setDelete={setDelete}/>
        </Container>)
    }</>
    )
}

const Container = styled.div`
    grid-area: main;
`
export const CommonCard = styled.div`
    text-align: center;
    margin-bottom: 8px;
    overflow: hiddden;
    background-color: white;
    border: none;
    position: relative;
    border-radius: 5px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 /15%),  0 0 0 1px rgb(0 0 0 /28%);
    overflow: hidden;

`
const ShareBox = styled(CommonCard)`
    display: flex;
    color: #958b7b;
    flex-direction: column;
    backgroun: white;
    margin: 0 0 8px;
    div{
      button{
        outline: none;
        color: rgba(0,0,0, 0.6);
        font-size: 14px;
        display: flex;
        align-items: center;
        min-height: 48px;
        background: transparent;
        border: none;
        display: flex;
        align-item: center;
        font-weight: 600;
      }
      &:first-child{
        display: flex;
        align-items: center;
        padding: 8px 16px 0px 16px;
        img{
            width: 48px;
            border-radius: 50%;
            margin-right: 5px;
        }
        button{
            margin: 4px 0;
            padding-left: 15px;
            flex-grow: 1;
            border-radius: 35px;
            border: 1px solid rgba(0,0,0, .15);
            background-color: white;
        }
      }
      &:nth-child(2){
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        img{
            width: 32px;
            margin: 0 4px 0 -2px;
        }
        span{
            color: #70b5f9;
        }
      }
    }
`
const JobBox = styled(ShareBox)`
    position: relative;
    align-items: center;
    color: #111;
    padding: 20px 0;
    img{
        width: 150px;
    }
    h2{
        font-size: 23px;
        padding: 10px 0;
        font-weight: 500;
    }
    p{
        font-size: 18px;
    }
    div{
        display: flex;
        justify-content: center;
        gap: 10px;
        flex: 1;
        width: 100%;
        padding: 20px;
        button{
            padding: 10px 34px;
            display: block;
            text-align: center;
            max-width: 360px;
            width: 360px;
            font-size: 18px;
            color: #0a66c2;
            border: 2px solid rgb(10, 102, 194);
            border-radius: 20px;

            &:hover{
                background-color: rgba(255, 255, 255, 0.9);
                cursor: pointer;
            }
        }
    }
`

const CloseButton = styled(CloseIcon)`
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 50%;
    &:hover{
        background-color: #f2f2f2;
        transition: all .3s ease;
    }
`
const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visisble; 
`
const DropDown = styled.div`
    position: absolute;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 /15%),  0 0 0 1px rgb(0 0 0 /28%);
    right: 12px;
    top: 30px;
    background: #ffff;
    cursor: pointer;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    span{
        padding: 5px 20px;
    }

`
const SharedActor = styled.div`
    padding-right: 40px;
    padding: 12px 16px 0;
    flex-wrap: no-wrap;
    margin-bottom: 8px;
    display: flex;
    align-item: center;
    a{
        margin-right: 12px;
        text-decoration: none;
        display: flex;
        img{
            width: 48px;
            height: 48px;
        }
        & > div{
            display: flex;
            flex-direction: column;
            over-flow: hidden;
            margin-left: 8px;
            span{
                text-align: left;
                &:first-child{
                    font-size: 14px;
                    color: rgba(0,0,0,1);
                    font-weight: 700;
                }
                &:nth-child(n + 1){
                    color: rgba(0,0,0,0.6);
                }
            }
        }
    }
`
const Ellipsis = styled.div`button{
    border: none;
    outline: none;
    background: transparent;
    font-size: 22px;
    font-weight: 700;
    position: absolute;
    right: 12px;
    top: 0px;
}

`
const Description = styled.div`
    padding: 0 16px;
    font-size: 14px;
    color: rgba(0,0,0,.9);
    text-align: left; 
    overflow: hidden;
`

const SharedImg = styled.div`
    width: 100%;
    position: relative;
    display: block;
    background-color: #f3f3f3;
    margin-top: 8px;

    img{ 
        object-fit: cover;
        width: 100%;
        height: 400px;
    }

`
const SocialCount = styled.ul`
    display: flex;
    list-style-type: none;
    align-items: center;
    margin: 0 16px;
    line-height: 0.3;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    li{
        margin-right: 5px;
        button{
            display:flex;
            align-items: center;
            border: none;
            outline: none;
            background: transparent;
        }
    }

`
const SocialAction = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 4px 8px;
    button{
        display: flex;
        align-items: center;
        border: none;
        padding: 8px;
        color: #0a66c2;
        background: transparent;
        outline: none;

        @media(min-width: 768px){
            span{
                margin-left: 8px;
            }
        }
    }
`
const Content = styled.div``

const mapStateToProps = (state) => ({
    loading: state.articleState.loading,
    progress: state.articleState.progress,
    articles: state.articleState.articles,
    user: state.userState.user
})
const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticlesAPI())
})
export default connect(mapStateToProps, mapDispatchToProps)(Main)