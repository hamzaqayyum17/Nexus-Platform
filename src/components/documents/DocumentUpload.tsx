import { ChangeEvent } from 'react';
import { Button } from '../ui/Button';

interface Props {
  onUpload: (file: File) => void;
}

const DocumentUpload = ({ onUpload }: Props) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-6 text-center">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
        id="doc-upload"
      />
      <label htmlFor="doc-upload">
        <Button variant="primary">Upload Document</Button>
      </label>
    </div>
  );
};

export default DocumentUpload;
