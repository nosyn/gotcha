import { Table } from '@mantine/core';
import { Fragment } from 'react';
import { User } from '../../types';
// import CaptchaCard from './captcha_card/CaptchaCard';

interface UsersTableProps {
  rows: User[];
}

const UsersTable = ({ rows }: UsersTableProps) => {
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
        {rows.map((r, index) => {
          return (
            <Fragment key={r.id}>
              <tr
                style={{
                  display: 'table',
                  tableLayout: 'fixed',
                  width: '100%',
                }}
              >
                <th
                  style={{
                    width: '5rem',
                  }}
                >
                  {index}
                </th>
                <td>{r.id.split('-')[0]}</td>
                <td>{r.username}</td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

const TableColumns = [
  {
    header: 'index',
    style: {
      width: '5rem',
    },
  },
  { header: 'id' },
  { header: 'username' },
  { header: 'role' },
  { header: 'online' },
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
          <th key={tb.header} style={tb.style}>
            {tb.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default UsersTable;
