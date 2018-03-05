import React from 'react';


const SpotifyPopUp = (props) => (
    <div id="popUp" className={props.visible ? 'slideIn' : 'slideOut'}>
        Lyrics and Spotify player pop up
        <p>{props.lyrics}</p>
        <iframe src={props.songTrackPlayer}
            frameBorder="0" allow="encrypted-media" allowtransparency="true"></iframe>
        <img src={props.songImage} alt="" />
    </div>
)

export default SpotifyPopUp;