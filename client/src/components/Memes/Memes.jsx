import React from 'react'
import { observer } from 'mobx-react-lite';
import '../../styles/Memes.scss'
import Meme from './Meme';

const Memes = observer(({memes}) => {  

  return (
    <div className='Memes'>
    {memes.length
    ? memes.map(mem => {
      return (
        <Meme key={mem.id} mem={mem} />
      )
    })
    : (<div style={{fontSize:'52px', fontWeight:'bold'}}>There are no memes :( </div>)
    }
    </div> 
  )
})

export default Memes


