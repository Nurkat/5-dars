import React, { useEffect, useState } from 'react'
import {useAxios} from '../hook/useAxios'
import {API_KEY} from '../hook/useEnv'
import MovieCard from '../components/MovieCard'
import { Pagination } from '@mui/material'


function MoviePage({URL}) {
  const [data, setData] = useState([])
  const [page, setPage] =useState(1)
  const [totalPage,setTotalPage] = useState(0)

useEffect(() => {
  useAxios().get(`/movie/${URL}?language=en-US&page=${page}&api_key=${API_KEY}`).then(res =>{
    setData(res.data.results)
    setTotalPage(res.data.total_pages)
    },[])
},[page])

  return (
    <div className='p-5'>
    <div className='flex justify-between flex-wrap  gap-5 '>
      {data.map(item =>  <MovieCard key={item.id} item={item}/>)}
    </div>
    <div className='flex items-center justify-center mt-5 '>
    <Pagination onChange={(a,b) => setPage(b) } size='large' count={totalPage} color="primary" />
    </div>
    </div>
  )
}

export default MoviePage