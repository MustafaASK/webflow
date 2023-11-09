import * as React from 'react'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";

import './HomePage.css'


const HomeDummyData = [
    { data: 'data-1' },
    { data: 'data-2' },
]

const HomePage = () => {

    const navigate = useNavigate()

    const onClickAddForm = () => {
        navigate('/addform')
    }

    return (

        <Stack className='home-container'>
            <Box className="list-radio-button" sx={{ cursor: "pointer", }} component='div' onClick={onClickAddForm}>
                <span style={{ fontSize: "14px" }}>Add Form</span> <Button variant="outlined" className="list-add-form-btn" sx={{ ml: 1, backgroundColor: "rgb(211, 47, 47)" }}><AddIcon sx={{ fontSize: "22px", color: "white" }} /></Button>
            </Box>

            <Box sx={{ width: '35%', mt: 1 }}>
                {HomeDummyData.map((item: any) => (
                    <Paper sx={{ mb: 1, p: 1, border: "1px solid #d5cece" }} elevation={0} key={item.data}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                            <Typography className="list-accordion-item list-form-name" sx={{ pl: 1 }}>
                                <ChevronRightRoundedIcon sx={{ fontSize: "24px", color: "white", backgroundColor: "rgb(211, 47, 47)", borderRadius: "50%" }} />
                                <Typography component={"span"} sx={{ pl: 1 }} className="form-name-overflow" >{item.data}</Typography>

                            </Typography>
                            <Box>
                                <Button variant="outlined" className="list-action-btn" ><VisibilityIcon sx={{ fontSize: "22px" }} /></Button>
                                <Button variant="outlined" className="list-action-btn" ><EditIcon sx={{ fontSize: "22px" }} /></Button>
                                <Button variant="outlined" className="list-action-btn"><DeleteOutlineIcon sx={{ fontSize: "22px", color: "rgb(211, 47, 47)" }} /></Button>
                            </Box>

                        </Box>
                    </Paper>
                ))}
            </Box>
        </Stack>

    )
}

export default HomePage