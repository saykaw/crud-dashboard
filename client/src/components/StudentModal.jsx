import React, { useState } from 'react';
import axios from 'axios';

const courseImageMap = {
  'CBSE 9 Math': 'https://media.istockphoto.com/id/1372481295/photo/photo-of-school-boy-wear-yellow-t-shirt-backpack-in-background-stock-photo.jpg?s=612x612&w=0&k=20&c=lRsVHozgtzpj9W6ZjEW2g2qTkh4iV4BLePFgvUt7kvE=',
  'CBSE 9 Science': 'https://thumbs.dreamstime.com/b/smiling-indian-kid-girl-wear-school-uniform-stand-lilac-background-portrait-smiling-smart-indian-hispanic-preteen-girl-196261572.jpg',
  'CBSE 9 History': 'https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'CBSE 9 Art': 'https://media.istockphoto.com/id/1392990621/photo/smart-handsome-positive-indian-or-arabian-guy-with-glasses-in-casual-wear-student-or.jpg?s=612x612&w=0&k=20&c=qyj5Dh8_uN5Xue9aICOI0z_OYyzNh_f1pFeAhRA4FQA=',
  'CBSE 9 Physical Education': 'https://plus.unsplash.com/premium_photo-1682089869602-2ec199cc501a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGluZGlhbiUyMGJveXxlbnwwfHwwfHx8MA%3D%3D',
};

const API_URL = import.meta.env.VITE_BACKEND_URL;
 
const StudentModal = ({ onClose, onSuccess }) => {
    const [studentData, setStudentData] = useState({
      name: '',
      cohort: '',
      courses: [],
      dateJoined: '',
      lastLogin: '',
      status: false,
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setStudentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleCourseChange = (e) => {
        const selectedCourses = Array.from(e.target.selectedOptions, (option) => option.value);
        setStudentData((prevData) => ({
          ...prevData,
          courses: selectedCourses,
        }));
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const coursesWithImages = studentData.courses.map(course => ({
        courseName: course,
        imageUrl: courseImageMap[course],
      }));

      const studentWithCourses = {
        ...studentData,
        courses: coursesWithImages,  
      };

      try {
        const response = await axios.post(`${API_URL}`, studentWithCourses);
        onSuccess(response.data); 
        onClose(); 
      } catch (error) {
        console.error('Failed to add student:', error);
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label className='px-4'>Enter Name</label>
          <input
            type='text'
            name='name'
            value={studentData.name}
            onChange={handleChange}
            required
            className='mb-3 border border-gray-300 rounded-md p-1'
          />
        </div>
        <div>
          <label className='px-4'>Enter Cohort</label>
          <input
            type='text'
            name='cohort'
            value={studentData.cohort}
            onChange={handleChange}
            required
            className='mb-3 border border-gray-300 rounded-md p-1'
          /> ̰
        </div>

        <div>
          <label className='px-4'>Courses</label>
          <div className='mb-3'>
            {[
              'CBSE 9 Math',
              'CBSE 9 Science',
              'CBSE 9 History',
              'CBSE 9 Art',
              'CBSE 9 Physical Education',
            ].map((course, index) => (
              <div key={index} className='flex items-center'>
                <input
                  type='checkbox'
                  id={course}
                  name='courses'
                  value={course}
                  checked={studentData.courses.includes(course)}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setStudentData((prevData) => ({
                      ...prevData,
                      courses: isChecked
                        ? [...prevData.courses, e.target.value] 
                        : prevData.courses.filter((c) => c !== e.target.value), 
                    }));
                  }}
                  className='mr-2'
                />
                <label htmlFor={course}>{course}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className='px-4'>Date Joined</label>
          <input
            type='date'
            name='dateJoined'
            value={studentData.dateJoined}
            onChange={handleChange}
            required
            className='mb-3 border border-gray-300 rounded-md p-1'
          />
        </div>
        <div>
          <label className='px-4'>Last Login</label>
          <input
            type='datetime-local'
            name='lastLogin'
            value={studentData.lastLogin}
            onChange={handleChange}
            className='mb-3 border border-gray-300 rounded-md p-1'
          />
        </div>


        <div>
          <label className='px-4'>Status</label>
          <select
            name='status'
            value={studentData.status}
            onChange={(e) => handleChange({ target: { name: 'status', value: e.target.value === 'true' } })}
            className='mb-3 border border-gray-300 rounded-md p-1'
          >
            <option value='true'>Active</option>
            <option value='false'>Inactive</option>
          </select>
        </div>


        <button type='submit' className=' ml-4 px-4 bg-green-300 rounded rounded-md p-1 hover:bg-green-600 cursor-pointer hover:text-white'>Add Student</button>
        <button type='button' onClick={onClose} className=' ml-4 px-4 bg-red-300 rounded rounded-md p-1 hover:bg-red-600 cursor-pointer hover:text-white'>Cancel</button>


      </form>
    );
  };

export default StudentModal;