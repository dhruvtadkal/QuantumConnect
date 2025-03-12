import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import { Toaster } from "react-hot-toast"; // Import the Toaster component
import AboutUs from "./About";
import Contact from "./Contact";
import FeaturedTheses from "./FeaturedTheses";
import PrivacyPolicy from "./Privacy";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import UserProfiles from "./UserProfiles";
import CollaborationTools from './CollborationTools';
import ProposalDashboard from "./ProposalDashboard";
import FundingAndGrantsDashboard from "./FundingAndGrantsDashboard";
import EventsAndCalendarDashboard from "./EventsAndCalendarDashboard";

function AppBackup() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />{" "}
      {/* Add Toaster here */}
      <Routes>
        {/* Wrap your routes with the Layout component */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/userprofiles"
            element={
              <ProtectedRoute
                element={UserProfiles}
                allowedRoles={["Researcher", "Admin", "GrantApplicant", "EventParticipant"]}
              />
            }
          />
          <Route
            path="/proposaldashboard"
            element={
              <ProtectedRoute
                element={ProposalDashboard}
                allowedRoles={["Researcher", "Admin"]}
              />
            }
          />
          <Route
            path="/collaborationtools"
            element={
              <ProtectedRoute
                element={CollaborationTools}
                allowedRoles={["Researcher", "Admin"]}
              />
            }
          />
          <Route
            path="/grantsandfunding"
            element={
              <ProtectedRoute
                element={FundingAndGrantsDashboard}
                allowedRoles={["GrantApplicant", "Admin"]}
              />
            }
          />
          <Route
            path="/eventsdashboard"
            element={
              <ProtectedRoute
                element={EventsAndCalendarDashboard}
                allowedRoles={["EventParticipant", "Admin"]}
              />
            }
          />
          <Route
            path="/featuredtheses"
            element={
              <ProtectedRoute
                element={FeaturedTheses}
                allowedRoles={["Admin"]}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppBackup;
