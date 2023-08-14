import React from "react";
import Sidebar from "../components/Sidebar";
import SubCategoriesList from "./categories/SubCategoryList";
import "../assets/styles/styles.css";

const SubCategories = () => {
  return (
    <div className="dashboardMainDiv1">
      <div className="dashboardMainDiv">
        <div className="allContent">
          <div className="sidebarMenu">
            <Sidebar />
          </div>
          <div className="categoryBody">
            <div className="categoriesList">
              <SubCategoriesList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
