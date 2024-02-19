import { FieldArray } from "formik";
import { responseAPI } from "../../../data";

function AllNoCategory({
  values,
  handleSelectAll,
  setFieldValue,
  noCategoryItems,
}) {
  return (
    <>
      <FieldArray name="SelectedNoCategoryItems">
        {({ push, remove }) => {
          return (
            <>
              <label htmlFor="no-category" className="categoryHead">
                <input
                  type="checkbox"
                  id="no-category"
                  name="noCategory"
                  checked={values.selectAllNoCategory}
                  onChange={(e) =>
                    handleSelectAll(
                      e,
                      "",
                      setFieldValue,
                      "selectAllNoCategory",
                      "SelectedNoCategoryItems"
                    )
                  }
                />{" "}
                {null}
              </label>
              {noCategoryItems.map((item) => {
                return (
                  item.name && (
                    <div key={item.id}>
                      <label htmlFor={item.id} className="categoryChildren">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                              push(item.id);
                            } else {
                              const idx =
                                values.SelectedNoCategoryItems.indexOf(item.id);
                              remove(idx);
                              setFieldValue("selectAllNoCategory", false);
                            }
                          }}
                          checked={values.SelectedNoCategoryItems.includes(
                            item.id
                          )}
                          id={item.id}
                          name="noCategory"
                          value={item.id}
                        />{" "}
                        {item.name}
                      </label>
                    </div>
                  )
                );
              })}
            </>
          );
        }}
      </FieldArray>
    </>
  );
}
export default AllNoCategory;
