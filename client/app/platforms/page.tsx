import React, { Suspense } from 'react'
import PlatformsClient from './client'


export default function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <PlatformsClient />
      </Suspense>
      </div>
  )
}
