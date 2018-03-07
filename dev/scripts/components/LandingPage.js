import React from 'react';
import axios from 'axios';
import SongInfo from './SongInfo';
import SpotifyPopUp from './SpotifyPopUp'
import { Scrollbars } from 'react-custom-scrollbars';
import tokens from '../tokens';
import qs from 'qs';
import * as Scroll from 'react-scroll';
// import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import AnchorLink from 'react-anchor-link-smooth-scroll'


class LandingPage extends React.Component {

    constructor() {
        super();
        this.state = {
            songsFilteredBySeason: [],
            lyrics: "",
            songTrackPlayer: "",
            songImage: "",
            visible: false,
            songName: "",

        }
        this.handleClick = this.handleClick.bind(this);
        this.getSongArtistAPI = this.getSongArtistAPI.bind(this);
        this.getSpotifyTrack = this.getSpotifyTrack.bind(this);
        this.setVisible = this.setVisible.bind(this);
        this.removePopUp = this.removePopUp.bind(this);
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
            // const lyricsData = data.data.message.body.lyrics.lyrics_body
            // console.log(data.data.message.body.lyrics.lyrics_body);
            let lyricsData;
            if (data.data.message.body.lyrics.lyrics_body.length === 0) {
                lyricsData = `Im sorry to inform you but ${e1} by ${e2} is not currently available. We're working on it - For now, enjoy the sweet voice of Rick Astley.`
            } else {
                lyricsData = data.data.message.body.lyrics.lyrics_body;
            }
            this.setState({
                lyrics: lyricsData,
            });
        });
    }

    getSpotifyTrack(e1, e2) {

        const songName = e1;
        const songArtist = e2;
        console.log(songArtist);

        tokens.getToken()
            .then(token => {
                axios({
                    url: 'https://api.spotify.com/v1/search',
                    params: {
                        type: 'track', 
                        q: `${songName} + ${songArtist}`
                    },
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                .then(res => {
                    // const spotifyTrackPlay = res.data.tracks.items[0].uri;
                    let spotifyTrackPlay;
                    if (res.data.tracks.items[0] === undefined) {
                        spotifyTrackPlay = 'spotify:track:4uLU6hMCjMI75M1A2tKUQC';
                    }
                    else {
                        spotifyTrackPlay = res.data.tracks.items[0].uri;
                    }
                    // const spotifyAlbumImage = res.data.tracks.items[0].album.images[0].url;
                    let spotifyAlbumImage;
                    if (res.data.tracks.items[0] === undefined) {
                        spotifyAlbumImage = 'https://cnet1.cbsistatic.com/img/c9h3oM_lU2i63tgOQnmtHyoWhyU=/fit-in/x/2010/02/24/4bf2fb50-fdbe-11e2-8c7c-d4ae52e62bcc/album-rick-astley-greatest-hits.jpg';
                    } else {
                        spotifyAlbumImage = res.data.tracks.items[0].album.images[0].url;
                    }
                    
                    const TrackLink = `https://open.spotify.com/embed?uri=${spotifyTrackPlay}`;
                    this.setState({
                        songTrackPlayer: TrackLink,
                        songImage: spotifyAlbumImage,
                        songName: songName
                    });
                })
            })
    }

    setVisible() {
        this.setState(prev => ({
            visible: !prev.visible
        }));
    }

    removePopUp() {
        this.setState(prev => ({
            visible: !prev.visible
        }));
    }

    // scrollTo() {
        // scroll.scrollTo(500)
    // }
    
    render() {
        return (
            <div className="wrapper clearfix">
                <div className="mainContainer">
                    <a className="spotifyLogin" href="https://drag-race.herokuapp.com/auth">To get started, please <span className="login">login</span> with Spotify
                        <i class="fab fa-spotify"></i>
                    </a>
                        <div>
                        <h1 className="mainHeader" >Lip Sync</h1>
                    </div>
                    <div>
                        <h2 className="flicker-1 secondaryHeader">For Your Life</h2>
                        <h3 className="catchPhrase">Good Luck and Don't Fuck It Up</h3>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M84.848 35.827l-1.935 5.821c2.049.317 4.046.792 5.938 1.585l1.935-5.821c-1.892-.792-3.888-1.268-5.938-1.585zM76.66 41.014l1.935-5.821c-2.102-.159-4.204-.318-6.253-.635l-1.935 5.821c2.049.317 4.151.476 6.253.635zM70.406 40.379c-2.049-.317-4.046-.792-5.938-1.585l-1.935 5.821c1.892.792 3.888 1.267 5.938 1.585l1.935-5.821zM74.725 46.835c2.102.159 4.204.318 6.253.635l1.935-5.821c-2.049-.317-4.151-.476-6.253-.635l-1.935 5.821zM79.043 53.291c2.049.317 4.046.793 5.938 1.585l1.935-5.821c-1.892-.792-3.888-1.267-5.938-1.585l-1.935 5.821zM68.471 46.2l-1.935 5.821c2.049.317 4.151.476 6.253.635l1.935-5.821c-2.101-.159-4.203-.318-6.253-.635z" /><path d="M98.178 34.92c-1.895-1.843-4.123-3.173-6.812-4.067-3.426-1.139-7.185-1.423-10.819-1.697-3.609-.273-7.34-.555-10.716-1.676-2.522-.838-4.626-2.07-6.425-3.757l.644-1.936-1.643-.546L50 58.563 37.594 21.24l-1.643.546.644 1.936c-1.799 1.688-3.904 2.919-6.425 3.757-3.375 1.122-7.107 1.404-10.716 1.676-3.635.274-7.394.558-10.82 1.697-2.689.894-4.917 2.224-6.812 4.067l-.097.095 9.826 29.562.247-.241c1.847-1.797 4.021-3.094 6.647-3.967 3.375-1.122 7.107-1.404 10.715-1.676 3.635-.274 7.394-.558 10.819-1.697 2.514-.836 4.626-2.054 6.439-3.715l2.668 8.026-5.356 16.12 1.643.546L50 64.051l4.627 13.921 1.643-.546-5.358-16.119 2.668-8.026c1.813 1.662 3.925 2.879 6.439 3.715 3.426 1.139 7.184 1.423 10.819 1.697 3.609.273 7.34.554 10.716 1.676 2.626.873 4.8 2.17 6.647 3.967l.247.241 9.826-29.562-.096-.095zM41.267 56.052l-1.866-5.615c-1.892.792-3.888 1.267-5.938 1.585l1.865 5.611c-2.047.315-4.143.474-6.2.629l-.054.004-1.865-5.61c-2.102.159-4.204.318-6.253.635l1.867 5.615c-1.541.24-3.058.569-4.514 1.053-.49.163-.964.34-1.424.532l-1.867-5.616a16.821 16.821 0 0 0-5.132 3.323l-1.935-5.821a16.821 16.821 0 0 1 5.132-3.323l-1.935-5.821a16.821 16.821 0 0 0-5.132 3.323l-1.935-5.821a16.821 16.821 0 0 1 5.132-3.323l-1.866-5.615a19.76 19.76 0 0 1 1.423-.534c1.452-.483 2.97-.809 4.516-1.047l1.865 5.611c2.049-.317 4.151-.476 6.253-.635l-1.865-5.61c2.073-.157 4.184-.318 6.252-.64l1.867 5.615c2.049-.317 4.046-.792 5.938-1.585l-1.867-5.616a17.045 17.045 0 0 0 5.015-3.184l1.859 5.592a16.834 16.834 0 0 1-5.007 3.208l1.935 5.821a16.822 16.822 0 0 0 5.007-3.208l1.935 5.821a16.834 16.834 0 0 1-5.007 3.208l1.935 5.821a16.822 16.822 0 0 0 5.007-3.208l1.861 5.599c-1.449 1.362-3.097 2.426-5.002 3.226zm52.716-9.496a16.821 16.821 0 0 0-5.132-3.323l-1.935 5.821a16.821 16.821 0 0 1 5.132 3.323l-1.935 5.821a16.821 16.821 0 0 0-5.132-3.323l-1.867 5.616a19.96 19.96 0 0 0-1.424-.532c-1.456-.484-2.973-.813-4.514-1.053l1.867-5.615c-2.049-.317-4.151-.476-6.253-.635l-1.865 5.61-.054-.004c-2.056-.155-4.152-.314-6.2-.629l1.865-5.611c-2.049-.317-4.046-.792-5.938-1.585l-1.866 5.615a16.609 16.609 0 0 1-5.002-3.223l1.861-5.599a16.834 16.834 0 0 0 5.007 3.208l1.935-5.821a16.822 16.822 0 0 1-5.007-3.208l1.935-5.821a16.834 16.834 0 0 0 5.007 3.208l1.935-5.821a16.822 16.822 0 0 1-5.007-3.208l1.859-5.592a17.045 17.045 0 0 0 5.015 3.184l-1.867 5.616c1.892.792 3.888 1.267 5.938 1.585l1.867-5.615c2.067.322 4.179.484 6.252.64l-1.865 5.61c2.102.159 4.204.318 6.253.635l1.865-5.611c1.546.238 3.064.564 4.516 1.047.49.163.964.341 1.423.534l-1.866 5.615a16.821 16.821 0 0 1 5.132 3.323l-1.935 5.818z" /><path d="M15.152 35.827c-2.049.317-4.046.792-5.938 1.585l1.935 5.821c1.892-.792 3.888-1.267 5.938-1.585l-1.935-5.821zM29.594 40.379l-1.935-5.821c-2.049.317-4.151.476-6.253.635l1.935 5.821c2.101-.159 4.203-.318 6.253-.635zM31.529 46.2c2.049-.317 4.046-.792 5.938-1.585l-1.935-5.821c-1.892.792-3.888 1.267-5.938 1.585l1.935 5.821zM17.087 41.648l1.935 5.821c2.049-.317 4.151-.476 6.253-.635l-1.935-5.821c-2.102.159-4.204.318-6.253.635zM13.084 49.054l1.935 5.821c1.892-.792 3.888-1.267 5.938-1.585l-1.935-5.821c-2.05.318-4.046.793-5.938 1.585zM25.275 46.835l1.935 5.821c2.102-.159 4.204-.317 6.253-.635L31.528 46.2c-2.049.317-4.151.476-6.253.635z" /></svg>


                        </div>
                        <AnchorLink className="smoothscrollFromHeader" href="#seasonScroll" offset="60">
                            Sashay Away
                        </AnchorLink>
                    </div>
                    </div>
                    
                        <ul className="clearfix" id="seasonScroll">
                            <div className="tileContainer clearfix">
                        <form action="">
                            <div className="tileGroup clearfix">
                                <input className="seasonInput" name="radioInputSeason" type="radio" value="1" id="season1" onClick={this.handleClick}></input>
                                <label className="seasonTile" htmlFor="season1">Season 1</label>
                                <input className="seasonInput" name="radioInputSeason" type="radio" value="2" id="season2" onClick={this.handleClick}></input>
                                <label className="seasonTile" htmlFor="season2">Season 2</label>
                                <input className="seasonInput" name="radioInputSeason" type="radio" value="3" id="season3" onClick={this.handleClick}></input>
                                <label className="seasonTile" htmlFor="season3">Season 3</label>
                            </div>
                            <div className="tileGroup clearfix">
                                <input className="seasonInput" name="radioInputSeason" type="radio" value="4" id="season4" onClick={this.handleClick}></input>
                                <label className="seasonTile" htmlFor="season4">Season 4</label>
                                <input className="seasonInput" name="radioInputSeason" type="radio" value="5" id="season5" onClick={this.handleClick}></input>
                                <label className="seasonTile" htmlFor="season5">Season 5</label>
                                <input className="seasonInput" name="radioInputSeason" type="radio" value="6" id="season6" onClick={this.handleClick}></input>
                                <label className="seasonTile" htmlFor="season6">Season 6</label>
                            </div>
                            <div className="tileGroup clearfix">
                                <input className="seasonInput" name="radioInputSeason" type="radio" value="7" id="season7" onClick={this.handleClick}></input>
                                <label className="seasonTile" htmlFor="season7">Season 7</label>
                                <input className="seasonInput" name="radioInputSeason" type="radio" value="8" id="season8" onClick={this.handleClick}></input>
                                <label className="seasonTile" htmlFor="season8">Season 8</label>
                                <input className="seasonInput" name="radioInputSeason" type="radio" value="9" id="season9" onClick={this.handleClick}></input>
                                <label className="seasonTile" htmlFor="season9">Season 9</label>
                            </div>
                        </ form>
                            </div>
                        </ul>
                


                <div className="songCardSection">
                    <div className="songCardWrapper" id="songCardWrapperID">
                        <Scrollbars 
                        renderTrackHorizontal={props => <div {...props} className="track-horizontal" />}
                        renderTrackVertical={props => <div {...props} className="track-vertical" />}
                        renderThumbVertical={props => <div {...props} className="thumb-vertical" />}
                        >
                        {this.state.songsFilteredBySeason.map((song, i) => {
                            return (
                                <SongInfo 
                                    getSongArtistAPI={this.getSongArtistAPI}
                                    getSpotifyTrack={this.getSpotifyTrack}
                                    setVisible={this.setVisible}
                                    song={song}
                                    key={`song-${i}`}
                                    songIndex={i} 
                                />
                            )
                        })}
                        </Scrollbars>
                    </div>
                </div>
                <div>
                        <div className="spotifyPopUpWrapper clearfix">
                            <SpotifyPopUp
                                visible={this.state.visible}
                                lyrics={this.state.lyrics}
                                songTrackPlayer={this.state.songTrackPlayer}
                                songImage={this.state.songImage}
                                removePopUp={this.removePopUp}
                                songName={this.state.songName}
                            />
                        </div>
                </div>

                {/* <div>
                    <p>{this.state.lyrics}</p>
                    <iframe src={this.state.songTrackPlayer}
                    frameBorder="0" allow="encrypted-media" allowtransparency="true"></iframe>
                    <img src={this.state.songImage} alt=""/>
                </div> */}
            </div>
        )
    }
}

export default LandingPage;
