import React, { useState, useEffect } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';  
import { fetchStudents, createStudent, updateStudent, deleteStudent } from '../store/studentSlice'; 
import StudentModal from './StudentModal';


const StudentTable = () => {

  const dispatch = useDispatch();
  const { list: students, loading, error } = useSelector((state) => state.students);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

const handleAddStudent = async (newStudent) => {
    await dispatch(createStudent(newStudent));
    dispatch(fetchStudents());
    setAddModalOpen(false);
}; 

const handleEditStudent = async () => {
  if (!selectedStudent) return;

  await dispatch(updateStudent(selectedStudent));
  dispatch(fetchStudents()); 
  setEditModalOpen(false);   
};


const handleDeleteStudent = async (name) => {
  await dispatch(deleteStudent(name));
  dispatch(fetchStudents()); 
  setDeleteModalOpen(false);
  setEditModalOpen(false); 
};


const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
    return formattedDate.replace(/(\d{2}) (\w{3}) (\d{4})/, '$1. $2. $3');
  };

  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true,  timeZone: 'UTC' };
    return new Date(date).toLocaleTimeString('en-GB', options); 
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


return (
  <div className='overflow-y-auto'>
    <div className='flex space-x-10 justify-between w-full'>
      <div className='mb-4 flex space-x-5'>
        <button className='bg-gray-200 text-gray-700 px-7 py-1 rounded-md text-l font-semibold flex'>
          AY 2024-25 <MdOutlineKeyboardArrowDown className='mt-1' />
        </button>
        <button className='bg-gray-200 text-gray-700 px-7 py-1 rounded-md text-l font-semibold flex'>
          CBSE 9 <MdOutlineKeyboardArrowDown className='mt-1' />
        </button>
      </div>
      <div className='ml-auto'>
        <button
          onClick={() => setAddModalOpen(true)}
          className='bg-gray-200 text-gray-700 px-7 py-1 rounded-md text-l font-semibold flex'>
          <IoMdAdd className='mt-1 mr-3' /> Add new Student
        </button>
      </div>

      {isAddModalOpen && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <StudentModal
              onClose={() => setAddModalOpen(false)}
              onSuccess={handleAddStudent}
            />
          </div>
        </div>
      )}
    </div>

    <table className='table-auto w-full border-collapse cursor-pointer'>
      <thead>
        <tr>
          <th className='border-b px-4 py-2 text-left'>Name</th>
          <th className='border-b px-4 py-2 text-left'>Cohort</th>
          <th className='border-b px-4 py-2 text-left'>Courses</th>
          <th className='border-b px-4 py-2 text-left'>Date Joined</th>
          <th className='border-b border-gray-300 px-4 py-2 text-left'>
            Last login
          </th>
          <th className='border-b border-gray-300 px-4 py-2 text-left'>
            Status
          </th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr
            key={student.name}
            className='hover:bg-gray-50'
            onClick={() => {
              setSelectedStudent(student);
              setEditModalOpen(true); 
            }}
          >
            <td className='border-b border-gray-300 px-4 py-2 whitespace-nowrap'>
              {student.name}
            </td>
            <td className='border-b border-gray-300 px-4 py-2 whitespace-nowrap'>
              <div className='text-gray-700 px-2 py-1 rounded-md text-sm font-medium'>
                {student.cohort}
              </div>
            </td>
            <td className='border-b border-gray-300 px-4 py-2 whitespace-nowrap'>
              <div className='flex gap-4'>
                {student.courses.map((course, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-2 bg-gray-100 px-2 rounded-md p-1'
                  >
                    <img
                      src={course.imageUrl}
                      alt={course.courseName}
                      className='w-9 h-7 rounded-sm border border-gray-300'
                    />
                    <span className='text-sm font-medium'>
                      {course.courseName}
                    </span>
                  </div>
                ))}
              </div>
            </td>
            <td className='border-b border-gray-300 px-4 py-2 whitespace-nowrap'>
              {formatDate(student.dateJoined)}
            </td>
            <td className='border-b border-gray-300 px-4 py-2 whitespace-nowrap'>
              {`${formatDate(student.lastLogin)} ${formatTime(
                student.lastLogin
              )}`}
            </td>
            <td className='border-b border-gray-300 px-4 py-2 whitespace-nowrap'>
              {student.status ? (
                <span className='text-green-500 text-3xl'>&#9679;</span>
              ) : (
                <span className='text-red-500 text-3xl'>&#9679;</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {isEditModalOpen && (
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold mb-4'>Edit Student</h2>
          <h4 className='mb-3 font-semibold text-red-500'>Name of the student cannot be edited*</h4>
            <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditStudent();
            }}
          >
            <input
              type='text'
              value={selectedStudent?.name || ""}
              readOnly
              className='border px-4 py-2 mb-4 w-full'
            />
            <input
              type='text'
              value={selectedStudent?.cohort || ""}
              onChange={(e) =>
                setSelectedStudent({ ...selectedStudent, cohort: e.target.value })
              }
              className='border px-4 py-2 mb-4 w-full'
            />
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded-md'
            >
              Save Changes
            </button>
            <button
              type='button'
              onClick={() => setEditModalOpen(false)}
              className='bg-gray-500 text-white px-4 py-2 rounded-md ml-2'
            >
              Cancel
            </button>
          </form>

          <button
            onClick={() => setDeleteModalOpen(true)} 
            className='bg-red-500 text-white px-4 py-2 rounded-md mt-4'
          >
            Delete Student
          </button>
        </div>
      </div>
    )}

    {isDeleteModalOpen && (
      <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h2 className='text-xl font-bold mb-4'>Confirm Delete</h2>
          <p>Are you sure you want to delete {selectedStudent.name}?</p>
          <div className='mt-4'>
            <button
              onClick={() => handleDeleteStudent(selectedStudent.name)}
              className='bg-red-500 text-white px-4 py-2 rounded-md'
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setDeleteModalOpen(false)}
              className='bg-gray-500 text-white px-4 py-2 rounded-md ml-2'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)
};


export default StudentTable;
