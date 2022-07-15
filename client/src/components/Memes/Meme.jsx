import React, { useState } from 'react'
import { observer } from 'mobx-react-lite';
import likeOff from '../../static/like.png'
import likeOn from '../../static/likeOn.png'
import comment from '../../static/comment.png'
import { getOne } from '../../http/memesAPI'
import { useEffect } from 'react';
import LoaderMeme from '../UI/LoaderMeme';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './../../index';
import { addLike, delLike } from './../../http/rateAPI';
import { getUserId, writeComment } from '../../http/userAPI';

import checkG from '../../static/check.png'
import cancel from '../../static/cancel.png'
import { toJS } from 'mobx';

const Meme = observer(({mem}) => {
    const {user} = useContext(Context)

    const [mems, setMems] = useState()
    const [usr, setUsr] = useState()
    const [load, setLoad] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)
    const [isCom, setIsCom] = useState(false)
    const [comCount, setComCount] = useState(0)
    const [com, setCom] = useState([])
    const [wantCom, setWantCom] = useState(true)
    const [textWantCom, setTextWantCom] = useState('')

    function checkLike(res) {
        setMems(res.meme);setUsr(res.user);setLoad(true);setLikes(res.meme.rate.length);setComCount(res.meme.comments.length)

        res.meme.rate.length
        ? res.meme.rate.map(likes => {
            if (likes.userId == user.user.id) {
                setIsLiked(true)
            }
        })
        : setIsLiked(false);
    }
    function like() {
        try {
            isLiked 
            ? delLike(user.user.id, mems.id).then(setIsLiked(false), setLikes(likes - 1))
            : addLike(user.user.id, mems.id).then(setIsLiked(true), setLikes(likes + 1))
        } catch (e) {
            console.log(e)
        }
    }

    function showComments() {
        setIsCom(!isCom)
        setCom([])
        mems.comments.length 
        ? mems.comments.map(async comment => await getUserId(comment.userId).then(us => setCom(prev => [...prev, {user:us.user, comment}])))
        : console.log('first')
    }
    function addComment(event) {
        setWantCom(!wantCom)
        writeComment(textWantCom, user.user.id, mems.id).then(res => setCom(prev => [...prev, {user:toJS(user.user), comment: res}])).finally(setComCount(prev => prev + 1))
        setTextWantCom('')
    }

    useEffect(() => {
        getOne(mem.id).then(res => checkLike(res))
        
    }, [])

    if (!load) {
        return <LoaderMeme />
    }

    return (
      <div key={mems.id} className='Memes__cont'>
      {console.log(mems)}
        <div className='Memes__title'>{mems.title ? mems.title : mems.img}</div>
        {mems.img.split('.').pop() == 'mp4' ? (<video className='Memes__cont__vd' src={`${process.env.REACT_APP_API_URL}/${mems.img}`} controls></video>) : (<img className='Memes__cont__img' src={`${process.env.REACT_APP_API_URL}/${mems.img}`} controls></img>)}
        <div className='Memes__comms'>
            <NavLink to={`../profile/${usr.name}`} className='Memes__comms__user'><img className='Memes__comms__user__img' src={`${process.env.REACT_APP_API_URL}/${usr.avatar}`} />{usr.name}</NavLink>
            <div className='Memes__comms2'>
                <div onClick={() => showComments()} className='Memes__comms2__comments' style={{textDecoration:'none'}} >
                    {comCount}
                    <img src={comment} />
                </div>
                <div className='Memes__comms2__likes'>{likes}<img onClick={like} src={isLiked ? likeOn : likeOff} /></div>
            </div>
        </div>
        <div onClick={(e)=> e.stopPropagation()} className={`${isCom ? 'Memes__comms2__com_section active' : 'Memes__comms2__com_section'}`}>
            <div style={{fontSize:'20px', fontWeight:'bold'}}>{com.length} comments on meme</div>
            {com.length
            ? (
                com.map(c => { return(
                    <div key={c.comment.id} className='Memes__com'>
                        <div className='Memes__com'>
                            <NavLink to={`../profile/${c.user.name}`} style={{textAlign:'center'}}>
                                <img style={{objectFit:'cover', borderRadius:'50%', height:'100px', width:'100px'}} className='ico' src={`${process.env.REACT_APP_API_URL}/${c.user.avatar}`}></img>
                                <div>{c.user.name}</div>
                            </NavLink>
                            <div>{c.comment.text}</div>
                        </div>
                        <div>
                            {c.comment.createdAt.slice(0, 10) + ' ' + c.comment.createdAt.slice(11, 19)}
                        </div>
                    </div>)
                })
            )
            : 'comments not founded, be first!'}
            {wantCom 
            ? (<button onClick={() => setWantCom(!wantCom)} className='Navbar__signIn' style={{alignSelf:'flex-start', fontSize:'18px',lineHeight:'24px'}}>Write a comment</button>)
            : 
            (   
                <div className='Memes__writeCom'>
                    <img src={cancel} onClick={() => setWantCom(!wantCom)} className='ico' />
                    <textarea placeholder='write something like "ahaaha, not funny"' value={textWantCom} onChange={(e) => setTextWantCom(e.target.value)} style={{resize:'auto', width:'100%', padding:'5px 10px'}} />
                    <img src={checkG} onClick={(e) => addComment(e)} className='ico' />
                </div>
            )
            }
        </div>
      </div>
    )
})

export default Meme