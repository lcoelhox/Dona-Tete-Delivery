import React from 'react';
import FormRegister from '../../components/FormRegister';
import TableAdmin from '../../components/TableAdmin';

export default function Admin() {
  return (
    <div className="adm-container">
      <FormRegister register={ false } />
      <TableAdmin />
    </div>
  );
}
