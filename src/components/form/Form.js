import { useState } from "react";
import { responseAPI } from "../../data";
import { Form, Formik, Field } from "formik";
import { CiSearch } from "react-icons/ci";
import {
  filterCategories,
  filterItemsWithoutCategory,
  handleAllRadio,
  handleSelectAll,
} from "../../utils";
import AllCategories from "./FormComponents/AllCategories";
import AllNoCategory from "./FormComponents/AllNoCategory";

function FormMain() {
  // iterating over response and filtering out categories.
  const itemsWithCategories = filterCategories(responseAPI);

  // Removing duplicate categories
  const allCategories = [...new Set(itemsWithCategories)];

  // getting all items without category
  const itemsWithoutCategory = filterItemsWithoutCategory(responseAPI);

  const initialValues = {
    Name: "",
    PercentageInNumbers: 0,
    ApplyToItems: "",
    SearchItems: "",
    SelectedCategoriesItems: [],
    SelectedNoCategoryItems: [],
    selectAllNoCategory: false,
  };

  // Dynamically add categories all select checkbox boolean state to the initialValues object
  allCategories.every((cat) => {
    initialValues[`selectAll${cat}`] = false;
  });

  const [uniqueCategories] = useState(allCategories);
  const [noCategoryItems] = useState(itemsWithoutCategory);

  return (
    <div className="formContainer">
      <h1>Add Task</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(data, { setSubmitting }) => {
          // async api call on submit function
          setSubmitting(true);
          const applicable_items = [
            ...data.SelectedCategoriesItems,
            ...data.SelectedNoCategoryItems,
          ];

          console.log({
            applicable_items,
            applied_to: data.ApplyToItems,
            name: data.Name,
            rate: Number(data.PercentageInNumbers) / 100,
          });
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, handleSubmit, setFieldValue, errors }) => (
          <Form onSubmit={handleSubmit} className="mainForm">
            <div className="formTop">
              <div className="textInputs">
                <Field type="text" name="Name" value={values.Name} />

                <div className="percentContainer">
                  <Field
                    type="number"
                    name="PercentageInNumbers"
                    min={0}
                    max={100}
                    value={values.PercentageInNumbers}
                  />
                  <span className="percentSign">%</span>
                </div>
              </div>
              <div className="radioBtnsContainer">
                <label htmlFor="ApplyToAllItems">
                  <Field
                    type="radio"
                    id="ApplyToAllItems"
                    name="ApplyToItems"
                    onClick={(e) =>
                      handleAllRadio(
                        e,
                        setFieldValue,
                        "SelectedCategoriesItems",
                        "SelectedNoCategoryItems"
                      )
                    }
                    value={"All"}
                  />
                  Apply to all items in collection
                </label>

                <label htmlFor="ApplyToSpecificItems">
                  <Field
                    type="radio"
                    id="ApplyToSpecificItems"
                    checked={values.ApplyToItems === "Some" && true}
                    onClick={(e) =>
                      handleAllRadio(
                        e,
                        setFieldValue,
                        "SelectedCategoriesItems",
                        "SelectedNoCategoryItems"
                      )
                    }
                    name="ApplyToItems"
                    value={"Some"}
                  />
                  Apply to specific items
                </label>
              </div>
            </div>
            <div className="formBody">
              <div className="searchContainer">
                <button className="searchBtn">
                  <CiSearch />
                </button>
                <Field
                  type="text"
                  id="SearchItems"
                  name="SearchItems"
                  placeholder="Search Items"
                  value={values.SearchItems}
                />
              </div>

              <div className="collectionContainer">
                {/* Items with unique categories */}
                <AllCategories
                  values={values}
                  uniqueCategories={uniqueCategories}
                  handleSelectAll={handleSelectAll}
                  setFieldValue={setFieldValue}
                />

                {/* All the items without any category */}
                <AllNoCategory
                  values={values}
                  handleSelectAll={handleSelectAll}
                  setFieldValue={setFieldValue}
                  noCategoryItems={noCategoryItems}
                />
              </div>
              {/* Submit button */}
              <button disabled={isSubmitting} type="submit">
                {values.SelectedCategoriesItems.length > 0 ||
                values.SelectedNoCategoryItems.length > 0
                  ? `Apply Tax to ${
                      values.SelectedCategoriesItems.length +
                      values.SelectedNoCategoryItems.length
                    } Items`
                  : "Select Item"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default FormMain;
