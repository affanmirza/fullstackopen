import React from 'react'

const Notification = ({ popup }) => {
    if (popup !== null) {
      return (
        <div className={popup.status}>{popup.message}</div>
      )
    }
    else {
      return <div></div>
    }
  }

export default Notification;