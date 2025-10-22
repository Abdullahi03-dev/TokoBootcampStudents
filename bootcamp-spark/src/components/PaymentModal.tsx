import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseTitle: string;
  coursePrice: number;
  onPaymentConfirmed: () => void;
}

const PaymentModal = ({ open, onOpenChange, courseTitle, coursePrice, onPaymentConfirmed }: PaymentModalProps) => {
  const [copied, setCopied] = useState(false);
  const accountNumber = "1234567890";
  const bankName = "Example Bank";
  const accountName = "Bootcamp Learning Platform";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Account number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Enrollment</DialogTitle>
          <DialogDescription>
            Transfer the course fee to enroll in {courseTitle}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Course Fee</p>
            <p className="text-4xl font-bold text-primary">${coursePrice}</p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Bank Name</p>
              <p className="text-lg font-semibold">{bankName}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Account Name</p>
              <p className="text-lg font-semibold">{accountName}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Account Number</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-lg border border-border bg-secondary/50 p-3">
                  <p className="text-xl font-mono font-bold">{accountNumber}</p>
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(accountNumber)}
                  className="h-12 w-12"
                >
                  {copied ? (
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-accent/10 border border-accent/20 p-4">
            <p className="text-sm text-muted-foreground">
              After completing the transfer, click "I've Paid" below. Our team will verify your payment and activate your course access within 24 hours.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                onPaymentConfirmed();
                onOpenChange(false);
              }}
            >
              I've Paid
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
