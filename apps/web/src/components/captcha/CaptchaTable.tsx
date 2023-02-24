import { Captcha } from '../../types';

interface CaptchaTableProps {
  rows: Captcha[];
  setCaptcha: React.Dispatch<React.SetStateAction<Captcha | null>>;
}

const TableColumns = [
  { header: 'index' },
  { header: 'id' },
  { header: 'status' },
  { header: 'updated at' },
  { header: 'Created at' },
  { header: 'actions' },
];

const CaptchaTable = ({ rows, setCaptcha }: CaptchaTableProps) => {
  return (
    <div className="overflow-x-auto max-h-128">
      <table className="table table-zebra table-compact w-full">
        <thead>
          <tr>
            {TableColumns.map((tb) => (
              <th key={tb.header}>{tb.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, index) => (
            <tr key={r.id}>
              <th className="text-center">{index}</th>
              <td>{r.id.split('-')[0]}</td>
              <td>{r.status}</td>
              <td>{new Date(r.createdAt).toLocaleTimeString()}</td>
              <td>{new Date(r.updatedAt).toLocaleTimeString()}</td>
              <td>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setCaptcha(r);
                  }}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaptchaTable;
