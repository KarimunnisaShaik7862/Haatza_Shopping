import React from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import { MensFashionDepartmentView } from '../../../components/fashion/MensFashionDepartmentView';

export const MenFashionPage: React.FC = () => {
  return (
    <PageContainer className="py-6">
      <MensFashionDepartmentView />
    </PageContainer>
  );
};

export default MenFashionPage;
