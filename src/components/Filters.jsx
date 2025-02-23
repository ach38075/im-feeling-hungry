import React from "react";

const Filters = ({filters, setFilters}) => {
    const applianceOptions = ["Oven", "Microwave", "Stovetop", "Air Fryer", "Slow Cooker"];
    const dietOptions = ["Vegetarian", "Vegan", "Pescetarian", "Gluten-Free", "Dairy-Free", "High Protein"];
    {/* these were just what I found to be the most relevant appliance and diet options, but Spoonacular has
        more to pick from, as well as other filter categories we can add here -- audrey */}

    return (
        <div>
            {/* here will be where we define and build the categories and update them according to user input */}
        </div>
    )
}

export default Filters;