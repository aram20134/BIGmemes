import React from 'react'
import { useEffect, useState } from 'react';
import Memes from '../components/Memes/Memes';
import { getAll } from '../http/memesAPI';
import '../styles/Memes.scss'
import { useRef } from 'react';
import SuperWord from '../components/UI/SuperWord';
import {useMemes} from '../hooks/useMemes';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { getOne } from './../http/memesAPI';

const CheckMemes = observer(() => {
    const [memes, setMemes] = useState([])
    const [load, setLoad] = useState(false)
    const [count, setCount] = useState(0)
    const [end, setEnd] = useState(false)
    const look = useRef()

    useMemes(
        memes, setMemes, 
        load, setLoad, 
        count, setCount,
        end, setEnd,
        look, 
    )

    return load && (
        <div style={{display: 'flex', minHeight: '100%', backgroundColor:'whitesmoke',flexDirection: 'column', alignItems: 'center', position:'relative'}}>
            <h1 style={{fontSize:'48px', marginTop: '50px', zIndex: '1'}}><SuperWord word='ALL MEMES' /></h1>
            <div>we have {count} Memes!</div>
            <Memes memes={memes} />
            <div ref={look} id="look" style={{width:'100%', background:'wheat'}}></div>
            {end ? <h2 style={{margin:'15px'}}>There are no more <SuperWord word='memes' />...</h2> : ''}
        </div>
    )
})

export default CheckMemes