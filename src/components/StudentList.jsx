import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { PlusCircle, Trash2, Edit, Search, X, Eye } from "lucide-react";

const StudentList = ({ students, searchTerm, setSearchTerm, handleEdit, handleDelete, openMonthlyViewDialog }) => {
  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.firstName.toLowerCase().includes(searchLower) ||
      student.lastName.toLowerCase().includes(searchLower) ||
      student.uniqueCode.toLowerCase().includes(searchLower) ||
      student.group.toLowerCase().includes(searchLower)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="lg:col-span-2"
    >
      <Card className="glass-card text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Student Records</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white/20 text-white placeholder:text-gray-300 border-white/30 w-[250px]"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-300" />
                </button>
              )}
            </div>
          </div>
          <CardDescription className="text-gray-200">
            {filteredStudents.length} students found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-white/30 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/10">
                <TableRow>
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Code</TableHead>
                  <TableHead className="text-white">Group</TableHead>
                  <TableHead className="text-white">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="border-white/10">
                      <TableCell className="font-medium text-white">
                        {student.firstName} {student.lastName}
                        <div className="text-xs text-gray-300 mt-1">
                          {student.phone1} {student.phone2 && `/ ${student.phone2}`}
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{student.uniqueCode}</TableCell>
                      <TableCell className="text-white">{student.group}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEdit(student)}
                            className="h-8 w-8 text-white hover:text-blue-300 hover:bg-white/10"
                            title="Edit Student"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openMonthlyViewDialog(student)}
                            className="h-8 w-8 text-white hover:text-purple-300 hover:bg-white/10"
                            title="View Monthly Payments"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleDelete(student.id)}
                            className="h-8 w-8 text-white hover:text-red-300 hover:bg-white/10"
                            title="Delete Student"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-300">
                      {searchTerm ? (
                        <div>
                          <p>No students found matching "{searchTerm}"</p>
                          <Button 
                            variant="link" 
                            onClick={() => setSearchTerm("")}
                            className="text-white mt-2"
                          >
                            Clear search
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <PlusCircle className="h-12 w-12 mb-2 text-gray-400" />
                          <p>No students added yet</p>
                          <p className="text-sm mt-1">Add your first student using the form</p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentList;