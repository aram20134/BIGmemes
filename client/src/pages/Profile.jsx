import React from "react";
import { useEffect, useState } from "react";
import { getAllUser } from "../http/memesAPI";
import { useContext } from "react";
import { Context } from "./../index";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { changeUserName, check, getUserName } from "./../http/userAPI";
import "../styles/Profile.scss";
import { Spinner } from 'react-bootstrap';
import Memes from "../components/Memes/Memes";
import change from '../static/change.png'
import ProfileModal from '../components/UI/ProfileModal';
import checkG from '../static/check.png'
import cancel from '../static/cancel.png'
import Error from './Error';

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

  const params = useParams();

  function changeName() {
    changeUserName(user.user.id, changed).then((res) => {check()
    .then(data => {user.setUser(data);user.setIsAuth(true)})})
    .finally(navigate('../profile/' + changed))
    setIsChange(false)
  }

  useEffect(() => {
    console.log(user)
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
    return <Spinner animation="border" />;
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
          ? (<p>{toJS(user.user.name)}<img style={{cursor:'pointer'}} onClick={() => setIsChange(true)} src={change} /></p>)
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
          <ProfileModal show={show} handleClick={() => setShow(!show)} />
        </div>
      </div>
      <Memes memes={toJS(user.userMemes)} />
    </div>
  ) : (
    <div className="Profile">
      <div className="Profile__bg"></div>
      <div className="Profile__user">
          <div className="Profile__user__cont">
            <img
              className="Profile__user__avatar"
              src={`${process.env.REACT_APP_API_URL}/${userData.user.avatar}`}/>
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
