import React, { useState } from "react"
import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { useParams } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material/styles";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DoneIcon from '@mui/icons-material/Done';
import apiService from "../../../api/apiService";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import './trigger.scss'

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

const listOptions = ['Select Existing Lists', 'Placement-1', 'Placement-2', 'Placement-3']

const listSupressOptions = ['Select Lists to Suppress', 'Placement-3', 'Placement-4', 'Placement-5']

const SendTriggerOptions = () => {
    const params = useParams()
    const { webid } = params
    const [existingAnchorEl, setExistingAnchorEl] = useState<null | HTMLElement>(null);
    const [supressAnchorEl, setSupressAnchorEl] = useState<null | HTMLElement>(null);
    const [suppressChecked, setSuppressChecked] = useState(false)
    const [existingSelectedLists, setExistingSelectedLists] = useState<any>([])
    const [SuppressSelectedLists, setSuppressSelectedLists] = useState<any>([])
    const openExisting = Boolean(existingAnchorEl);
    const openSupress = Boolean(supressAnchorEl);
    const { udpateRightSideBar } = useReactFlowContext();
    const handleExistingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setExistingAnchorEl(event.currentTarget);
    };
    const handleExistingClose = () => {
        setExistingAnchorEl(null);
    };

    const handleSupressClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSupressAnchorEl(event.currentTarget);
    };
    const handleSupressClose = () => {
        setSupressAnchorEl(null);
    };

    const handleCheckSuppress = () => {
        setSuppressChecked(!suppressChecked)
    }

    const handleExistingSelectedLists = (listItem: any) => {
        if (!existingSelectedLists.includes(listItem)) {
            // If not present, add it to the list
            setExistingSelectedLists((prevLists: any) => [...prevLists, listItem]);
        }
        handleExistingClose();
    };

    const handleSuppressSelectedLists = (listItem: any) => {
        if (!SuppressSelectedLists.includes(listItem)) {
            // If not present, add it to the list
            setSuppressSelectedLists((prevLists: any) => [...prevLists, listItem]);
        }
        handleSupressClose();
    };

    const handleremoveExistingList = (index: any) => {
        const updatedList = existingSelectedLists.filter((_: any, i: number) => i !== index);

        // Set the state with the updated array
        setExistingSelectedLists(updatedList);
    }

    const handleremovesuppressList = (index: any) => {
        const updatedList = SuppressSelectedLists.filter((_: any, i: number) => i !== index);

        // Set the state with the updated array
        setSuppressSelectedLists(updatedList);
    }

    console.log('existingSelectedLists', existingSelectedLists)
    console.log('SuppressSelectedLists', SuppressSelectedLists)

    const handelSaveUser = async () => {
        let data = {
            webflowid: webid,
            userid: [10, 11, 12, 13, 14]
        }
        try {
            let resp = apiService.assignWebflowUser(data)
            udpateRightSideBar(false)
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <>
                <Typography className="question-text">How will candidates enter this automation?</Typography>

                <Box className='select-container'>
                    <Button
                        variant="contained"
                        className="new-list-btn"
                        sx={{ mb: '10px' }}
                    >
                        Create New List
                    </Button>

                    <Typography className="or-text">OR</Typography>

                    <Button
                        disableRipple
                        id="exist-button"
                        aria-controls={openExisting ? 'exist-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openExisting ? 'true' : undefined}
                        onClick={handleExistingClick}
                        className="select-list-btn"
                        sx={{ mt: '10px' }}
                        endIcon={<span className='list-btn-icon-container'>
                            <ArrowDropUpIcon sx={{ fontSize: '20px', height: '15px' }} />
                            <ArrowDropDownIcon sx={{ fontSize: '20px', height: '15px' }} />
                        </span>}
                    >
                        Select Existing Lists
                    </Button>
                    <Menu
                        id="exist-menu"
                        anchorEl={existingAnchorEl}
                        open={openExisting}
                        onClose={handleExistingClose}
                        MenuListProps={{
                            'aria-labelledby': 'exist-button',
                        }}
                        sx={{
                            '& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper': {
                                minWidth: '250px'
                            }
                        }}
                    >
                        {listOptions.map((item: any) => (
                            <MenuItem
                                onClick={() => handleExistingSelectedLists(item)}
                                key={item}
                                className="menu-card"
                            >
                                {item === 'Select Existing Lists' ?
                                    (<Box>
                                        <DoneIcon sx={{ fontSize: '16px', pr: 1 }} />
                                    </Box>) : (<Box sx={{ pl: '24px' }}></Box>)}

                                {item}
                            </MenuItem>
                        ))}

                    </Menu>
                </Box>


                <BpCheckboxContainer>
                    <FormControlLabel
                        control={
                            <Checkbox
                                disableRipple
                                checked={suppressChecked}
                                onChange={handleCheckSuppress}
                                color="default"
                                icon={<BpIcon className="bp-icon" />}
                                checkedIcon={
                                    <BpCheckedIcon
                                        className="bp-icon"
                                        style={{
                                            borderColor: "#146EF6",
                                        }}
                                    />
                                }

                            />
                        }
                        label={<Typography className="check-label">Add suppression lists to this automation?</Typography>}
                    />
                </BpCheckboxContainer>


                {suppressChecked && (
                    <>
                        <Button
                            disableRipple
                            id="supress-button"
                            aria-controls={openSupress ? 'supress-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openSupress ? 'true' : undefined}
                            onClick={handleSupressClick}
                            className="select-list-btn"
                            sx={{ mt: '10px' }}
                            endIcon={
                                <span className='list-btn-icon-container'>
                                    <ArrowDropUpIcon sx={{ fontSize: '20px', height: '15px' }} />
                                    <ArrowDropDownIcon sx={{ fontSize: '20px', height: '15px' }} />
                                </span>
                            }
                        >
                            Select Lists to Suppress
                        </Button>
                        <Menu
                            id="supress-menu"
                            anchorEl={supressAnchorEl}
                            open={openSupress}
                            onClose={handleSupressClose}
                            MenuListProps={{
                                'aria-labelledby': 'supress-button',
                            }}
                            sx={{
                                '& .MuiPaper-root.MuiPopover-paper.MuiMenu-paper': {
                                    minWidth: '250px',
                                },
                            }}
                        >
                            {listSupressOptions.map((item: any) => (
                                <MenuItem
                                    onClick={() => handleSuppressSelectedLists(item)}
                                    key={item}
                                    className="menu-card"
                                >
                                    {item === 'Select Existing Lists' ?
                                        (<Box>
                                            <DoneIcon sx={{ fontSize: '16px', pr: 1 }} />
                                        </Box>) : (<Box sx={{ pl: '24px' }}></Box>)}

                                    {item}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )}

            </>

            <hr />


            <Box>
                <Box>
                    <Typography className="inc-exc-text">Included</Typography>

                    {(existingSelectedLists.length > 0) ? (
                        existingSelectedLists.map((listItem: any, index: any) => (
                            <Box className='select-list-con' key={listItem} sx={{ display: listItem === 'Select Existing Lists' ? 'none' : 'block' }}>
                                <Typography className="list-text" sx={{ display: listItem === 'Select Existing Lists' ? 'none' : 'block' }}>{listItem}</Typography>
                                <CloseRoundedIcon className="delete-icon" sx={{ display: listItem === 'Select Existing Lists' ? 'none' : 'block' }} onClick={() => handleremoveExistingList(index)} />
                            </Box>
                        ))
                    ) : (
                        <Typography className="inc-exc-text">None Added</Typography>
                    )}

                </Box>
                <Box>
                    {suppressChecked && (<>
                        <Typography className="inc-exc-text">Excluded</Typography>
                        {(SuppressSelectedLists.length > 0) ? (
                            SuppressSelectedLists.map((listItem: any, index: any) => (
                                <Box className='select-list-con' key={listItem} sx={{ display: listItem === 'Select Lists to Suppress' ? 'none' : 'block' }}>
                                    <Typography className="list-text">{listItem}</Typography>
                                    <CloseRoundedIcon className="delete-icon" onClick={() => handleremovesuppressList(index)} />
                                </Box>
                            ))
                        ) : (
                            <Typography className="inc-exc-text">None Added</Typography>
                        )}
                    </>)}

                </Box>


                <Typography className="num-text">0</Typography>
                <Typography className="can-text">Candidates currently matching selected lists</Typography>
            </Box>

            <Box className='btn-con'>
                <Button
                    variant="outlined"
                    className="cancel-btn"
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    className="save-btn"
                    onClick={handelSaveUser}
                >
                    Save
                </Button>
            </Box>
        </div>
    )
}

export default SendTriggerOptions