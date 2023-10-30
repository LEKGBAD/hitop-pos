"use client"
import AuthWrapper from '@/components/AuthWrapper'
import { useStateProvider } from '@/context/stateContext'
import React from 'react'

const page = () => {
  return (
    <div>
      <AuthWrapper type="Add User" forr="admin" />
    </div>
  )
}

export default page
