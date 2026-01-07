interface Props {
  name: string;
  status: 'Draft' | 'In Review' | 'Signed';
}

const statusColor = {
  Draft: 'bg-gray-200 text-gray-800',
  'In Review': 'bg-warning-500 text-white',
  Signed: 'bg-success-500 text-white',
};

const DocumentCard = ({ name, status }: Props) => {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">
      <div>
        <p className="font-medium">{name}</p>
        <span className={`text-xs px-2 py-1 rounded ${statusColor[status]}`}>
          {status}
        </span>
      </div>

      <a href="#" className="text-primary-600 text-sm">
        Preview
      </a>
    </div>
  );
};

export default DocumentCard;
