import React, { useEffect, useState, useContext } from 'react'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
import apiService from '../api/apiService';
import { ReactFlowContext } from '../context/reactFlowContext';

import './HomePage.css'


const HomeDummyData = [
    { data: 'data-1' },
    { data: 'data-2' },
]

const HomePage = () => {

    const navigate = useNavigate()
    const [webflowid, setWebflowId] = useState('')
    const [listData, setListData] = useState([])

    const onClickAddForm = () => {
        navigate('/addform')
        getlistbyid(webflowid)
    }

    const getData = () => {

        apiService.getlistdata()
            .then((response: any) => {
                // setTeamLeads(response.data);
                console.log('getlistdataResponse:', response.data);
                if (response.data.length) {
                    setWebflowId(response.data[0].webflowid)
                }
                setListData(response.data)
            })
            .catch((error: any) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const getlistbyid = (id: any) => {

        apiService.getlistbyid(id)
            .then((response: any) => {
                // setTeamLeads(response.data);
                console.log('getlistbyidResponse:', response.data);

            })
            .catch((error: any) => {
                console.error('Error list fetching data:', error);
            });
    };

    const deletelistbyid = (deletedId: any) => {
        // const deletedId = '9'
        apiService.deletewebflow(deletedId)
            .then((response: any) => {
                // setTeamLeads(response.data);
                getData()
                console.log('deletewebflowResponse:', response.data);

            })
            .catch((error: any) => {
                console.error('Error delete fetching data:', error);
            });
    };

    const onClickDeleteBtn = (deletedId: any) => {
        deletelistbyid(deletedId)
    }

    // console.log('aaaaaaa', listData)

    return (

        <Stack className='home-container'>
            <Box className="list-radio-button" sx={{ cursor: "pointer", }} component='div' onClick={onClickAddForm}>
                <span style={{ fontSize: "14px" }}>Add Form</span> <Button variant="outlined" className="list-add-form-btn" sx={{ ml: 1, backgroundColor: "rgb(211, 47, 47)" }}><AddIcon sx={{ fontSize: "22px", color: "white" }} /></Button>
            </Box>

            <Box sx={{ width: '35%', mt: 1 }}>
                {listData.map((item: any) => (
                    <Paper sx={{ mb: 1, p: 1, border: "1px solid #d5cece" }} elevation={0} id={item.webflowid} key={item.webflowid}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                            <Typography className="list-accordion-item list-form-name" sx={{ pl: 1 }}>
                                <ChevronRightRoundedIcon sx={{ fontSize: "24px", color: "white", backgroundColor: "rgb(211, 47, 47)", borderRadius: "50%" }} />
                                <Typography component={"span"} sx={{ pl: 1 }} className="form-name-overflow" >{item.webflowname}</Typography>

                            </Typography>
                            <Box >
                                <Button variant="outlined" className="list-action-btn" ><VisibilityIcon sx={{ fontSize: "22px" }} /></Button>
                                <Button variant="outlined" className="list-action-btn" ><EditIcon sx={{ fontSize: "22px" }} /></Button>
                                <Button variant="outlined" className="list-action-btn"
                                    onClick={() => onClickDeleteBtn(item.webflowid)}
                                >
                                    <DeleteOutlineIcon sx={{ fontSize: "22px", color: "rgb(211, 47, 47)" }} />
                                </Button>
                            </Box>

                        </Box>
                    </Paper>
                ))}
            </Box>
        </Stack>

    )
}

export default HomePage