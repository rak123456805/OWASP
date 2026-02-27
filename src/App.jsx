import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import ScrollToTop from './components/ScrollToTop';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Feature Components
import AuthenticationFailures from './features/auth/components/AuthenticationFailures';
import AuthenticationSandbox from './features/auth/components/AuthenticationSandbox';

import BrokenAccessControl from './features/broken-access-control/components/BrokenAccessControl';
import BrokenAccessControlSandbox from './features/broken-access-control/components/BrokenAccessControlSandbox';

import CryptographicFailures from './features/crypto/components/CryptographicFailures';
import CryptographicFailuresSandbox from './features/crypto/components/CryptographicFailuresSandbox';

import Injection from './features/injection/components/Injection';
import InjectionSandbox from './features/injection/components/InjectionSandbox';

import InsecureDesign from './features/insecure-design/components/InsecureDesign';
import InsecureDesignSandbox from './features/insecure-design/components/InsecureDesignSandbox';

import SecurityMisconfiguration from './features/misconfiguration/components/SecurityMisconfiguration';
import SecurityMisconfigurationSandbox from './features/misconfiguration/components/SecurityMisconfigurationSandbox';

import VulnerableComponents from './features/vulnerable-components/components/VulnerableComponents';

import SoftwareDataIntegrity from './features/software-integrity/components/SoftwareDataIntegrity';
import SoftwareIntegritySandbox from './features/software-integrity/components/SoftwareIntegritySandbox';
import SecurityLoggingFailures from './features/logging/components/SecurityLoggingFailures';
import SecurityLoggingFailuresSandbox from './features/logging/components/SecurityLoggingFailuresSandbox';
import ServerSideRequestForgery from './features/ssrf/components/ServerSideRequestForgery';
import ServerSideRequestForgerySandbox from './features/ssrf/components/ServerSideRequestForgerySandbox';

import SoftwareSupplyChainFailures from './features/software-supply-chain-failures/components/SoftwareSupplyChainFailures';
import VulnerableComponentsSandbox from './features/vulnerable-components/components/VulnerableComponentsSandbox';
import MishandlingExceptionalConditions from './features/mishandling-exceptional-conditions/components/MishandlingExceptionalConditions';
import Chatbot from './features/chatbot/components/Chatbot';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* Vulnerability Pages */}
          <Route path="/broken-access-control" element={<BrokenAccessControl />} />
          <Route path="/broken-access-control/demo" element={<BrokenAccessControlSandbox key={Date.now()} />} />
          <Route path="/broken-access-control/sandbox" element={<BrokenAccessControlSandbox key={Date.now()} />} />

          <Route path="/cryptographic-failures" element={<CryptographicFailures />} />
          <Route path="/cryptographic-failures/demo" element={<CryptographicFailuresSandbox />} />

          <Route path="/injection" element={<Injection />} />
          <Route path="/injection-sandbox" element={<InjectionSandbox />} />

          <Route path="/insecure-design" element={<InsecureDesign />} />
          <Route path="/insecure-design/sandbox" element={<InsecureDesignSandbox />} />

          <Route path="/security-misconfiguration" element={<SecurityMisconfiguration />} />
          <Route path="/security-misconfiguration/sandbox" element={<SecurityMisconfigurationSandbox />} />

          <Route path="/vulnerable-components" element={<VulnerableComponents />} />
          <Route path="/vulnerable-components/sandbox" element={<VulnerableComponentsSandbox />} />
          <Route path="/authentication-failures" element={<AuthenticationFailures />} />
          <Route path="/software-data-integrity" element={<SoftwareDataIntegrity />} />
          <Route path="/software-data-integrity/sandbox" element={<SoftwareIntegritySandbox />} />
          <Route path="/security-logging-failures" element={<SecurityLoggingFailures />} />
          <Route path="/security-logging-failures/sandbox" element={<SecurityLoggingFailuresSandbox />} />
          <Route path="/server-side-request-forgery" element={<ServerSideRequestForgery />} />
          <Route path="/server-side-request-forgery/sandbox" element={<ServerSideRequestForgerySandbox />} />
          <Route path="/software-supply-chain-failures" element={<SoftwareSupplyChainFailures />} />
          <Route path="/mishandling-exceptional-conditions" element={<MishandlingExceptionalConditions />} />

          {/* Other Sandbox Routes */}
          <Route path="/sandbox/authentication-failures" element={<AuthenticationSandbox />} />
          <Route path="/sandbox/broken-access-control" element={<BrokenAccessControlSandbox key={Date.now()} />} />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Chatbot />
    </Router>
  );
}

export default App;
