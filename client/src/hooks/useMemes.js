import { useState, useEffect } from 'react';
import { getAll } from '../http/memesAPI';
import { getOne } from './../http/memesAPI';
import { useParams } from 'react-router-dom';


export const useMemes = (memes, setMemes, load, setLoad, count, setCount, end, setEnd, look) => {
    
    const [offset, setOffset] = useState(0)
    const [fetching, setFetching] = useState(true)
    // const [paramId, setParamId] = useState(params.id)
    const params = useParams()

    useEffect(() => {
        if (params.id) {
            console.log('getOne')
            getOne(params.id).then((res) => setMemes([res.meme]), setLoad(true))
        } 
        function checkScroll() {
            if (!load || end) {
                return
            }
            if (window.pageYOffset + look.current.getBoundingClientRect().bottom - 500 < window.pageYOffset + document.documentElement.clientHeight) {
                setFetching(true)
            }
        }

        document.addEventListener('scroll', checkScroll) 
        if (count < offset) {
            setEnd(true)
            setFetching(false)
            return
        } 
      return () => {
        document.removeEventListener('scroll', checkScroll)
        if (params.id) {
            (async function() {
                setOffset(0)
                setFetching(true)
                setEnd(false)
                setLoad(false)
                setMemes([])
            }())
            
        }
    }
    }, [offset, load, look, params])
    
    useEffect(() => {
        
        if (fetching && !end && !params.id) {
            getAll(offset, 4)
                .then(async(res) =>{
                    await setMemes(prev => [...prev, ...res.memes]) 
                    await setLoad(true) 
                    await setCount(res.count)
                    setOffset(prev => prev + 4)
                })
                .finally(() => setFetching(false))
                .catch((e) => console.log(e))
        }
        if (count == 0) {
            getAll(offset, 4).then(async (res) => await setCount(res.count))
        }
    }, [fetching, offset, params])

}

