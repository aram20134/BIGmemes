import { useState, useEffect } from 'react';
import { getAll } from '../http/memesAPI';


export const useMemes = (memes, setMemes, load, setLoad, count, setCount, end, setEnd, look) => {
    
    const [offset, setOffset] = useState(0)
    const [fetching, setFetching] = useState(true)

    function checkScroll() {
        if (window.pageYOffset + look.current.getBoundingClientRect().bottom - 500 < window.pageYOffset + document.documentElement.clientHeight) {
            setFetching(true)
        }
    }
    useEffect(() => {
        if (count < offset) {
            console.log('useMem')
            document.removeEventListener('scroll', checkScroll) 
            setEnd(true)
        } else {
            document.addEventListener('scroll', checkScroll)
        }
    }, [offset])
    
    // document.removeEventListener('scroll', checkScroll)

    useEffect(() => {
        if (fetching) {
            console.log('fetch')
            getAll(offset, 5)
                .then(res =>{
                    setMemes([...memes, ...res.memes]) 
                    setLoad(true) 
                    setCount(res.count)
                    setOffset(prev => prev + 5)
                })
                .finally(setFetching(false))
        }
    }, [fetching])
    

}

