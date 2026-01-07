import SignatureCanvas from 'react-signature-canvas';
import { Button } from '../ui/Button';
import { useRef } from 'react';

const SignaturePad = () => {
  const sigRef = useRef<any>(null);

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">E-Signature</h3>

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 150,
          className: 'border rounded',
        }}
      />

      <div className="mt-2 flex gap-2">
        <Button variant="secondary" onClick={() => sigRef.current.clear()}>
          Clear
        </Button>
        <Button variant="success">Save Signature</Button>
      </div>
    </div>
  );
};

export default SignaturePad;
