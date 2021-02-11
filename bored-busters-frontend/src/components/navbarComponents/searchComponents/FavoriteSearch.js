import React, {useState, useContext} from 'react';
import StyledSelectContainer from "../../styledComponents/StyledSelectContainer";
import StyledInputContainer from "../../styledComponents/StyledInputContainer";
import SliderBar from "../../slidebarComponents/Sliderbar";
import StyledGetButton from "../../styledComponents/StyledGetButton";
import StyledFavoriteSearchContainer from "../../styledComponents/StyledFavoriteSearchContainer";
import {SlideValueContext} from "../../../contextComponents/SlideValueContext";
import axios from 'axios';
import Cookies from "js-cookie";

function FavoriteSearch(props) {
    const types = ["all", "education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
    const [activityType, setActivityType] = useState("");
    const [inputParticipants, setParticipants] = useState("");
    const [priceValues] = useContext(SlideValueContext);

    const clearFields = () => {
        setParticipants("");
    };

    const options = {headers: {
        "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
            Authorization: "Bearer " + Cookies.get('token'),
    }};

    const filterActivities = () => {
        const filterData = {
            activityMinPrice: priceValues.min/10000,
            activityMaxPrice: priceValues.max/10000,
        }
        if (activityType) {
            filterData.activityType = activityType;
        }
        if (inputParticipants) {
            filterData.activityParticipants = inputParticipants;
        }
        axios.get(`http://127.0.0.1:8000/api/get-activity-by-condition/${sessionStorage.getItem('userId')}`,
            {params: filterData})
            .then((response) => {
                props.setVisibleFavorites(response.data);
            })
    }

    return (
        <StyledFavoriteSearchContainer>

            {/* ************* */}
            {/* Activity Type */}
            <StyledSelectContainer>Activity types:
                <select className="option" onChange={
                    e => e.target.value==="all" ? setActivityType("") : setActivityType(e.target.value)
                }>
                    {types.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </StyledSelectContainer>

            {/* ********************** */}
            {/* Number of participants */}
            <StyledInputContainer>
                Number of participants:
                <input
                    className="input"
                    type="text"
                    value={inputParticipants}
                    placeholder={inputParticipants}
                    onChange={(e) => setParticipants(e.target.value)}
                    onFocus={clearFields}
                />
            </StyledInputContainer>

            {/* *********** */}
            {/* Price range */}
            <SliderBar className="slider"/>

            {/* ************* */}
            {/* Search button */}
            <StyledGetButton style={{margin: "5px auto"}} onClick={filterActivities}>
                Filter my favorites!
            </StyledGetButton>

            {/* ************* */}
            {/* No result box */}
            {props.visibleFavorites.length === 0 ? (
                <div className="no-result">No results were found</div>) : ("")};

        </StyledFavoriteSearchContainer>
    );
}

export default FavoriteSearch;