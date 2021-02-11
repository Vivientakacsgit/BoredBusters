import React, {useState, useEffect} from "react";
import {FaHeart} from 'react-icons/fa';
import StyledFavButton from '../../styledComponents/StyledFavButton';
import axios from "axios";
import Cookies from "js-cookie";

export default function FavoriteButton(props) {
    const [activity, setActivity] = useState([]);
    const options = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: "Bearer " + Cookies.get('token'),
        }
    };

    useEffect(() => {
        if (props.activity) {
            setActivity(props.activity)
        } else {
            axios.get(`http://127.0.0.1:8000/api/get-activity/${props.activity.activity}`, options)
                .then((response) => {
                    setActivity(response.data)
                })
        }
    }, [props.activity])

    function getFavorites() {
        axios.get(`http://127.0.0.1:8000/api/favorite/${sessionStorage.getItem('userId')}`, options)
            .then((response) => {props.setFavorites(response.data)}
            )
    }

    function deleteFromFavorites() {
        axios.delete(`http://127.0.0.1:8000/api/favorite/${activity.id}`, options)
            .then((response) => {
                setActivity([])
                if (props.setActivity) {
                    props.setActivity([])
                }
                if(props.setFavorites){
                    getFavorites();
                }
                updatePagination();
            })
    }

    function addToFavorites() {
        let data =  {
            activity: activity,
            userId: sessionStorage.getItem('userId')
        }
        axios.post('http://127.0.0.1:8000/api/favorite', data, options)
            .then((response) => {
                setActivity(response.data)
            })
    }

    function updatePagination() {
        if (props.visibleFavorites && props.visibleFavorites.length - 1 === 0) {
            props.refreshVisibleFavorites(props.actualPageNumber - 1)
        }
    }

    const updateFavorites = () => {
        if (activity.id) {
            deleteFromFavorites();

        } else {
            addToFavorites();
        }
    }

    return Cookies.get('token') ? (
        <StyledFavButton style={{marginRight: "auto", marginLeft: "auto", minHeight: "50px"}} onClick={updateFavorites}>
            {(activity.id) ?
                <div style={{color: "red"}}><FaHeart style={{height: "40px", width: "40px"}}/></div>
                : <div><FaHeart style={{height: "40px", width: "40px"}}/></div>}
        </StyledFavButton>
    ) : ("")
}