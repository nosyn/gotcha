import { Button, Table } from '@mantine/core';
import { Fragment, useState } from 'react';
import { Captcha } from '../../types';
import CaptchaCard from './captcha_card/CaptchaCard';

interface CaptchaTableProps {
  rows: Captcha[];
}

const CaptchaTable = ({ rows }: CaptchaTableProps) => {
  const [selectedCaptcha, setSelectedCaptcha] = useState<Captcha | null>(null);

  return (
    <Table striped highlightOnHover withBorder withColumnBorders>
      <TableHead />
      <tbody
        style={{
          display: 'block',
          overflow: 'auto',
          maxHeight: '80vh',
          tableLayout: 'fixed',
          width: '100%',
        }}
      >
        {rows.map((r) => {
          const isSelectedCaptcha = selectedCaptcha?.name === r.name;

          return (
            <Fragment key={r.id}>
              <tr
                style={{
                  display: 'table',
                  tableLayout: 'fixed',
                  width: '100%',
                }}
              >
                <td>{r.captchaId.split('-')[0]}</td>
                <td>{r.status}</td>
                <td>{r.text}</td>
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
                <tr
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <td>
                    <CaptchaCard captcha={selectedCaptcha} />
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

const TableColumns = [
  { header: 'captcha id' },
  { header: 'status' },
  { header: 'text' },
  { header: 'updated at' },
  { header: 'created at' },
  { header: 'actions' },
];

const TableHead = () => {
  return (
    <thead
      style={{
        display: 'table',
        tableLayout: 'fixed',
        width: '100%',
      }}
    >
      <tr>
        {TableColumns.map((tb) => (
          <th key={tb.header}>{tb.header}</th>
        ))}
      </tr>
    </thead>
  );
};

export default CaptchaTable;
