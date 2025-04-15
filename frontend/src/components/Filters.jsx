import React from "react";

const Filters = ({filters, setFilters}) => {
    const applianceOptions = ["Oven", "Microwave", "Stove", "Airfryer", "Slow Cooker"];
    const dietOptions = ["Vegetarian", "Vegan", "Pescetarian", "Gluten-Free", "Dairy-Free", "High Protein"];
    
    const handleApplianceChange = (appliance) => {
        const updatedAppliances = filters.appliances.includes(appliance)
	      ? filters.appliances.filter((item) => item != appliance)
	      : [...filters.appliances, appliance];
	setFilters({...filters, appliances: updatedAppliances});
    };
        
    const handleDietChange = (diet) => {
        const updatedDiet = filters.diet.includes(diet)
	      ? filters.diet.filter((item) => item != diet)
	      : [...filters.diet, diet];
        setFilters({...filters, diet: updatedDiet});
    };

    return (
        <div className="filters-container">            
            <div className="filter-group">
                <label className="appliances">Cooking Appliances:</label>
		<p>Select appliances you wish to use</p>
                <div className="checkbox-group">
		    {applianceOptions.map((appliance, index) => (
			<div key={index} className="checkbox-item">
			    <label className="custom-checkbox">
				<input
				    type="checkbox"
				    checked={filters.appliances.includes(appliance)}
				    onChange={() => handleApplianceChange(appliance)}
				/>
				<span className="checkmark"></span>
				<span className="applianceName">{appliance}</span>
			    </label>
			</div>
		    ))}
		</div>
            </div>
            
            <div className="filter-group">
                <label className="diet">Dietary Restrictions:</label>
		<p>Select all that apply</p>
		<div className="checkbox-group">
                    {dietOptions.map((diet, index) => (
			<div key={index} className="checkbox-item">
			    <label className="custom-checkbox">
				<input
				    type="checkbox"
				    checked={filters.diet.includes(diet)}
				    onChange={() => handleDietChange(diet)}
				/>
				<span className="checkmark"></span>
				<span className="dietName">{diet}</span>
			    </label>
			</div>
                    ))}
                </div>
            </div>

	    
	</div>
    );
};

export default Filters;
