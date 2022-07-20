import { useState, useEffect } from 'react';
import { getAll } from '../http/memesAPI';


export const useMemes = (memes, setMemes, load, setLoad, count, setCount, end, setEnd, look) => {
    
    const [offset, setOffset] = useState(0)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {

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
    }
    }, [count, offset, fetching, end, load, look])
    
    useEffect(() => {
        if (count < offset) {
            setEnd(true)
            setFetching(false)
            return
        } 
        if (fetching && !end) {
            getAll(offset, 4)
                .then(async(res) =>{
                    await setMemes([...memes, ...res.memes]) 
                    await setLoad(true) 
                    await setCount(res.count)
                    setOffset(prev => prev + 4)
                })
                .finally(() => setFetching(false))
                .catch((e) => console.log(e))
        }
    }, [fetching, offset])
    

}

