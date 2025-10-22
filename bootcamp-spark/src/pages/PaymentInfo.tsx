import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Banknote, Send, ArrowLeft } from "lucide-react";

const PaymentInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    const phone = "2349012345678"; // 🔁 Replace with your real WhatsApp number
    const message = encodeURIComponent(
      `Hello, I have made payment for the course (ID: ${courseId}). Here is my screenshot.`
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto py-10">
        <Card className="shadow-lg border border-border">
          <CardHeader className="text-center space-y-3">
            <Banknote className="mx-auto text-primary h-10 w-10" />
            <CardTitle className="text-2xl font-bold">Manual Payment Required</CardTitle>
            <CardDescription>
              This course requires payment before you can enroll.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg border border-border">
              <h3 className="font-semibold mb-2 text-lg">💳 Account Details</h3>
              <p className="text-sm">Bank Name: <strong>Access Bank</strong></p>
              <p className="text-sm">Account Name: <strong>Toko Academy</strong></p>
              <p className="text-sm">Account Number: <strong>0123456789</strong></p>
              <p className="text-sm mt-2 text-muted-foreground">
                Amount: <strong>Check course page for fee</strong>
              </p>
            </div>

            <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
              <h3 className="font-semibold mb-2 text-lg">📸 Payment Confirmation</h3>
              <p className="text-sm mb-3">
                After making your payment, please send a <strong>clear screenshot</strong> of your
                transaction receipt to our WhatsApp number below for confirmation.
              </p>
              <Button
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
                onClick={handleWhatsApp}
              >
                <Send className="h-4 w-4" /> Message on WhatsApp
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                className="mt-4 flex items-center gap-2"
                onClick={() => navigate("/courses")}
              >
                <ArrowLeft className="h-4 w-4" /> Back to Courses
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentInfo;
