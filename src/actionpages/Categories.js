import React from "react";
import Sidebar from "../components/Sidebar";
import CategoriesList from "./categories/CategoryList";
import CategoryForm from "./categories/CategoryForm";
import "../assets/styles/styles.css";

const Categories = () => {
  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="categoryBody">
            <div className="categoryForm">
              <CategoryForm />
            </div>
            <div className="categoriesList">
              <CategoriesList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
