import { Captcha } from '../../types';

interface CaptchaTableProps {
  rows: Captcha[];
  setCaptcha: React.Dispatch<React.SetStateAction<Captcha | null>>;
}

const TableColumns = [
  { header: '' },
  { header: 'id' },
  { header: 'status' },
  { header: 'updatedAt' },
  { header: 'createdAt' },
  { header: 'actions' },
];

const CaptchaTable = ({ rows, setCaptcha }: CaptchaTableProps) => {
  return (
    <div className="overflow-auto max-h-96">
      <table className="table table-zebra w-full">
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
              <th>{index}</th>
              <td>{r.id}</td>
              <td>{r.status}</td>
              <td>{r.createdAt}</td>
              <td>{r.updatedAt}</td>
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
