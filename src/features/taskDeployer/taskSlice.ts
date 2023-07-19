import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface TaskState {
    frontendStudentId: string;
    frontendExercise: string;
    backendStudentId: string;
    backendExercise: string;
    backendResponseURL: string;
    frontendResponseURL: string;
    backendExercisePort: string;
    loading: boolean;
    doesBackendExerciseExists: string;
    isBackendAlreadyRunning: string;
}

const initialState: TaskState = {
    frontendExercise: "",
    frontendStudentId: "",
    backendStudentId: "",
    backendExercise: "",
    backendResponseURL: "",
    frontendResponseURL: "",
    loading: false,
    doesBackendExerciseExists: "",
    isBackendAlreadyRunning: "",
    backendExercisePort: "0"
};

export const doesProjectExists = createAsyncThunk('project/exists', async({link}: {link: string}) => {
    console.log(link)
    const status = await axios.post("http://ec2-13-232-10-252.ap-south-1.compute.amazonaws.com:8080/linkChecker", {link}).then(resp => resp.data);
    return status;
})

export const projectDeployChecker = createAsyncThunk('project/checker', async({fileName}: {fileName: string}) => {
    const status = await axios.post("http://ec2-13-232-10-252.ap-south-1.compute.amazonaws.com:8080/checker", {fileName}).then(resp => resp.data);
    return status;
});

export const deployBackendExercise = createAsyncThunk('project/deployBackend', async({url, fileName}: {url: string, fileName: string}) => {
    const response = await axios.post("http://ec2-13-232-10-252.ap-south-1.compute.amazonaws.com:8080/deploy", {url, fileName}).then(resp => resp.data);
    return response;
})

export const terminateBackendExercise = createAsyncThunk('project/terminateBackend', async({port, fileName}: {port: string, fileName: string}) => {
    const response = await axios.post("http://ec2-13-232-10-252.ap-south-1.compute.amazonaws.com:8080/stop", {port, fileName}).then(resp => resp.data);
    return response;
})

export const getFrontendDeployedExercises = createAsyncThunk('project/getDeployedData', async({studentName, exerciseName}: {studentName: string, exerciseName: string}) => {
    try {
        const response = await axios.get(`https://kdu-automation.s3.ap-south-1.amazonaws.com/frontend/${exerciseName}.json`).then(resp => resp.data);
        if(Object.keys(response).includes(`${studentName}-${exerciseName}`)){
            return `http://user-${studentName}-refs-heads-${exerciseName}.s3-website.ap-south-1.amazonaws.com/`
        }
        return `${exerciseName} is not submitted by ${studentName}. Please contact student.`
    } catch (error) {
        return `${exerciseName} is not submitted by ${studentName}. Please contact student.`
    }
})

export const taskSlice = createSlice({
    name: 'taskChecker',
    initialState,
    reducers: {
        setFrontendExercise: (state, action) => {
            state.frontendExercise = action.payload;
        },
        setFrontendStudent: (state, action) => {
            state.frontendStudentId = action.payload;
        },
        setBackendExercise: (state, action) => {
            state.backendExercise = action.payload;
        },
        setBackendStudent: (state, action) => {
            state.backendStudentId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(doesProjectExists.pending, (state) => {
            state.loading = true;
            state.doesBackendExerciseExists = "";
        })
        .addCase(doesProjectExists.fulfilled, (state, action) => {
            state.loading = false;
            state.doesBackendExerciseExists = action.payload ? "exists" : "not exists";
        })
        .addCase(doesProjectExists.rejected, (state) => {
            state.loading = false;
            state.doesBackendExerciseExists = "";
        })
        .addCase(projectDeployChecker.pending, (state) => {
            state.loading = true;
            state.isBackendAlreadyRunning = "";
        })
        .addCase(projectDeployChecker.fulfilled, (state, action) => {
            state.loading = false;
            state.backendExercisePort = String(action.payload);
            state.isBackendAlreadyRunning = action.payload === 0 ? "not exists" : "exists";
        })
        .addCase(projectDeployChecker.rejected, (state) => {
            state.loading = false;
            state.backendExercisePort = "0"
            state.isBackendAlreadyRunning = "";
        })
        .addCase(deployBackendExercise.pending, (state) => {
            state.loading = true;
        })
        .addCase(deployBackendExercise.fulfilled, (state, action) => {
            state.loading = false;
            state.backendResponseURL = action.payload;
        })
        .addCase(deployBackendExercise.rejected, (state) => {
            state.loading = false;
        })
        .addCase(terminateBackendExercise.pending, (state) => {
            state.loading = true;
        })
        .addCase(terminateBackendExercise.fulfilled, (state, action) => {
            state.loading = false;
            state.backendResponseURL = action.payload;
        })
        .addCase(terminateBackendExercise.rejected, (state) => {
            state.loading = false;
        })
        .addCase(getFrontendDeployedExercises.pending, (state) => {
            state.loading = true;
            state.frontendResponseURL = "";
        })
        .addCase(getFrontendDeployedExercises.fulfilled, (state, action) => {
            state.loading = false;
            state.frontendResponseURL = action.payload;
        })
        .addCase(getFrontendDeployedExercises.rejected, (state) => {
            state.loading = false;
            state.frontendResponseURL = "";
        })
    }
})

export const taskMaintainerActions = taskSlice.actions;
export default taskSlice.reducer;