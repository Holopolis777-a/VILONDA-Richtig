import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Etwas ist schiefgelaufen
            </h1>
            <p className="text-gray-600 mb-8">
              Entschuldigung, ein unerwarteter Fehler ist aufgetreten.
            </p>
            <ErrorBoundaryActions />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function ErrorBoundaryActions() {
  const navigate = useNavigate();

  return (
    <div className="space-x-4">
      <Button
        onClick={() => window.location.reload()}
        variant="outline"
      >
        Seite neu laden
      </Button>
      <Button
        onClick={() => navigate('/salary-sacrifice')}
      >
        Zurück zur Übersicht
      </Button>
    </div>
  );
}
