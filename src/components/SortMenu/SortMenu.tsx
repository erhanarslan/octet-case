import React, { useState, useEffect } from "react";
import "./SortMenu.css";

interface SortMenuProps {
  setSortBy: (value: string) => void;
  setFilterBy: (value: string) => void;
  sortBy: string;
  filterBy: string;
}

const SortMenu = ({
  setSortBy,
  setFilterBy,
  sortBy,
  filterBy,
}: SortMenuProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleSortMenu = () => {
    setIsSortOpen(!isSortOpen);
    if (isFilterOpen) setIsFilterOpen(false);
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
    if (isSortOpen) setIsSortOpen(false);
  };

  const handleSortSelect = (value: string) => {
    setSortBy(value);
    setIsSortOpen(false);
  };

  const handleFilterSelect = (value: string) => {
    setFilterBy(value);
    setIsFilterOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".sort-filter-container")) {
        setIsSortOpen(false);
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort-filter-container">
      <div className="sort-section">
        <button onClick={toggleSortMenu} className="sort-button">
          <img src="assets/images/sort.png" alt="sort" />
          {sortBy !== "name" && <span className="notification-dot"></span>}
        </button>
        {isSortOpen && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => handleSortSelect("name")}
            >
              Film Adı
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleSortSelect("year")}
            >
              Yayın Yılı
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleSortSelect("imdb")}
            >
              IMDB Puanı
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <button onClick={toggleFilterMenu} className="filter-button">
          <img src="assets/images/filter.png" alt="filter" />
          {filterBy !== "all" && <span className="notification-dot"></span>}
        </button>
        {isFilterOpen && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => handleFilterSelect("all")}
            >
              Yeni Eklenenler
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleFilterSelect("favorites")}
            >
              Favorileri Göster
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortMenu;
