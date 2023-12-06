import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./AdminAnnouncementForm.css";
import { Button, Dialog, DialogTitle, DialogActions, Grid } from '@mui/material';
import Header from '../Header';
import axios from 'axios';

const AdminAnnouncementForm = () => {


    const [date, setDate] = useState('');
    const [announcementContent, setAnnouncementContent] = useState(''); //content
    const [announcementTitle, setAnnouncementTitle] = useState(''); //title

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!date || !announcementContent || !announcementTitle) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/announcements/insertAdminAnnouncement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date,
                    announcementContent,
                    announcementTitle,
                }),
            });
    
            if (response.ok) {
                setDialogOpen(true);
                setSubmitted(true);
            } else {
                console.error('Error submitting announcements:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting announcements:', error);
        }
    };

    

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const handleSubmitAnotherReport = () => {
        setDate('');
        setAnnouncementContent('');
        setAnnouncementTitle('');
        setDialogOpen(false);
    };

    return (
        <div>  
        <Header />
        <Grid container>
            {/* Left Container */}
            <Grid item xs={3} className="left-container1">
            <h1 className="header-text1">ANNOUNCE WITH IMPACT!</h1>

            <img
                src="/announcementpic.png"
                alt="Support Local Business"
                className="image-container1"
            />

            <br />
            <p className="description1">
                As stewards of our community's well-being, your role is paramount.
                Leverage the Announcements section to keep residents informed,
                share emergency alerts, and showcase exciting community initiatives.
                Informed administrators make for empowered communities.
            </p>
            <p className="description1">
                Explore this feature to its fullest potential and witness the positive
                impact it can have on community engagement and cohesion.
            </p>
            <p className="description1">
                Your community, your tool - Barangay Connect!
            </p>
            <p className="description1">
                Let's make our community stronger, together!
            </p>
            </Grid>

            {/* Right Content */}
            <Grid item xs={9} style={{ backgroundColor: "#ffffff" }}>
            <div className="importantannouncement1">
                <div className='importantannouncement-box1'>
                    <h1 style={{ color: "#fff", marginLeft: '10px' }}>IMPORTANT ANNOUNCEMENT!</h1>
                </div>
                <div className='submit-announcement1'>
                    <div style={{ border: "2px solid #213555", padding: "3px", width: "1500px", height: "750px" }}>
                        <form onSubmit={handleSubmit}>

                            {/* Title */}
                            <br />
                            <label style={{marginLeft: "7px", fontWeight: "bold", fontSize: "20px"}}>
                                Title:
                                <input
                                    type="text"
                                    value={announcementTitle}
                                    onChange={(e) => setAnnouncementTitle(e.target.value)}
                                    placeholder='Enter Title'
                                    required={submitted}
                                    className='title-input1'
                                />
                            </label >
                            <br />
                            <br />

                            {/* Date */}
                            <label style={{marginLeft: "7px", fontWeight: "bold", fontSize: "20px"}}>
                                Date:
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required={submitted}
                                    className='announcement-date1'
                                />
                            </label>

                            <br />
                            <br />

                            {/* content */}
                            <br />
                            <label style={{marginLeft: "7px", fontWeight: "bold", fontSize: "20px"}}>....</label>
                            <textarea
                                type="text"
                                value={announcementContent}
                                onChange={(e) => setAnnouncementContent(e.target.value)}
                                placeholder='Enter announcement'
                                required={submitted}
                                className='content-details1'
                            />
                            <br />

                            <div className='announcement-submit1'>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                                <Button
                                    variant="contained"
                                    style={{ color: '#FFFFFF', fontWeight: "bolder", backgroundColor: "#213555", width: '400px', height: '50px', padding: '15px 30px', borderRadius: '10px', textAlign: 'center', fontSize: 'large' }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            
            </div>
            </Grid>
        </Grid>
        {/* Dialog for submission confirmation */}
            <Dialog open={isDialogOpen} onClose={handleDialogClose} PaperProps={{ style: { backgroundColor: '#ffffff' } }}>
                {/* <img src={"checkbutton.png"} alt="Check Button" className="submit-checkbutton1" /> */}
                <DialogTitle style={{ margin: 'auto', textAlign: 'center', color: '#16558f', fontWeight: 'bolder', fontSize: '40px' }}>
                    Successful!
                </DialogTitle>
                <p style={{fontSize: "23px", color: '#000000', textAlign: 'center', marginTop: "0px"}}>Your announcement is successfully submitted!</p>
                <DialogActions>
                    <Button
                        style={{ backgroundColor: "#ffffff", marginBottom: "10px" , width: '280px', height: '50px', border: '1px solid #213555', color: "#213555",
                        '&:hover': {
                            backgroundColor: '#213555',
                            color: '#ffffff',
                          },
                    }}
                        className="submit-button-anotherann1"
                        onClick={handleSubmitAnotherReport}
                        variant="contained"
                    >
                        Another Announcement
                    </Button>

                    <Link to="/adminviewannouncement"> 
                        <Button
                            style={{ backgroundColor: "#213555", marginBottom: "10px" , width: '280px', height: '50px',
                            '&:hover': {
                                backgroundColor: '#ffffff',
                                color: '#213555',
                              },
                        }}
                            className="submit-button-home1"
                            onClick={handleDialogClose}
                            variant="contained"
                        >
                            View Announcements
                        </Button>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AdminAnnouncementForm;






