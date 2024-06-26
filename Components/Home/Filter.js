import React, { useEffect, useState }from "react";
import FilterModal from "./FilterModal";
import { useDispatch } from "react-redux";
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";

const Filter = () => {
  //State for controlling modal visibility.
  const [isModalOpen, setIsModalOpen] = useState(false);
  //State for storing selected filters.
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(propertyAction.updateSearchParams(selectedFilters));
    dispatch(getAllProperties());
  }, [selectedFilters, dispatch]);


  //Funtion to handle opening the modal/popupwindow.
  const handleOpenModal = () => {
      setIsModalOpen(true); //Sets isModalOpen to true to open the modal.
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); //sets isModalOpen to false to close the modal.
  }
   
  //
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
    ...prevFilters,
    [filterName]: value,
  }))
};
  return (
   <>
   <span class="material-symbols-outlined" onClick={handleOpenModal}>
    tune
   </span>
   {isModalOpen && (
     <FilterModal
       selectedFilters={selectedFilters}
       onFilterChange={handleFilterChange}
       onClose={handleCloseModal}
      />
   )}
   
   
   </>
  );
};

export default Filter;