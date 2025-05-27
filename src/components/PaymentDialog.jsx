import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const PaymentDialog = ({ open, onOpenChange, currentStudent, paymentAmount, setPaymentAmount, handlePayment }) => {
  if (!currentStudent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <DialogDescription>
            Record a payment for {currentStudent.firstName} {currentStudent.lastName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="paymentAmount">Payment Amount ($)</Label>
            <Input
              id="paymentAmount"
              type="number"
              step="0.01"
              min="0"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
          
          {currentStudent.payments && currentStudent.payments.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Payment History</h4>
              <div className="max-h-[150px] overflow-y-auto border rounded-md p-2">
                {currentStudent.payments.map((payment) => (
                  <div key={payment.id} className="flex justify-between text-sm py-1 border-b last:border-0">
                    <span>{new Date(payment.date).toLocaleDateString()}</span>
                    <span className="font-medium">${payment.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handlePayment}>Record Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;