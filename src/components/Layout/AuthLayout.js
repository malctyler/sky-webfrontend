import React from 'react';
import { Container, Row, Col, Card } from '@mui/material';
import { useTheme } from '../../contexts/ThemeContext';
import { AuthLayout as MintonAuthLayout } from '../../themes/minton/React.js/JS/src/components';

function AuthLayout({ children }) {
  const { isDarkMode } = useTheme();

  return (
    <MintonAuthLayout
      helpText="Welcome to Sky Technical Services"
      bottomLinks={null}
    >
      {children}
    </MintonAuthLayout>
  );
}

export default AuthLayout;