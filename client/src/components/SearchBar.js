import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

function SearchBar({ search, setSearch, categories, sortCategory, setSortCategory, sortOther, setSortOther, type }){
 
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
        <Container>
            <SearchSharpIcon />
            {type === "events" ? 
                <TextField
                    id="search"
                    label="search"
                    name="search"
                    value={search}
                    onChange={handleSearch}
                >
                </TextField>
            : null}
                <FormControl style={{minWidth: 120}}>
                    <InputLabel id="category-label">Sort By Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category"
                        label="Category"
                        name="category"
                        value={sortCategory.category_name}
                        onChange={handleSetCategory}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {categories.length > 0 && categories.map((category) => {
                            return (
                                <MenuItem key={category.category_name} value={category.category_name} name={category.category_name}>
                                    {category.category_name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            {type === "events" ? 
                <FormControl style={{minWidth: 120}}>
                    <InputLabel id="severity-label">Sort By Severity</InputLabel>
                    <Select
                        labelId="severity-label"
                        id="severity"
                        label="Severity"
                        name="severity"
                        value={sortOther}
                        onChange={handleSetOther}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="1">1 :D</MenuItem>
                        <MenuItem value="2">2 :)</MenuItem>
                        <MenuItem value="3">3 :|</MenuItem>
                        <MenuItem value="4">4 :(</MenuItem>
                        <MenuItem value="5">5 >:</MenuItem>
                    </Select>
                </FormControl>
            :
            <FormControl style={{minWidth: 120}}>
                    <InputLabel id="provider-label">Sort By Provider</InputLabel>
                    <Select
                        labelId="provider-label"
                        id="provider"
                        label="Provider"
                        name="provider"
                        value={sortCategory.category_name}
                        onChange={handleSetOther}
                    >
                        <MenuItem value="All">All</MenuItem>
                        {sortOther.length > 0 && sortOther.map((provider) => {
                            return (
                                <MenuItem key={provider.provider_name} value={provider.provider_name} name={provider.provider_name}>
                                    {provider.provider_name}
                                </MenuItem>
                            )
                        })}
                </Select>
            </FormControl>}
        </Container>  
    )
}
export default SearchBar;