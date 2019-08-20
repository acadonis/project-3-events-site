import React from 'react'
import { Link } from 'react-router-dom'

import Auth from '../../../lib/Auth'

const Hero = ({ name, _id, user}) => {
  return (
    <div>
      <div className="hero is-light">
        <div className="hero-body">
          <div className="columns level-left is-vcentered">
            <h1 className="title column is-10">
              {name}
            </h1>
            {Auth.isCurrentUser(user) && <Link
              to={`/happenings/${_id}/edit`}
              className="column is-centered"
            >
              <button className="button has-text-weight-semibold is-primary">Update</button>
            </Link>}
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Hero
