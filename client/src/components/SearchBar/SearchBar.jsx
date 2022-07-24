import React, { useEffect, useState } from 'react'
import searchIco from '../../static/search.png'
import cancel from '../../static/cancel.png'
import '../../styles/SearchBar.scss'
import { Button, Form, Image, Spinner } from 'react-bootstrap';
import { getAll } from '../../http/memesAPI';
import { getUsers } from '../../http/userAPI';
import SearchQuery from './SearchQuery';

export default function SearchBar({search, setSearch}) {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        getAll().then(res => {return setData(res.memes), getUsers().then(res => setData(prev => {return {memes:prev, users:res.users}})).finally(()=> setLoading(true))})
        return () => {
            setSearch(false)
        }
    }, [])

    useEffect(() => {
        value.length > 0 &&
        setFilteredData({memes: data.memes.filter((m) => m.title.includes(value.toLocaleLowerCase())), users: data.users.filter((u) => u.name.includes(value.toLocaleLowerCase()))})
    }, [value])
    
    useEffect(() => {
      setValue('')
    }, [search])
    

    return (
    <div>
        {!search && <img onClick={() => setSearch(!search)} style={{cursor:'pointer'}} src={searchIco} />}
        <div className='SearchBar' style={{display: search ? 'flex' : 'none'}}>
            <Form.Control placeholder='find meme or memers' value={value} onChange={(e) => setValue(e.target.value)} type='text' />
                <Image style={{cursor:'pointer'}} onClick={() => setSearch(!search)} src={cancel} />
                {value 
                ? (
                    <div className='SearchBar__finding'>
                    {loading 
                    ? <SearchQuery data={filteredData} setSearch={setSearch} />
                    : <Spinner animation='border' />
                    }
                    </div>
                ) 
                : ''
                }
        </div>
    </div>
    )
}
