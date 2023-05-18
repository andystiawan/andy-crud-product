import React, { useState, useEffect } from "react";
import "./Home.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { deleteProducts, getProducts, getUser } from "../../network/services";
import Loading from "../../component/Loading/Loading";
import AddProduct from "../../component/AddProduct/AddProduct";
import { SuccessAlert } from "../../component/Alert/Alert";

export default function Homes() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [productList, setProductList] = useState([]);
  const [profileName, setprofileName] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const initialState = {
    success: false,
    message: "",
  };
  const editState = {
    edit: false,
    data: null,
  };
  const [isEdit, setisEdit] = useState(editState);
  const [alert, setAlert] = useState(initialState);
  const navigate = useNavigate();
  const productsPerPage = 5;

  // Fetch product data from API
  useEffect(() => {
    const fetchData = async () => {
      setisLoading(true);
      await getProducts
        .then((response) => {
          setProductList([...response.data.data]);
        })
        .catch((error) => {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            navigate("/Login", { replace: true });
          }
        });
      await getUser
        .then((response) => {
          setprofileName(response.data.username);
        })
        .catch((error) => {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            navigate("/Login", { replace: true });
          }
        });
      setisLoading(false);
    };
    fetchData();
  }, [navigate]);

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter products based on search query
  const filteredProducts = currentProducts?.filter(
    (product) =>
      product?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product?.purchasePrice?.toString().includes(searchQuery) ||
      product?.sellingPrice?.toString().includes(searchQuery) ||
      product?.stock?.toString().includes(searchQuery)
  );

  //Add Product Modal
  const handleAddProduct = async (reload = false) => {
    setAddProduct(!addProduct);

    if (reload === true) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  //Delete Product
  const handleDeleteProduct = async (id) => {
    const result = await deleteProducts(id).then((res) => res);
    if (result) {
      handlerAlert("success", "Data Berhasil Dihapus !");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  //Edit Product
  const handleUpdateProduct = (item) => {
    console.log(item);
    setisEdit({
      ...isEdit,
      edit: true,
      data: item,
    });

    setAddProduct(!addProduct);
  };

  //Alert
  const handlerAlert = (type, message) => {
    setAlert({
      ...alert,
      [type]: true,
      message: message,
    });

    setTimeout(() => {
      setAlert({
        ...alert,
        [type]: false,
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="home-container">
      <h2 className="profile-name">{profileName}</h2>
      <div className="product-list">
        <div className="d-flex justify-content-between">
          <h3>Product List</h3>
          <input
            type={"search"}
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Foto Barang</th>
              <th>Nama Barang</th>
              <th>Harga Beli</th>
              <th>Harga Jual</th>
              <th>Stok</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      className="product-image"
                      src={`data:image/png;base64,${product.photo}`}
                      alt={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.purchasePrice}</td>
                  <td>{product.sellingPrice}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateProduct(product)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <h5 className="text-center">Tidak ada data product</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination">
          {currentPage > 1 && (
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
          )}

          {Array.from(
            { length: Math.ceil(productList.length / productsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                className={`pagination-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            )
          )}

          {currentPage < Math.ceil(productList.length / productsPerPage) && (
            <button
              className="pagination-button"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="add-product-container">
        <button
          className="add-product-button"
          onClick={() => setAddProduct(!addProduct)}
        >
          Add Product
        </button>
      </div>
      <Loading isLoading={isLoading} />
      {addProduct && (
        <AddProduct
          data={isEdit.data}
          edit={isEdit.edit}
          setLoading={(e) => setisLoading(e)}
          toggleModal={handleAddProduct}
          open={addProduct}
          success={() => handlerAlert("success", "Data Berhasil Ditambahkan !")}
        />
      )}
      {alert.success && <SuccessAlert message={alert.message} />}
    </div>
  );
}
