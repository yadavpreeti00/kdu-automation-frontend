import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { StudentInfo } from '../studentInformation/StudentInfo'
import { deployBackendExercise, doesProjectExists, projectDeployChecker, terminateBackendExercise } from '../../features/taskDeployer/taskSlice';
import { Button, Typography } from '@mui/material';
import colors from '../../constants/colors';
import "./BackendDashboard.scss";
import "../../sass/common.scss";
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

const BackendDashboard = () => {
  const taskManagerSelector = useAppSelector((state: RootState) => state.taskManager);
  const dispatch = useAppDispatch();

  const [studentName, setStudentName] = useState(taskManagerSelector.backendStudentId);
  const [exerciseName, setExerciseName] = useState(taskManagerSelector.backendExercise);
  const [url, setUrl] = useState("");

  const isBackendDeployed = 
  () => {
    if (studentName !== "" && exerciseName !== "") {
      dispatch(doesProjectExists({link: `https://kdu-automation.s3.ap-south-1.amazonaws.com/jars/${studentName}-${exerciseName}-backend.jar`}))
    } else {
      setUrl(`Please select an student and exercise above.`);
    }
  }
  
  useEffect(() => {
    if(taskManagerSelector.doesBackendExerciseExists === "exists") {
      dispatch(projectDeployChecker({ fileName: `${studentName}-${exerciseName}-backend.jar` }))
    } else if (taskManagerSelector.doesBackendExerciseExists === "not exists") {
      setUrl(`No such ${exerciseName} is submitted yet by ${studentName}. Please reach out to student.`)
    }
  }, [taskManagerSelector.doesBackendExerciseExists])

  useEffect(() => {
    if(taskManagerSelector.isBackendAlreadyRunning === "exists") {
      setUrl(`http://ec2-13-232-10-252.ap-south-1.compute.amazonaws.com:${taskManagerSelector.backendExercisePort}/swagger-ui/index.html`)
    } else if (taskManagerSelector.isBackendAlreadyRunning === "not exists") {
      setUrl(`Press start below to deploy ${exerciseName} of ${studentName}`)
    }
  }, [taskManagerSelector.isBackendAlreadyRunning])

  useEffect(() => {
    isBackendDeployed();
  }, [studentName, exerciseName])

  const handleDeploy = () => {
    if (taskManagerSelector.isBackendAlreadyRunning === "exists") {
      dispatch(terminateBackendExercise({ port: "8081", fileName: `${studentName}-${exerciseName}-backend.jar` })).then(() => isBackendDeployed());
    } else {
      dispatch(deployBackendExercise({
        url: `https://kdu-automation.s3.ap-south-1.amazonaws.com/jars/${studentName}-${exerciseName}-backend.jar`,
        fileName: `${studentName}-${exerciseName}-backend.jar`
      })).then(() => isBackendDeployed())
    }
  }

  return (
    !taskManagerSelector.loading ?
    <div className='backend__dashboard'>
      <StudentInfo studentName={studentName} exerciseName={exerciseName} setStudent={setStudentName} setExercise={setExerciseName} />
      <div className='s3__url'>
        {url.includes("http") ? <Typography className='s3__url-newtab' variant='caption'><a target='_blank' href={url}>{url}</a><OpenInNewOutlinedIcon fontSize='small' /></Typography> : <Typography variant='caption'>{url}</Typography>}
      </div>
      <Button variant='outlined' disabled={studentName === "" || exerciseName === "" || taskManagerSelector.doesBackendExerciseExists === "not exists"} sx={{
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
      }} onClick={handleDeploy}>{taskManagerSelector.isBackendAlreadyRunning === "exists" ? "Terminate" : "Start"}</Button>
    </div>
    :
    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  )
}

export default BackendDashboard