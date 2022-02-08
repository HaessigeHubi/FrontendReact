import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';

import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import React, { useState, useEffect } from 'react';


export const LatestOrders = (props) => (
  
  <Card {...props}>
    <CardHeader title="Offene Tasks" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Task Nummer
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
      <UsersData />
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <NextLink
            href="/task"
            passHref>
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        Alle ansehen
      </Button>
      
      </NextLink>
    </Box>
  </Card>
);


export default function UsersData() {
  const [Users, fetchUsers] = useState([])

  const getData = () => {
     fetch('http://localhost:5000/api/v1/task')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        fetchUsers(res)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
      <TableBody>
            {Users.map((item) => (
              <TableRow
                hover
                key={item.id}
              >
              <TableCell>
                {item.id}
              </TableCell>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell>
                  {format(Date.parse(item.updated_at), 'dd.MM.yyyy')}
                </TableCell>
                <TableCell>
                  <SeverityPill
                    color={(item.type === 'delivered' && 'success')
                    || (item.type === 'refunded' && 'error')
                    || 'warning'}
                  >
                    {item.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
  )
}