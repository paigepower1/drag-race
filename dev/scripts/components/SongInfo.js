import React from 'react';

const SongInfo = (props) => {
        return (
            <div>
                <ul>
                    <li>{props.song.name}</li>
                    <li>{props.song.artist}</li>
                    <li></li>
                </ul>
            </div>
        );
}


export default SongInfo;