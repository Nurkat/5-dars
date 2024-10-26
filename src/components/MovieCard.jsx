import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IMG_URL } from '../hook/useEnv';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({item}) {   
  const navigate = useNavigate()
  const [chamgeImg, setChangeImg] = React.useState(false)
  function handleImgMouseEnter(){
    setChangeImg(true)
  }
  function handleImgMouseLeave(){
    setChangeImg(false)
  }
  return (
    <Card className='cursor-pointer' sx={{ maxWidth: 345 }}>
      <div className='w-full  h-[300px] relative'>
      <CardMedia
        onMouseEnter ={handleImgMouseEnter}
        onMouseLeave ={handleImgMouseLeave}
        className={`absolute w-full duration-300 ${chamgeImg ? "left-[-100%]" : "left-0"}`}
        sx={{ height: 300 }}
        image={`${IMG_URL}${item.poster_path}`}
        title={item.title}
      />
      <CardMedia
        onMouseEnter ={handleImgMouseEnter}
        onMouseLeave ={handleImgMouseLeave}
        className={`absolute w-full duration-300 ${chamgeImg ? "right-0" : "right-[-100%]"}`}
        sx={{ height: 300 }}
        image={`${IMG_URL}${item.backdrop_path}`}
        title={item.title}
      />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography className='line-clamp-3' variant="body2" sx={{ color: 'text.secondary' }}>
          {item.overview}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {item.release_date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button className=' hover:!text-red-600 hover:scale-110' startIcon={<FavoriteIcon />} size="large">Like</Button>
        <Button className=' hover:!text-green-600 hover:scale-110' startIcon={<BookmarkIcon />} size="large">Save</Button>
        <Button onClick={() => navigate(`/movie/${item.id}`)} className=' hover:!text-gray-400 hover:scale-110' startIcon={<MoreHorizIcon/>} size="large">More</Button>
      </CardActions>
    </Card>
  );
}

