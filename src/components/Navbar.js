import React from 'react'
import StyledNavbar from "./styledComponents/StyledNavbar"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <StyledNavbar>
            <Link to="/random">Random</Link>
            {''}|{''}
            <Link to="/type">Type</Link>
            {''}|{''}
            <Link to="/participants">Participants</Link>
            {''}|{''}
            <Link to="/cost">Cost</Link>
        </StyledNavbar>
    )
}
