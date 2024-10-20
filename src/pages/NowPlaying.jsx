import React, { useEffect } from 'react'
import {useAxios} from '../hook/useAxios'
import {API_KEY} from '../hook/useEnv'
import NowPlayingCard from '../components/Card'


function NowPlaying() {

useEffect(() => {
  useAxios().get(`/movie/now_playing?language=en-US&page=1&api_key=${API_KEY}`).then(res =>{
  
  },[])
},[])
  return (
    <div className='w-[350px] mx-auto mt-[30px]'>
      <NowPlayingCard/>
    </div>
  )
}

export default NowPlaying