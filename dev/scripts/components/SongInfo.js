import React from 'react';

const SongInfo = (props) => {
        return (
            <div>
                <ul className="clearfix songlist">
                    <li 
                        className="songName">{props.song.name}
                    </li>
                    <li className="songArtist">{props.song.artist}</li>
                    {props.song.queens.map((queen, i ) => {
                        return (
                            <li className="songQueen" key={`-${i}`}>
                                {queen.name}
                            </li>
                        )
                    })}
                </ul>
                <button 
                    onClick={() => {props.getSongArtistAPI(props.song.name, props.song.artist); props.getSpotifyTrack(props.song.name, props.song.artist)}}
                    >
                    Slay
                </button>
            </div>
        );
}


export default SongInfo;