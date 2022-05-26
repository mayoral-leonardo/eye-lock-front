import React from "react";
import './Card.css'

export default function Card({ title, icon, onClick }) {
  return (
    <div className='card' onClick={onClick}>
      <div className='card__icon'>
        {icon}
      </div>
      <div className='card__title'>
        <span>{title}</span>
      </div>
    </div>
  )
}