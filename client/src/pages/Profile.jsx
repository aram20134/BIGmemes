import React from "react";
import { useEffect, useState } from "react";
import { getAllUser } from "../http/memesAPI";
import { useContext } from "react";
import { Context } from "./../index";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useParams } from "react-router-dom";
import { getUserName } from "./../http/userAPI";
import "../styles/Profile.scss";
import { Spinner } from 'react-bootstrap';
import Memes from "../components/Memes/Memes";
import {Parallax} from 'react-parallax'

const Profile = observer(() => {
  const { meme, user } = useContext(Context);
  const [load, setLoad] = useState(false);
  const [owned, setOwned] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({});
  const [userMemes, setUserMemes] = useState();
  const params = useParams();

  useEffect(() => {
    getAllUser(user.user.id).then((data) => user.setUserMemes(data));
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
            setOwned(false)
            setUserData(res)
            getAllUser(res.user.id).then(a => {setUserMemes(a); setLoad(true)})
          }
          setError(false);
          
        }
      });
    } catch (e) {
      console.log(e);
    }
    // console.log(load)
  }, [params]);
  // {owned ? 'true' : 'false'}
  //   {error ? 'true' : 'false'}
  //   {load ? console.log(toJS(user.userMemes)) : ''}
  if (!load) {
    return <Spinner animation="border" />;
  }
  return owned ? (
    <div className="Profile">
    <div className="Profile__bg"></div>
      <div className="Profile__user">
        <div className="Profile__user__cont">
          <img
            className="Profile__user__avatar"
            src={`${process.env.REACT_APP_API_URL}/${user.user.avatar}`}/>
        </div>
        <div className="Profile__user__about">
          <p>{toJS(user.user.name)}</p>
          <p>Memes made: {user.userMemes.length}</p>
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
          <p>Memes made: {userMemes.length}</p>
        </div>
      </div>
      <Memes memes={userMemes} />
    </div>
  );
});
export default Profile;
