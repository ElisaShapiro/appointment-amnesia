function SearchBar({ search, setSearch, categories, setSortCategory, sortOther, setSortOther, type }){
 
    function handleSearch(e){
        setSearch(e.target.value)
    }
    function handleSetCategory(e){
        setSortCategory(e.target.value)
    }
    function handleSetOther(e){
        setSortOther(e.target.value)
    }

    return(
        <div className="searchbar" style={{backgroundColor: "purple"}}>
            {type === "events" ? 
                <div>
                    <label htmlFor="search">Search:</label>
                    <input type="text" id="search" placeholder="Search events..." 
                    value={search} onChange={handleSearch}/>
                </div>
            : null}
            <label htmlFor="dropdown-category">Sort by Category:</label>
            <select type="dropdown" id="dropdown-category" onChange={handleSetCategory}>
                <option value="All">All</option>
                {categories.length > 0 && categories.map((category) => {
                    return <option key={category.category_name} value={category.category_name}>
                        {category.category_name}</option>
                })}
            </select>
            {type === "events" ? 
                <div>
                    <label htmlFor="dropdown-severity">Sort by Severity:</label>
                    <select type="dropdown" id="dropdown-severity" onChange={handleSetOther}>
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
                <select type="dropdown" id="searchbar-dropdown-provider" onChange={handleSetOther}>
                    <option value="All">All</option>
                    {sortOther.length > 0 && sortOther.map((provider) => {
                        return <option key={provider.provider_name} value={provider.provider_name}>
                            {provider.provider_name}</option>
                    })} 
                </select>
            </div>}
        </div>   
    )
}
export default SearchBar;