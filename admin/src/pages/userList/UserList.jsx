import "./userList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import { deleteUser, getUsers } from "./../../redux/apiCalls/userApiCalls";
import Loading from "../../components/loading/Loading";

const UserList = () => {
  const dispatch = useDispatch();

  const { users, isFetching, error } = useSelector((state) => state.user);

  const [selectionChange, setSelectionChange] = useState([]);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleSelectionChange = (e) => {
    setSelectionChange(e);
  };

  const handleDelete = (id) => {
    deleteUser(dispatch, id)
      .then(() => {
        toast.success("User is deleted!");
      })
      .catch((err) => {
        toast.success("Something is wrong, please again!");
      });
  };

  const handleDeleteAllSelection = () => {
    selectionChange.forEach((item) => {
      deleteUser(dispatch, item)
        .then(() => {
          toast.success("User is deleted!");
          setSelectionChange([]);
        })
        .catch((err) => {
          toast.success("Something is wrong, please again!");
        });
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "User",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <button className={`userStatusButton ${params.row.status}`}>
            {params.row.status}
          </button>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  error && toast.error("Something is wrong");
  return (
    <div className="userList">
      <ToastContainer />
      {selectionChange.length > 0 && (
        <button
          onClick={handleDeleteAllSelection}
          className="productListDeleteSelection"
        >
          Delete
        </button>
      )}
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        onSelectionModelChange={(e) => handleSelectionChange(e)}
      />
      {isFetching && <Loading />}
    </div>
  );
};

export default UserList;
