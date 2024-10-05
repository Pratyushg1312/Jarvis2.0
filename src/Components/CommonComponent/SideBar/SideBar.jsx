import React from 'react'

const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <h1>Logo</h1>
            </div>
            <div className="sidebar__content">
                <ul>
                    <li>Home</li>
                    <li>Profile</li>
                    <li>Setting</li>
                    <li>Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar