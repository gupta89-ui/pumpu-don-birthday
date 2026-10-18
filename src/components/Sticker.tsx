import React from 'react'

export default function Sticker({className=''}:{className?:string}){
  return (
    <svg className={className} width="120" height="80" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg">
      <rect rx="10" width="120" height="80" fill="#FFF1F5" stroke="#F6B3C1" />
      <text x="50%" y="52%" dominantBaseline="middle" textAnchor="middle" fontFamily="Patrick Hand, cursive" fontSize="14" fill="#C05667">sticker</text>
    </svg>
  )
}
