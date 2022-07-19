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
import { Modal } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

const Meme = observer(({mem, view}) => {
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
    const [show, setShow] = useState(false)

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
        if(!user.isAuth) return (setShow(true))
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
        && mems.comments.map(async comment => await getUserId(comment.userId).then(us => setCom(prev => [...prev, {user:us.user, comment}])))
    }
    function addComment(event) {
        setWantCom(!wantCom)
        writeComment(textWantCom, user.user.id, mems.id).then(res => {setCom(prev => [...prev, {user:toJS(user.user), comment: res}]); getOne(mems.id).then(res => setMems(res.meme))}).finally(setComCount(prev => prev + 1))
        setTextWantCom('')
    }

    useEffect(() => {
        getOne(mem.id).then(res => checkLike(res))
    }, [])

    if (!load) {
        return <LoaderMeme />
    }

    return (
        <CSSTransition key={mem.id} timeout={300} classNames='mem' appear in={true}>
      <div key={mems.id} className={view ? 'Memes__cont grid' : 'Memes__cont'}>
      {!user.isAuth && (<Modal show={show} onHide={() => setShow(!show)} centered><Alert style={{margin:'0'}} variant='danger'>Register First!</Alert><Modal.Footer><Button onClick={() => setShow(!show)}>OK</Button></Modal.Footer></Modal>)}
        <div>
            <div className='Memes__title'>{mems.title ? mems.title : mems.img}</div>
            {mems.img.split('.').pop() == 'mp4' || mems.img.split('.').pop() == 'ogv' ? (<video className='Memes__cont__vd' src={`${process.env.REACT_APP_API_URL}/${mems.img}`} controls></video>) : (<img className='Memes__cont__img' src={`${process.env.REACT_APP_API_URL}/${mems.img}`} controls></img>)}
        </div>
        <div className='Memes__comms'>
            <NavLink to={`../profile/${usr.name}`} className='Memes__comms__user'><img className='Memes__comms__user__img' src={`${process.env.REACT_APP_API_URL}/${usr.avatar}`} />{usr.name}</NavLink>
            {new Date(mems.createdAt).toLocaleString()}
            <div className='Memes__comms2'>
                <div onClick={() => isCom ? setIsCom(!isCom) : showComments()} className='Memes__comms2__comments' style={{textDecoration:'none'}} >
                    {comCount}
                    <img src={comment} />
                </div>
                <div className='Memes__comms2__likes'>{likes}<img onClick={like} src={isLiked ? likeOn : likeOff} /></div>
            </div>
        </div>
        <div onClick={(e)=> {e.stopPropagation(); e.preventDefault()}} className={`${isCom ? 'Memes__comms2__com_section active' : 'Memes__comms2__com_section'}`}>
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
                            {new Date(c.comment.createdAt).toLocaleString()}
                        </div>
                    </div>)
                })
            )
            : user.isAuth && 'comments not founded, be first!'}
            {wantCom 
            ? (user.isAuth ? <button onClick={() => setWantCom(!wantCom)} className='Navbar__signIn' style={{alignSelf:'flex-start', fontSize:'18px',lineHeight:'24px'}}>Write a comment</button> : 'Register to leave a comment')
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
      </CSSTransition>
    )
})

export default Meme