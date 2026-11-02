import React from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { WomensFashionDepartmentView } from '../components/WomensFashionDepartmentView';

export const WomenFashionPage: React.FC = () => {
  return (
    <PageContainer className="py-6">
      <WomensFashionDepartmentView />
    </PageContainer>
  );
};

export default WomenFashionPage;
