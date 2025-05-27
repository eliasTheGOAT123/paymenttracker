
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { CheckCircle, XCircle } from "lucide-react";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const MonthlyPaymentViewDialog = ({ open, onOpenChange, student, confirmMonthlyPaymentToggle }) => {
  if (!student) return null;

  const currentYear = new Date().getFullYear();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Monthly Payments for {student.firstName} {student.lastName}</DialogTitle>
          <DialogDescription>
            Year: {currentYear}. Click a month to toggle payment status.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
          {months.map((month, index) => {
            const monthKey = `${currentYear}-${String(index + 1).padStart(2, '0')}`;
            const isPaid = student.monthlyPayments && student.monthlyPayments[monthKey];
            return (
              <AlertDialog key={month}>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={isPaid ? "default" : "outline"}
                    className={`flex items-center justify-start space-x-2 text-sm py-3 px-2 ${isPaid ? 'bg-green-500 hover:bg-green-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                  >
                    {isPaid ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4 text-red-500" />}
                    <span className="truncate">{month}</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Payment Status Change</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to mark {month} as {isPaid ? "'Unpaid'" : "'Paid'"} for {student.firstName} {student.lastName}?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => confirmMonthlyPaymentToggle(student.id, monthKey)}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            );
          })}
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MonthlyPaymentViewDialog;