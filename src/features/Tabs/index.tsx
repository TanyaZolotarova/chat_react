import { Box } from '@mui/material';
import { ArchiveChats } from '../ArchiveChats';
import { Contacts } from '../Contacts';
import { AllChats } from '../AllChats';

interface TabsProps {
    tab: string;
}

export const Tabs = ({ tab }: TabsProps) => {
    if (tab === 'archive') return (
        <Box
            sx={{
                width: 400,
                minHeight: '100vh',
                background: '#f7f7fb',
                marginLeft: '80px',
                borderRight: '1px solid #e5e5ef',
                boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.3)',
                boxSizing: 'border-box',
                p: 0,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <ArchiveChats />
        </Box>
    );

    if (tab === 'contacts') return (
        <Box
            sx={{
                width: 400,
                minHeight: '100vh',
                background: '#f7f7fb',
                marginLeft: '80px',
                borderRight: '1px solid #e5e5ef',
                boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.3)',
                boxSizing: 'border-box',
                p: 0,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Contacts />
        </Box>
    );
    return (
        <Box
            sx={{
                width: 400,
                minHeight: '100vh',
                background: '#f7f7fb',
                marginLeft: '80px',
                borderRight: '1px solid #e5e5ef',
                boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.3)',
                boxSizing: 'border-box',
                p: 0,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <AllChats />
        </Box>
    );
}
