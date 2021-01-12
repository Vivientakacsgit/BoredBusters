import React from 'react'
import StyledNavbar from "./styledComponents/StyledNavbar"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <StyledNavbar>
            <Link to="/registration">Registration</Link>
            {''}|{''}
            <Link to="/login">Login</Link>
            {''}|{''}
            <Link to="/random">Random</Link>
            {''}|{''}
            <Link to="/type">Type</Link>
            {''}|{''}
            <Link to="/participants">Participants</Link>
            {''}|{''}
            <Link to="/cost">Cost</Link>
            {''}|{''}
            <Link to="/favorites">Favorites</Link>
        </StyledNavbar>
    )
}
