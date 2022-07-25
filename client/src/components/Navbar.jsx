import React, { useContext, useState } from 'react'
import '../styles/Navbar.scss'
import logo from '../static/logo.png'
import { NavLink } from 'react-router-dom';
import vector from '../static/vector.png';
import AuthModal from './UI/AuthModal';
import { observer } from 'mobx-react-lite';
import { Context } from './../index';
import SearchBar from './SearchBar/SearchBar';

const Navbar = observer(() => {
    const [IsMenuOpen, setIsMenuOpen] = useState(true)
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState(false)
    const {user} = useContext(Context)

  return (
    <div className='Navbar'>
        <div className='Navbar__container'>
            <div className='Navbar__desktop'>
                <NavLink to='/' className='Navbar__cont_logo'>
                    <img className='Navbar__logo' src={logo} alt="logo" />
                    <h3 className='Navbar__name'>Memes</h3>
                </NavLink>
                <div className='Navbar__cont_links'>
                    {search 
                    ?  ''
                    :  (
                        <>
                        <NavLink to="/checkmemes" className='Navbar__link'>Check memes</NavLink>
                        <NavLink to="/topmemers" className='Navbar__link'>Top memers</NavLink>
                        <NavLink to="/" className='Navbar__link'>Learn more</NavLink>
                        </>
                    )
                    }
                    <SearchBar search={search} setSearch={setSearch} />
                </div>
                {user.isAuth 
                ? (<NavLink to={`/profile/${user.user.name}`} className='Navbar__signIn'>Profile</NavLink>)
                : (<button onClick={() => setShow(!show)} className='Navbar__signIn'>Sign In</button>)
                }
                <AuthModal show={show} handleClick={() => setShow(!show)} />
            </div>
            <div className='Navbar__mobile'>
                <div className='Navbar__left'>
                    <menu onClick={() => setIsMenuOpen(!IsMenuOpen)} className={IsMenuOpen ? 'Menu' : 'Menu active'}>
                        <img src={vector} alt="menu" />
                        <img src={vector} alt="menu" />
                        <img src={vector} alt="menu" />
                        <div onClick={(e) => {e.preventDefault(); e.stopPropagation()}} className={IsMenuOpen ? 'Menu__cont' : 'Menu__cont active'}>
                            <div className='Menu__links'>
                                <NavLink className='Menu__link' to="/">Check memes</NavLink>
                                <NavLink className='Menu__link' to="/">Top memers</NavLink>
                                <NavLink className='Menu__link' to="/">Learn more</NavLink>
                            </div>
                        </div>
                    </menu>
                    <NavLink to='/' className='Navbar__cont_logo'>
                        <h3 className='Navbar__name'>Memes</h3>
                    </NavLink>
                </div>
                <button className='Navbar__signIn'>Sign In</button>
            </div>
        </div>
    </div>
  )
})
export default Navbar
