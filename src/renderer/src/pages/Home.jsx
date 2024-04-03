/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Home() {

    // redirect to dashboard
    return (
        <Link to='/dashboard'>Dash</Link>
    )
}

export default Home