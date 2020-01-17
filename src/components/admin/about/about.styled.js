// use styled component
import styled from 'styled-components';





const Wrapper  = styled.div`
margin: 0px !important;
padding: 0px !important;
box-sizing: 0px !important;
  border: 23px solid black;
  max-width: 1080px;

`;
const AboutHeaderImg = styled.div`
  border: 0px solid black;
  background-image: url(${props => props.img});
  background-size: cover;
  text-align: center;
  height: 448px;
  padding: 0;
  margin: 0;
  box-size: 0;
  
`;
const MainTitle = styled.h1`
  position: absolute;
 
  padding-top: 145px;
  padding-left: 180px;
  font-size: 75px;
  font-weight: 600;
  text-align: center;
  color: white;
  z-index: 999;
`;

const Subtitle = styled.p`
  position: absolute;

  font-size: 23px;
  margin-top: 290px;
  margin-left:  6%;
  color: white;
  font-weight: 700;
  text-align: center;

`;

const AboutNav = styled.div`
    margin-top: -14px;
    background: #191A1B;
    color: white;
    width: 100%;
    height: 49.3px;
    font-weight: 600;
    list-style: none;
    cursor: ponter;
    z-index: -999;
`;
const Ul = styled.ul`
margin: 0px;
padding: 3px 0; 
text-align: center;

`;
const Li = styled.li`
line-height: 49.3px;
font-size: 18px;
margin: 0% 5%;
display: inline;
`;

const Section1 = styled.section`
    font-size: 20px;
    text-align: left;
    background: #fafafa;
    margin: 0 ;
    padding: 75px 75px;
    letter-spacing: 1px;
    color : #818287;

`;
const Section2 = styled.section`
    max-width: 1080px;
    background-image: url(${props => props.img});
    background-size: cover;
    height: 353px;

`;

const Section3 = styled.section`

h3 {
    font-size: 30px;
    font-weight: 500;
}
display: flex;
height:  auto;
line-height: 24px;
font-size: 18px;
background: #fafafa;
padding-left: 56.99px;
padding-top: 75px;
padding-bottom:  94px;

`;

const  SecLeft = styled.div`
flex: 1;
    padding: 1rem;
    h3 { 
       // padding: 0px 14px;
        font-size: 30px;
        color: black;
        text-align: left;
    }
    p { 
        text-align: left;
        font-size: 18px;
        //padding: 0 18px;
        color: #818287;
    }

`;
const SecRight = styled.div`
flex: 1;
.imgOne {
    padding-top:120px;
    
}
.imgTwo {
    padding-top:5px;
    // height: 230px;
}
`;


const Section4 = styled.div`
        display: flex;
       
`;

const MissionDiv = styled.div`

        flex: 1;
        padding: 13px 35px;
        text-align: left;
        line-height: 24px;
        height: 22vh;
        font-size: 18px;
        color: white;
        background: #009CDE;

`;

const VisionDiv = styled.div`
        flex: 1;
        padding: 20px 35px;
        text-align: left;
        line-height: 24px;
        height: 22vh;
        font-size: 18px;
        color: white;
        background: #8CC740;
`;

const ValueDiv = styled.div`
        flex: 1;
        padding: 13px 35px;
        text-align: left;
        line-height: 24px;
        height: 22vh;
        font-size: 18px;
        color: white;
        background: #F7941B;

`;


const Section5 = styled.div`
        display: flex; 
        padding: 15px 45px;
`;

const Section6  = styled.div`
        padding: 45px 35px;
        text-align: left;
        background: #F4F4F4;
        line-height: 24px;
`;


const Row =  styled.div`
    display: flex;
    line-height: 24px;
    color: #818287;
    font-size: 18px;
    padding-top: 10px;
    padding-left: 30px;

`;

const Col1 = styled.div`
        flex:1;
        text-align: center;

`;
const Col2 = styled.div`
    flex:2;

`;


export {
    Wrapper, 
    AboutHeaderImg, 
    MainTitle,
    Subtitle, 
    AboutNav,
    Ul, 
    Li,
    Section1,
    Section2,
    Section3,
    SecLeft,
    SecRight,
    Section4,
    MissionDiv,
    VisionDiv,
    ValueDiv,
    Section5,
    Section6,
    Row,
    Col1,
    Col2

}