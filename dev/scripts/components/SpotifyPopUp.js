import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';



const SpotifyPopUp = (props) => (
    <div id="popUp" className={props.visible ? 'slideIn' : 'slideOut'}>
            <h3 className="popUpHeader">LipSync For Your Life - {props.songName}</h3>
            <button className="closePopUp" onClick={props.removePopUp}>𝗫</button>
            <div className="popUpLeft">
            <iframe class="spotifyPlayer" src={props.songTrackPlayer}
                frameBorder="0" allow="encrypted-media" allowtransparency="true"></iframe>
            <img src={props.songImage} alt="" />
            </div>
            <p>{props.lyrics}</p>
    </div>
)

export default SpotifyPopUp;