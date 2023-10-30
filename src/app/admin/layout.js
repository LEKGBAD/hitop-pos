"use client"
import AuthWrapper from '@/components/AuthWrapper';
import { reducerCases } from '@/context/constants';
import { useStateProvider } from '@/context/stateContext'
import { VERIFY_AUTH_ROUTE } from '@/utils/constants';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';

const layout = ({children}) => {
    const [{userInfo},dispatch]=useStateProvider();
    const Router=useRouter();
    const [cookie]=useCookies()
       

    
  return (
    <div>
        {((userInfo?.loginId === "admin") && cookie.jwt)?children:<AuthWrapper type="Login" forr="admin" />}
    </div>
  )
}

export default layout
