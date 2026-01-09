import { useRef, useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  Trash2,
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
  status: DocStatus;
}

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    const newDoc: DocumentItem = {
      id: Date.now(),
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF' : 'Document',
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      lastModified: new Date().toLocaleDateString(),
      status: 'Draft',
    };

    setDocuments(prev => [...prev, newDoc]);
  };

  const badgeVariant = (status: DocStatus) => {
    if (status === 'Signed') return 'success';
    if (status === 'In Review') return 'warning';
    return 'secondary';
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Document Chamber</h1>
          <p className="text-gray-600">
            Upload, review and sign documents
          </p>
        </div>

        {/* REAL WORKING UPLOAD */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          hidden
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleUpload(e.target.files[0]);
              e.target.value = '';
            }
          }}
        />

        <Button
          leftIcon={<Upload size={18} />}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Document
        </Button>
      </div>

      {/* DOCUMENT LIST */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">All Documents</h2>
        </CardHeader>

        <CardBody>
          {documents.length === 0 && (
            <p className="text-sm text-gray-500">
              No documents uploaded yet
            </p>
          )}

          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="p-2 bg-gray-100 rounded mr-4">
                  <FileText size={20} />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{doc.name}</h3>
                  <p className="text-sm text-gray-500">
                    {doc.type} • {doc.size} • {doc.lastModified}
                  </p>
                </div>

                <Badge variant={badgeVariant(doc.status)}>
                  {doc.status}
                </Badge>

                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <Eye size={16} />
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setDocuments(prev =>
                        prev.filter(d => d.id !== doc.id)
                      )
                    }
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* SIGN MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[520px] space-y-4">
            <h2 className="font-semibold">{selectedDoc.name}</h2>

            <div className="border h-40 flex items-center justify-center text-gray-500">
              PDF Preview (Mock)
            </div>

            <SignatureCanvas
              penColor="black"
              canvasProps={{
                width: 460,
                height: 150,
                className: 'border rounded',
              }}
            />

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
                  setDocuments(prev =>
                    prev.map(d =>
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

export default DocumentsPage;
