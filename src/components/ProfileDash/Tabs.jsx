import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import Movie from '../Movie/Movie';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const arra = useSelector(state => state.movie.movies)
    const movies = arra.filter(movie => (movie?.category?.toLowerCase() === 'mystery'))
    console.log(movies.length)
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Transaction" {...a11yProps(0)} />
                    <Tab label="Posts" {...a11yProps(1)} />
                    <Tab label="Purchases" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Table>
                    <TableBody>
                        <TableRow rowspan={2} style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>ADDRESS</Typography>
                                <Typography>0x87Dc5BD55e713AE755dA1e8eb5D3dfcD5a97e63F</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>BALANCE</Typography>
                                <Typography>97.5ETH</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>TX COUNT</Typography>
                                <Typography>4</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow rowspan={2} style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>ADDRESS</Typography>
                                <Typography>0x12Ba3C372216021FF979fa599308A03953E9992C</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>BALANCE</Typography>
                                <Typography>97.2ETH</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>TX COUNT</Typography>
                                <Typography>13</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow rowspan={2} style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>ADDRESS</Typography>
                                <Typography>0x695cF771dFC9Ec7350408b853e314462A31F37c1</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>BALANCE</Typography>
                                <Typography>97.2ETH</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>TX COUNT</Typography>
                                <Typography>13</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow rowspan={2} style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>ADDRESS</Typography>
                                <Typography>0x6f4D89470798c1bd19792eC7531a164bC35D8bfC</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>BALANCE</Typography>
                                <Typography>97.2ETH</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>TX COUNT</Typography>
                                <Typography>13</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow rowspan={2} style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>ADDRESS</Typography>
                                <Typography>0xEB9334dec080309b04aAFb95aDec2d8e7f6A0EC1</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>BALANCE</Typography>
                                <Typography>97.2ETH</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>TX COUNT</Typography>
                                <Typography>13</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className='gridforMovie' style={{ height: 'calc(100vh - 52px)', width: 'calc(100vw - 252px)', marginTop: '45px' }}>
                    {movies.map((movie, i) => (
                        <Movie key={i} movie={movie}></Movie>
                    ))}
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Purchases
            </TabPanel>
        </Box>
    );
}