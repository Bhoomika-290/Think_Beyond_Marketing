import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
      <div className="w-12 h-12 rounded-xl bg-theme-accent-muted border border-theme-accent-border flex items-center justify-center mx-auto text-theme-accent">
        <Compass className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-bold text-theme-primary">Stage Not Found</h1>
      <p className="text-sm text-theme-secondary">
        The requested pathway does not exist in the Think Beyond Marketing workspace.
      </p>
      <div className="pt-2">
        <Link to="/idea-lab">
          <Button variant="primary" size="md" icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Idea Lab
          </Button>
        </Link>
      </div>
    </div>
  );
};
