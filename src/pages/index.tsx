import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Chip, Container, CssBaseline, Select, MenuItem, Typography } from '@mui/material';
import { useAuthState } from '@/hooks/useAuthDispatch';
import FooterIllustrationsV1 from '@/common/Footer';
import { useCallsDispatch, useCallsState } from '@/hooks/useCalls';

interface UserReply {
    // Define your UserReply interface
}

interface PaginatedUserReplies {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    userReplies: UserReply[];
}

const UserRepliesPage: React.FC = () => {
    const { fetchCallsAsync, setCurrentPageAction } = useCallsDispatch();
    const { currentPage, totalPages, userReplies } = useCallsState();
    const { token } = useAuthState();
    const router = useRouter();
    const [pageSize, setPageSize] = useState(10); // Number of rows per page

    useLayoutEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            fetchCallsAsync({
                page: currentPage,
                limit: pageSize
            });
        };

        fetchData();
    }, [currentPage, pageSize]);

    const handlePageChange = (newPage: number) => {
        setCurrentPageAction(newPage);
    };

    const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPageSize(event.target.value as number);
    };

    const renderAudioPlayer = (url: string) => {
        return (
            <audio controls style={{ background: 'none' }}>
                <source src={url} type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
        );
    };

    const columns = [
        { field: 'calldate', headerName: 'Call Date', flex: 1, minWidth: 150 },
        { field: 'clid', headerName: 'Caller ID', flex: 1, minWidth: 150 },
        { field: 'src', headerName: 'Source', flex: 1, minWidth: 150 },
        { field: 'dst', headerName: 'Destination', flex: 1, minWidth: 150 },
        { field: 'answer', headerName: 'Answer', flex: 1, minWidth: 150 },
        { field: 'end', headerName: 'End', flex: 1, minWidth: 150 },
        { field: 'duration', headerName: 'Duration', flex: 1, minWidth: 150 },
        { field: 'billsec', headerName: 'Billsec', flex: 1, minWidth: 150 },
        { field: 'userresponse_1', headerName: 'User Response 1', flex: 1, minWidth: 150 },
        { field: 'userresponse_2', headerName: 'User Response 2', flex: 1, minWidth: 150 },
        { field: 'userresponse_3', headerName: 'User Response 3', flex: 1, minWidth: 150 },
        { field: 'userresponse_4', headerName: 'User Response 4', flex: 1, minWidth: 150 },
        { field: 'userresponse_5', headerName: 'User Response 5', flex: 1, minWidth: 150 },
        { field: 'recording_responce_path', headerName: 'Recording', flex: 1, minWidth: 150, renderCell: (params: any) => renderAudioPlayer(params.value) },
        { field: 'fullrecording', headerName: 'Full Recording', flex: 1, minWidth: 150, renderCell: (params: any) => renderAudioPlayer(params.value) },
        { field: 'lead_type', headerName: 'Lead Type', flex: 1, minWidth: 150 },
        { field: 'sentiment', headerName: 'Sentiment', flex: 1, minWidth: 150, renderCell: (params: any) => <Chip label={params.value} color="primary" /> },
    ];

    return (
        <>
            <Head>
                <title>Dashboard - AI IVR</title>
                <meta name="description" content="smart IVR" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <React.Fragment>
                <Container component="main" maxWidth="xxl">
                    <CssBaseline />
                    <Typography variant="h4">Dashboard</Typography>
                    <div style={{ height: '100%', width: '100%' }}>
                        <DataGrid
                            rows={userReplies.map((reply, index) => ({ ...reply, id: index }))}
                            columns={columns}
                            hideFooter={true} 
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '20px' }}>
                        <Typography variant="body2">Rows per page:</Typography>
                        <Select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            style={{ marginLeft: '10px' }}
                        >
                            {[10, 25, 50, 100].map(size => (
                                <MenuItem key={size} value={size}>
                                    {size}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </Container>
            </React.Fragment>
        </>
    );
};

export default UserRepliesPage;