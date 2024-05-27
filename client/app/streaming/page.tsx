import React, { Suspense } from 'react'
import Streaming from './client'


export default function page() {
  return (
    <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Streaming />
    </Suspense>
     </div>
  )
}
