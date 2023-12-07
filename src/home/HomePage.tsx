import React, { useEffect, useState, useContext } from 'react'
import { Box, Button, Paper, Stack, Typography, Card, Checkbox, TextField, DialogTitle } from '@mui/material'
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from "@mui/material/styles";

import moment from 'moment';

import logo from '../automationLogo/Accuick Automation.png';
import pencil from '../automationFlowIcons/Component 19.png';
import deleteIcon from '../automationFlowIcons/trash.png';
import rightarrow from '../automationFlowIcons/Component 20.png';

import './HomePage.css'


const HomeDummyData = [
    { data: 'data-1' },
    { data: 'data-2' },
]


const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 1,
    width: 16,
    height: 16,
    backgroundColor: "#ffffff",
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#146EF6',
    "&:before": {
        display: "block",
        width: 16,
        height: 16,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
    },
});

const BpCheckboxContainer = styled("div")({
    ".bp-icon": {
        border: "1px #CACACC solid",
    },
    "& .bp-checkbox:hover .bp-icon": {
        borderColor: '#146EF6',
    },
});


const HomePage = () => {

    const navigate = useNavigate()
    const [webflowid, setWebflowId] = useState('')
    const [listData, setListData] = useState<any>([])

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

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<any>([]);

    const handleMasterCheckboxChange = () => {
        setSelectAll(!selectAll);
        setSelectedItems(selectAll ? [] : listData.map((item: any) => item.webflowid));
    };


    const handleCheckboxChange = (webflowid: any) => {
        const updatedSelectedItems = selectedItems.includes(webflowid)
            ? selectedItems.filter((id: any) => id !== webflowid)
            : [...selectedItems, webflowid];

        setSelectedItems(updatedSelectedItems);
        setSelectAll(updatedSelectedItems.length === listData.length);
    };


    const [renamePopup, setRenamePopup] = useState<{ [key: string]: boolean }>({});

    const handleOpenRenamePopup = (renameId: any) => {
        setRenamePopup((prev: any) => ({
            ...prev,
            [renameId]: true
        }));
    }

    const handleCloseRenamePopup = (renameId: any) => {
        setRenamePopup((prev: any) => ({
            ...prev,
            [renameId]: false
        }));
    }

    return (
        <Stack >


            <Box className='header-container'>

                <Box sx={{ pl: '20px' }}>
                    <img src={logo} alt='' />
                </Box>


                <Box className='profile-container' sx={{ pr: 2 }}>

                    {/* <Box className='profile-name-logo-container'>
                        <Typography className='profile-name-logo'>VS</Typography>
                    </Box>

                    <Box className='profile-container' sx={{ ml: 1 }}>
                        <Typography className='profile-name-logo'> Vinay Singh </Typography>
                        <ArrowDropDownIcon />
                    </Box> */}

                </Box>
            </Box>

            <div style={{ overflowY: 'scroll', height: '89vh' }}>

                <Card sx={{ m: 5, boxShadow: '0px 5px 12px 0px #0000001F' }}>
                    <Box className='table-header-container'>
                        <Box className='table-header-name'>
                            Automation Flows
                        </Box>


                        <Button
                            variant='contained'
                            startIcon={<AddIcon />}
                            className='add-form-btn'
                            onClick={onClickAddForm}
                        >
                            Create New Flow
                        </Button>
                    </Box>

                    <Stack sx={{ padding: '0px 35px 0px 35px', }}>
                        <TableContainer component={Paper} className='table-bottom'>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>

                                        <TableCell sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            {/* <BpCheckboxContainer>
                                                <Checkbox
                                                    color="default"
                                                    checked={selectAll}
                                                    onChange={handleMasterCheckboxChange}
                                                    icon={
                                                        <BpIcon className="bp-icon" />
                                                    }
                                                    checkedIcon={
                                                        <BpCheckedIcon
                                                            className="bp-icon"
                                                            style={{
                                                                borderColor: '#146EF6'
                                                            }}
                                                        />
                                                    }

                                                />
                                            </BpCheckboxContainer> */}

                                            <Typography className='table-header' sx={{ pl: 1 }}>
                                                Name
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="right" className='table-header'>Discription</TableCell>
                                        <TableCell align="right" className='table-header'>Created On</TableCell>
                                        <TableCell align="right" className='table-header pr' >Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listData.map((item: any) => (
                                        <TableRow
                                            key={item.webflowid}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" >
                                                {/* <BpCheckboxContainer>
                                                    <Checkbox
                                                        color="default"
                                                        id={`${item.webflowid}`}
                                                        checked={selectedItems.includes(item.webflowid)}
                                                        onChange={() => handleCheckboxChange(item.webflowid)}
                                                        icon={
                                                            <BpIcon className="bp-icon" />
                                                        }
                                                        checkedIcon={
                                                            <BpCheckedIcon
                                                                className="bp-icon"
                                                                style={{
                                                                    borderColor: '#146EF6'
                                                                }}
                                                            />
                                                        }

                                                    />
                                                </BpCheckboxContainer> */}

                                                <Typography className='table-cell-items' sx={{ pl: 1 }}>
                                                    {item.webflowname}
                                                </Typography>

                                            </TableCell>
                                            <TableCell align="right" className='table-cell-items-descrpt '> {item.desc}</TableCell>
                                            <TableCell align="right" className='table-cell-items-descrpt '>   {moment(item.modifyDate).format('DD MMM YYYY')}</TableCell>
                                            <TableCell align="right" >

                                                <Stack className='table-btn-cell'>
                                                    <Box component='div' className='table-btn-cell-edit-container edit-btn'
                                                        // onClick={() => handleOpenRenamePopup(item.webflowid)}
                                                        onClick={() => { onClickEditBtn(item.webflowid) }}
                                                    >
                                                        <img src={pencil} alt='' />
                                                    </Box>


                                                    {/* pencil dialog according to design */}
                                                    {/* <Dialog
                                                        id={item.webflowid}
                                                        open={renamePopup[item.webflowid] || false}
                                                        onClose={() => handleCloseRenamePopup(item.webflowid)}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                    >
                                                        <DialogTitle className='rename-popup-card-header-container'>
                                                            <Typography className='rename-popup-card-header'>
                                                                Rename Automation
                                                            </Typography>
                                                        </DialogTitle>

                                                        <DialogContent >
                                                            <Box className='rename-popup-card' sx={{ mt: 5 }}>
                                                                <Box sx={{ mb: 2 }}>
                                                                    <Typography className='input-label'>Name:</Typography>
                                                                    <TextField
                                                                        placeholder='Name'
                                                                        sx={{
                                                                            width: '100%',
                                                                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                                                                color: "#1A1A1A",
                                                                                fontSize: "14px",
                                                                                fontWeight: 600,
                                                                                width: "100%",
                                                                                minHeight: "25px",
                                                                                fontFamily: "Segoe UI",
                                                                                p: "5px 45px 5px 0px",
                                                                            },
                                                                            "& .MuiInputBase-input::placeholder": {
                                                                                color: "#919191",
                                                                                fontSize: "14px",
                                                                                fontWeight: 600,
                                                                                fontFamily: "Segoe UI",
                                                                                opacity: 0.5,
                                                                            },
                                                                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                                            {
                                                                                borderColor: "#146EF6",
                                                                            },
                                                                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                                            {
                                                                                borderColor: "#146EF6",
                                                                                borderWidth: "1px",
                                                                            },
                                                                        }}
                                                                    />
                                                                </Box>

                                                                <Box>
                                                                    <Typography className='input-label'>Description:</Typography>
                                                                    <TextField
                                                                        multiline
                                                                        placeholder='Description'
                                                                        maxRows={4}
                                                                        sx={{
                                                                            width: '100%',
                                                                            '& .MuiInputBase-root.MuiOutlinedInput-root ': {
                                                                                p: 0
                                                                            },

                                                                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                                                                color: "#1A1A1A",
                                                                                fontSize: "14px",
                                                                                fontWeight: 600,
                                                                                width: "100%",
                                                                                minHeight: "25px",
                                                                                fontFamily: "Segoe UI",
                                                                                p: "5px 45px 5px 0px",
                                                                            },
                                                                            "& .MuiInputBase-input::placeholder": {
                                                                                color: "#919191",
                                                                                fontSize: "14px",
                                                                                fontWeight: 600,
                                                                                fontFamily: "Segoe UI",
                                                                                opacity: 0.5,
                                                                            },
                                                                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                                                            {
                                                                                borderColor: "#146EF6",
                                                                            },
                                                                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                                                            {
                                                                                borderColor: "#146EF6",
                                                                                borderWidth: "1px",
                                                                            },
                                                                        }}
                                                                        className='rename-popup-input'
                                                                    />
                                                                </Box>
                                                            </Box>

                                                        </DialogContent>

                                                        <DialogActions className='rename-popup-card-btn-container'>
                                                            <Button
                                                                onClick={() => handleCloseRenamePopup(item.webflowid)}
                                                                variant='outlined'
                                                            >
                                                                Cancel
                                                            </Button>

                                                            <Button
                                                                onClick={() => handleCloseRenamePopup(item.webflowid)}
                                                                variant='contained'
                                                            >
                                                                Save Changes
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog> */}


                                                    <Box component='div'
                                                        className='table-btn-cell-edit-container delete-btn'
                                                        onClick={() => handleClickOpenDeletePopup(item.webflowid)}
                                                    >
                                                        <img src={deleteIcon} alt='' />
                                                    </Box>

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

                                                    {/* <Box component='div' className='table-btn-cell-edit-container right-arrow-btn'
                                                        onClick={() => { onClickEditBtn(item.webflowid) }}
                                                    >
                                                        <img src={rightarrow} alt='' />
                                                    </Box> */}
                                                </Stack>
                                            </TableCell>


                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>

                    <Typography className='showing-text' sx={{ padding: '8px 8px 8px 55px' }}>
                        Showing {listData.length} of {listData.length}
                    </Typography>
                </Card>

            </div>
            {/* <Stack className='home-container'>

                <Box className="list-radio-button" sx={{ cursor: "pointer", }} component='div' onClick={onClickAddForm}>
                    <span style={{ fontSize: "14px" }}>Add Form</span> <Button variant="outlined" className="list-add-form-btn" sx={{ ml: 1, backgroundColor: "rgb(211, 47, 47)" }}><AddIcon sx={{ fontSize: "22px", color: "white" }} /></Button>
                </Box> */}

            {/* <Box sx={{ width: '35%', mt: 1 }}>
                    {listData.map((item: any) => (
                        <Paper sx={{ mb: 1, p: 1, border: "1px solid #d5cece" }} elevation={0} id={item.webflowid} key={item.webflowid}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                                <Typography className="list-accordion-item list-form-name" sx={{ pl: 1 }}>
                                    <ChevronRightRoundedIcon sx={{ fontSize: "24px", color: "white", backgroundColor: "rgb(211, 47, 47)", borderRadius: "50%", }} />
                                    <Typography component={"span"} sx={{ pl: 1 }} className="form-name-overflow" >
                                        <>{starFun(item)}</> */}
            {/* {item.webflowname}
                                    </Typography>

                                </Typography>
                                <Box > */}
            {/* {!isVisible[item.webflowid] ?
                                    <>
                                        <Button variant="outlined" className="list-action-btn" id={item.webflowid} onClick={() => onClickToggleVisibility(item)}><VisibilityIcon sx={{ fontSize: "22px" }} /></Button>
                                    </>
                                    :
                                    <>
                                        <Button variant="outlined" className="list-action-btn" id={item.webflowid} onClick={() => onClickToggleVisibility(item)}><VisibilityOffRoundedIcon sx={{ fontSize: "22px" }} /></Button>
                                    </>

                                } */}

            {/* <Button variant="outlined" className="list-action-btn"
                                        onClick={() => { onClickEditBtn(item.webflowid) }}
                                    ><EditIcon sx={{ fontSize: "22px" }} /></Button>
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
                                                    </Typography> */}
            {/* <Typography className='delete-popup-text'></Typography> */}
            {/* </DialogContentText>
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
                </Box> */}

            {/* </Stack> */}


        </Stack>

    )
}

export default HomePage