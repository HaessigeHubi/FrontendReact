import Head from 'next/head';
import { Container } from '@mui/material';
import { CustomerListResults } from '../components/project/project-list-results';
import { DashboardLayout } from '../components/dashboard-layout';

const Customers = () => (
  <>
    <Head>
      <title>
        Task Management
      </title>
    </Head>
        <CustomerListResults />
  </>
);
Customers.getLayout = (page) => (
  
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
