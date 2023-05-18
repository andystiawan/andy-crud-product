import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./AddProduct.css";
import { postProducts } from "../../network/services";
import { editProducts } from "../../network/services";

const AddProduct = ({ toggleModal, open, setLoading, success, data, edit }) => {
  const [productName, setProductName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState("");

  useEffect(() => {
    console.log("data", data);
    if (data && edit) {
      setProductName(data.name);
      setPurchasePrice(data.purchasePrice);
      setSellingPrice(data.sellingPrice);
      setImage(data.photo);
      setStock(data.stock);
    }
  }, [data, edit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (productName && purchasePrice && sellingPrice && stock && image) {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("purchasePrice", purchasePrice);
      formData.append("sellingPrice", sellingPrice);
      formData.append("stock", stock);
      formData.append("photo", image);
      if (data && edit) {
        await editProducts(data._id, formData);
      } else {
        await postProducts(formData);
      }
      success();
    }

    setProductName("");
    setPurchasePrice("");
    setSellingPrice("");
    setStock("");
    setImage(null);

    // await postProducts()
    toggleModal(true);
    setLoading(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("image", file);
    if (file) {
      // Check file format
      const allowedFormats = ["image/jpeg", "image/png"];
      const isValidFormat = allowedFormats.includes(file.type);
      if (!isValidFormat) {
        alert("Only JPG and PNG formats are allowed.");
        clearFileInput("image");
        setImage(null);
        return;
      }

      // Check file size
      const maxSizeInBytes = 100 * 1024; // 100KB
      if (file.size > maxSizeInBytes) {
        alert("File size exceeds the maximum limit of 100KB.");
        clearFileInput("image");
        setImage(null);
        return;
      }
      setImage(file);
    }
  };

  const clearFileInput = (id) => {
    const form = document.getElementById(id);
    if (form) {
      form.value = "";
    }
  };

  return (
    <Modal isOpen={open} toggle={toggleModal} className="add-product-modal">
      <form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggleModal} className="modal-header">
          Add Product
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="productName">Nama Produk</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nama Produk"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="purchasePrice">Harga Beli</label>
            <input
              type="number"
              id="purchasePrice"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(e.target.value)}
              placeholder="Harga Beli"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sellingPrice">Harga Jual</label>
            <input
              type="number"
              id="sellingPrice"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              placeholder="Harga Jual"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stok</label>
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stok"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Foto Barang</label>
            <input
              type="file"
              id="image"
              accept="image/jpeg, image/png"
              onChange={handleImageUpload}
              className="form-control-file"
              required
            />
            {image && (
              <img
                alt="gambar"
                className="image"
                src={
                  typeof image === "string"
                    ? `data:image/png;base64,${image}`
                    : window.URL.createObjectURL(image)
                }
              />
            )}
          </div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button color="primary" type="submit">
            Save
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default AddProduct;
