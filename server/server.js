const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors'); 
const prisma = new PrismaClient();
const app = express();

app.use(cors()); 

app.use(express.json());

const PORT = process.env.PORT || 3000; 

app.post('/students', async (req, res) => {
  const { name, cohort, courses, dateJoined, lastLogin, status } = req.body;

  try {
    const student = await prisma.students.create({
      data: {
        name,
        cohort,
        courses,
        dateJoined: new Date(dateJoined),
        lastLogin: new Date(lastLogin),
        status,
      },
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create student' });
  }
});


app.get('/students', async (req, res) => {
    try {
      const students = await prisma.students.findMany({
        orderBy: { name: 'asc' },
      });
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  });

app.get('/students/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const student = await prisma.students.findUnique({
      where: { name },
    });
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
  }
});

app.put('/students/:name', async (req, res) => {
  const { name } = req.params;
  const updatedData = req.body;
  
  if (updatedData.name) {
    return res.status(400).json({ error: "Name cannot be updated" });
  }

  try {
    const updatedStudent = await prisma.students.update({
      where: { name },
      data: updatedData,
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Error updating student' });
  }
});

app.delete('/students/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const deletedStudent = await prisma.students.delete({
      where: { name },
    });
    res.status(200).json(deletedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
