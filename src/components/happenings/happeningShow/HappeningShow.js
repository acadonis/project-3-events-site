import React from 'react'
import axios from 'axios'

import Hero from './Hero'
import MainBox from './MainBox'
import CommentsBox from './CommentsBox'
import DetailsBox from './DetailsBox'
import AttendeesBox from './AttendeesBox'
import SimilarHappeningsBox from './SimilarHappeningsBox'

class HappeningShow extends React.Component {
  constructor() {
    super()
    this.state = {
      happening: null,
      fromeData: {},
      commentInputIsOpen: false
    }

    this.openCommentInput = this.openCommentInput.bind(this)
    this.storeFormData = this.storeFormData.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.loadHappening = this.loadHappening.bind(this)
    this.linkToHappening = this.linkToHappening.bind(this)
  }

  toggleCommentInput() {
    this.setState({commentInputIsOpen: true})
  }

  storeFormData(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  submitComment(e) {
    e.preventDefualt()
    axios.put(`api/happenings/${this.props.match.params.id}/comments`, this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
  }

  handleDelete() {
    axios.delete(`/api/happenings/${this.props.match.params.id}`)
      .then(() => this.props.history.push('/happenings'))
  }

  linkToHappening(happeningId) {
    this.props.history.push(`/happenings/${happeningId}`)
  }

  loadHappening(happeningId) {
    return axios.get(`/api/happenings/${happeningId}`)
      .then(res => {
        this.setState({ happening: res.data })
      })
      // Does the below need to be chained? Would it be better to have them both requested at the same time
      .then(() => {
        axios.get('/api/happenings/limit/4')
          .then(res => this.setState({ similarHappenings: res.data }))
      })
  }

  componentDidMount() {
    this.loadHappening(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ happening: null })
      this.loadHappening(this.props.match.params.id)
    }
  }
  // FM - note to self: May want to give a more developed loading page
  render() {
    const happening = this.state.happening
    const similarHappenings = this.state.similarHappenings

    if (!happening) return <h1 className="title">Loading ... </h1>
    console.log(this.state)
    return(
      <div className="section">
        <Hero {...happening}/>
        <div className="container">

          <div className="columns is-variable is-4">

            <div className="column is-three-fifths">
              <MainBox {...happening} />
              <CommentsBox
                comments={happening.comments}
                commentInputIsOpen={this.state.commentInputIsOpen}
                openCommentInput={this.openCommentInput}
                storeFormData={this.storeFormData}
              />
            </div>

            <div className="column is-two-fifths container">
              <DetailsBox
                localTime={happening.local_time}
                localDate={happening.local_date}
                {...happening}
              />
              <AttendeesBox attendees={happening.attendees} />
              {similarHappenings && <SimilarHappeningsBox
                happenings={this.state.similarHappenings}
                linkToHappening={this.linkToHappening}
              />}
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default HappeningShow
