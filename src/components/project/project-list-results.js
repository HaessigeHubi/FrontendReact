import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Alert,
  AlertTitle
} from '@mui/material';
import MaterialTable from 'material-table';

// regex for email validation
const validateEmail = (email) => {
  const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}

export const CustomerListResults = () => {

  const [user, setUser] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  let columns = [
    { title: 'Projekt', field: 'name' },
    { title: 'Beschreibung', field: 'description' },
    { title: 'Art', field: 'type' },
    { title: 'Erstellt am', field: 'created_at' }
  ]

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/project`)
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
    if (newData.created_at === "") {
      errorList.push("Try Again, Phone number field can't be blank")
    }

    if (errorList.length < 1) {
      axios.put(`http://localhost:5000/api/v1/project/${newData.id}`, newData)
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
    axios.delete(`http://localhost:5000/api/v1/project/${oldData.id}`)
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
    if (newData.created_at === "") {
      errorList.push("Try Again, Phone number field can't be blank")
    }

    if (errorList.length < 1) {
      axios.post(`http://localhost:5000/api/v1/project/`, newData)
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
      title="Projekte"
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
