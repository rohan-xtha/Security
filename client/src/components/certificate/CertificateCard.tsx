'use client';

import { Certificate } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          <CardTitle className="text-lg">Certificate of Completion</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          Certificate ID: {certificate.certificateId}
        </p>
        <p className="text-sm">
          Course: {certificate.course.title}
        </p>
        <p className="text-sm text-muted-foreground">
          Issued: {new Date(certificate.issuedAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
