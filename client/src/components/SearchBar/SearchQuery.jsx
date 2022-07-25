import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import '../../styles/SearchBar.scss'
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getAllUser } from '../../http/memesAPI';
import likeOff from '../../static/like.png'
import likeOn from '../../static/likeOn.png'
import comment from '../../static/comment.png'

export default function SearchQuery({data, setSearch}) {
    const [loaded, setloaded] = useState(false)

    useEffect(() => {
        setloaded(true)
    }, [])

    return loaded && (
    <div className='SearchQuery'>
        {data.users.length ? <h5>Users:</h5> : ''}
        {data.users.map((d) => 
            <NavLink className='SearchQuery__link' onClick={() => setSearch(false)} key={d.id} to={`../profile/` + d.name}>
                <Button className='SearchQuery__link user' variant='outline-primary' >
                    <img src={`${process.env.REACT_APP_API_URL}/${d.avatar}`} />
                    <div>
                        <div>{d.name}</div>
                        <div>Memes: {d.user_memes.length}</div>
                    </div>
                </Button>
            </NavLink>
        )}
        {data.users.length ? <hr style={{margin:'0'}} /> : ''}
        {data.memes.length ? <h5>Memes:</h5> : ''}
        {data.memes.map((d) => 
            <NavLink className='SearchQuery__link' onClick={() => setSearch(false)} key={d.id} to={`../checkmemes/` + d.id}>
                <Button className='SearchQuery__link' variant='outline-secondary'>
                    <div>{d.title}</div>
                    <div><img src={comment} />{d.comments.length}<img src={likeOff} />{d.rate.length}</div>
                </Button>
            </NavLink>)}
        {!data.users.length && !data.memes.length ? 'We founded nothing...' : ''}
    </div>
    )
    }
