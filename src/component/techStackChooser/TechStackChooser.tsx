import { Typography } from '@mui/material'
import {useNavigate} from 'react-router-dom';
import "./TechStackChooser.scss"
import routePaths from '../../constants/routePaths';

const TechStackChooser = () => {
    const navigate = useNavigate();

  return (
    <div className='development'>
        <Typography variant='h3' gutterBottom>Choose a development</Typography>
        <div className="development__choices">
            <p className='development__choice' onClick={() => navigate(routePaths.frontendDashboard)}>Frontend</p>
            <p className='development__choice' onClick={() => navigate(routePaths.backendDashboard)}>Backend</p>
        </div>
    </div>
  )
}

export default TechStackChooser