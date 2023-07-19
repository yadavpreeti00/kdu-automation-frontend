import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import "./StudentInfo.scss"
import profiles from "../../db/profiles.json";
import exercises from "../../db/exercises.json";

interface TaskDetailsProps {
  studentName: string;
  exerciseName: string;
  setStudent: Dispatch<SetStateAction<string>>;
  setExercise: Dispatch<SetStateAction<string>>;
}

export const StudentInfo = (props: TaskDetailsProps) => {

  const handleNameChange = (e: any) => {
    props.setStudent(e.target.value);
  }

  const handleExerciseChange = (e: any) => {
    props.setExercise(e.target.value);
  }


  return (
    <div className="student-info">
      <div className="stundentInfo-dropdown">
        <Box sx={{ minWidth: 220 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.studentName}
              label="Name"
              onChange={handleNameChange}
            >
              {Object.entries(profiles).map(([key, value]) => (
                <MenuItem value={key}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="stundentInfo-dropdown">
        <Box sx={{ minWidth: 220 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.exerciseName}
              label="Exercise"
              onChange={handleExerciseChange}
            >
              {Object.entries(exercises).map(([key, value]) => (
                <MenuItem value={key}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}
