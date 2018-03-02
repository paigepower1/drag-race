import React from 'react';

const SongInfo = (props) => {
        return (
            <div>
                <ul>
                    <li>{props.song.name}</li>
                    <li>{props.song.artist}</li>
                </ul>
                <ul>
                    {props.song.queens.map((queen, i) => {
                        return (
                            <li key={`-${i}`}>
                                {queen.name}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
}


export default SongInfo;