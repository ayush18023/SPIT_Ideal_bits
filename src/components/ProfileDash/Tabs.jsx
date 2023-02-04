import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableRow } from '@mui/material';

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

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Posts" {...a11yProps(0)} />
                    <Tab label="Purchases" {...a11yProps(1)} />
                    <Tab label="Transactions" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Table>
                    <TableBody>
                        <TableRow rowspan={2} style={{ borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                            <TableCell>
                                <Typography style={{ fontSize: '12px' }}>ADDRESS</Typography>
                                <Typography>0x87Dc5BD55e713AE755dA1e8eb5D3dfcD5a97e63F</Typography>
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
                                <Typography>0x87Dc5BD55e713AE755dA1e8eb5D3dfcD5a97e63F</Typography>
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
                                <Typography>0x87Dc5BD55e713AE755dA1e8eb5D3dfcD5a97e63F</Typography>
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
                                <Typography>0x87Dc5BD55e713AE755dA1e8eb5D3dfcD5a97e63F</Typography>
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
                                <Typography>0x87Dc5BD55e713AE755dA1e8eb5D3dfcD5a97e63F</Typography>
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
        </Box>
    );
}