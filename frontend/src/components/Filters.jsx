import React from "react";

const Filters = ({filters, setFilters}) => {
    const applianceOptions = ["Oven", "Microwave", "Stovetop", "Air Fryer", "Slow Cooker"];
    const dietOptions = ["Vegetarian", "Vegan", "Pescetarian", "Gluten-Free", "Dairy-Free", "High Protein"];
    
    const handleApplianceChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFilters({ ...filters, appliances: selectedOptions });
    };
        
    const handleDietChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setFilters({ ...filters, diet: selectedOptions });
    };

    return (
        <div>
            <input
                type="number"
                placeholder="Max Cook Time (minutes)"
                value={filters.cookTime}
                onChange={(e) => setFilters({ ...filters, cookTime: e.target.value })}
             />
            <label>Cooking Appliances:</label>
            <select multiple value={filters.appliances} onChange={handleApplianceChange}>
                {applianceOptions.map((appliance) => (
                    <option key={appliance} value={appliance}>{appliance}</option>
                ))}
            </select>
            <label>Dietary Restrictions:</label>
            <select multiple value={filters.diet} onChange={handleDietChange}>
                <option value="">NONE</option>
                {dietOptions.map((diet) => (
                    <option key={diet} value={diet}>{diet}</option>
                ))}
        </select> 
      </div>
    );
};

export default Filters;