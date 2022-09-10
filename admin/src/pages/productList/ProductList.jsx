import "./productList.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { getProducts, deleteProduct } from "../../redux/apiCalls";
import { ToastContainer, toast } from "react-toastify";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isFetching, error } = useSelector((state) => state.product);
  const [selectionChange, setSelectionChange] = useState([]);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleSelectionChange = (e) => {
    setSelectionChange(e);
  };

  const handleDelete = (id) => {
    deleteProduct(dispatch, id)
      .then(() => {
        toast.success("Item is deleted!");
      })
      .catch((err) => {
        toast.success("Something is wrong, please again!");
      });
  };

  const handleDeleteAllSelection = () => {
    selectionChange.forEach((item) => {
      deleteProduct(dispatch, item)
        .then(() => {
          toast.success("Item is deleted!");
          setSelectionChange([]);
        })
        .catch((err) => {
          toast.success("Something is wrong, please again!");
        });
    });
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 260 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <ToastContainer />
      {isFetching ? (
        <div className="loading" style={{ height: "100%" }}>
          Loading...
        </div>
      ) : error ? (
        <div className="error" style={{ height: "100%" }}>
          Something is wrong
        </div>
      ) : (
        <>
          {selectionChange.length > 0 && (
            <button
              onClick={handleDeleteAllSelection}
              className="productListDeleteSelection"
            >
              Delete
            </button>
          )}
          <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            rowsPerPageOptions={[8]}
            onSelectionModelChange={(e) => handleSelectionChange(e)}
            checkboxSelection
          />
        </>
      )}
    </div>
  );
};

export default ProductList;
