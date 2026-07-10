'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { CertificateCard } from '@/components/certificate/CertificateCard';
import { useCertificates } from '@/hooks/useCertificates';
import { Card, CardContent } from '@/components/ui/card';

export default function CertificatePage() {
  const { data: certificates, isLoading } = useCertificates();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Certificates</h1>
          <p className="text-muted-foreground">
            Your earned certificates for completed courses
          </p>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground">Loading certificates...</p>
        ) : certificates && certificates.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <CertificateCard key={cert._id} certificate={cert} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No certificates earned yet. Complete courses to earn certificates!
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
