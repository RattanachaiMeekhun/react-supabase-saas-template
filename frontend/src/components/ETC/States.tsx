import React from 'react';
import { Spin, Empty, Button } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';

interface LoadingStateProps {
  message?: string;
}

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    text: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading..." 
}) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-4">
    <Spin size="large" />
    <p className="text-text-muted text-lg">{message}</p>
  </div>
);

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title = "No data available",
  description = "Get started by adding your first item",
  action
}) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-6">
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{ height: 60 }}
      description={
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
          <p className="text-text-muted">{description}</p>
        </div>
      }
    />
    {action && (
      <Button
        type="primary"
        icon={action.icon || <PlusOutlined />}
        onClick={action.onClick}
        className="shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary-500 to-primary-600 border-0"
      >
        {action.text}
      </Button>
    )}
  </div>
);

export const ErrorState: React.FC<{
  title?: string;
  description?: string;
  onRetry?: () => void;
}> = ({ 
  title = "Something went wrong",
  description = "We couldn't load the data. Please try again.",
  onRetry
}) => (
  <div className="flex flex-col items-center justify-center py-16 space-y-6">
    <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center">
      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      <p className="text-text-muted">{description}</p>
    </div>
    {onRetry && (
      <Button
        type="primary"
        icon={<ReloadOutlined />}
        onClick={onRetry}
        className="shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary-500 to-primary-600 border-0"
      >
        Try Again
      </Button>
    )}
  </div>
);
