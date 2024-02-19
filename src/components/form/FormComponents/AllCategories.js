import { FieldArray } from "formik";
import { responseAPI } from "../../../data";

function AllCategories({
  values,
  uniqueCategories,
  handleSelectAll,
  setFieldValue,
}) {
  return (
    <>
      {/* Items with unique categories */}
      {uniqueCategories.map((cat, idx) => {
        return (
          <FieldArray
            className="category"
            id="category"
            key={idx}
            name="SelectedCategoriesItems"
          >
            {({ push, remove }) => {
              return (
                <>
                  <label htmlFor={cat} className="categoryHead">
                    <input
                      type="checkbox"
                      id={cat}
                      name={cat}
                      checked={values.selectAllBracelets}
                      onChange={(e) =>
                        handleSelectAll(
                          e,
                          cat,
                          setFieldValue,
                          `selectAll${cat}`,
                          "SelectedCategoriesItems"
                        )
                      }
                    />{" "}
                    {cat}
                  </label>
                  <div>
                    {responseAPI.map((item) =>
                      item.category && item.category.name === cat ? (
                        <div key={item.id}>
                          <label htmlFor={item.id} className="categoryChildren">
                            <input
                              type="checkbox"
                              id={item.id}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                if (checked) {
                                  push(item.id);
                                } else {
                                  const idx =
                                    values.SelectedCategoriesItems.indexOf(
                                      item.id
                                    );
                                  remove(idx);
                                  setFieldValue(`selectAll${cat}`, false);
                                }
                              }}
                              checked={
                                values.SelectedCategoriesItems.length > 0
                                  ? values.SelectedCategoriesItems.includes(
                                      item.id
                                    )
                                  : false
                              }
                              name="SelectedCategoriesItems"
                              value={item.id}
                            />{" "}
                            {item.name}
                          </label>
                        </div>
                      ) : null
                    )}
                  </div>
                </>
              );
            }}
          </FieldArray>
        );
      })}
    </>
  );
}
export default AllCategories;
