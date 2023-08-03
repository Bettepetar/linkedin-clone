import { useState } from "react";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { connect } from "react-redux";
import { setCoverPhoto } from "../actions";


const ChangePhotoModal = ({handleClick, setCoverPhotoUrl, imgOpt}) => {
    const [uploadImg, setUploadImg] = useState('');

    const handleChange = (e)=> {
        const image = e.target.files[0]
        if(image === '' || image === undefined){
            alert(`${typeof(image)} is not a valid image file `)
            return
        }

        setUploadImg(image);
    }
    const handleCoverImg = (e) =>{
        if(e.target !== e.currentTarget){
            return
        }
        // const payload = uploadImg;
        const payload = uploadImg;

        setCoverPhotoUrl(payload);
        reset()
    }
    const reset = () => {
        setUploadImg('');
        handleClick();
    }
    return ( 
        <Container>
            <Content>
                <Header>
                    <h4>{imgOpt && imgOpt}</h4>
                    <CloseIcon onClick={handleClick}/>
                </Header>
                <UploadImg>
                    <input 
                        type="file"
                        accept="images/jpeg, images/gif, images/png"
                        hidden
                        id="file"
                        name="image"
                        onChange={handleChange}
                     />
                     {uploadImg ? <img src={URL.createObjectURL(uploadImg)} alt='' /> : <img src='/images/dpImage.png' alt='' /> }
                </UploadImg>
                <Footer>
                     <label htmlFor="file">Upload photo</label>
                    {imgOpt === 'Add photo' ? <button >Save Photo</button> : <button onClick={handleCoverImg}>Apply</button>}
                </Footer>
            </Content>
        </Container>
     );
}
const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.69);
    z-index: 999;
`
const Content = styled.div`
    position: relative;
    top: 32px;
    max-width: 820px;
    width: 100%;
    max-height: 90%;
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    overflow: initial;
    margin: 0 auto;
`

const Header = styled.div`
    display: flex;
    align: items: center;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid rgba(0,0,0,.09);
    h4{
        font-size: 22px;
        font-weight: 500;
        color: rgba(0,0,0,.89);
    }
`
const UploadImg = styled.div`
    width: 100%;
    overflow: hidden;
    padding: 20px 10px;
    img{
        width: 100%;
        // height: 520px;
        object-fit: cover;
    }

`
const Footer = styled.div`
    margin: 0 10px  0 auto;
    display: flex;
    align-items: flex-end;
    gap: 10px;
    margin-left: auto;
    padding: 20px;
    label, button{
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 18px;
        outline: none;
        color: #0a66c2;
        border: 2px solid rgb(10, 102, 194);
        cursor: pointer;
    }
    button{
        color: white;
        background: #0a66c2;
    }
`
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
    setCoverPhotoUrl: (payload) => dispatch(setCoverPhoto(payload)),
})
export default connect(mapStateToProps, mapDispatchToProps)(ChangePhotoModal);