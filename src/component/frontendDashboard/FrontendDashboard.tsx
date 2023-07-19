import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { StudentInfo } from '../studentInformation/StudentInfo'
import { Button, Typography } from '@mui/material';
import colors from '../../constants/colors';
import "./FrontendDashboard.scss";
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { getFrontendDeployedExercises } from '../../features/taskDeployer/taskSlice';

const FrontendDashboard = () => {
  const dispatch = useAppDispatch();
  const taskManagerSelector = useAppSelector((state: RootState) => state.taskManager);

  const [studentName, setStudentName] = useState(taskManagerSelector.frontendStudentId);
  const [exerciseName, setExerciseName] = useState(taskManagerSelector.frontendExercise);
  const [url, setUrl] = useState("Please select an student and exercise above.");

  const isFrontendDeployed = () => {
    if (studentName !== "" && exerciseName !== "") {
      dispatch(getFrontendDeployedExercises({studentName, exerciseName}));
    } else {
      setUrl("Please select an student and exercise above.")
    }
  }

  const handleVisit = () => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    isFrontendDeployed();
  }, [studentName, exerciseName])

  useEffect(() => {
    if (studentName !== "" && exerciseName !== "") {
      setUrl(taskManagerSelector.frontendResponseURL)
    }
  }, [taskManagerSelector.frontendResponseURL])

  return (
    !taskManagerSelector.loading ?
    <div className='frontend__dashboard'>
      <StudentInfo studentName={studentName} exerciseName={exerciseName} setStudent={setStudentName} setExercise={setExerciseName} />
      <div className='s3__url'>
        {url.includes('http') ? <Typography className='s3__url-newtab' variant='caption'><a target='_blank' href={url}>{url}</a><OpenInNewOutlinedIcon fontSize='small' /></Typography> : <Typography variant='caption'>{url}</Typography>}
      </div>
      <Button variant='outlined' 
        onClick={handleVisit}
        disabled={studentName === "" || exerciseName === "" || !url.includes('http')} 
        sx={{
        color: colors.blue_button_background_color,
        borderRadius: 6,
        mt: 2,
        border: `3px solid ${colors.blue_button_background_color}`,
        fontWeight: 550,
        "&:hover": {
          backgroundColor: colors.blue_button_background_color,
          color: colors.white_color,
          border: `3px solid ${colors.blue_button_background_color}`,
        },
      }}>Visit</Button>
    </div>
    :
    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  )
}

export default FrontendDashboard