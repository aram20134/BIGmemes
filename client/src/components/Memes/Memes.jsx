import React, { useState } from 'react'
import { observer } from 'mobx-react-lite';
import '../../styles/Memes.scss'
import Meme from './Meme';
import { Form } from 'react-bootstrap';
import chevUp from '../../static/chevUp.png'
import grid from '../../static/grid.png'
import column from '../../static/column.png'

const Memes = observer(({memes}) => {  

  const sortType = ['Date', 'Likes', 'Comments']
  const [sort, setSort] = useState(sortType[0])
  const [sortDirection, setSortDirection] = useState(false)
  const [view, setView] = useState(false)

  function sortMemes(memes) {
    switch (sort) {
      case sortType[0]:
        sortDirection 
        ? memes.sort((a, b) => a.createdAt < b.createdAt ? -1 : 1)
        : memes.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)
        break;
      case sortType[1]:
        sortDirection 
        ? memes.sort((a, b) => a.rate.length < b.rate.length ? -1 : 1)
        : memes.sort((a, b) => a.rate.length < b.rate.length ? 1 : -1)
        break;
      case sortType[2]:
      sortDirection 
      ? memes.sort((a, b) => a.comments.length < b.comments.length ? -1 : 1)
      : memes.sort((a, b) => a.comments.length < b.comments.length ? 1 : -1)
        break;
    }
  }
  return (
    <div className='Memes-all'>
    {/* <h1>Memes</h1>   */}
      <div className='Memes__sort'>
        <div className='Memes__sort__sort'>
          <div>Sort by:</div>
          <Form.Select style={{width:'auto'}} value={sort} onChange={(e) => setSort(e.target.value)}>
            {sortType.map(type => <option key={type} value={type}>{type}</option>)}
          </Form.Select>
          <img onClick={() => setSortDirection(!sortDirection)} src={chevUp} className={sortDirection ? 'Memes__chev_down' : 'Memes__chev_up'} />
        </div>
        <div className='Memes__sort__sort'>
          <div>View:</div>
            <label className={view ? 'viewIco' : 'viewIco active'}>
              <img src={column} />
              <input name='view' value='column' onChange={()=> setView(false)} type='radio' style={{display:'none'}} checked={!view && true} />
            </label>
            <label className={view ? 'viewIco active' : 'viewIco'}>
              <img src={grid} />
              <input name='view' value='grid' onChange={()=> setView(true)} type='radio' style={{display:'none'}} />
            </label>
        </div>
      </div>
      <div className={view ? 'Memes Memes_grid' : 'Memes'}>
          {memes.length
          ? (sortMemes(memes),
            memes.map(mem => <Meme view={view} key={mem.id} mem={mem} />)
          )
          : (<div style={{fontSize:'52px', fontWeight:'bold'}}>There are no memes :( </div>)
          }
        </div>
      </div>
  )
})

export default Memes


