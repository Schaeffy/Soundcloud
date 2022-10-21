import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Link } from 'react-router-dom'
import { getAllAlbums, actionResetAlbums } from '../../store/albums';
import CreateAlbumModal from './CreateAlbum';
import { getAllSongs, actionResetSongs } from '../../store/songs';
import './Albums.css'


export default function AllAlbums() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const albums = useSelector((state) => state.album)
    const allAlbums = Object.values(albums)
    const history = useHistory()
    const song = useSelector((state) => state.song)


    useEffect(() => {
        dispatch(getAllAlbums())
        return () => dispatch(actionResetAlbums())
    }, [dispatch, user]);

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);



    if (!user) {
        return (
            history.push('/')
        )
    }
    if (!albums.Album || !albums.Artist) {
        return (
            <div style={{ backgroundColor: 'white' }}>

                <div className='createAlbumContainer'>
                    <CreateAlbumModal />
                </div>

                <div className='titleContainer'>
                    <NavLink className='titleText' to='/albums'>
                        All Albums
                    </NavLink>
                    <NavLink className='titleText' to='/albums/current'>
                        My Albums
                    </NavLink>

                </div>

                <div className='allAlbumsContainer'>

                    {allAlbums.map((album) => {
                        return (
                            <div className='albumCardContainer' key={album.id}>

                                <div className='albumCardInnerContainer'>

                                    <div className='albumCardImage'>
                                        <div className='playButtonContainer'>
                                            {/* <img id='playButton' onClick={() => dispatch(actionPlaySong(album))} src='https://peakstate.global/wp-content/uploads/2016/09/icon-soundcloud-play.png' alt=''/> */}

                                        </div>
                                        <Link to={`/albums/${album.id}`}>
                                            <img src={album.imageUrl} alt='' />
                                        </Link>

                                    </div>

                                    <div key={album.id} className='albumInfo'>

                                        <div key={album.id}>
                                            <NavLink className='albumLink' to={`/albums/${album.id}`}>{album.title}</NavLink>
                                        </div>
                                        {/* <div>
                                            Artist: {album.Artist.username}
                                        </div> */}

                                    </div>

                                </div>

                            </div>

                        )
                    })}

                </div>

            </div>
        )
    }
}
