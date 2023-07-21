import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import CategoriesList from "./categories/CategoryList";
import CategoryForm from "./categories/CategoryForm";
import { addCategory } from "../state/categorySlice";
import axios from "axios";
import { fetchUserClients } from "./clients/fetchClients";
import { addClient } from "../state/clientSlice";
import { GENERAL_URL } from "../state/url";
import "../assets/styles/styles.css";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${GENERAL_URL}/categories`);
      const { success, categories } = response.data;
      if (success) {
        dispatch(addCategory(categories));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserClientData = async () => {
      const clientData = await fetchUserClients();
      dispatch(addClient(clientData));
    };

    fetchUserClientData();
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="dashboardMainDiv">
      <div className="sidebarMenu">
        <Sidebar />
      </div>
      <div className="categoryBody">
        <div className="categoryForm">
          <CategoryForm />
        </div>
        <div className="categoriesList">
          <CategoriesList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
