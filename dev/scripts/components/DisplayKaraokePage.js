import React from 'react';

const DisplayKaraokePage = (props) => {
    return(
        <div>
            <p>{props.display.lyrics}</p>
            <iframe src={props.display.songTrackPlayer}
                frameBorder="0" allow="encrypted-media" allowtransparency="true"></iframe>
            <img src={props.display.songImage} alt="" />
        </div>
    );
}



export default DisplayKaraokePage;