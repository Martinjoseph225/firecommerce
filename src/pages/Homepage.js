import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { fireproducts } from "../firecommerce-products";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  //   async function addData() {
  //     try {
  //       await addDoc(collection(fireDB, "users"), {
  //         name: "Martin",
  //         age: 26,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  function addProductsData() {
    fireproducts.map(async (product) => {
      try {
        await addDoc(collection(fireDB, "products"), product);
      } catch (error) {
        console.log(error);
      }
    });
  }
  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const obj = { id: doc.id, ...doc.data() };
        productsArray.push(obj);
        setLoading(false);
      });
      //   console.log("test");
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="d-flex w-50 align-items-center my-3 justify-content-center">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="form-control mx-2"
            placeholder="search items"
          />
          <select
            name=""
            id=""
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
            className="form-control mt-3"
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="mobiles">Mobiles</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <div className="row">
          {products
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((product) => {
              return (
                <div className="col-md-4">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <p>{product.name}</p>
                      <div className="text-center">
                        <img
                          src={product.imageURL}
                          alt="image"
                          className="product-img"
                        />
                      </div>
                    </div>
                    <div className="product-actions">
                      <h2>{product.price} RS/-</h2>
                      <div className="d-flex">
                        <button
                          className="mx-2"
                          onClick={() => {
                            addToCart(product);
                          }}
                        >
                          Add To Cart
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/productinfo/${product.id}`);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
