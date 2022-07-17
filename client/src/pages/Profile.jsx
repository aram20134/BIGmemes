import React from "react";
import { useEffect, useState } from "react";
import { getAllUser } from "../http/memesAPI";
import { useContext } from "react";
import { Context } from "./../index";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { changeUserName, check, getUserName } from "./../http/userAPI";
import "../styles/Profile.scss";
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import Memes from "../components/Memes/Memes";
import change from '../static/change.png'
import AddMemeModal from '../components/UI/AddMemeModal';
import checkG from '../static/check.png'
import cancel from '../static/cancel.png'
import Error from './Error';
import logout from '../static/logout.png'
import LoadingPage from "../components/UI/LoadingPage";
import AvatarEditor from 'react-avatar-editor'

const Profile = observer(() => {
  const { meme, user } = useContext(Context);

  const navigate = useNavigate()

  const [load, setLoad] = useState(false);
  const [owned, setOwned] = useState(false);
  const [isChange, setIsChange] = useState(false)
  const [changed, setChanged] = useState(toJS(user.user.name))
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [userMemes, setUserMemes] = useState();

  const [test, setTest] = useState(1)

  const params = useParams();

  function logoutUser() {
    localStorage.removeItem('token')
    user.setUser(null)
    user.setIsAuth(false)
  }

  function changeName() {
    changeUserName(user.user.id, changed).then((res) => {check()
    .then(data => {user.setUser(data);user.setIsAuth(true);setError(false)})})
    .finally(navigate('../profile/' + changed))
    setIsChange(false)
  }

  useEffect(() => {
    user.isAuth && getAllUser(user.user.id).then((data) => user.setUserMemes(data))
    try {
      getUserName(params.username).then((res) => {
        if (res.user == null) {
          setError(true);
          setLoad(true);
        } else {
          if (res.user.id === user.user.id) {
            setOwned(true) 
            setLoad(true)
          } else {
            getAllUser(res.user.id).then(a => {setUserMemes(a); setLoad(true);setOwned(false)})
            setUserData(res);
          }
          setError(false);
          
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, [params, changed]);

  if (!load) {
    return <LoadingPage />;
  }
  if (error) {
    return <Error />;
  }

  return owned ? (
    <div className="Profile">
    <div className="Profile__bg"></div>
      <div className="Profile__user">
        <div style={{display:'flex', flexDirection:'row', gap:'50px'}}>
          <div className="Profile__user__cont">
            <img className="Profile__user__avatar" src={`${process.env.REACT_APP_API_URL}/${user.user.avatar}`}/>
          </div>
          <div className="Profile__user__about">
          {!isChange 
          ? (
            <p>{toJS(user.user.name)}
              <OverlayTrigger placement="top" overlay={<Tooltip style={{position:'absolute'}}>change your name</Tooltip>}>
                <img style={{cursor:'pointer'}} onClick={() => setIsChange(true)} src={change} />
              </OverlayTrigger>
            </p>
            )
          : (
            <div className="Profile__change">
              <input className="Profile__input" value={changed} onChange={(e) => setChanged(e.target.value)} />
              <div style={{position:'absolute', right:'26%'}}>
                <img onClick={() => changeName()} className="ico" src={checkG} />
                <img onClick={() => setIsChange(false)} className="ico" src={cancel} />
              </div>
            </div> )
          }
            <div>Memes made: {user.userMemes.length}</div>
          </div>
        </div>
        <div className="Profile__user__change">
          <div onClick={() => setShow(!show)} className="Navbar__signIn">Add your meme</div>
          <AddMemeModal show={show} handleClick={() => setShow(!show)} />
        </div>
        <OverlayTrigger placement="top" overlay={<Tooltip style={{position:'absolute'}}>logout</Tooltip>}>
          <NavLink onClick={() => logoutUser()} to="/" title='logout'><img className="ico2" src={logout} /></NavLink>
        </OverlayTrigger>
      </div>
      <Memes memes={toJS(user.userMemes)} />
    </div>
  ) : (
    <div className="Profile">
      <div className="Profile__bg"></div>
      <div className="Profile__user">
          <div className="Profile__user__cont">
          {/* <div className="Profile__user__ava" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL}/${userData.user.avatar})`}}></div> */}
            <img className="Profile__user__avatar" src={`${process.env.REACT_APP_API_URL}/${userData.user.avatar}`} />
          </div>
          <div className="Profile__user__about">
            <p>{userData.user.name}</p>
            <p>Memes made: {userMemes ? userMemes.length : 0}</p>
          </div>
      </div>
      <Memes memes={userMemes} />
    </div>
  );
});
export default Profile;
