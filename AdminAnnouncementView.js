import React, { useState, useEffect } from 'react';
import Header from '../Header';
import './AdminAnnouncementView.css';
import SearchIcon from "@mui/icons-material/Search";
import { Grid, Link, Menu, MenuItem, Paper, Button, TextField, InputBase, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const AdminAnnouncementView = ({ announcement, handleEdit }) => {
    const navigate = useNavigate();

    const [announcements, setAnnouncements] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    const [currentPage, setCurrentPage] = useState(1);
    const announcementsPerPage = 3;
    // Calculate the index range for the announcements to display on the current page
    const startIndex = (currentPage - 1) * announcementsPerPage;
    const endIndex = startIndex + announcementsPerPage;


    const fetchAnnouncements = async () => {
        try {
            const response = await fetch('http://localhost:8080/announcements/getAllAnnouncement');
            if (response.ok) {
                const data = await response.json();
                // Filter out announcements marked as deleted
                const nonDeletedAnnouncements = data.filter((announcement) => announcement.isdelete !== 1);

                // Update the state with non-deleted announcements
                setAnnouncements(nonDeletedAnnouncements.reverse());
            } else {
                console.error('Error fetching announcements:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);
    
    const handleSearch = (e) => { 
      setSearchTerm(e.target.value);
    };

    const filteredAnnouncements = announcements.filter((announcement) =>
      announcement.announcementTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(startIndex, endIndex);

    const totalPages = Math.ceil(announcements.length / announcementsPerPage);

    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    const handleEditClick = (announcementId) => {
        navigate(`/admin/announcements/updateAnnouncement/${announcementId}`);
      };

    const handleDelete = (announcementId) => {
        // Open the delete confirmation modal
        setAnnouncementToDelete(announcementId);
        setDeleteConfirmationOpen(true);
      };
    
      const handleDeleteConfirmation = async (confirmed) => {
        setDeleteConfirmationOpen(false);
    
        
        if (confirmed) {
          try {
            const response = await fetch(`http://localhost:8080/announcements/deleteAnnouncement/${announcementToDelete}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (response.ok) {
              // Remove the deleted announcement from the local state
              setAnnouncements((prevAnnouncements) =>
                prevAnnouncements.filter((announcement) => announcement.announcementId !== announcementToDelete)
              );
            } else {
              console.error('Error deleting announcement:', response.statusText);
            }
          } catch (error) {
            console.error('Error deleting announcement:', error);
          }
        }
      };
    

    return (
        <div>
        <Header />
        <Grid container>
            {/* Left Container */}
            <Grid item xs={3} className="left-container3">
              <h1 className="header-text3">ANNOUNCE WITH IMPACT!</h1>

              <img
                  src="/announcementpic.png"
                  alt="Support Local Business"
                  className="image-container3"
              />

              <br />
              <p className="description3">
                  As stewards of our community's well-being, your role is paramount.
                  Leverage the Announcements section to keep residents informed,
                  share emergency alerts, and showcase exciting community initiatives.
                  Informed administrators make for empowered communities.
              </p>
              <p className="description3">
                  Explore this feature to its fullest potential and witness the positive
                  impact it can have on community engagement and cohesion.
              </p>
              <p className="description3">
                  Your community, your tool - Barangay Connect!
              </p>
              <p className="description3">
                  Let's make our community stronger, together!
              </p>
            </Grid>

            {/* Right Content */}
            <Grid item xs={9} style={{ backgroundColor: "#213555" }}>
            <Paper elevation={3} className="search-bar-paper3">
                <SearchIcon className="search-icon3" />
                <InputBase
                placeholder="Search..."
                className="input-base3"
                value={searchTerm}
                onChange={handleSearch}
                />
                <Button variant="contained" color="primary" className="search-button3">
                Search
                </Button>
            </Paper>

                  {/* Pagination Buttons */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
                    <Button
                      onClick={handlePrevPage}
                      style={{ color: '#213555', marginRight: '10px', borderRadius: '50px', backgroundColor: '#ffffff' }}
                      variant="contained"
                    >
                      <span style={{ fontSize: '20px' }}>←</span>
                    </Button>
                    {/* <span style={{ color: '#ffffff', fontSize: '20px' }}>
                      Page {currentPage} of {totalPages}
                    </span> */}
                    <Button
                      onClick={handleNextPage}
                      style={{ color: '#ffffff', marginLeft: '10px', borderRadius: '50px' }}
                      variant="contained"
                    >
                      <span style={{ fontSize: '20px' }}>→</span>
                    </Button>
                  </div>

                {/* Display Announcements */}
                {filteredAnnouncements.map((announcement) => (
                        <Paper key={announcement.announcementId} elevation={3} className="announcement-paper3">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h1 style={{ color: 'red', fontSize: '30px', fontWeight: 'bold', marginBottom: '10px'  }}>
                                    {announcement.announcementTitle}
                                </h1>
                                <div>
                                    <Button onClick={() => { console.log(announcement.announcementId); handleEditClick(announcement.announcementId)}} style={{backgroundColor: '#ffffff', marginRight: '5px', height: '50%', border: '1px solid #213555'}}>
                                        <EditIcon style={{ color: '#213555' }} />
                                    </Button>
                                    <Button onClick={() => handleDelete(announcement.announcementId)} style={{backgroundColor: '#d8210b'}}>
                                        <DeleteIcon style={{ color: '#ffffff' }} />
                                    </Button>
                                </div>
                            </div>
                            <p style={{color: "#000000", fontSize: '20px', marginTop: '5px', marginBottom: '20px'}}>{announcement.announcementContent}</p>
                            <Paper
                                style={{
                                    backgroundColor: '#FFDE59',
                                    color: 'black',
                                    borderRadius: '10px',
                                    padding: '5px',
                                    marginTop: '5px',
                                    marginBottom: '10px',
                                    maxWidth: '120px',
                                    marginTop: '5px',  
                                    display: 'flex',  
                                    alignItems: 'center', 
                                }}
                            >
                                <AccessTimeIcon style={{ marginRight: '5px' }} />
                            {announcement.date}
                            </Paper>
                        </Paper>
                    ))}

                  {/* Delete Confirmation Dialog */}
                  <Dialog open={deleteConfirmationOpen} onClose={() => handleDeleteConfirmation(false)} PaperProps={{ style: { backgroundColor: '#ffffff' } }}>
                  {/* <img src={"/deleteicon.png"} alt="Check Button" className="submit-checkbutton2" style={{marginTop: "20px"}}/> */}
                    <DialogTitle style={{ margin: 'auto', textAlign: 'center', color: '#16558f', fontWeight: 'bolder', fontSize: '40px' }}>
                        Are you sure?
                    </DialogTitle>
                    <p style={{fontSize: "23px", color: '#000000', textAlign: 'center', marginTop: "0px"}}>This page is asking you to confirm that you want to delete this announcement.</p>
                    <DialogActions>
                      <Button onClick={() => handleDeleteConfirmation(true)} 
                              style={{ color: "#213555", 
                                    backgroundColor: "#ffffff",
                                    marginBottom: "10px", 
                                    width: '280px', 
                                    height: '50px', 
                                    border: '1px solid #213555' }} 
                                    variant="contained"
                                    className="submit-button-home3">
                        Yes
                      </Button>
                      <Button onClick={() => handleDeleteConfirmation(false)} 
                              style={{ backgroundColor: "#213555", 
                                    color: "#ffffff",
                                    marginBottom: "10px", 
                                    width: '280px',
                                    height: '50px' }} 
                                    variant="contained"
                                    className="submit-button-anotherann3">
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
            </Grid>
        </Grid>
        </div>
    );
};

export default AdminAnnouncementView;
