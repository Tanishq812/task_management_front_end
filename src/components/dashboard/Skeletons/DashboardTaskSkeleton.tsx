import * as React from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/joy/Skeleton';

export default function DashboardTaskSkeleton() {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2,px:'1rem', py:'1rem' }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box key={index} >
          
         
            <Skeleton variant="rectangular" width={800} height="1em" sx={{ mb: 1 }} />
            <Skeleton variant="rectangular" width={800} height="1em" />
            <Skeleton variant="rectangular" width={800} height="1em" sx={{ mb: 1 }} />
        
        </Box>
      ))}
    </Box>
  );
}
