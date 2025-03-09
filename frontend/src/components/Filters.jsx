import React from "react";

const Filters = ({filters, setFilters}) => {
    const applianceOptions = ["oven", "microwave", "stove", "airfryer", "slow cooker"];
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
        <div className="filters-container">
            <div className="filter-group">
                <label htmlFor="cookTime">Max Cook Time (minutes):</label>
                <input
                    id="cookTime"
                    type="number"
                    placeholder="Max Cook Time (minutes)"
                    value={filters.cookTime}
                    onChange={(e) => setFilters({ ...filters, cookTime: e.target.value })}
                />
            </div>
            
            <div className="filter-group">
                <label htmlFor="appliances">Cooking Appliances:</label>
                <select 
                    id="appliances"
                    multiple 
                    value={filters.appliances} 
                    onChange={handleApplianceChange}
                >
                    {applianceOptions.map((appliance) => (
                        <option key={appliance} value={appliance}>{appliance}</option>
                    ))}
                </select>
                <small>(Hold Ctrl/Cmd to select multiple)</small>
            </div>
            
            <div className="filter-group">
                <label htmlFor="diet">Dietary Restrictions:</label>
                <select 
                    id="diet"
                    multiple 
                    value={filters.diet} 
                    onChange={handleDietChange}
                >
                    {dietOptions.map((diet) => (
                        <option key={diet} value={diet}>{diet}</option>
                    ))}
                </select>
                <small>(Hold Ctrl/Cmd to select multiple)</small>
            </div>
        </div>
    );
};

export default Filters;