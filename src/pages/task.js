import Head from 'next/head';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { products } from '../__mocks__/products';
import { ProductListToolbar } from '../components/task/task-list-toolbar';
import { ProductCard } from '../components/task/task-card';
import { DashboardLayout } from '../components/dashboard-layout';

const Products = () => (
  <>
 <ProductCard></ProductCard>
  </>
);

Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Products;
