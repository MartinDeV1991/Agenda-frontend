
const CategoryLegend = ({ colorCodes }) => {

    return (
        <div className="category-legend">
            Category Color Legend
            {Object.keys(colorCodes).map((category) => (
                <div
                    key={category}
                    className="category-legend-item"
                    style={{ 
                        backgroundColor: colorCodes[category],
                        border: `1px solid rgb(0, 0, 0, 0.1)`,
                    }}
                >
                    {category}
                </div>
            ))}
        </div>
    )
}

export default CategoryLegend;