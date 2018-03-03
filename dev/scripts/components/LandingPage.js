import React from 'react';
import axios from 'axios';
import SongInfo from './SongInfo';
import tokens from '../tokens';


class LandingPage extends React.Component {

    constructor() {
        super();
        this.state = {
            songsFilteredBySeason: [],

        }
        this.handleClick = this.handleClick.bind(this);
        this.getSongArtistAPI = this.getSongArtistAPI.bind(this);
        // this.getSpotifyTrack = this.getSpotifyTrack.bind(this);
    }
    componentDidMount() {
        const url = new URL(location.href);
        tokens.access_token = url.searchParams.get('access_token');
        tokens.refresh_token = url.searchParams.get('refresh_token');

    }
    handleClick(e) {
        const selectedSeason = e.target.value;
        console.log(selectedSeason);
        axios.get(`http://www.nokeynoshade.party/api/seasons/${selectedSeason}/lipsyncs`, {

        })
        .then(({ data }) => {
            console.log(data);

            this.setState({
                songsFilteredBySeason: data
            });
        });
    }

    getSongArtistAPI(e1, e2) {
        console.log(e1, e2);
        // const song = e1;
        // console.log(e1);
        // const ArtistName = this.state.songsFilteredBySeason.name
    }

    getSpotifyTrack(e) {
        
        const songForSpotify = e;
        tokens.getToken()
            .then(token => {
                axios({
                    url: 'https://api.spotify.com/v1/search',
                    params: {
                        type: 'album',
                        q: 'the black album'
                    },
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                .then(res => {
                    console.log(res);
                })
            })
    }
    
    render() {
        return (
            <div className="wrapper clearfix">
                <a href="https://drag-race.herokuapp.com/auth">Login in with spotify</a>
                <h1>Lip Sync For Your Liiiiiiiiiiiiiiiiife</h1>
                    <ul className="clearfix">
                        <li className="seasonTile" value="1" onClick={this.handleClick}>Season 1</li>
                        <li className="seasonTile" value="2" onClick={this.handleClick}>Season 2</li>
                        <li className="seasonTile" value="3" onClick={this.handleClick}>Season 3</li>
                        <li className="seasonTile" value="4" onClick={this.handleClick}>Season 4</li>
                        <li className="seasonTile" value="5" onClick={this.handleClick}>Season 5</li>
                        <li className="seasonTile" value="6" onClick={this.handleClick}>Season 6</li>
                        <li className="seasonTile" value="7" onClick={this.handleClick}>Season 7</li>
                        <li className="seasonTile" value="8" onClick={this.handleClick}>Season 8</li>
                        <li className="seasonTile" value="9" onClick={this.handleClick}>Season 9</li>
                    </ul>
                <div>
                    {this.state.songsFilteredBySeason.map((song, i) => {
                        return (
                            <SongInfo 
                                getSongArtistAPI={this.getSongArtistAPI}
                                getSpotifyTrack={this.getSpotifyTrack}
                                song={song}
                                key={`song-${i}`}
                                songIndex={i} 
                            />
                        )
                    })}
                    
                </div>
            </div>
        )
    }
}

export default LandingPage;
