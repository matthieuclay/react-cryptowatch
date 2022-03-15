import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setStableState } from "../actions/stable.action";
import { setListDisplay } from "../actions/list.action";

const TableFilters = () => {
  const [showStable, setShowStable] = useState(true);
  const [showFavList, setShowFavList] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStableState(showStable));
    dispatch(setListDisplay(showFavList));
  }, [showStable, showFavList]);

  return (
    <div className="table-filters">
      <div className="table-filters-container">
        <div className="stable-checkbox-container">
          <input
            type="checkbox"
            id="stableCoin"
            defaultChecked={true}
            onChange={() => setShowStable(!showStable)}
          />
          <label htmlFor="stableCoin">
            {showStable ? "With stable coin" : "Without stable coin"}
          </label>
        </div>
        <div
          className={showFavList ? "no-list-btn" : "no-list-btn active"}
          onClick={() => setShowFavList(false)}
        >
          <p>No list</p>
        </div>
        <div
          className={showFavList ? "fav-list active" : "fav-list"}
          onClick={() => setShowFavList(true)}
        >
          <p>Favorites list</p>
          <img src="./assets/star-full.svg" alt="icon star" />
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
