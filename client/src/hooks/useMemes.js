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
            getOne(params.id).then((res) => {return setMemes([res.meme]), setLoad(true)})
            console.log(memes)
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
    
      return () => {
        document.removeEventListener('scroll', checkScroll)
        if (params.id) {
            console.log('id')
            setOffset(prev => 0)
            setFetching(true)
            setEnd(false)
            setMemes([])
            setLoad(false)
        }
    }
    }, [offset, end, load, look, params])
    
    useEffect(() => {
        
        if (fetching && !end && !params.id) {
            console.log('fetch')
            if (count < offset) {
                setEnd(true)
                setFetching(false)
                return
            } 
            getAll(offset, 4)
                .then(async(res) =>{
                    console.log(offset)
                    await setMemes([...memes, ...res.memes]) 
                    await setLoad(true) 
                    await setCount(res.count)
                    setOffset(prev => prev + 4)
                })
                .finally(() => setFetching(false))
                .catch((e) => console.log(e))
        }
    }, [fetching, offset, params])

}

