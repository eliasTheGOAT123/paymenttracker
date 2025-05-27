import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import StudentForm from "@/components/StudentForm";
import StudentList from "@/components/StudentList";
import MonthlyPaymentViewDialog from "@/components/MonthlyPaymentViewDialog";

const initialFormData = {
  firstName: "",
  lastName: "",
  phone1: "",
  phone2: "",
  uniqueCode: "",
  group: "",
  monthlyPayments: {}, 
};

const App = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [editingStudent, setEditingStudent] = useState(null);
  
  const [monthlyViewDialogOpen, setMonthlyViewDialogOpen] = useState(false);
  const [currentStudentForMonthlyView, setCurrentStudentForMonthlyView] = useState(null);


  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, phone1, uniqueCode, group } = formData;
    if (!firstName || !lastName || !phone1 || !uniqueCode || !group) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingStudent) {
      const updatedStudents = students.map((student) =>
        student.id === editingStudent.id ? { ...formData, id: student.id, monthlyPayments: student.monthlyPayments || {} } : student
      );
      setStudents(updatedStudents);
      setEditingStudent(null);
      toast({
        title: "Success!",
        description: "Student information updated successfully.",
      });
    } else {
      const newStudent = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        monthlyPayments: {}, 
      };
      setStudents([...students, newStudent]);
      toast({
        title: "Success!",
        description: "New student added successfully.",
      });
    }
    setFormData(initialFormData);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({ ...student, monthlyPayments: student.monthlyPayments || {} });
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    toast({
      title: "Student Removed",
      description: "The student has been removed from the system.",
    });
  };

  const openMonthlyViewDialog = (student) => {
    setCurrentStudentForMonthlyView(student);
    setMonthlyViewDialogOpen(true);
  };

  const confirmMonthlyPaymentToggle = (studentId, monthKey) => {
    setStudents(prevStudents => 
      prevStudents.map(student => {
        if (student.id === studentId) {
          const newMonthlyPayments = { ...(student.monthlyPayments || {}) };
          newMonthlyPayments[monthKey] = !newMonthlyPayments[monthKey];
          
          if (currentStudentForMonthlyView && currentStudentForMonthlyView.id === studentId) {
            setCurrentStudentForMonthlyView({ ...student, monthlyPayments: newMonthlyPayments });
          }
          
          return { ...student, monthlyPayments: newMonthlyPayments };
        }
        return student;
      })
    );
    const monthName = new Date(monthKey + '-01').toLocaleString('default', { month: 'long' });
    const status = (students.find(s => s.id === studentId)?.monthlyPayments || {})[monthKey] ? "Paid" : "Unpaid";
    toast({
      title: "Payment Status Updated",
      description: `Payment for ${monthName} marked as ${status}.`,
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white text-center mb-2">Student Payment Tracker</h1>
          <p className="text-white text-center mb-8">Manage student information and monthly payments</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <StudentForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            editingStudent={editingStudent}
            setEditingStudent={setEditingStudent}
            setFormData={setFormData}
          />
          <StudentList
            students={students}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            openMonthlyViewDialog={openMonthlyViewDialog}
          />
        </div>
      </div>

      <MonthlyPaymentViewDialog
        open={monthlyViewDialogOpen}
        onOpenChange={setMonthlyViewDialogOpen}
        student={currentStudentForMonthlyView}
        confirmMonthlyPaymentToggle={confirmMonthlyPaymentToggle}
      />

      <Toaster />
    </div>
  );
};

export default App;