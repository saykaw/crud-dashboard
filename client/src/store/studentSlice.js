import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data.sort((a, b) => a.name.localeCompare(b.name)); 
});

export const createStudent = createAsyncThunk('students/createStudent', async (studentData) => {
  const response = await axios.post(`${API_URL}`, studentData);
  return response.data;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async ({ name, updatedData }) => {
  const response = await axios.put(`${API_URL}/${name}`, updatedData);
  return response.data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (name) => {
  await axios.delete(`${API_URL}/${name}`);
  return name;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex((student) => student.name === action.payload.name);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((student) => student.name !== action.payload);
      });
  },
});

export default studentSlice.reducer;
