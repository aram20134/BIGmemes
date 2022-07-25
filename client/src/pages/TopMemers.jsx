import React, { useEffect } from 'react'
import '../styles/TopMemers.scss'
import SuperWord from './../components/UI/SuperWord';
import { useState } from 'react';
import { getUsers } from '../http/userAPI';
import LoadingPage from './../components/UI/LoadingPage';
import { Table, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import chevUp from '../static/chevUp.png'
import chevDefault from '../static/chevDefault.png'

export default function TopMemers() {
    const [loaded, setLoaded] = useState(false)
    const [users, setUsers] = useState([])

    const [filterName, setFilterName] = useState(true)
    const [filterNameActive, setFilterNameActive] = useState(false)
    const [filterNameClicked, setFilterNameClicked] = useState(0)

    const [filterMemes, setFilterMemes] = useState(true)
    const [filterMemesActive, setFilterMemesActive] = useState(false)
    const [filterMemesClicked, setFilterMemesClicked] = useState(0)

    const [filterRating, setFilterRating] = useState(true)
    const [filterRatingActive, setFilterRatingActive] = useState(false)
    const [filterRatingClicked, setFilterRatingClicked] = useState(0)

    useEffect(() => {
      getUsers().then(res => setUsers(res.users)).finally(() => setLoaded(true))
    }, [])

    function setSortFilter(filter, setFilter, name) {
        setFilter(!filter)
        
        if (name == 'User') {
            setFilterNameClicked(prev => prev+1)
            if (filterNameClicked > 1) {
                setFilterNameActive(false) || setFilterNameClicked(0) || setFilter(true)
                return
            }
            console.log('filter')
            filter ? users.sort((a, b) => a.name > b.name ? 1 : -1) : users.sort((a, b) => a.name < b.name ? 1 : -1)   
        }
        if (name == 'Memes') {
            setFilterMemesClicked(prev => prev+1)
            if(filterMemesClicked > 1) {
                setFilterMemesActive(false) || setFilterMemesClicked(0) || setFilter(true)
                return
            }
            filter ? users.sort((a, b) => a.user_memes.length < b.user_memes.length ? 1 : -1) : users.sort((a, b) => a.user_memes.length > b.user_memes.length  ? 1 : -1)   
        }
        if (name == 'Rating') {
            setFilterRatingClicked(prev => prev+1)
            if(filterRatingClicked > 1) {
                setFilterRatingActive(false) || setFilterRatingClicked(0) || setFilter(true)
                return
            }
            filter ? users.sort((a, b) => a.ratings.length < b.ratings.length ? 1 : -1) : users.sort((a, b) => a.ratings.length > b.ratings.length ? 1 : -1)   
        }
        console.log(users)
    }

    if(!loaded) {
        return <LoadingPage />
    }

    return loaded &&  (
    <div className='TopMemers'>
        <h1 style={{zIndex:'1', fontSize: '48px', marginBottom:'50px'}}><SuperWord word='TOP MEMERS' /></h1>
        <Table style={{maxWidth:'1000px'}} striped>
            <thead>
                <tr>
                    <td style={{verticalAlign: 'baseline'}}>#</td>
                    <td>User{filterNameActive ? <img onClick={() => setSortFilter(filterName, setFilterName, 'User')} className={filterName ? 'TopMemers__chev_down' :'TopMemers__chev_up'} src={chevUp} /> : <img onClick={() => { return setSortFilter(filterName, setFilterName, 'User'), setFilterNameActive(true)}} src={chevDefault} style={{cursor:'pointer'}} /> }</td>
                    <td>Memes{filterMemesActive ? <img onClick={() => setSortFilter(filterMemes, setFilterMemes, 'Memes')} className={filterMemes ? 'TopMemers__chev_down' :'TopMemers__chev_up'} src={chevUp} /> : <img onClick={() => { return setSortFilter(filterMemes, setFilterMemes, 'Memes'), setFilterMemesActive(true)}} src={chevDefault} style={{cursor:'pointer'}} /> }</td>
                    <td>Rating{filterRatingActive ? <img onClick={() => setSortFilter(filterRating, setFilterRating, 'Rating')} className={filterRating ? 'TopMemers__chev_down' :'TopMemers__chev_up'} src={chevUp} /> : <img onClick={() => { return setSortFilter(filterRating, setFilterRating, 'Rating'), setFilterRatingActive(true)}} src={chevDefault} style={{cursor:'pointer'}} /> }</td>
                </tr>
            </thead>
            <tbody>
            {users.map((u, i) => {
               return (
                <tr key={u.id}>
                    <td>{i}</td>
                    <td><NavLink to={`../profile/` + u.name}><Image src={`${process.env.REACT_APP_API_URL}/${u.avatar}`} />{u.name}</NavLink></td>
                    <td>{u.user_memes.length}</td>
                    <td>{u.ratings.length}</td>
                </tr>
               )
            })}
            </tbody>
        </Table>
    </div>
    )
}
