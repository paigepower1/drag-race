import React from 'react';
import axios from 'axios';
import SongInfo from './SongInfo';
import tokens from '../tokens';
import qs from 'qs';


class LandingPage extends React.Component {

    constructor() {
        super();
        this.state = {
            songsFilteredBySeason: [],
            lyrics: "",

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
        axios.get(`http://www.nokeynoshade.party/api/seasons/${selectedSeason}/lipsyncs`, {
        })
        .then(({ data }) => {
            this.setState({
                songsFilteredBySeason: data,
            });
        });
    }

    getSongArtistAPI(e1, e2) {
        const songName = e1
        const songArtist = e2
        console.log(songName, songArtist);

        axios({
            url: 'https://proxy.hackeryou.com',
            params: {
                reqUrl:`http://api.musixmatch.com/ws/1.1/matcher.lyrics.get`, 
                params: {
                    apikey: "453d7516366d76a60f74e279e14bf28a",
                    format: "json",
                    f_has_lyrics: true,
                    q_track: `${e1}`,
                    q_artist: `${e2}`,
                }
            },
            paramsSerializer: function (params) {
                return qs.stringify(params, { arrayFormat: 'brackets' })
            },
        })
        .then((data) => {
            const lyricsData = data.data.message.body.lyrics.lyrics_body
            console.log(data.data.message.body.lyrics.lyrics_body);
            this.setState({
                lyrics: lyricsData,
            });
        });
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
                <h1 className="flicker-1">Lip Sync <br/> <span className="headerSpan">For Your Life</span></h1>

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


                    <p>{this.state.lyrics}</p>
                    
                </div>
            </div>
        )
    }
}

export default LandingPage;
