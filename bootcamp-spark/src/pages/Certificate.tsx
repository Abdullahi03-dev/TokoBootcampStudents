import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Download, Lock } from "lucide-react";
import { toast } from "sonner";
import api from "@/api/axios";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const email = localStorage.getItem("emailBootcamp");
        const res = await api.get(`/certificates?email=${email}`);
        setCertificates(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleDownload = (url: string) => {
    if (!url) return toast.error("Certificate not available");
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[70vh]">
          <p>Loading certificates...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-4">My Certificates</h1>

        {certificates.length === 0 ? (
          <p className="text-muted-foreground text-center">
            You have no course enrollments yet.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert: any, index: number) => {
              const isCompleted = cert.status === "completed";

              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden border rounded-xl shadow-md transition-all ${
                    isCompleted ? "hover:shadow-lg" : "opacity-70"
                  }`}
                >
                  <CardHeader>
                    <CardTitle>{cert.course_name}</CardTitle>
                    <CardDescription className="capitalize">
                      Status: {cert.status}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-accent/10 to-background rounded-lg flex flex-col items-center justify-center relative">
                      <Award className="h-12 w-12 text-primary mb-3" />

                      {isCompleted ? (
                        <p className="font-semibold text-primary">
                          Certificate Ready 🎉
                        </p>
                      ) : (
                        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col items-center justify-center text-center">
                          <Lock className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground font-medium">
                            Complete the course to unlock this certificate
                          </p>
                        </div>
                      )}
                    </div>

                    <Button
                      className="mt-4 w-full"
                      disabled={!isCompleted}
                      onClick={() => handleDownload(cert.certificate_url)}
                      variant={isCompleted ? "default" : "outline"}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {isCompleted ? "Download Certificate" : "Not Available Yet"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Certificates;
