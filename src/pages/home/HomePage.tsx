import React, { useState } from "react"
import { Box, Grid } from "@mui/material";
import Search from "../../components/search/Search";
import { Accommodation } from "../../requests/accommodation/CreateAccommodationRequest";
import Accommodations from "../../components/accommodations/Accommodations";
import { SearchRequest } from "../../requests/accommodation/SearchRequest";

const HomePage = () => {
    const [results, setResults] = useState<Accommodation[]>([]);
    const [searchRequest, setSearchRequest] = useState<SearchRequest>();
    return (
        <Box>
            <Search results={results} setResults={setResults} setSearchRequest={setSearchRequest}/>
            <Accommodations accommodations={results} isSearch={true} searchRequest={searchRequest}/>
       </Box>
    );
};
export default HomePage;