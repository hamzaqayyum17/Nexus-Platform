import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  Share2,
  Eye,
} from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

type DocStatus = 'Draft' | 'In Review' | 'Signed';

interface DocumentItem {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  shared: boolean;
  status: DocStatus;
}

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    name: 'Pitch Deck 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-02-15',
    shared: true,
    status: 'Draft',
  },
];

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const handleUpload = (file: File) => {
    const newDoc: DocumentItem = {
      id: Date.now(),
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF' : 'Document',
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      lastModified: new Date().toISOString().split('T')[0],
      shared: false,
      status: 'Draft',
    };

    setDocuments((prev) => [...prev, newDoc]);
  };

  const statusBadgeVariant = (status: DocStatus) => {
    if (status === 'Signed') return 'success';
    if (status === 'In Review') return 'warning';
    return 'secondary';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Document Chamber
          </h1>
          <p className="text-gray-600">
            Upload, review and sign your deals & contracts
          </p>
        </div>

        {/* Upload */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          id="upload-doc"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleUpload(e.target.files[0]);
            }
          }}
        />
        <label htmlFor="upload-doc">
          <Button leftIcon={<Upload size={18} />}>
            Upload Document
          </Button>
        </label>
      </div>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-gray-900">
            All Documents
          </h2>
        </CardHeader>

        <CardBody>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center p-4 hover:bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-primary-50 rounded-lg mr-4">
                  <FileText size={22} className="text-primary-600" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900">
                      {doc.name}
                    </h3>

                    {doc.shared && (
                      <Badge size="sm" variant="secondary">
                        Shared
                      </Badge>
                    )}

                    <Badge
                      size="sm"
                      variant={statusBadgeVariant(doc.status)}
                    >
                      {doc.status}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    {doc.type} • {doc.size} • Modified {doc.lastModified}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <Eye size={18} />
                  </Button>

                  <Button variant="ghost" size="sm">
                    <Download size={18} />
                  </Button>

                  <Button variant="ghost" size="sm">
                    <Share2 size={18} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-error-600"
                    onClick={() =>
                      setDocuments((prev) =>
                        prev.filter((d) => d.id !== doc.id)
                      )
                    }
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Preview + Signature Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[520px] rounded-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold">
              {selectedDoc.name}
            </h2>

            <div className="border h-40 flex items-center justify-center text-gray-500">
              PDF / DOC Preview (Mock)
            </div>

            <div>
              <p className="font-medium mb-1">E-Signature</p>
              <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 460,
                  height: 150,
                  className: 'border rounded',
                }}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setSelectedDoc(null)}
              >
                Close
              </Button>

              <Button
                variant="success"
                onClick={() => {
                  setDocuments((prev) =>
                    prev.map((d) =>
                      d.id === selectedDoc.id
                        ? { ...d, status: 'Signed' }
                        : d
                    )
                  );
                  setSelectedDoc(null);
                }}
              >
                Sign Document
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
