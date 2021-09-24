function SearchBar({ search, setSearch, sortCategory, setSortCategory, categories, sortOther, setSortOther, type }){
 
    function handleSearch(e){
        setSearch(e.target.value)
    }
    function handleSetCategory(e){
        setSortCategory(e.target.value)
    }
    function handleSetOther(e){
        setSortOther(e.target.value)
    }

    // function handlePriceSort(){
    //     setSortPrice(!sortPrice)
    // }

    return(
        <div className="searchbar">
            <label htmlFor="search">Search:</label>
            <input type="text" id="search" placeholder="Search..."
            value={search} onChange={handleSearch}/>
            <label htmlFor="searchbar-dropdown-category">Sort by Category:</label>
                <select type="dropdown" id="searchbar-dropdown-category" onChange={handleSetCategory}>
                <option value="All">All</option>
                {categories.length > 1 && categories.map((category) => {
                    return <option key={category.category_name} value={category.category_name}>{category.category_name}</option>
                })}
            </select>
            {type === "events" ? 
            <div>
            <label htmlFor="searchbar-dropdown-severity">Sort by Severity:</label>
            <select type="dropdown" id="searchbar-dropdown-severity" onChange={handleSetOther}>
                <option value="All">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            </div>
            :
            <div>
            <label htmlFor="searchbar-dropdown-provider">Sort by Provider:</label>
            <select type="dropdown" id="searchbar-dropdown-provider"
            // onChange={handleSetProvider}
            >
            </select>
            </div>
        }
         </div>   
    )
}
export default SearchBar;