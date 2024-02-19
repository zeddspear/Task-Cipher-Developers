import { responseAPI } from "./data";

const noCategoryItems = filterItemsWithoutCategory(responseAPI);

export function filterCategories(responseAPI) {
  return responseAPI
    .map((item) => (item.category ? item.category.name : null))
    .filter((category) => category !== null);
}

export function filterItemsWithoutCategory(responseAPI) {
  return responseAPI.map((item) => !item.category && item);
}

export const handleSelectAll = function (
  e,
  cat,
  setFieldValue,
  selectAllCheckboxRef,
  selectedItemsArrayRef
) {
  if (cat !== "") {
    if (e.target.checked) {
      setFieldValue(selectAllCheckboxRef, true);
      // If the main checkbox is checked, select all checkboxes
      const allCheckboxes = responseAPI
        .map((item) => item.category && item.category.name === cat && item.id)
        .filter((item) => item !== undefined);

      setFieldValue(selectedItemsArrayRef, allCheckboxes);
    } else {
      // If the main checkbox is unchecked, deselect all checkboxes
      setFieldValue(selectedItemsArrayRef, []);
      setFieldValue(selectAllCheckboxRef, false);
    }
  } else {
    if (e.target.checked) {
      setFieldValue(selectAllCheckboxRef, true);
      // If the main checkbox is checked, select all checkboxes
      const allCheckboxes = noCategoryItems
        .map((item) => item.id)
        .filter((item) => item !== undefined);

      setFieldValue(selectedItemsArrayRef, allCheckboxes);
    } else {
      // If the main checkbox is unchecked, deselect all checkboxes
      setFieldValue(selectedItemsArrayRef, []);
      setFieldValue(selectAllCheckboxRef, false);
    }
  }
};

export const handleAllRadio = function (
  e,
  setFieldValue,
  SelectedCategoriesItems,
  SelectedNoCategoryItems
) {
  const categories = [...new Set(filterCategories(responseAPI))];

  if (e.target.value === "All") {
    let allAvailableCategoriesItems = categories
      .map((cat) => {
        return responseAPI.map((item) => {
          return item.category && item.category.name === cat ? item.id : null;
        });
      })[0]
      .filter((item) => item !== null);

    setFieldValue(SelectedCategoriesItems, allAvailableCategoriesItems);
    setFieldValue(
      SelectedNoCategoryItems,
      noCategoryItems
        .map((item) => item.id)
        .filter((item) => item !== undefined)
    );

    categories.forEach((cat) => {
      setFieldValue(`selectAll${cat}`, true);
    });
    setFieldValue("selectAllNoCategory", true);

    document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
      checkbox.disabled = true;
    });
  } else {
    document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
      checkbox.disabled = false;
    });

    setFieldValue(SelectedCategoriesItems, []);
    setFieldValue(SelectedNoCategoryItems, []);
    categories.forEach((cat) => {
      setFieldValue(`selectAll${cat}`, false);
    });
    setFieldValue("selectAllNoCategory", false);
  }
};
