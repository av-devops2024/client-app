import React, { useState } from "react"
import { Box, Grid } from "@mui/material";
import Search from "../../components/search/Search";
import { Accommodation } from "../../requests/accommodation/CreateAccommodationRequest";
import Accommodations from "../../components/accommodations/Accommodations";

const HomePage = () => {
    const [results, setResults] = useState<Accommodation[]>([]);
    return (
        <Box>
            <Search results={results} setResults={setResults}/>
            <Accommodations accommodations={results} isSearch={true}/>
       </Box>
    );
};
export default HomePage;