import {  deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import styled from "styled-components";
import { postArticleAPI } from "../actions";
import db from "../firebaseApp";

function PostModal({showModal, handleClick, user, postedArticle, id, _delete, setDelete}){
        const [editorText, setEditorText] = useState('');
        const [shareImage, setShareImage] = useState('')
        const [videoLink, setVideoLink] = useState('')
        const [assetArea, setAssetArea] = useState('')
        const [docData, setDocData] = useState(null)
        
            useEffect(() => {
                // setDocData(null)
                if(id){
                    const docRef = doc(db, 'article', id)
                    onSnapshot(docRef, (doc) => {
                        setDocData(doc.data())
                        setEditorText(doc.data()?.description)
                        if(doc.data()?.video){
                            switchAssetArea('media');
                        }else{
                            switchAssetArea('image');
                        }
                    })
                }
              
            }, [id, _delete])

        const switchAssetArea = (area) => {
            setVideoLink('')
            setShareImage('')
            setAssetArea(area)
        }
        const postArticle = (e) => {
            e.preventDefault();
            if(e.target !== e.currentTarget) {
                console.log('hellow world');
                return
            };

            const payload = {
                image: shareImage,
                video: videoLink,
                user: user,
                description: editorText,
                timeStamp: serverTimestamp()

            }
            postedArticle(payload)
            reset(e)
        }
        const reset = (e) =>{
            setEditorText('');
            setAssetArea('')
            setShareImage('')
            setVideoLink('')
            handleClick(e)
            setDocData(null)
            setDelete('')
        }

        const handleChange =(e) => {
            const image = e.target.files[0]

            if(image === "" || image === undefined ){
                alert(`not an image the image file is a ${typeof(image)}`)
                return
            }
            setShareImage(image)
        }
        const updatePost = () => {
            const docRef = doc(db, 'article', id)
            updateDoc(docRef, {
                description: editorText,
            }).then(() => reset())
        }
        const deletPost =() => {
            const docRef = doc(db, 'article', id)
            deleteDoc(docRef).then(() => reset())

            alert('are u sure u want to delete post !!')
            reset()
        }

    return (
        <>{ showModal === "open" && (
            <Container>
                <Content>
                    <Header>
                        <h2>Create a Post {docData && id} { _delete}</h2>
                        <button onClick={(e) => reset(e)}>
                            <span>X</span>
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            {user && user.photoURL ? <img src={user.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
                            <span>{user && user.displayName ? user.displayName : "Name"}</span>
                        </UserInfo>
                        <Editor>
                            <textarea 
                                value={editorText}
                                onChange={(e) => setEditorText(e.target.value)}
                                placeholder='what do you want to talk about?'
                                autoFocus={true}
                            />
                            { assetArea === 'image' ?
                            <UploadImage>
                                <input
                                    type="file"  
                                    accept="images/jpeg, images/gif, images/png"
                                    hidden
                                    id="file"
                                    name="image"
                                    onChange={handleChange}
                                  />
                                {
                                    !docData && <>
                                        <p>
                                            <label htmlFor="file">Select an image to share{docData?.shareImg}</label>
                                        </p>
                                    </>
                                }
                                  
                                { docData && docData.shareImg ? <img src={docData.shareImg} alt="" /> :
                                    (shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />)
                                 }
                            </UploadImage>
                                    : //ternary else
                                    assetArea === 'media' &&
                                  <>
                                    {
                                        !docData && <> 
                                            <input 
                                                type="text" 
                                                placeholder="Please input a video Link"
                                                style={{width: '100%', padding: '6px 4px', margin: '2px -4px'}}
                                                value={videoLink}
                                                onChange={(e) => setVideoLink(e.target.value)}
                                            />
                                        </>
                                    }
                                    {
                                        docData && docData.video ? <ReactPlayer width="100%" url={docData.video}/> : 
                                        videoLink && <ReactPlayer width="100%" url={videoLink}/>
                                    }
                                  </>
                                }
                        </Editor>
                    </SharedContent>
                    <ShareCreation>
                        {
                            docData ? <></>:
                            <>
                                <AttachAssets>
                                <AssetButton onClick={() => switchAssetArea('image')}>
                                    <img src="/images/photo.svg" alt="" />
                                </AssetButton>
                                <AssetButton onClick={() => switchAssetArea("media")}>
                                    <img src="/images/photo.svg" alt="" />
                                </AssetButton>
                                </AttachAssets>
                                <ShareComments>
                                    <AssetButton>
                                        <img src="/images/nav-messaging.svg" alt="" />
                                        Anyone
                                    </AssetButton>
                                </ShareComments>
                            </>
                        }
                        
                        { 
                            docData ? 
                            <PostButton onClick={_delete ? deletPost: updatePost} disabled={!editorText ? true : false} data>{_delete ? 'delete' : "Update"} Post</PostButton> 
                            
                            : <PostButton onClick={(e) => postArticle(e)} disabled={!editorText ? true : false}>Post</PostButton>
                        
                        }
                        {
                            
                        // _delete  &&   <PostButton onClick={(e) =>  deletPost(e)} data>Delete Post</PostButton> 
                        }

                    </ShareCreation>
                </Content>
            </Container> )
        }</>
        )
}

const Container = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.8);
    z-index: 999;
    color: white;
    animation: fadeIn .3s;
`;
const Content = styled.div`
    width: 100%;
    max-width: 552px;
    max-height: 90%;
    position: relative;
    top: 32px;
    display: flex;
    overflow: initial;
    flex-direction: column;
    background-color: #fff;
    color: black;
    border-radius: 5px;
    margin: 0 auto;
`;
const Header = styled.div`
    displa: block; 
    padding: 16px 22px;
    border-bottom: 1px solid rgba(0,0,0,.15);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(0,0,0, .6);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    button{
        width: 40px;
        height: 40px;
        font-size: 16px;
        font-weight: 500;
    }
`;

const SharedContent = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    vertical-align:  baseline;
    overflow-y: auto;
    background: transparent;
    padding: 8px 12px;
`;
const UserInfo = styled.div`
    padding: 12px 24px;
    display: flex;
    align-items: center;
    img{
        width: 48px;
        height: 48px;
        background-clip: content-box;
        border: 2px solid transparent;
        border-radius: 50%;
    }
    span{
        margin-left: 8px;
        font-size: 16px;
        line-height: 1.5;
        font-weight: 600;
    }
`;

const ShareCreation = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 24px 12px 16px;
`;
const AssetButton = styled.button`
    display: flex;
    align-items: center;
    height: 40px;
    min-width: auto;
    color: rgba(0,0,0,.5);
    img{
        width: 28px
    }
`;

const AttachAssets = styled.div`
    display: flex;
    align-itmes: center;
    padding-right: 8px;
    ${AssetButton}{
        width: 40px;
    }
`;
const ShareComments = styled.div`
    padding-left: 8px;
    margin-right: auto;
    border-left: 1px solid rgba(0,0,0, 0.15);
    ${AssetButton}{
        img{
            margin-right: 2px;
        }
    }
`;

const PostButton = styled.button`
    min-width: 60px;
    background: #0a66c2;
    transition: all .3s ease;
    opacity: ${props => props.disabled ? .6 : 1};
    color: #fff;
    padding: ${props => props.data ? '10px 16px': '0 16px'};
    width: ${props => props.data && '100%'};
    border-radius: 20px;
    outline: none;
    &:hover{
        background: #004182;
    }
`
const Editor = styled.div`
    padding: 12px 24px;
    & > textarea{
        width: 100%;
        min-height: 100px;
        resize: none;
        font-size: 16px;
    }
`

const UploadImage = styled.div`
    text-align: center;
    img{
        width: 100%;
        height: 320px;
        object-fit: cover;
    }
`
const mapStateToProps = (state) => ({
    user: state.userState.user
})
const mapDispatchToProps = (dispatch) => ({
 postedArticle: (payload) => dispatch(postArticleAPI(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(PostModal)


