import React from 'react';


const SpotifyPopUp = (props) => (
    <div id="popUp" className={props.visible ? 'slideIn' : 'slideOut'}>
        <button className="closePopUp" onClick={props.removePopUp}>𝗫</button>
        <div className="popUpLeft">
        <iframe src={props.songTrackPlayer}
            frameBorder="0" allow="encrypted-media" allowtransparency="true"></iframe>
        <img src={props.songImage} alt="" />
        </div>
        <p>{props.lyrics}</p>
    </div>
)

export default SpotifyPopUp;