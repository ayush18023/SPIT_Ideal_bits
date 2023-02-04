import './Dashboard.css'
import { Avatar, Box, styled, Typography } from '@mui/material'
import { useRef, useState } from 'react'
// import CreateIcon from '@mui/icons-material/Create';
import EditIcon from '@mui/icons-material/Edit';
import BasicTabs from './Tabs';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
const Banner = styled(Box)(({ theme }) => ({
    paddingBottom: '15%',
    position: 'relative',
    backgroundColor: 'rgba(229, 232, 235, 0.314)'
}))
const OuterBox = styled(Box)(({ theme }) => ({
    marginTop: '-140px',
    position: 'relative',
    zIndex: '1',
    display: 'inline-block',
    top: '-58px'
}))
const InnerBox = styled(Box)(({ theme }) => ({
    width: '180px',
    height: '180px',
    boxShadow: 'rgb(0 0 0 / 8%) 0px 5px 20px 0px',
    borderRadius: '50%',
    background: 'rgb(255, 255, 255);',

}))
function Dashboard() {

    const re = useRef(null)
    const clickHandler = () => {
        re.current.click()
    }
    const [show, setShow] = useState(false)
    return (
        <Link to='/profile/dashboard' style={{ textDecoration: 'none', color: 'white' }}>
            <NavBar></NavBar>
            <div style={{ marginLeft: '230px', pointer: 'none' }}>
                <Box style={{ position: 'relative', maxHeight: '320px', overflow: 'hidden', display: 'flex', cursor: 'pointer', backgroundColor: 'rgba(229, 232, 235, 0.314)' }} className='input_icons' onMouseOver={() => setShow(true)} onMouseOut={() => setShow(false)} onClick={clickHandler}>
                    {/* <input type='file' style={{ margin: 'auto', display: 'none' }} ref={re}></input> */}
                    <Banner style={{ background: 'rgba(229, 232, 235, 0.314)' }}>
                    </Banner>
                    {show && <EditIcon style={{ display: 'inline', margin: 'auto', fontSize: '2rem', position: 'relative', zIndex: '1', color: 'white' }}></EditIcon>}
                </Box>
                <Box style={{ margin: '0px auto', padding: '0px 50px', maxWidth: '1500px' }}>
                    <OuterBox>
                        <InnerBox style={{ display: 'flex', cursor: 'pointer' }} className='input-icon' onClick={clickHandler}>
                            <input type='file' style={{ margin: 'auto', display: 'none' }} ref={re}></input>
                            <EditIcon style={{ display: 'inline', margin: 'auto', fontSize: '2rem', position: 'relative', zIndex: '1', color: 'white' }}></EditIcon>
                        </InnerBox>
                    </OuterBox>
                    <Box style={{ display: 'block', position: 'relative', top: '-33px' }}>
                        <Box>
                            <Typography style={{ fontWeight: '600', fontSize: '30px', letterSpacing: '0px', color: 'white', fontFamily: 'Poppins,sans-serif' }}>userName</Typography>
                            <Typography style={{ color: 'white', fontWeight: '300' }}>ethereum id</Typography>
                        </Box>
                        <Box style={{ marginTop: '10px' }}>
                            <BasicTabs />
                        </Box>
                    </Box>
                </Box>
            </div>
        </Link>
    );
}

export default Dashboard;
