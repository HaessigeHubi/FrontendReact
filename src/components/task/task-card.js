import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Alert,
  AlertTitle
} from '@mui/material';
import MaterialTable from 'material-table';



export const ProductCard = () => {

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  let columns = [
    { title: 'Name', field: 'name' },
    { title: 'Beschreibung', field: 'description' },
    { title: 'Typ', field: 'type' },
    { title: 'Verwendete Zeit', field: 'timeSpent' },
    { title: 'Status', field: 'status' },
    { title: 'Projekt', field: 'project_id' },
    { title: 'User', field: 'user_id' }
  ]

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/task`)
      .then(res => {
        const users = res.data;
        setUser(users);
        // console.log(users);
      })
  }, [])



  //function for updating the existing row details
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validating the data inputs
    let errorList = []
    if (newData.name === "") {
      errorList.push("Try Again, You didn't enter the name field")
    }
    if (newData.description === "") {
      errorList.push("Try Again, You didn't enter the Username field")
    }
    if (newData.status === "") {
      errorList.push("Try Again, Phone number field can't be blank")
    }

    if (errorList.length < 1) {
      axios.put(`http://localhost:5000/api/v1/task/${newData.id}`, newData)
        .then(response => {
          const updateUser = [...user];
          const index = oldData.tableData.id;
          updateUser[index] = newData;
          setUser([...updateUser]);
          resolve()
          setIserror(false)
          setErrorMessages([])
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          resolve()

        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }
  }


  //function for deleting a row
  const handleRowDelete = (oldData, resolve) => {
    axios.delete(`http://localhost:5000/api/v1/task/${oldData.id}`)
      .then(response => {
        const dataDelete = [...user];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setUser([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }


  //function for adding a new row to the table
  const handleRowAdd = (newData, resolve) => {
    //validating the data inputs
    let errorList = []
    if (newData.name === "") {
      errorList.push("Try Again, You didn't enter the name field")
    }
    if (newData.description === "") {
      errorList.push("Try Again, You didn't enter the Username field")
    }
    if (newData.status === "") {
      errorList.push("Try Again, Phone number field can't be blank")
    }

    if (errorList.length < 1) {
      axios.post(`http://localhost:5000/api/v1/task/`, newData)
        .then(response => {
          let newUserdata = [...user];
          newUserdata.push(newData);
          setUser(newUserdata);
          resolve()
          setErrorMessages([])
          setIserror(false)
        })
        .catch(error => {
          setErrorMessages(["Cannot add data. Server error!"])
          setIserror(true)
          resolve()
        })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
}


return (
  <div>
    

    <MaterialTable
      title="Tasks"
      columns={columns}
      data={user}
      options={{
        headerStyle: { borderBottomColor: 'blue', borderBottomWidth: '3px', fontFamily: 'verdana' },
        actionsColumnIndex: -1,
        paging:false,
        draggable: false,
        
      }}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            handleRowUpdate(newData, oldData, resolve);

          }),
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            handleRowAdd(newData, resolve)
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            handleRowDelete(oldData, resolve)
          }),
      }}
    />

    <div>
      {iserror &&
        <Alert severity="error">
          <AlertTitle>ERROR</AlertTitle>
          {errorMessages.map((msg, i) => {
            return <div key={i}>{msg}</div>
          })}
        </Alert>
      }
    </div>

  </div>
);
};

