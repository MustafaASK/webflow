import React, { useEffect, useState, useContext } from 'react'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
import apiService from '../api/apiService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

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
        navigate('/add')
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

    const onClickEditBtn = (editId: any) => {
        navigate(`/edit/${editId}`)
    }

    // const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

    // const onClickToggleVisibility = (list: any) => {
    //     setIsVisible((prevState) => ({
    //         ...prevState,
    //         [list.webflowid]: !prevState[list.webflowid], // Toggle the visibility for the specific item
    //     }));

    //     starFun(list.webflowname)
    // }

    // const starFun = (item: any) => {
    //     if (isVisible[item.webflowid]) {
    //         const nameWithoutSpaces = item.webflowname.replace(/\s/g, "");
    //         const lengthWithoutSpaces = nameWithoutSpaces.length;
    //         const starsString = '*'.repeat(lengthWithoutSpaces)
    //         return starsString
    //     } else {
    //         return item.webflowname
    //     }
    // }

    const [openDeletePopup, setOpenDeletePopup] = useState<{ [key: string]: boolean }>({});

    const handleClickOpenDeletePopup = (deletedId: any) => {
        setOpenDeletePopup((prev: any) => ({
            ...prev,
            [deletedId]: true
        }));
    };

    const handleCloseDeletePopup = (deletedId: any) => {
        setOpenDeletePopup((prev: any) => ({
            ...prev,
            [deletedId]: false
        }));
    };

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
                                <ChevronRightRoundedIcon sx={{ fontSize: "24px", color: "white", backgroundColor: "rgb(211, 47, 47)", borderRadius: "50%", }} />
                                <Typography component={"span"} sx={{ pl: 1 }} className="form-name-overflow" >
                                    {/* <>{starFun(item)}</> */}
                                    {item.webflowname}
                                </Typography>

                            </Typography>
                            <Box >
                                {/* {!isVisible[item.webflowid] ?
                                    <>
                                        <Button variant="outlined" className="list-action-btn" id={item.webflowid} onClick={() => onClickToggleVisibility(item)}><VisibilityIcon sx={{ fontSize: "22px" }} /></Button>
                                    </>
                                    :
                                    <>
                                        <Button variant="outlined" className="list-action-btn" id={item.webflowid} onClick={() => onClickToggleVisibility(item)}><VisibilityOffRoundedIcon sx={{ fontSize: "22px" }} /></Button>
                                    </>

                                } */}

                                <Button variant="outlined" className="list-action-btn" onClick={() => {
                                    onClickEditBtn(item.webflowid)
                                }}><EditIcon sx={{ fontSize: "22px" }} /></Button>
                                <Button variant="outlined" className="list-action-btn"
                                    onClick={() => handleClickOpenDeletePopup(item.webflowid)}
                                >
                                    <DeleteOutlineIcon sx={{ fontSize: "22px", color: "rgb(211, 47, 47)" }} />
                                </Button>

                                <Dialog
                                    id={item.webflowid}
                                    open={openDeletePopup[item.webflowid] || false}
                                    onClose={() => handleCloseDeletePopup(item.webflowid)}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"

                                >
                                    <Box className='delete-popup-card'>

                                        <DialogContent>
                                            <DialogContentText
                                                id="alert-dialog-description"
                                            >
                                                <Typography className='delete-popup-text'>
                                                    Are you sure you want to delete {item.webflowname} ?
                                                </Typography>
                                                {/* <Typography className='delete-popup-text'></Typography> */}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions className='delete-popup-btn-align'>
                                            <Button onClick={() => handleCloseDeletePopup(item.webflowid)}
                                                variant='contained'
                                                className='delete-popup-btn-no delete-popup-btn'
                                            >
                                                No
                                            </Button>

                                            <Button
                                                onClick={() => onClickDeleteBtn(item.webflowid)}
                                                variant='contained'
                                                className='delete-popup-btn-yes delete-popup-btn'
                                            >
                                                Yes
                                            </Button>

                                        </DialogActions>

                                    </Box>
                                </Dialog>
                            </Box>

                        </Box>
                    </Paper>
                ))}
            </Box>
        </Stack>

    )
}

export default HomePage