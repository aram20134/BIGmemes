import React, { useState } from 'react'
import { observer } from 'mobx-react-lite';
import like from '../../static/like.png'
import likeOn from '../../static/likeOn.png'
import comment from '../../static/comment.png'
import { getOne } from '../../http/memesAPI'
import { useEffect } from 'react';
import LoaderMeme from '../UI/LoaderMeme';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './../../index';
import { addLike, delLike } from './../../http/rateAPI';

const Meme = observer(({mem}) => {
    const {user} = useContext(Context)

    const [mems, setMems] = useState()
    const [usr, setUsr] = useState()
    const [load, setLoad] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)

    function checkLike(res) {
        setMems(res.meme);setUsr(res.user);setLoad(true);setLikes(res.meme.rate.length)

        res.meme.rate.length
        ? res.meme.rate.map(likes => {
            if (likes.userId == user.user.id) {
                setIsLiked(true)
            }
        })
        : setIsLiked(false);
    }
    function Like() {
        try {
            isLiked 
            ? delLike(user.user.id, mems.id).then(setIsLiked(false), setLikes(likes - 1))
            : addLike(user.user.id, mems.id).then(setIsLiked(true), setLikes(likes + 1))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getOne(mem.id).then(res => checkLike(res))
        
    }, [])

    if (!load) {
        return <LoaderMeme />
    }

    return (
      <div key={mems.id} className='Memes__cont'>
      {}
        <div className='Memes__title'>{mems.title ? mems.title : mems.img}</div>
        {mems.img.split('.').pop() == 'mp4' ? (<video className='Memes__cont__vd' src={`${process.env.REACT_APP_API_URL}/${mems.img}`} controls></video>) : (<img className='Memes__cont__img' src={`${process.env.REACT_APP_API_URL}/${mems.img}`} controls></img>)}
        <div className='Memes__comms'>
            <NavLink to={`../profile/${usr.name}`} className='Memes__comms__user'><img className='Memes__comms__user__img' src={`${process.env.REACT_APP_API_URL}/${usr.avatar}`} />{usr.name}</NavLink>
            <div className='Memes__comms2'>
                <NavLink to='.' className='Memes__comms2__comments' style={{textDecoration:'none'}} >{mems.comments.length}<img src={comment} /></NavLink>
                <div className='Memes__comms2__likes'>{likes}<img onClick={Like} src={isLiked ? likeOn : like} /></div>
            </div>
        </div>
      </div>
    )
})

export default Meme