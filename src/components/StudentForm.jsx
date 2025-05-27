import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const StudentForm = ({ formData, handleInputChange, handleSubmit, editingStudent, setEditingStudent, setFormData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:col-span-1"
    >
      <Card className="glass-card text-white">
        <CardHeader>
          <CardTitle>{editingStudent ? "Edit Student" : "Add New Student"}</CardTitle>
          <CardDescription className="text-gray-200">
            {editingStudent ? "Update student information" : "Enter student details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white">First Name*</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white">Last Name*</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone1" className="text-white">Phone 1*</Label>
                <Input
                  id="phone1"
                  name="phone1"
                  value={formData.phone1}
                  onChange={handleInputChange}
                  placeholder="Primary Phone"
                  className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone2" className="text-white">Phone 2</Label>
                <Input
                  id="phone2"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleInputChange}
                  placeholder="Secondary Phone"
                  className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="uniqueCode" className="text-white">Unique Code*</Label>
                <Input
                  id="uniqueCode"
                  name="uniqueCode"
                  value={formData.uniqueCode}
                  onChange={handleInputChange}
                  placeholder="Unique ID Code"
                  className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group" className="text-white">Group*</Label>
                <Input
                  id="group"
                  name="group"
                  value={formData.group}
                  onChange={handleInputChange}
                  placeholder="Student Group"
                  className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-white text-purple-700 hover:bg-white/90">
                {editingStudent ? "Update Student" : "Add Student"}
              </Button>
              
              {editingStudent && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full mt-2 border-white text-white hover:bg-white/20"
                  onClick={() => {
                    setEditingStudent(null);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      phone1: "",
                      phone2: "",
                      uniqueCode: "",
                      group: "",
                      paymentStatus: "Unpaid",
                      paymentAmount: 0,
                      payments: [],
                      monthlyPayments: {}
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StudentForm;