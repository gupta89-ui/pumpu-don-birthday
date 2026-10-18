import React from 'react'

export default function Tape({className=''}:{className?:string}){
  return (
    <svg className={className} width="100" height="30" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="30" rx="4" fill="#FFF8E7" stroke="#E8D5B5" />
      <path d="M10 5 h10 M30 5 h10 M60 5 h10" stroke="#E2CBA8" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}
