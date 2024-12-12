import React from 'react'
import BadgeStatus from './BadgeStatus'

export default function BadgeItem(props) {

  const { data, handleBadgeClick } = props;

  return (
    <div className="box badge-item" onClick={() => { handleBadgeClick(data) }}>
      <img className="badge-flag" src={data.flag} />
      <img className={data.status === "yet-claimable" ? "badge-img gray-scale" : "badge-img"} src={data.badgeImg} />
      <p>{data.name}</p>

      <hr />

      <BadgeStatus status={data.status}></BadgeStatus>
    </div>
  )
}