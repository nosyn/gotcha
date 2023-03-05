import { Button, Table } from '@mantine/core';
import { Captcha } from '../../types';
import { useState } from 'react';
import CaptchaCard from './captcha-card/CaptchaCard';

interface CaptchaTableProps {
  rows: Captcha[];
}

const TableColumns = [
  { header: 'index' },
  { header: 'id' },
  { header: 'status' },
  { header: 'updated at' },
  { header: 'Created at' },
  { header: 'actions' },
];

const CaptchaTable = ({ rows }: CaptchaTableProps) => {
  const [selectedCaptcha, setSelectedCaptcha] = useState<Captcha | null>(null);

  return (
    <Table>
      <thead>
        <tr>
          {TableColumns.map((tb) => (
            <th key={tb.header}>{tb.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, index) => {
          const isSelectedCaptcha = selectedCaptcha?.name === r.name;

          return (
            <>
              <tr key={r.id}>
                <th className="text-center">{index}</th>
                <td>{r.id.split('-')[0]}</td>
                <td>{r.status}</td>
                <td>{new Date(r.createdAt).toLocaleTimeString()}</td>
                <td>{new Date(r.updatedAt).toLocaleTimeString()}</td>
                <td>
                  <Button
                    onClick={() => {
                      if (isSelectedCaptcha) {
                        setSelectedCaptcha(null);
                      } else {
                        setSelectedCaptcha(r);
                      }
                    }}
                    color={isSelectedCaptcha ? 'yellow' : 'blue'}
                  >
                    {selectedCaptcha?.name !== r.name ? 'Select' : 'Deselect'}
                  </Button>
                </td>
              </tr>
              {selectedCaptcha?.name === r.name && (
                <tr>
                  <td colSpan={2} />
                  <td colSpan={2}>
                    <CaptchaCard captcha={selectedCaptcha} />
                  </td>
                  <td colSpan={2} />
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </Table>
  );
};

export default CaptchaTable;
