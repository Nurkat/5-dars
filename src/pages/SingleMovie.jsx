// import React, { useEffect, useState } from 'react'
// import { useAxios } from '../hook/useAxios'
// import { API_KEY, IMG_URL } from '../hook/useEnv'
// import { useParams } from 'react-router-dom'
// import { Button } from '@mui/material'

// function SingleMovie() {
//     const {id} = useParams()
//     const [singleData, setSingleData] = useState({})

//     useEffect(() =>{
//       useAxios().get(`/movie/${id}?api_key=${API_KEY}`).then(res =>setSingleData(res.data))
//     },[id])
    
    
    
    
//   return (
//     <div className='flex justify-between p-5 '>
//     <div className='p-5 rounded-md h-[82vh] overflow-y-auto border-[2px] border-slate-400 w-[20%]'></div>
//     <div className='p-5 rounded-md h-[82vh] overflow-y-auto border-[2px] border-slate-400 w-[50%]'>
//        <h2 className='font-bold text-[33px] text-center mb-5'>{singleData.title}</h2>
//        <img className='rounded-md mb-5' src={`${IMG_URL}${singleData.poster_path}}`} alt="Move Img" width={"100%"} />
//        <p className='text-[20px] text-slate-400'>{singleData.overview}</p>
//        <div>
//           {singleData.genres.map(item => <Button variant='outlined' size='large'>{item.name}</Button>)}
//        </div>
//     </div>
//     <div className='p-5 rounded-md h-[82vh] overflow-y-auto border-[2px] border-slate-400 w-[29%]'></div>
//     </div>
//   )
// }

// export default SingleMovie











import React, { useEffect, useState } from 'react';
import { useAxios } from '../hook/useAxios';
import { API_KEY, IMG_URL } from '../hook/useEnv';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import YouTube from 'react-youtube';

function SingleMovie() {
    const { id } = useParams();
    const [singleData, setSingleData] = useState({});
    const [videos, setVideos] = useState([]);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        useAxios().get(`/movie/${id}?api_key=${API_KEY}`).then(res => setSingleData(res.data));
    }, [id]);


    useEffect(() => {
        useAxios().get(`/movie/${id}/videos?api_key=${API_KEY}`).then(res =>setVideos(res.data.results.splice(0,5)))
    },[id]);
    


    useEffect(() => {
        useAxios().get(`/movie/${id}/credits?api_key=${API_KEY}`).then(res =>{
            setActors(res.data.crew);
        });
    }, [id]);
  
  function handleErrorImg(e){
    e.target.src = "https://picsum.photos/id/33/400/400"
  }

    return (
        <div className='flex justify-between p-5'>
            <div className='p-5 rounded-md h-[82vh] overflow-y-auto border-[2px] space-y-3 border-slate-400 w-[20%]'>
                {actors.map((item,index) =>(
                    <div className='p-2 rounded-md  bg-slate-200 ' key={index}>
                        <img onError={handleErrorImg} className='rounded-md mb-2' src={`${IMG_URL}${item.profile_path}`} alt="Actor img" width={"100%"} />
                        <h2><strong>Name:</strong>{item.name}</h2>
                        <p><strong>Job:</strong>{item.job}</p>
                    </div>
                ))}
            </div>
            <div className='p-5 rounded-md h-[82vh] overflow-y-auto border-[2px] border-slate-400 w-[50%]'>
                <h2 className='font-bold text-[33px] text-center mb-5'>{singleData.title}</h2>
                <img
                    className='rounded-md mb-5'
                    src={`${IMG_URL}${singleData.poster_path}`}
                    alt="Movie Img"
                    width={"100%"}
                />
                <p className='text-[20px] text-slate-400'>{singleData.overview}</p>
                <div className='flex items-center mt-4 space-x-5'>
                  <strong className='text-slate-400 text-[20px]'>Genres:</strong>  {Array.isArray(singleData.genres) && singleData.genres.map(item => (
                        <Button key={item.id} variant='outlined' size='large'>{item.name}</Button>
                    ))}
                </div>
                <div className='mt-5'>
                    <strong className='text-[20px] text-slate-400'>View full video:</strong>  <Link target='_blank' className='text-blue-600' to={singleData.homepage}>{singleData.homepage}</Link>
                </div>
                <div className='mt-5'>
                    <strong className='text-[20px] text-slate-400'>Language:</strong> {singleData?.spoken_languages?.map((item,index) => <Button key={index} variant='outlined' size='large'>{item.name}</Button>)}
                </div>
            </div>
            <div className='p-5 rounded-md h-[82vh] space-y-5 overflow-y-auto border-[2px] border-slate-400 w-[29%]'>
                {videos.map(item => <YouTube key={item.id} id='item.id' videoId={item.key}/>)}
            </div>
        </div>
    );
}

export default SingleMovie;
