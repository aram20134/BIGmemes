import React, { useState } from "react";
import "../styles/Start.scss";
import SuperWord from "../components/UI/SuperWord";
import rect from "../static/rectangle.png";
import dots from "../static/dots.png";
import card1 from "../static/card1.jpeg";
import card2 from "../static/card2.png";
import card3 from "../static/card3.png";
import card4 from "../static/card4.gif";
import card5 from "../static/card5.gif";
import card7 from "../static/card7.jpg";
import { CSSTransition } from 'react-transition-group';
import { observer } from 'mobx-react-lite';

const Start = observer(() => {
  const words = ["images", "videos", "gifs"];
  const [word, setWord] = useState('images');

  return (
    <div className="Start">
      <div className="Start__bg">
        <img style={{ right: "0px", filter: "opacity(0.5)", width: '50%', top: '-138px' }} src={rect} alt="bg" />
        <img style={{ right: "0px", width: '10%' }} src={dots} alt="bg" />
      </div>
      <CSSTransition timeout={150} in={true} appear classNames='header'>
      <div className="Start__header">
        <h1>
          Share <SuperWord word="memes" /> {word}
        </h1>
        <h2>To represent a laugh</h2>
      </div>
      </CSSTransition>
      <CSSTransition timeout={200} in={true} appear classNames='body'>
      <div className="Start__body">
        <div className="Start__body__cont1">
            <p>Use your brain, maaaan</p>
            <img alt="meme" style={{width: '270px'}} src={card1} />
            <div className="Start__body__cont1__btn">Learn more</div>
        </div>
        <div className="Start__body__cont2">
            <img alt="meme" style={{width:'470px', height:'380px'}} src={card2} />
            <div className="Start__body__cont2__2imgs">
                <div>Share your handmade memes with the world and get a reputation as a meme maker</div>
                <div className="Start__body__cont2__2img">
                    <img alt="meme" style={{width:'170px', height:'222px'}} src={card3} />
                    <img alt="meme" style={{width:'170px', height:'222px'}} src={card4} />
                </div>
            </div>
        </div>
        <div className="Start__body__cont3">
            <img alt="meme" style={{width:'31%'}} src={card7} />
            <img alt="meme" style={{width:'570px'}} src={card5} />
        </div>
      </div>
      </CSSTransition>
      <div className="Start_body2">

      </div>
    </div>
  );
})
export default Start