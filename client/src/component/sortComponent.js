import React from "react";
const SortByCOMP = (props) => {
  return (
    <div className="row sortROW">
      <div className="col-3 offset-lg-2">
        <h5>Sort By</h5>
      </div>
      <div className="col-7">
        <select className="form-select" onChange={(e) => props.sortByFN(e)}>
          <option value="AtoZ">Alphabetically</option>
          <option value="ZtoA">Descending Order</option>
          <option value="created">Recently Created</option>
          <option value="updated">Last Edited</option>
        </select>
      </div>
    </div>
  );
};

export default SortByCOMP;
