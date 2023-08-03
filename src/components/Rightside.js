import styled from "styled-components"

export default function Rightside(){

    return(
        <Container>
            <FollowCard>
                <Title>
                    <h2>Add to your feed</h2>
                    <img src="/images/feed-icon.svg" alt="" />
                </Title>
                <FeedList>
                <li>
                    <a >
                        <Avatar />
                    </a>
                    <div>
                        <span>#Linkedin</span>
                        <button>Follow</button>
                    </div>
                </li>
                <li>
                    <a >
                        <Avatar />
                    </a>
                    <div>
                        <span>Video</span>
                        <button>Follow</button>
                    </div>
                </li>
            </FeedList>
            <Recommendation>
                View all recommendations
                <img src="/images/right-icon.svg" alt="" />
            </Recommendation>
            </FollowCard>
            <BannerCard>
            <img
                src="https://media.licdn.com/media/AAYQAgTPAAgAAQAAAAAAADVuOvKzTF-3RD6j-qFPqhubBQ.png"
                alt=""
            />
            </BannerCard>
            
        </Container>
    )
}
const Container = styled.div`
 grid-area: rightside;
`
const FollowCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 12px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    padding: 12px;
`
const Title = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    width: 100%;
    color: rgba(0, 0, 0, 0.6);

`
const FeedList = styled.ul`
    list-style-type: none;
    margin-top: 16px;
    li{
        display: flex;
        align-items: center;
        font-size: 14px;
        position: relative;
        padding: 5px 0;
        & > div{
            display: flex;
            flex-direction: column;
        }
        button{
            background: transparent;
            box-shadow: inset 0 0 0 0 1px rgba(0,0,0,.6);
            color: gba(0,0,0,.6);
            margin-left: 4px;
            padding: 16px;
            border-radius: 15px;
            align-items: center;
            max-height: 32px;
            font-weight: 600;
            display: inline-flex;
            justify-content: center;
            text-align: center;
            outline: none;
        }
    }
`
const Avatar = styled.div`
    background-image: url("https://static-exp1.licdn.com/sc/h/1b4vl1r54ijmrmcyxzoidwmxs");
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 48px;
    height: 48px;
`

const Recommendation = styled.div`
    display: flex;
    color: #0a66c2;
    align-items-center;
    font-size: 14px;

`
const BannerCard = styled(FollowCard)`
    padding: 0px;
    @media (min-width: 768px){
        position: sticky;
        top: 60px;
    }

    img {
        width: 100%;
        height: 100%;
    }
`