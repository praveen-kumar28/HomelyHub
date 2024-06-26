import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";

const FilterModal = ({selectedFilters, onFilterChange,  onClose}) => {
  const [priceRange, setPriceRange] = useState({
    min : selectedFilters.priceRange?.min || 600,
    max : selectedFilters.priceRange?.max || 30000,
  });

  const [propertyType, setPropertyType] = useState(
    selectedFilters.propertyType || ""
  );

  const [roomType, setRoomType] = useState(selectedFilters.roomType || "");
  const [amenities, setAmenities] = useState(selectedFilters.amenities || [] );

  useEffect(() => {
    setPriceRange({
      min : selectedFilters.priceRange?.min || 600,
      max : selectedFilters.priceRange?.max || 30000,
    })
  
  setPropertyType(selectedFilters.propertyType || "");
  setRoomType(selectedFilters.roomType || "");
  setAmenities(selectedFilters.amenities || []);
}, [selectedFilters]);

  //Function to handle changes in price range.
  const handlePriceRangeChange =(value) => {
    setPriceRange(value) //It will update the price range state.
  }

  //Function to change 
  const handleMinInputChange = (e) =>{
    const minValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({...prev, min: minValue}));
  };

  const handleMaxInputChange =(e) => {
    const maxValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({...prev, max: maxValue})); 
  };


  const handleFilterChange= () => {
    onFilterChange("minPrice", priceRange.min);
    onFilterChange("maxPrice", priceRange.max);
    onFilterChange("propertyType", propertyType);
    onFilterChange("roomType", roomType);
    onFilterChange("amenities", amenities);
    onClose(); //Closes the modal.
  };

  //Option for property types.
   const propertyTypeOptions =[
    {
      value :"House",
      label: "House",
      icon: "home",
    },
    {
     value:"Flat",
     label:"Flat",
     icon: "apartment",
    },
    {
     value:"Guest House",
     label:"Guest House",
     icon: "hotel",
    },
    {
     value: "Hotel",
     label:"Hotel",
     icon: "meeting_room",
    },
   ];

   //Option for room types

   const roomTypesOptions = [
    {
      value : "Entire Room",
      label: "Entire Room",
      icon: "hotel",
    },
    {
      value: "Room",
      label: "Room",
      icon: "meeting_room" ,
    },
    {
      value: "AnyType",
      label: "AnyType",
      icon: "apartment",
    },
  ];

  //Options for amenities.

  const amenitiesOptions = [
    {
      value: "Wifi",
      label: "Wifi",
      icon: "wifi",
    },
    {
      value: "Kitchen",
      label: "Kitchen",
      icon: "kitchen",
    },
    {
      value: "Ac",
      label: "AC",
      icon: "ac_unit",
    },
    {
      value: "Washing Machine",
      label: "Washing Machine",
      icon: "local_laundry_service",
    },
    {
      value: "Tv",
      label: "Tv",
      icon: "tv",
    },
    {
      value: "Pool",
      label: "Pool",
      icon: "pool",
    },
    {
      value: "Free Parking",
      label: "Free Parking",
      icon: "local_parking",
    },
  ];

  //Function to handle clearing filters.

  const handleClearFilters = () => {
    setPriceRange({min: 600, max: 30000}) //reset the price range.
    setPropertyType("");
    setRoomType("");
    setAmenities([]);
  };
  
  //Function to handle changes in amenities.

  const handleAmenitiesChange  = (selectedAmenity) => {
    setAmenities((prevAmenities) => prevAmenities.includes(selectedAmenity)? prevAmenities.filter((item)=> 
    item!== selectedAmenity): [...prevAmenities, selectedAmenity]
    );
  };

  //Function to handle changes in property type.

  const handlePropertyTypeChange = (selectedType) => {
    setPropertyType((prevType) => 
     prevType === selectedType ? "" : selectedType
    );
  };

  //Function to handle changes in room type.

  const handleRoomTypeChange = (selectedType) => {
    setRoomType((prevType) =>
     prevType === selectedType ? "" : selectedType
     );
   };

  return (
    <div class="modal-backdrop">
      <div class="modal-content">
        <h4>
          Filters <hr/>
        </h4>
        <button className="close-button" onClick={onClose}>
          <span>&times;</span>
        </button>

        {/* Filter sections */}
        <div className="modal-filters-container">
          <div className="filter-section">
            <label>Price Range:</label>
            <InputRange
             minValue={600}
             maxValue={30000}
             value={priceRange}
             onChange={handlePriceRangeChange}
             />
             <div className="range-inputs">
              <input
               type="number"
               value={priceRange.min}
               onChange={handleMinInputChange} 
              />
              <span>-</span>
              <input
               type="number"
               value={priceRange.max}
               onChange={handleMaxInputChange}
              />
            </div>
          </div>
           {/* Property Type Filter */}
           <div className="filter-section">
            <label>Property Type:</label>
            <div className="icon-box">
              {propertyTypeOptions.map((option) =>(
                <div 
                  key={option.value}
                className={`selectable-box ${propertyType === option.value ? "selected" : ""}`}
                onClick={ () => handlePropertyTypeChange(option.value)}
                >
                  <span className="material-icons">{option.icon}</span>
                  <span>{option.label}</span>
                  </div>
              ))}
            </div>
           </div>
           {/*Room Type Filters. */}
            <div className="filter-section">
              <label>Room Type:</label>
              <div className="icon-box">
                {roomTypesOptions.map((option) => (
                  <div 
                  key ={option.value}
                  className={`selectable-box ${
                    roomType === option.value ? "selected" : ""
                  }`}
                  onClick={ () => handleRoomTypeChange(option.value)}
                  >
                    <span className="material-icons">{option.icon}</span>
                    <span>{option.label}</span>
                  </div> 
                ))}
              </div>
            </div>
            {/* Amenities Filter.  */}
            <div  className="filter-section">
              <label>Amenities</label>
              <div className="amenities-checkboxes">
                {amenitiesOptions.map((option) => (
                  <div key={option.value} className="amenity-checkbox">
                    {console.log(amenities.includes(option.value))}
                    <input
                    type="checkbox"
                    value={option.value}
                    checked={amenities.includes(option.value)}
                    onChange={() =>
                    handleAmenitiesChange(option.value)}
                    />
                    <span className="material-icons amenitieslabel">{option.icon}</span>
                    <span>{option.label}</span>
                    </div>
                ))}
              </div>
            </div>
             {/* Filter Action Button */}
             <div className="filter-buttons">
              <button className="clear-button" onClick={handleClearFilters}>
                Clear
                </button>
                <button onClick={handleFilterChange}>Apply Filters</button>
             </div>
        </div>
      </div>
    </div>
  );
};

FilterModal.propTypes ={
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}; 

export default FilterModal;