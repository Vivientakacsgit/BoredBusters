import React, { useState, useContext } from "react";
import axios from "axios";
import StyledGetButton from "../styledComponents/StyledGetButton";
import StyledActivityContainer from "../styledComponents/StyledActivityContainer";
import { FavoriteContext } from '../../contextComponents/FavoriteContext';
import { FaHeart } from 'react-icons/fa';
import StyledFavButton from '../styledComponents/StyledFavButton';


export default function Header() {
  const [randomActivity, setrandomActivity] = useState([]);
  const [favorites, setFavorites] = useContext(FavoriteContext);

  const isCollected = (array) =>
    array.map((item) => item.activity).includes(randomActivity.activity);

  const removeItem = (array) =>
    array.filter((element) => element.key !== randomActivity.key);

  const updateFavorites = () => {
    setFavorites((prevCollection) => {
      if (!isCollected(prevCollection)) {
        return [...prevCollection, randomActivity];
      }
      return removeItem(prevCollection);
    });
  };

  const getRandomActivity = () => {
    axios
      .get("http://www.boredapi.com/api/activity/")
      .then((response) => setrandomActivity(response.data));

  }

  const { activity, type, participants, price } = randomActivity;

  return randomActivity.length !== 0 ? (
    <StyledActivityContainer>
      <StyledGetButton
        style={{ marginRight: "auto", marginLeft: "auto", minHeight: "50px" }}
        onClick={getRandomActivity}>

        Give me a random activity!
      </StyledGetButton>
      <StyledFavButton style={{ marginRight: "auto", marginLeft: "auto", minHeight: "50px" }} onClick={updateFavorites}>
        {isCollected(favorites) ?
          <div style={{ color: "red" }}><FaHeart style={{ height: "40px", width: "40px" }} /></div>
          : <div><FaHeart style={{ height: "40px", width: "40px" }} /></div>}
      </StyledFavButton>

      <div>
        <div style={{ fontSize: "35px", height: "100px" }}>{activity}</div>

        <div>Type: {type}</div>

        {randomActivity.link ? (
          <div>
            Visit: <a href={randomActivity.link} target="_blank" rel="noopener noreferrer"> {randomActivity.link}</a>{" "}
          </div>
        ) : (
            ""
          )}

        <div>Number of participants:{participants}</div>

        <div>Price: {price * 10000}</div>
      </div>


    </StyledActivityContainer>
  ) : (
      <StyledActivityContainer>
        <StyledGetButton
          style={{ marginRight: "auto", marginLeft: "auto", minHeight: "50px" }}
          onClick={getRandomActivity}
        >
          Give me a random activity!
      </StyledGetButton>
      </StyledActivityContainer>
    );
}
