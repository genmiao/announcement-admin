import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminAnnouncementChoices from './AdminAnnouncementChoices';
import AdminAnnouncementForm from './AdminAnnouncementForm'
import AdminAnnouncementView from './AdminAnnouncementView';
import AdminAnnouncementEdit from './AdminAnnouncementEdit';
import UserAnnouncementView from './UserAnnouncementView'

const AdminAnnouncement = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminAnnouncementChoices />} />
        <Route path="/submitannouncement" element={<AdminAnnouncementForm />} />
        <Route path="/adminviewannouncement" element={<AdminAnnouncementView />} />
        <Route path="/admin/announcements/updateAnnouncement/:id" element={<AdminAnnouncementEdit />} />
        <Route path="/userviewannouncement" element={<UserAnnouncementView />} />
        <Route path="/backhome" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default AdminAnnouncement;
